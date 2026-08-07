// app/dashboard/model/selection/components/ProgressCard.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SelectionData } from './Types';
import { Award, CheckCircle2, Compass, Layers } from 'lucide-react';

interface ProgressCardProps {
  selection: SelectionData;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ selection }) => {
  const calculateProgress = () => {
    const { currentRound, rounds, overallStatus } = selection;
    if (overallStatus === 'approved' && currentRound >= 4) return 100;
    if (currentRound === 1) return 25;
    if (currentRound === 2) return 50;
    if (currentRound === 3) return 75;
    if (currentRound === 4) {
      const r4 = rounds.find((r) => r.round === 4);
      return r4?.status === 'approved' ? 100 : 75;
    }
    return currentRound * 25;
  };

  const progressPercentage = calculateProgress();

  const getNextStep = () => {
    const { currentRound, overallStatus, rounds } = selection;
    if (overallStatus === 'approved' && progressPercentage === 100) return 'Selection Completed';
    
    const currentRoundObj = rounds.find(r => r.round === currentRound);
    if (currentRoundObj?.status === 'approved') {
      return `Wait for Round ${currentRound + 1} Review`;
    }

    switch (currentRound) {
      case 1:
        return 'Complete Profile';
      case 2:
        return 'Wait for Portfolio Review';
      case 3:
        return 'Attend Walk Audition';
      case 4:
        return 'Selection Completed';
      default:
        return 'In Review';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-2xl shadow-xl space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Selection Progress</h2>
            <p className="text-xs text-neutral-400">Track metrics and milestones</p>
          </div>
        </div>
        <span className="text-2xl font-bold text-white">{progressPercentage}%</span>
      </div>

      <div className="relative w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="bg-neutral-800/40 border border-neutral-800 p-4 rounded-xl space-y-1">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-medium">
            <Award className="w-4 h-4 text-red-500" />
            <span>Current Round</span>
          </div>
          <p className="text-lg font-semibold text-white">Round {selection.currentRound}</p>
        </div>

        <div className="bg-neutral-800/40 border border-neutral-800 p-4 rounded-xl space-y-1">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-red-500" />
            <span>Overall Status</span>
          </div>
          <p className="text-lg font-semibold text-white capitalize">{selection.overallStatus.replace('_', ' ')}</p>
        </div>

        <div className="bg-neutral-800/40 border border-neutral-800 p-4 rounded-xl space-y-1">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-medium">
            <Compass className="w-4 h-4 text-red-500" />
            <span>Next Step</span>
          </div>
          <p className="text-lg font-semibold text-white truncate">{getNextStep()}</p>
        </div>
      </div>
    </motion.div>
  );
};