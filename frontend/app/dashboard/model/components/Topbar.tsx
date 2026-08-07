'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Bell, User, Search, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { api } from '@/lib/api';

interface ModelData {
  name?: string;
  category?: string;
  profileImage?: string;
  isVerified?: boolean;
  status?: string;
}

export default function Topbar() {
  const [model, setModel] = useState<ModelData>({});

  useEffect(() => {
    // 1. Initial load from localStorage
    try {
      const stored = localStorage.getItem('model');
      if (stored) {
        setModel(JSON.parse(stored));
      }
    } catch {
      setModel({});
    }

    // 2. Fetch live data from backend API
    const fetchLiveProfile = async () => {
      try {
        const res = await api.get('/models/profile/me');
        if (res.data?.success && res.data?.model) {
          setModel(res.data.model);
          localStorage.setItem('model', JSON.stringify(res.data.model));
        }
      } catch (err) {
        // Silently fallback to stored data
      }
    };

    fetchLiveProfile();
  }, []);

  return (
    <header className="h-20 border-b border-amber-500/20 bg-slate-900/80 backdrop-blur-xl flex items-center justify-between px-4 sm:px-8 text-slate-100 selection:bg-amber-500 selection:text-black sticky top-0 z-30 shadow-lg">
      
      {/* Left: User Welcome & Category Badge */}
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-white tracking-tight">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">{model.name || 'Talent'}</span>
            </h2>
            {model.isVerified && (
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
            )}
          </div>
          <p className="text-xs text-slate-400 flex items-center gap-2">
            <span>{model.category || 'Creative Talent'} Portal</span>
            <span className="w-1 h-1 rounded-full bg-amber-400 inline-block" />
            <span className="text-amber-400 font-mono text-[10px] uppercase font-bold">
              {model.status || 'Active'} Roster
            </span>
          </p>
        </div>
      </div>

      {/* Right: Actions, Notifications & Profile Avatar */}
      <div className="flex items-center gap-4">
        {/* Quick Public Profile Link */}
        <Link
          href="/dashboard/model/profile"
          className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-xs font-semibold text-slate-300 hover:text-amber-300 transition-all cursor-pointer shadow-inner"
        >
          <span>View Public Profile</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
        </Link>

        {/* Notifications Icon */}
        <Link
          href="/dashboard/model/notifications"
          className="relative p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
        </Link>

        {/* Profile Avatar */}
        <Link href="/dashboard/model/profile" className="flex items-center gap-2 group cursor-pointer">
          {model.profileImage ? (
            <img
              src={model.profileImage}
              alt={model.name || 'Talent'}
              className="w-10 h-10 rounded-full object-cover border-2 border-amber-500/40 group-hover:border-amber-400 transition-all shadow-md"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300 via-amber-400 to-amber-500 flex items-center justify-center font-extrabold text-black text-sm shadow-md group-hover:scale-105 transition-transform">
              {model.name ? model.name.charAt(0).toUpperCase() : 'V'}
            </div>
          )}
        </Link>
      </div>
    </header>
  );
}