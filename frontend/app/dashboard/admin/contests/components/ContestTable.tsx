"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Contest } from "../types";
import { formatDate, formatCurrency } from "@/lib/utils";
import {
  MoreVertical,
  Edit,
  Send,
  FastForward,
  Award,
  Ban,
  Trash2,
  Star,
  Eye,
  Users,
  Calendar,
} from "lucide-react";

interface ContestTableProps {
  contests: Contest[];
  onEdit: (contest: Contest) => void;
  onPublish: (contest: Contest) => void;
  onAdvanceStage: (contest: Contest) => void;
  onDeclareResults: (contest: Contest) => void;
  onViewParticipants?: (contest: Contest) => void;
  onCancel: (contest: Contest) => void;
  onDelete: (contest: Contest) => void;
}

export const ContestTable: React.FC<ContestTableProps> = ({
  contests,
  onEdit,
  onPublish,
  onAdvanceStage,
  onDeclareResults,
  onViewParticipants,
  onCancel,
  onDelete,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const getStatusBadge = (status: Contest["status"]) => {
    switch (status) {
      case "draft":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">Draft</span>;
      case "active":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>;
      case "ongoing":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">Ongoing</span>;
      case "completed":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">Completed</span>;
      case "cancelled":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/20">{status}</span>;
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-md">
      <table className="w-full text-left text-sm text-slate-300 border-collapse">
        <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
          <tr>
            <th className="py-4 px-4 font-semibold">Contest</th>
            <th className="py-4 px-4 font-semibold">Registration Dates</th>
            <th className="py-4 px-4 font-semibold">Stage & Status</th>
            <th className="py-4 px-4 font-semibold">Fees</th>
            <th className="py-4 px-4 font-semibold">Metrics</th>
            <th className="py-4 px-4 font-semibold">Created Date</th>
            <th className="py-4 px-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {contests.map((contest) => (
            <tr key={contest.id} className="hover:bg-slate-800/30 transition-colors">
              {/* Contest Title & Banner */}
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-700 bg-slate-800 shrink-0">
                    <img
                      src={contest.bannerImage || "https://via.placeholder.com/150"}
                      alt={contest.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-100 hover:text-blue-400 transition">
                        {contest.title}
                      </span>
                      {contest.isFeatured && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          <Star className="w-2.5 h-2.5 fill-amber-300" /> Featured
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      /{contest.slug}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {contest.location?.city}, {contest.location?.state}
                    </div>
                  </div>
                </div>
              </td>

              {/* Registration Dates */}
              <td className="py-4 px-4">
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-1 text-slate-300">
                    <Calendar className="w-3 h-3 text-blue-400" />
                    <span>Start: {formatDate(contest.registrationStart)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>End: {formatDate(contest.registrationEnd)}</span>
                  </div>
                </div>
              </td>

              {/* Stage & Status */}
              <td className="py-4 px-4">
                <div className="space-y-1.5">
                  <div>{getStatusBadge(contest.status)}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span className="font-medium text-slate-200">{contest.currentStage || "Round 1"}</span>
                  </div>
                </div>
              </td>

              {/* Fees */}
              <td className="py-4 px-4">
                <div className="text-xs space-y-0.5">
                  <div className="text-slate-300">
                    Reg: <span className="font-medium">{contest.registrationFee === 0 ? "Free" : formatCurrency(contest.registrationFee)}</span>
                  </div>
                  <div className="text-slate-400">
                    Part: <span className="font-medium text-slate-200">{formatCurrency(contest.participationFee)}</span>
                  </div>
                </div>
              </td>

              {/* Metrics */}
              <td className="py-4 px-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-slate-400" title="Views">
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    {contest.views || 0}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-medium" title="Registrations">
                    <Users className="w-3.5 h-3.5" />
                    {contest.registrationsCount || 0}
                  </span>
                </div>
              </td>

              {/* Created Date */}
              <td className="py-4 px-4 text-xs text-slate-400 whitespace-nowrap">
                {formatDate(contest.createdAt || "")}
              </td>

              {/* Actions Menu */}
              <td className="py-4 px-4 text-right relative">
                <div className="inline-block text-left">
                  <button
                    onClick={() => setActiveMenuId(activeMenuId === contest.id ? null : contest.id)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {activeMenuId === contest.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setActiveMenuId(null)}
                      />
                      <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl z-20 py-1 text-xs text-slate-200">
                        <button
                          onClick={() => {
                            onEdit(contest);
                            setActiveMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                        >
                          <Edit className="w-3.5 h-3.5 text-blue-400" /> Edit Contest
                        </button>
                        {contest.status === "draft" && (
                          <button
                            onClick={() => {
                              onPublish(contest);
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 text-emerald-400 transition"
                          >
                            <Send className="w-3.5 h-3.5" /> Publish Contest
                          </button>
                        )}
                        <button
                          onClick={() => {
                            onAdvanceStage(contest);
                            setActiveMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 text-indigo-400 transition"
                        >
                          <FastForward className="w-3.5 h-3.5" /> Advance Stage
                        </button>
                        {onViewParticipants && (
                          <button
                            onClick={() => {
                              onViewParticipants(contest);
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 text-teal-400 transition"
                          >
                            <Users className="w-3.5 h-3.5" /> View Participants
                          </button>
                        )}
                        <button
                          onClick={() => {
                            onDeclareResults(contest);
                            setActiveMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 text-purple-400 transition"
                        >
                          <Award className="w-3.5 h-3.5" /> Declare Results
                        </button>
                        <button
                          onClick={() => {
                            onCancel(contest);
                            setActiveMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 text-amber-400 transition"
                        >
                          <Ban className="w-3.5 h-3.5" /> Cancel Contest
                        </button>
                        <div className="my-1 border-t border-slate-800" />
                        <button
                          onClick={() => {
                            onDelete(contest);
                            setActiveMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 text-rose-400 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete Contest
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
