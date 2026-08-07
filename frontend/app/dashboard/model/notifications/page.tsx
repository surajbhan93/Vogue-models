"use client";

import React from "react";
import Link from "next/link";
import { Bell, Clock, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ModelNotificationsPage() {
  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto selection:bg-amber-500 selection:text-black pb-24">
      {/* Top Prominent Notice Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/40 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
            <Clock className="w-5 h-5 animate-pulse" />
          </span>
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span>⚠️ Real-Time Push Notifications</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-mono border border-amber-400/30 uppercase font-bold">
                Coming Soon
              </span>
            </h3>
            <p className="text-xs text-amber-200/90 mt-0.5">
              Live push notification center for contest round evaluations & jury scores is launching soon!
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/model/contests"
          className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 transition whitespace-nowrap shadow-md"
        >
          Explore Live Contests ↗
        </Link>
      </div>

      {/* Main Center Card */}
      <div className="flex flex-col items-center justify-center text-center py-12">
        <div className="max-w-md w-full p-8 rounded-3xl border border-amber-500/30 bg-slate-900/80 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-black flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20 font-bold">
            <Bell className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-widest bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Notification Center
            </span>
            <h1 className="text-2xl font-serif font-extrabold text-white">
              Notifications & Live Alerts
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              You will receive real-time alerts when your contest round submissions are evaluated, promoted, or awarded jury titles.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left text-xs space-y-2">
            <div className="flex items-center gap-2 text-slate-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Email & SMS Alerts Active</span>
            </div>
            <p className="text-[11px] text-slate-400 pl-6">
              You will still receive email updates for contest round promotions and winner declarations.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/dashboard/model/contests"
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-xs font-bold text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition shadow-lg shadow-amber-500/20"
            >
              Check Contest Dashboard <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
