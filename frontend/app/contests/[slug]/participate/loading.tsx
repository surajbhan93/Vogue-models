import React from "react";

export default function ParticipateLoading() {
  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 p-4 sm:p-6 lg:p-12 space-y-8 animate-pulse max-w-4xl mx-auto">
      <div className="h-8 w-64 bg-slate-800 rounded-lg"></div>
      <div className="h-32 bg-slate-900 border border-slate-800 rounded-3xl"></div>
      <div className="h-96 bg-slate-900 border border-slate-800 rounded-3xl"></div>
    </div>
  );
}
