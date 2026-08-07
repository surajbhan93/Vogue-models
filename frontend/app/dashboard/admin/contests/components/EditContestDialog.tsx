"use client";

import React from "react";
import { Contest } from "../types";
import { ContestForm } from "./ContestForm";
import { X, Edit } from "lucide-react";

interface EditContestDialogProps {
  contest: Contest | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, data: Partial<Contest>) => Promise<boolean>;
}

export const EditContestDialog: React.FC<EditContestDialogProps> = ({
  contest,
  isOpen,
  onClose,
  onSubmit,
}) => {
  if (!isOpen || !contest) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Edit className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">Edit Contest: {contest.title}</h2>
              <p className="text-xs text-slate-400">Update dates, rounds, eligibility, location, or prize details.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prefilled Form */}
        <ContestForm
          initialData={contest}
          onSubmit={async (data) => {
            const success = await onSubmit(contest.id, data);
            if (success) onClose();
            return success;
          }}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};
