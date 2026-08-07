"use client";

import React, { useState } from "react";
import { Contest, ContestStatus } from "../types";
import { STAGE_OPTIONS } from "../constants";
import { FastForward, X } from "lucide-react";

interface AdvanceStageDialogProps {
  contest: Contest | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string, currentStage: string, status?: ContestStatus) => Promise<boolean>;
}

export const AdvanceStageDialog: React.FC<AdvanceStageDialogProps> = ({
  contest,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedStage, setSelectedStage] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<ContestStatus>("ongoing");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (contest) {
      setSelectedStage(contest.currentStage || STAGE_OPTIONS[0]);
      setSelectedStatus(contest.status || "ongoing");
    }
  }, [contest]);

  if (!isOpen || !contest) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await onConfirm(contest.id, selectedStage, selectedStatus);
    setLoading(false);
    if (success) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FastForward className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Advance Contest Stage</h3>
              <p className="text-xs text-slate-400">Update active stage and competition lifecycle.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Target Stage</label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {STAGE_OPTIONS.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Update Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ContestStatus)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-semibold text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/30 transition"
            >
              {loading ? "Updating..." : "Update Stage"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
