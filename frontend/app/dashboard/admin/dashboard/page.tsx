'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Plus, Trophy, BookOpen, Camera, Users, CreditCard, Sparkles } from 'lucide-react';

const AdminStats = dynamic(() => import('@/components/admin/Adminstats'), {
  loading: () => <StatsSkeleton />,
});

const RecentModels = dynamic(() => import('@/components/admin/Recentmodels'), {
  loading: () => <TableSkeleton />,
});

const RecentPayments = dynamic(() => import('@/components/admin/RecentPayments'), {
  loading: () => <TableSkeleton />,
});

const StatsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="h-32 bg-slate-900/80 rounded-2xl border border-slate-800" />
    ))}
  </div>
);

const TableSkeleton = () => (
  <div className="space-y-3 animate-pulse p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
    <div className="h-6 bg-slate-800 rounded w-1/3" />
    <div className="h-48 bg-slate-800/60 rounded-xl w-full" />
  </div>
);

export default function AdminDashboardPage() {
  return (
    <div className="w-full text-white selection:bg-amber-400 selection:text-black">
      {/* 
        Fixed Padding: Removed duplicate ml-64/pl-64 so main content 
        aligns directly next to the layout sidebar without any gap!
      */}
      <main className="p-4 sm:p-6 md:p-8 space-y-8 w-full max-w-full">
        {/* Header & Quick Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 w-full">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-400/10 border border-amber-500/30 text-amber-400">
                <Sparkles className="w-6 h-6" />
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
                Executive Admin Dashboard
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Live API telemetry for talent roster, contest competitions, editorial covers &amp; revenue ledger.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/dashboard/admin/contests"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              <span>+ Create Contest</span>
            </a>

            <a
              href="/dashboard/admin/editorials"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/30 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>+ Upload Showcase</span>
            </a>

            <a
              href="/dashboard/admin/blogs/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-purple-600/30 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>+ New Blog</span>
            </a>
          </div>
        </div>

        {/* Live Telemetry Stats */}
        <section className="w-full">
          <Suspense fallback={<StatsSkeleton />}>
            <AdminStats />
          </Suspense>
        </section>

        {/* Talent Verification & Financial Ledger */}
        <div className="grid grid-cols-1 gap-8 w-full">
          <section className="w-full">
            <Suspense fallback={<TableSkeleton />}>
              <RecentModels />
            </Suspense>
          </section>

          <section className="w-full">
            <Suspense fallback={<TableSkeleton />}>
              <RecentPayments />
            </Suspense>
          </section>
        </div>
      </main>
    </div>
  );
}