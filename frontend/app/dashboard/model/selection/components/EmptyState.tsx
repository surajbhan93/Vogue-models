// app/dashboard/model/selection/components/EmptyState.tsx
'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[450px] p-8 bg-neutral-900 border border-neutral-800 rounded-2xl text-center space-y-4 shadow-2xl">
      <div className="p-4 bg-neutral-800 text-red-500 rounded-full border border-neutral-700">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h3 className="text-xl font-semibold text-white">Journey Not Started</h3>
        <p className="text-neutral-400 text-sm">Your selection process has not started yet.</p>
      </div>
    </div>
  );
};