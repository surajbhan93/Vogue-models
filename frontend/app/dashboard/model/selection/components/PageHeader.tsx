// app/dashboard/model/selection/components/PageHeader.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ShieldCheck } from 'lucide-react';

interface PageHeaderProps {
  currentRound: number;
  overallStatus: string;
  updatedAt: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ currentRound, overallStatus, updatedAt }) => {
  const formattedDate = updatedAt ? new Date(updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) : 'N/A';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-2xl shadow-xl"
    >
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Selection Progress</h1>
        <p className="text-neutral-400 text-sm md:text-base">Track your selection journey.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800/80 border border-neutral-700/50 rounded-full text-xs font-medium text-neutral-300">
          <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
          <span>Round {currentRound}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800/80 border border-neutral-700/50 rounded-full text-xs font-medium text-neutral-300 capitalize">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>{overallStatus.replace('_', ' ')}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800/80 border border-neutral-700/50 rounded-full text-xs font-medium text-neutral-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </motion.div>
  );
};