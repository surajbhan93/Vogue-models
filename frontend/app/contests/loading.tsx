import React from "react";

export default function PublicContestsLoading() {
  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 p-4 sm:p-6 lg:p-12 space-y-10 animate-pulse max-w-7xl mx-auto">
      {/* Hero Skeleton */}
      <div className="space-y-4 text-center max-w-3xl mx-auto py-8">
        <div className="h-4 w-32 bg-slate-800 rounded-full mx-auto"></div>
        <div className="h-10 w-3/4 bg-slate-800 rounded-xl mx-auto"></div>
        <div className="h-4 w-full bg-slate-800/60 rounded"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-96 bg-slate-900/50 border border-slate-800 rounded-3xl"></div>
        ))}
      </div>
    </div>
  );
}
