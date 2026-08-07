"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, ArrowUpRight } from "lucide-react";

export default function ModelMessagesPage() {
  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 p-4 sm:p-6 lg:p-10 flex flex-col items-center justify-center text-center selection:bg-amber-500 selection:text-black pb-24">
      <div className="max-w-md w-full p-8 rounded-3xl border border-amber-500/30 bg-slate-900/80 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-black flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20 font-bold">
          <MessageSquare className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-widest bg-amber-500/10 text-amber-300 border border-amber-500/30">
            Coming Soon
          </span>
          <h1 className="text-2xl font-serif font-extrabold text-white">
            Direct Messaging & Agency Chat
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Real-time chat with agency scouts, contest managers, and casting directors.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/dashboard/model/contests"
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-xs font-bold text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition shadow-lg shadow-amber-500/20"
          >
            Return to Dashboard <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
