import axios from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15s Timeout for reliability
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // ✅ Allows HTTP-Only Cookies
});

// 🔹 Unified Request Interceptor (Client + Server safe)
api.interceptors.request.use(
  (config) => {
    let token: string | null = null;

    // 1. Client Side (Browser)
    if (typeof window !== 'undefined') {
      token =
        localStorage.getItem('token') ||
        localStorage.getItem('modelToken') ||
        localStorage.getItem('accessToken');
    }

    // Attach Token if available
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔹 Unified Response Interceptor for Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Graceful error logging
    return Promise.reject(error);
  }
);