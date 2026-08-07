"use client";

import React from "react";
import { Prize } from "../types";
import { Plus, Trash2, Trophy, Award, Gift } from "lucide-react";

interface ContestPrizesProps {
  prizes: Prize[];
  onChange: (prizes: Prize[]) => void;
}

export const ContestPrizes: React.FC<ContestPrizesProps> = ({ prizes, onChange }) => {
  const addPrize = () => {
    const defaultPosition =
      prizes.length === 0 ? "Winner" : prizes.length === 1 ? "Runner-up" : `Rank ${prizes.length + 1}`;
    const newPrize: Prize = {
      position: defaultPosition,
      title: defaultPosition,
      cashPrize: 50000,
      description: "Cash prize & Certificate of Excellence",
    };
    onChange([...prizes, newPrize]);
  };

  const removePrize = (index: number) => {
    onChange(prizes.filter((_, i) => i !== index));
  };

  const updatePrize = (index: number, field: keyof Prize, value: any) => {
    const updated = [...prizes];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-slate-200">Prize Pool & Rewards</h4>
          <p className="text-xs text-slate-400">Specify rewards for Winner, Runner-up, Top 10, etc.</p>
        </div>
        <button
          type="button"
          onClick={addPrize}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-sm transition"
        >
          <Plus className="w-3.5 h-3.5" /> Add Prize
        </button>
      </div>

      {prizes.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl text-xs text-slate-500">
          No prizes configured yet. Click "Add Prize" to specify contest rewards.
        </div>
      ) : (
        <div className="space-y-3">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3 transition-all hover:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {index === 0 ? <Trophy className="w-4 h-4 text-amber-400" /> : <Award className="w-4 h-4 text-purple-400" />}
                  </div>
                  <span className="text-sm font-semibold text-slate-200">
                    {prize.position || `Prize #${index + 1}`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removePrize(index)}
                  className="p-1 text-rose-400 hover:text-rose-300"
                  title="Remove Prize"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Position / Rank</label>
                  <input
                    type="text"
                    value={prize.position}
                    onChange={(e) => updatePrize(index, "position", e.target.value)}
                    placeholder="e.g. Winner, Runner-up, Top 10"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Prize Title</label>
                  <input
                    type="text"
                    value={prize.title}
                    onChange={(e) => updatePrize(index, "title", e.target.value)}
                    placeholder="e.g. Title Sponsor Award"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Cash Prize (₹)</label>
                  <input
                    type="number"
                    value={prize.cashPrize}
                    onChange={(e) => updatePrize(index, "cashPrize", Number(e.target.value))}
                    placeholder="50000"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-slate-400 font-medium mb-1">Description & Extra Perks</label>
                  <input
                    type="text"
                    value={prize.description}
                    onChange={(e) => updatePrize(index, "description", e.target.value)}
                    placeholder="e.g. Winner Trophy, Crown, Modeling Contract"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
