// app/dashboard/model/selection/components/AdminRemarksCard.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareText } from 'lucide-react';

interface AdminRemarksCardProps {
  remarks?: string;
}

export const AdminRemarksCard: React.FC<AdminRemarksCardProps> = ({ remarks }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-2xl shadow-xl space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20">
          <MessageSquareText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Admin Remarks</h3>
          <p className="text-xs text-neutral-400">Feedback and notes from reviewers</p>
        </div>
      </div>

      <div className="p-4 bg-neutral-800/40 border border-neutral-800/80 rounded-xl">
        {remarks && remarks.trim() !== '' ? (
          <p className="text-neutral-300 text-sm leading-relaxed">{remarks}</p>
        ) : (
          <p className="text-neutral-500 text-sm italic">No remarks yet.</p>
        )}
      </div>
    </motion.div>
  );
};