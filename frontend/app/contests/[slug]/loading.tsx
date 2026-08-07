import React from "react";

export default function ContestDetailLoading() {
  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 p-4 sm:p-6 lg:p-12 space-y-8 animate-pulse max-w-5xl mx-auto">
      <div className="h-64 sm:h-80 bg-slate-900 border border-slate-800 rounded-3xl"></div>
      <div className="space-y-4">
        <div className="h-8 w-2/3 bg-slate-800 rounded-xl"></div>
        <div className="h-4 w-full bg-slate-800/60 rounded"></div>
        <div className="h-4 w-5/6 bg-slate-800/60 rounded"></div>
      </div>
    </div>
  );
}
