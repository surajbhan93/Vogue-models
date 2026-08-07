'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Sparkles, ShieldCheck, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { setCookie } from 'cookies-next';
import { api } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const toastId = toast.loading('Authenticating credentials...');

    try {
      const cleanEmail = email.trim().toLowerCase();

      // ============================================
      // 🔹 1. DEDICATED ADMIN LOGIN ATTEMPT
      // ============================================
      if (cleanEmail.includes('admin')) {
        try {
          const res = await api.post('/admin/login', {
            email: cleanEmail,
            password,
          });

          if (res.data?.success || res.data?.token) {
            const token = res.data.token;
            const adminData = res.data.admin || res.data.user || { email: cleanEmail, role: 'ADMIN' };

            // Store Tokens & Cookies
            localStorage.removeItem('model');
            localStorage.removeItem('modelToken');
            localStorage.setItem('accessToken', token);
            localStorage.setItem('adminToken', token);
            localStorage.setItem('adminUser', JSON.stringify(adminData));

            setCookie('accessToken', token, { maxAge: 60 * 60 * 24 * 7, path: '/' });
            setCookie('adminToken', token, { maxAge: 60 * 60 * 24 * 7, path: '/' });

            toast.success('Welcome back, Admin!', { id: toastId });
            
            // 👈 Correct Redirect to Dashboard Admin Models
            router.replace('/dashboard/admin');
            return;
          }
        } catch (adminErr: any) {
          // Fallthrough to universal login below if dedicated endpoint fails
        }
      }

      // ============================================
      // 🔹 2. MODEL / TALENT / UNIVERSAL LOGIN
      // ============================================
      const response = await api.post('/models/login', {
        email: cleanEmail,
        password,
      });

      const data = response.data;

      if (!data.success && !data.token) {
        throw new Error(data.message || 'Invalid email or password');
      }

      const userRole = (data.model?.role || data.role || '').toUpperCase();

      // 🔹 If Logged-in User is Admin
      if (userRole === 'ADMIN' || cleanEmail.includes('admin')) {
        const token = data.token;
        localStorage.setItem('accessToken', token);
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(data.model || data.user));

        setCookie('accessToken', token, { maxAge: 60 * 60 * 24 * 7, path: '/' });
        setCookie('adminToken', token, { maxAge: 60 * 60 * 24 * 7, path: '/' });

        toast.success('Admin Sign-In Successful!', { id: toastId });
        router.replace('/dashboard/admin/models');
        return;
      }

      // 🔹 If Logged-in User is Talent / Model / Actor / Singer etc.
      const token = data.token;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('modelToken', token);
      localStorage.setItem('model', JSON.stringify(data.model));

      setCookie('accessToken', token, { maxAge: 60 * 60 * 24 * 7, path: '/' });

      const talentCategory = data.model?.category || 'Talent';
      toast.success(`Welcome back, ${data.model?.name || talentCategory}!`, { id: toastId });
      
      router.replace('/dashboard/model');

    } catch (err: any) {
      console.error('Login error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Login failed. Please check credentials.';
      setError(errorMsg);
      toast.error(errorMsg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#07090e] flex items-center justify-center px-4 py-12 selection:bg-amber-500 selection:text-black">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-500/10 via-purple-600/5 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-md w-full p-6 sm:p-8 rounded-3xl space-y-6 bg-slate-900/90 border border-amber-500/20 backdrop-blur-2xl shadow-2xl">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-300 via-amber-400 to-amber-500 mx-auto flex items-center justify-center font-serif text-black font-extrabold text-2xl shadow-lg shadow-amber-500/20">
            V
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
              Sign In to Vogue Vibe
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Access your Talent Roster or Admin Dashboard
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          {/* Error Message Alert */}
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400 flex items-center gap-2">
              <span className="shrink-0">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-1.5 block">
              Email Address
            </label>
            <div className="flex items-center px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus-within:border-amber-500/60 text-xs text-white transition">
              <Mail className="w-4 h-4 text-amber-400 shrink-0 mr-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@agency.com"
                className="bg-transparent focus:outline-none w-full text-slate-100 placeholder-slate-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-1.5 block">
              Password
            </label>
            <div className="flex items-center px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus-within:border-amber-500/60 text-xs text-white transition">
              <Lock className="w-4 h-4 text-amber-400 shrink-0 mr-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent focus:outline-none w-full text-slate-100 placeholder-slate-500"
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs text-amber-400 hover:text-amber-300 hover:underline transition"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Signing In...
              </>
            ) : (
              <>
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 border-t border-slate-800/80 pt-4">
          Don't have an account?{' '}
          <Link href="/become-model" className="text-amber-400 hover:text-amber-300 hover:underline font-semibold">
            Apply as a Talent
          </Link>
        </div>
      </div>
    </div>
  );
}