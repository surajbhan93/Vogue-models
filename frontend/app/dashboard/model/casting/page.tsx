"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users, MapPin, Calendar, DollarSign, ArrowUpRight, CheckCircle2, Clock, Sparkles, AlertCircle } from "lucide-react";

export interface CastingCall {
  id: string;
  title: string;
  category: string;
  brand: string;
  location: string;
  date: string;
  pay: string;
  requirements: string;
  status: "open" | "closed";
}

const SAMPLE_CASTING_CALLS: CastingCall[] = [
  {
    id: "c1",
    title: "Vogue India Lakme Fashion Week Runway Models",
    category: "Fashion Show / Runway",
    brand: "Vogue Paris & Manish Malhotra",
    location: "Mumbai, Maharashtra",
    date: "Aug 20, 2026",
    pay: "₹45,000 / day",
    requirements: "Female models (Height 5'8\"+), Male models (Height 6'0\"+)",
    status: "open",
  },
  {
    id: "c2",
    title: "Gucci Autumn Commercial Print Campaign",
    category: "Commercial Print",
    brand: "Gucci Bureau",
    location: "New Delhi",
    date: "Aug 25, 2026",
    pay: "₹75,000 total",
    requirements: "High-fashion sharp facial structure, all genders",
    status: "open",
  },
  {
    id: "c3",
    title: "Nykaa Luxury Beauty Lookbook Shoot",
    category: "E-Commerce / Digital",
    brand: "Nykaa Cosmetics",
    location: "Bengaluru",
    date: "Sep 02, 2026",
    pay: "₹25,000 / day",
    requirements: "Clear skin digital closeups required",
    status: "open",
  },
];

export default function CastingCallsPage() {
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const handleApply = (id: string) => {
    if (!appliedIds.includes(id)) {
      setAppliedIds([...appliedIds, id]);
      alert("🎉 Casting application submitted! The agency scout will contact you.");
    }
  };

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
              <span>⚠️ Preview Listings</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-mono border border-amber-400/30 uppercase font-bold">
                Coming Soon
              </span>
            </h3>
            <p className="text-xs text-amber-200/90 mt-0.5">
              Live Casting Calls & Direct Brand Auditions feature is launching soon! Check back for real-time brand hires.
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Users className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Live Casting Calls & Auditions</h1>
              <p className="text-xs text-slate-400">Direct casting calls for luxury fashion shows, brand shoots, and commercial campaigns.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Casting Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_CASTING_CALLS.map((call) => {
          const isApplied = appliedIds.includes(call.id);

          return (
            <div
              key={call.id}
              className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {call.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">{call.pay}</span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{call.title}</h3>
                <p className="text-xs text-amber-400 font-semibold">{call.brand}</p>

                <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{call.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Shoot Date: {call.date}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <strong>Reqs:</strong> {call.requirements}
                </p>
              </div>

              <button
                onClick={() => handleApply(call.id)}
                disabled={isApplied}
                className={`w-full py-3 px-4 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  isApplied
                    ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 cursor-default"
                    : "text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-md shadow-amber-500/20"
                }`}
              >
                {isApplied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Application Sent
                  </>
                ) : (
                  <>
                    Apply to Casting <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
