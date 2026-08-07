"use client";

import React, { useState } from "react";
import { Contest } from "../types";
import { Trash2, X, AlertTriangle } from "lucide-react";

interface DeleteDialogProps {
  contest: Contest | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<boolean>;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  contest,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !contest) return null;

  const handleDelete = async () => {
    setLoading(true);
    const success = await onConfirm(contest.id);
    setLoading(false);
    if (success) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Delete Contest</h3>
              <p className="text-xs text-slate-400">Irreversible action.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-slate-300 space-y-2">
          <p>
            Are you sure you want to permanently delete <strong className="text-white">"{contest.title}"</strong>?
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-rose-400 pt-1">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>All registered participants and submissions will be permanently purged.</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-lg shadow-rose-600/30 transition"
          >
            {loading ? "Deleting..." : "Delete Contest"}
          </button>
        </div>
      </div>
    </div>
  );
};
