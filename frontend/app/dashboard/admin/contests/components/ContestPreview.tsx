"use client";

import React from "react";
import { Contest } from "../types";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Trophy, Calendar, MapPin, Users, Award, ShieldCheck, Star, Layers } from "lucide-react";

interface ContestPreviewProps {
  formData: Partial<Contest>;
}

export const ContestPreview: React.FC<ContestPreviewProps> = ({ formData }) => {
  return (
    <div className="space-y-6 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-slate-200">
      {/* Header Banner Preview */}
      <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
        <img
          src={formData.bannerImage || "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"}
          alt={formData.title || "Contest Banner"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
                {formData.status || "Draft"}
              </span>
              {formData.isFeatured && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Star className="w-3 h-3 fill-amber-300" /> Featured
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {formData.title || "Untitled Contest"}
            </h2>
          </div>
          <div className="text-xs text-right text-slate-300">
            <p className="font-semibold text-emerald-400">
              Fee: {formData.registrationFee === 0 ? "Free Reg" : formatCurrency(formData.registrationFee || 0)}
            </p>
            <p className="text-slate-400">Part: {formatCurrency(formData.participationFee || 0)}</p>
          </div>
        </div>
      </div>

      {/* Basic & Location Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-400" /> Location & Venue
          </h4>
          <p className="text-sm font-semibold text-slate-100">
            {formData.location?.venue || "N/A"}
          </p>
          <p className="text-xs text-slate-400">
            {formData.location?.city}, {formData.location?.state}, {formData.location?.country}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Eligibility
          </h4>
          <p className="text-sm font-semibold text-slate-100">
            Age: {formData.eligibility?.minAge} - {formData.eligibility?.maxAge} Years
          </p>
          <p className="text-xs text-slate-400">
            Gender Criteria: <strong className="text-slate-200">{formData.eligibility?.gender}</strong>
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
        <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
          {formData.description || "No description provided."}
        </p>
      </div>

      {/* Registration Dates */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-400" />
          <div>
            <span className="text-slate-400 block">Registration Period</span>
            <span className="font-semibold text-slate-200">
              {formatDate(formData.registrationStart || "")} → {formatDate(formData.registrationEnd || "")}
            </span>
          </div>
        </div>
      </div>

      {/* Rounds Overview */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-400" /> Competition Rounds ({formData.rounds?.length || 0})
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {formData.rounds?.map((round, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">Round {round.roundNumber}: {round.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
                  {round.submissionType}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1">{round.description}</p>
              <div className="text-[10px] text-slate-500 flex justify-between pt-1">
                <span>Max: {round.maxParticipantsSelected} contestants</span>
                <span>{formatDate(round.startDate)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prizes Overview */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-amber-400" /> Rewards & Cash Pool
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {formData.prizes?.map((prize, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-purple-500/10 border border-amber-500/20 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300">{prize.position}</span>
                <span className="font-semibold text-emerald-400">{formatCurrency(prize.cashPrize)}</span>
              </div>
              <p className="font-medium text-slate-200">{prize.title}</p>
              <p className="text-[11px] text-slate-400">{prize.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
