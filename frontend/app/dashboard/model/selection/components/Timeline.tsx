// app/dashboard/model/selection/components/Timeline.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Round } from './Types';
import { CheckCircle2, Clock, XCircle, Slash, Lock } from 'lucide-react';

interface TimelineProps {
  rounds: Round[];
  currentRound: number;
}

export const Timeline: React.FC<TimelineProps> = ({ rounds, currentRound }) => {
  const getStatusBadge = (status: Round['status'], isFuture: boolean) => {
    if (isFuture) {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 bg-neutral-800/50 text-neutral-500 border border-neutral-800 rounded-full text-xs font-medium">
          <Lock className="w-3.5 h-3.5" />
          Locked
        </span>
      );
    }

    switch (status) {
      case 'approved':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-xs font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-xs font-medium">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-xs font-medium">
            <XCircle className="w-3.5 h-3.5" />
            Rejected
          </span>
        );
      case 'skipped':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-neutral-800 text-neutral-400 border border-neutral-700 rounded-full text-xs font-medium">
            <Slash className="w-3.5 h-3.5" />
            Skipped
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white px-1">Timeline</h3>
      <div className="space-y-3">
        {rounds.map((round, index) => {
          const isFuture = round.round > currentRound;
          const formattedReviewedAt = round.reviewedAt
            ? new Date(round.reviewedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : null;

          return (
            <motion.div
              key={round.round}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl border transition-all ${
                isFuture
                  ? 'bg-neutral-900/40 border-neutral-800/60 opacity-60'
                  : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 shadow-lg'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm ${
                      isFuture
                        ? 'bg-neutral-800 text-neutral-600 border border-neutral-700'
                        : round.status === 'approved'
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : round.status === 'rejected'
                        ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                        : 'bg-neutral-800 text-white border border-neutral-700'
                    }`}
                  >
                    0{round.round}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-white text-base">{round.title}</h4>
                    {round.remarks && <p className="text-sm text-neutral-400">{round.remarks}</p>}
                    {formattedReviewedAt && (
                      <p className="text-xs text-neutral-500">Reviewed on: {formattedReviewedAt}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-800">
                  {getStatusBadge(round.status, isFuture)}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};