"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, ArrowLeft, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function ModelBookingsPage() {
  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 p-4 sm:p-6 lg:p-10 flex flex-col items-center justify-center text-center selection:bg-amber-500 selection:text-black pb-24">
      <div className="max-w-md w-full p-8 rounded-3xl border border-amber-500/30 bg-slate-900/80 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-black flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20 font-bold">
          <Calendar className="w-8 h-8" />
        </div>

        {/* Title & Badge */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-widest bg-amber-500/10 text-amber-300 border border-amber-500/30">
            Feature Launching Soon
          </span>
          <h1 className="text-2xl font-serif font-extrabold text-white">
            Client Bookings & Direct Hires
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Direct client booking requests, fashion show assignments, and brand campaign contracts will be available here.
          </p>
        </div>

        {/* Info Card */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left text-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-300 font-bold">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Currently Active: Contest Auditions</span>
          </div>
          <p className="text-[11px] text-slate-400 pl-6">
            Participate in live modeling contests & auditions to build your agency ranking and unlock direct client bookings.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href="/dashboard/model/contests"
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-xs font-bold text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition shadow-lg shadow-amber-500/20"
          >
            Explore Live Contests <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
