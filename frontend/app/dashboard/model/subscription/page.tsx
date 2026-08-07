"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, ShieldCheck, Crown, Zap, ArrowRight, CreditCard, Clock } from "lucide-react";

export default function ModelSubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");

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
              <span>⚠️ Preview Membership Plans</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-mono border border-amber-400/30 uppercase font-bold">
                Coming Soon
              </span>
            </h3>
            <p className="text-xs text-amber-200/90 mt-0.5">
              VIP Membership & Paid Roster Subscriptions are launching soon! All registered models currently enjoy full standard access.
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

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto pt-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
          <Crown className="w-3.5 h-3.5 text-amber-400" /> VIP MODEL MEMBERSHIP
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight">
          Elevate Your Modeling Career
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Get priority casting call invitations, featured roster placement, zero booking commissions, and direct agency scout referrals.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Basic Plan */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6 flex flex-col justify-between hover:border-slate-700 transition">
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase font-mono tracking-widest block">Standard</span>
            <div className="text-3xl font-extrabold text-white">Free</div>
            <p className="text-xs text-slate-400">Basic listing on talent roster with standard audition access.</p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Basic Public Profile Listing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Apply to Open Contests</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />
                <span>Featured Homepage Roster</span>
              </div>
            </div>
          </div>

          <button className="w-full py-3 px-4 rounded-2xl text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 cursor-not-allowed">
            Active Free Plan
          </button>
        </div>

        {/* Pro VIP Plan (Featured) */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500/50 space-y-6 flex flex-col justify-between shadow-2xl shadow-amber-500/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-amber-500 text-black text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase font-mono tracking-wider">
            Most Popular
          </div>

          <div className="space-y-4">
            <span className="text-xs font-extrabold text-amber-400 uppercase font-mono tracking-widest flex items-center gap-1">
              <Crown className="w-4 h-4 fill-amber-400" /> Pro VIP Roster
            </span>
            <div>
              <span className="text-3xl font-black text-white">₹2,999</span>
              <span className="text-xs text-slate-400"> / year</span>
            </div>
            <p className="text-xs text-slate-300">Maximum visibility for models aiming for commercial & fashion shows.</p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-200 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Featured Badge on Roster Page</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Direct Brand Casting Invitations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>0% Commission on Direct Hires</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Priority Jury Feedback</span>
              </div>
            </div>
          </div>

          <button className="w-full py-3 px-4 rounded-2xl text-xs font-bold text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer">
            Coming Soon <Zap className="w-4 h-4 fill-black" />
          </button>
        </div>

        {/* Agency Elite Plan */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6 flex flex-col justify-between hover:border-slate-700 transition">
          <div className="space-y-4">
            <span className="text-xs font-bold text-purple-400 uppercase font-mono tracking-widest block">Agency Elite</span>
            <div>
              <span className="text-3xl font-black text-white">₹5,999</span>
              <span className="text-xs text-slate-400"> / year</span>
            </div>
            <p className="text-xs text-slate-400">Dedicated agency manager + professional portfolio shoot.</p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>All Pro VIP Benefits</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Studio Portfolio Digitals Shoot</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Dedicated Talent Manager</span>
              </div>
            </div>
          </div>

          <button className="w-full py-3 px-4 rounded-2xl text-xs font-bold text-white bg-slate-800 border border-slate-700 cursor-not-allowed">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}
