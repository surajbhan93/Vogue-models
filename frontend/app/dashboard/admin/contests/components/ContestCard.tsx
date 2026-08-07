"use client";

import React, { useState } from "react";
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
  MapPin,
  Calendar,
  Eye,
  Users,
  Trophy,
} from "lucide-react";

interface ContestCardProps {
  contest: Contest;
  onEdit: (contest: Contest) => void;
  onPublish: (contest: Contest) => void;
  onAdvanceStage: (contest: Contest) => void;
  onDeclareResults: (contest: Contest) => void;
  onViewParticipants?: (contest: Contest) => void;
  onCancel: (contest: Contest) => void;
  onDelete: (contest: Contest) => void;
}

export const ContestCard: React.FC<ContestCardProps> = ({
  contest,
  onEdit,
  onPublish,
  onAdvanceStage,
  onDeclareResults,
  onViewParticipants,
  onCancel,
  onDelete,
}) => {
  const [activeMenu, setActiveMenu] = useState(false);

  const getStatusBadge = (status: Contest["status"]) => {
    switch (status) {
      case "draft":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">Draft</span>;
      case "active":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Active</span>;
      case "ongoing":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">Ongoing</span>;
      case "completed":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">Completed</span>;
      case "cancelled":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">Cancelled</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/20 text-slate-300 border border-slate-500/30">{status}</span>;
    }
  };

  return (
    <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md overflow-hidden hover:border-slate-700 transition-all duration-300 shadow-xl flex flex-col justify-between">
      {/* Top Banner & Badges */}
      <div>
        <div className="relative h-44 w-full bg-slate-800 overflow-hidden">
          <img
            src={contest.bannerImage || "https://via.placeholder.com/600x300"}
            alt={contest.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {getStatusBadge(contest.status)}
            {contest.isFeatured && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Star className="w-3 h-3 fill-amber-300" /> Featured
              </span>
            )}
          </div>

          {/* Actions Menu */}
          <div className="absolute top-3 right-3">
            <button
              onClick={() => setActiveMenu(!activeMenu)}
              className="p-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-white transition"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {activeMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(false)} />
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl z-20 py-1 text-xs text-slate-200">
                  <button
                    onClick={() => {
                      onEdit(contest);
                      setActiveMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                  >
                    <Edit className="w-3.5 h-3.5 text-blue-400" /> Edit Contest
                  </button>
                  {contest.status === "draft" && (
                    <button
                      onClick={() => {
                        onPublish(contest);
                        setActiveMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 text-emerald-400 transition"
                    >
                      <Send className="w-3.5 h-3.5" /> Publish Contest
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onAdvanceStage(contest);
                      setActiveMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 text-indigo-400 transition"
                  >
                    <FastForward className="w-3.5 h-3.5" /> Advance Stage
                  </button>
                  {onViewParticipants && (
                    <button
                      onClick={() => {
                        onViewParticipants(contest);
                        setActiveMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 text-teal-400 transition"
                    >
                      <Users className="w-3.5 h-3.5" /> View Participants
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onDeclareResults(contest);
                      setActiveMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 text-purple-400 transition"
                  >
                    <Award className="w-3.5 h-3.5" /> Declare Results
                  </button>
                  <button
                    onClick={() => {
                      onCancel(contest);
                      setActiveMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 text-amber-400 transition"
                  >
                    <Ban className="w-3.5 h-3.5" /> Cancel Contest
                  </button>
                  <div className="my-1 border-t border-slate-800" />
                  <button
                    onClick={() => {
                      onDelete(contest);
                      setActiveMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 text-rose-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Contest
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Current Stage Overlay */}
          <div className="absolute bottom-2 left-3 text-xs text-slate-300 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span>Stage: <strong className="text-white">{contest.currentStage || "Round 1"}</strong></span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition line-clamp-1">
              {contest.title}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">/{contest.slug}</p>
          </div>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {contest.description}
          </p>

          {/* Location & Dates */}
          <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
            <div className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="truncate">
                {contest.location?.city}, {contest.location?.state}, {contest.location?.country}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>
                {formatDate(contest.registrationStart)} - {formatDate(contest.registrationEnd)}
              </span>
            </div>
          </div>

          {/* Rounds Summary */}
          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
            <span>Rounds: <strong className="text-slate-200">{contest.rounds?.length || 0}</strong></span>
            <span>Fee: <strong className="text-emerald-400">{formatCurrency(contest.participationFee)}</strong></span>
          </div>
        </div>
      </div>

      {/* Card Footer Metrics */}
      <div className="px-5 py-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            {contest.views || 0}
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <Users className="w-3.5 h-3.5" />
            {contest.registrationsCount || 0} Regs
          </span>
        </div>
        <span className="text-[11px] text-slate-500">
          Created {formatDate(contest.createdAt || "")}
        </span>
      </div>
    </div>
  );
};
