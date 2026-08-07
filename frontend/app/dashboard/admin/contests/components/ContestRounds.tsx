"use client";

import React from "react";
import { Round, SubmissionType, RoundStatus } from "../types";
import { Plus, Trash2, ArrowUp, ArrowDown, Layers, Calendar } from "lucide-react";

interface ContestRoundsProps {
  rounds: Round[];
  onChange: (rounds: Round[]) => void;
}

export const ContestRounds: React.FC<ContestRoundsProps> = ({ rounds, onChange }) => {
  const addRound = () => {
    const newRoundNumber = rounds.length + 1;
    const newRound: Round = {
      roundNumber: newRoundNumber,
      name: `Round ${newRoundNumber}`,
      description: "",
      submissionType: "photo",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 86400000 * 7).toISOString(),
      maxParticipantsSelected: 50,
      status: "upcoming",
    };
    onChange([...rounds, newRound]);
  };

  const removeRound = (index: number) => {
    const updated = rounds
      .filter((_, i) => i !== index)
      .map((r, idx) => ({ ...r, roundNumber: idx + 1 }));
    onChange(updated);
  };

  const updateRound = (index: number, field: keyof Round, value: any) => {
    const updated = [...rounds];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const moveRound = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === rounds.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...rounds];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Recalculate roundNumbers
    const reordered = updated.map((r, idx) => ({ ...r, roundNumber: idx + 1 }));
    onChange(reordered);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-slate-200">Contest Rounds</h4>
          <p className="text-xs text-slate-400">Configure progression stages, dates, and evaluation criteria.</p>
        </div>
        <button
          type="button"
          onClick={addRound}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition"
        >
          <Plus className="w-3.5 h-3.5" /> Add Round
        </button>
      </div>

      {rounds.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl text-xs text-slate-500">
          No rounds added yet. Click "Add Round" to create the first competition round.
        </div>
      ) : (
        <div className="space-y-3">
          {rounds.map((round, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3 transition-all hover:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs border border-blue-500/30">
                    {round.roundNumber}
                  </span>
                  <span className="text-sm font-semibold text-slate-200">
                    Round {round.roundNumber} Configuration
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveRound(index, "up")}
                    disabled={index === 0}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveRound(index, "down")}
                    disabled={index === rounds.length - 1}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeRound(index)}
                    className="p-1 text-rose-400 hover:text-rose-300 ml-2"
                    title="Delete Round"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Round Name</label>
                  <input
                    type="text"
                    value={round.name}
                    onChange={(e) => updateRound(index, "name", e.target.value)}
                    placeholder="e.g. Round 1 - Photo Submission"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Submission Type</label>
                  <select
                    value={round.submissionType}
                    onChange={(e) => updateRound(index, "submissionType", e.target.value as SubmissionType)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="photo">Photo Upload</option>
                    <option value="video">Video Upload</option>
                    <option value="live">Live Interview / Ramp Walk</option>
                    <option value="text">Text / Essay</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-400 font-medium mb-1">Description</label>
                  <input
                    type="text"
                    value={round.description}
                    onChange={(e) => updateRound(index, "description", e.target.value)}
                    placeholder="Round rules, requirements, instructions..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Start Date</label>
                  <input
                    type="datetime-local"
                    value={round.startDate ? round.startDate.substring(0, 16) : ""}
                    onChange={(e) => updateRound(index, "startDate", new Date(e.target.value).toISOString())}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">End Date</label>
                  <input
                    type="datetime-local"
                    value={round.endDate ? round.endDate.substring(0, 16) : ""}
                    onChange={(e) => updateRound(index, "endDate", new Date(e.target.value).toISOString())}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Max Participants Selected</label>
                  <input
                    type="number"
                    value={round.maxParticipantsSelected}
                    onChange={(e) => updateRound(index, "maxParticipantsSelected", Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Status</label>
                  <select
                    value={round.status}
                    onChange={(e) => updateRound(index, "status", e.target.value as RoundStatus)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
