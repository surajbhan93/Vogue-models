"use client";

import React from "react";
import { Trophy, Flame, FileText, CheckCircle2 } from "lucide-react";

interface ContestStatsProps {
  stats: {
    total: number;
    active: number;
    draft: number;
    completed: number;
  };
}

export const ContestStats: React.FC<ContestStatsProps> = ({ stats }) => {
  const statCards = [
    {
      label: "Total Contests",
      value: stats.total,
      icon: Trophy,
      color: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30",
      iconBg: "bg-blue-500/10 text-blue-400",
    },
    {
      label: "Active Contests",
      value: stats.active,
      icon: Flame,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
      iconBg: "bg-emerald-500/10 text-emerald-400",
    },
    {
      label: "Draft Contests",
      value: stats.draft,
      icon: FileText,
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
      iconBg: "bg-amber-500/10 text-amber-400",
    },
    {
      label: "Completed Contests",
      value: stats.completed,
      icon: CheckCircle2,
      color: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
      iconBg: "bg-purple-500/10 text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`relative overflow-hidden rounded-xl border bg-gradient-to-br p-5 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-black/20 ${card.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {card.label}
                </p>
                <h3 className="mt-2 text-3xl font-extrabold text-white tracking-tight">
                  {card.value}
                </h3>
              </div>
              <div className={`p-3 rounded-xl border border-white/10 ${card.iconBg}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Updated in real-time</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
