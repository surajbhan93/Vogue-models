// frontend/context/AdminContext.tsx
'use client';

import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import axios, { AxiosError } from 'axios';

// ============================================
// 🔹 TYPES & INTERFACES
// ============================================

export interface IAdmin {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'super_admin' | 'admin' | 'sub_admin';
  isActive: boolean;
  isVerified: boolean;
  profileImage?: string | null;
  bio?: string;
  permissions: string[];
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminContextType {
  admin: IAdmin | null;
  token: string | null;
  loading: boolean;
  error: string;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isSubAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; admin?: IAdmin; error?: string }>;
  logout: () => void;
  getProfile: () => Promise<void>;
  updateProfile: (data: any) => Promise<{ success: boolean; admin?: IAdmin; error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  clearError: () => void;
}

interface AdminProviderProps {
  children: ReactNode;
}

// ============================================
// 🔹 API BASE URL
// ============================================
// const API_URL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004/api';
const API_URL: string = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004/api'}/admin`;
// ============================================
// 🔹 CREATE CONTEXT
// ============================================
const AdminContext = createContext<AdminContextType | null>(null);

// ============================================
// 🔹 PROVIDER COMPONENT
// ============================================
export function AdminProvider({ children }: AdminProviderProps): React.ReactElement {
  // ============================================
  // 🔹 STATE - accessToken use karein (login page ke hisaab se)
  // ============================================
  const [admin, setAdmin] = useState<IAdmin | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      // Login page 'accessToken' store karta hai
      return localStorage.getItem('accessToken') || null;
    }
    return null;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // ============================================
  // 🔹 SETUP AXIOS INTERCEPTORS
  // ============================================
  useEffect(() => {
    // Request interceptor - Add token to all requests
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const currentToken = typeof window !== 'undefined' 
          ? localStorage.getItem('accessToken') 
          : null;
        if (currentToken) {
          config.headers.Authorization = `Bearer ${currentToken}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle token expiration
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // ============================================
  // 🔹 LOGIN - Login page se compatible
  // ============================================
  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; admin?: IAdmin; error?: string }> => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.post(`${API_URL}/login`, { email, password });
      
      if (response.data.success) {
        const { token: newToken, admin: adminData } = response.data;
        
        // Login page ki tarah 'accessToken' store karein
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', newToken);
        }
        setToken(newToken);
        setAdmin(adminData);
        setIsAuthenticated(true);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        
        return { 
          success: true, 
          admin: adminData 
        };
      } else {
        const errorMsg = response.data.message || 'Login failed';
        setError(errorMsg);
        return { 
          success: false, 
          error: errorMsg 
        };
      }
    } catch (err) {
      const errorMessage = (err as AxiosError)?.response?.data as string || 'Login failed. Please try again.';
      console.error('Login error:', err);
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================
  // 🔹 GET PROFILE - accessToken use karein
  // ============================================
  const getProfile = useCallback(async (): Promise<void> => {
    const currentToken = typeof window !== 'undefined' 
      ? localStorage.getItem('accessToken') 
      : null;
      
    if (!currentToken) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await axios.get<{ success: boolean; admin: IAdmin }>(`${API_URL}/profile/me`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.data.success) {
        setAdmin(response.data.admin);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (err) {
      console.error('Get profile error:', err);
      if ((err as AxiosError)?.response?.status === 401 || (err as AxiosError)?.response?.status === 403) {
        logout();
      } else {
        const errorMsg = (err as AxiosError)?.response?.data as string || 'Failed to load profile';
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================
  // 🔹 LOGOUT - accessToken clear karein
  // ============================================
  const logout = useCallback((): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setAdmin(null);
    setIsAuthenticated(false);
    setError('');
  }, []);

  // ============================================
  // 🔹 UPDATE PROFILE
  // ============================================
  const updateProfile = useCallback(async (data: any): Promise<{ success: boolean; admin?: IAdmin; error?: string }> => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.put<{ success: boolean; admin: IAdmin }>(`${API_URL}/profile/me`, data);
      
      if (response.data.success) {
        setAdmin(response.data.admin);
        return { 
          success: true, 
          admin: response.data.admin 
        };
      } else {
        const errorMsg = response.data.message || 'Profile update failed';
        setError(errorMsg);
        return { 
          success: false, 
          error: errorMsg 
        };
      }
    } catch (err) {
      console.error('Update profile error:', err);
      const errorMessage = (err as AxiosError)?.response?.data as string || 'Failed to update profile';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================
  // 🔹 CHANGE PASSWORD
  // ============================================
  const changePassword = useCallback(async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.put<{ success: boolean; message: string }>(`${API_URL}/change-password`, {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        return { 
          success: true, 
          message: response.data.message 
        };
      } else {
        const errorMsg = response.data.message || 'Password change failed';
        setError(errorMsg);
        return { 
          success: false, 
          error: errorMsg 
        };
      }
    } catch (err) {
      console.error('Change password error:', err);
      const errorMessage = (err as AxiosError)?.response?.data as string || 'Failed to change password';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================
  // 🔹 CLEAR ERROR
  // ============================================
  const clearError = useCallback((): void => {
    setError('');
  }, []);

  // ============================================
  // 🔹 CHECK AUTH ON MOUNT
  // ============================================
  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      const currentToken = typeof window !== 'undefined' 
        ? localStorage.getItem('accessToken') 
        : null;
      if (currentToken) {
        await getProfile();
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [getProfile]);

  // ============================================
  // 🔹 CONTEXT VALUE
  // ============================================
  const value: AdminContextType = {
    admin,
    token,
    loading,
    error,
    isAuthenticated,
    isSuperAdmin: admin?.role === 'super_admin',
    isAdmin: admin?.role === 'admin' || admin?.role === 'super_admin',
    isSubAdmin: admin?.role === 'sub_admin',
    login,
    logout,
    getProfile,
    updateProfile,
    changePassword,
    clearError,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

// ============================================
// 🔹 CUSTOM HOOK
// ============================================
export function useAdmin(): AdminContextType {
  const context = useContext(AdminContext);
  
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  
  return context;
}

export default AdminContext;