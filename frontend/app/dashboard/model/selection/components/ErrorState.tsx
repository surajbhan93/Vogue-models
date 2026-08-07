// app/dashboard/model/selection/components/ErrorState.tsx
'use client';

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-neutral-900 border border-neutral-800 rounded-2xl text-center space-y-4 shadow-2xl">
      <div className="p-4 bg-red-500/10 text-red-500 rounded-full border border-red-500/20">
        <AlertCircle className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-white">Failed to Load Selection Data</h3>
        <p className="text-neutral-400 text-sm max-w-md">{message || 'An unexpected error occurred while fetching your selection status.'}</p>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-95"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </div>
  );
};