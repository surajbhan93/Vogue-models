import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#080b11] p-6 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-slate-800 rounded-lg"></div>
          <div className="h-4 w-96 bg-slate-800/60 rounded"></div>
        </div>
        <div className="h-10 w-36 bg-blue-600/50 rounded-xl"></div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-slate-900/60 border border-slate-800 rounded-xl"></div>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="h-16 bg-slate-900/60 border border-slate-800 rounded-xl"></div>

      {/* Cards/Table Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 bg-slate-900/40 border border-slate-800 rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}
