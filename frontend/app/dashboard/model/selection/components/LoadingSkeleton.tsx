// app/dashboard/model/selection/components/LoadingSkeleton.tsx
'use client';

import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-neutral-800 rounded-lg" />
          <div className="h-4 w-40 bg-neutral-800 rounded-md" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-28 bg-neutral-800 rounded-full" />
          <div className="h-10 w-32 bg-neutral-800 rounded-full" />
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4">
        <div className="h-6 w-48 bg-neutral-800 rounded-md" />
        <div className="h-3 w-full bg-neutral-800 rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="h-20 bg-neutral-800/50 rounded-xl" />
          <div className="h-20 bg-neutral-800/50 rounded-xl" />
          <div className="h-20 bg-neutral-800/50 rounded-xl" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-6 w-36 bg-neutral-800 rounded-md" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-neutral-900 border border-neutral-800 rounded-2xl" />
        ))}
      </div>
    </div>
  );
};