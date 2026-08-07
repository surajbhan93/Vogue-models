"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Contest } from "../../admin/contests/types";
import { formatDate, formatCurrency } from "@/lib/utils";
import {
  Trophy,
  Sparkles,
  Calendar,
  MapPin,
  Award,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  Flame,
  ArrowUpRight,
  UserCheck,
  PlusCircle,
  CreditCard,
  Upload,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export interface RoundSubmission {
  roundNumber: number;
  submissionType: "photo" | "video";
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  submittedAt?: string;
  score?: number | null;
  feedback?: string;
  result?: "pending" | "selected" | "rejected";
}

export interface ContestParticipation {
  _id: string;
  id?: string;
  contest: Contest;
  registrationStatus?: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  paymentStatus?: "not_required" | "pending" | "paid" | "failed" | "refunded";
  currentStage?: string;
  isEliminated?: boolean;
  eliminatedAtRound?: number;
  finalPosition?: "Winner" | "Runner-up" | "Top 10" | null;
  roundSubmissions?: RoundSubmission[];
  createdAt?: string;
}

export default function ModelContestDashboardPage() {
  const [myParticipations, setMyParticipations] = useState<ContestParticipation[]>([]);
  const [upcomingContests, setUpcomingContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"participations" | "upcoming">("participations");

  useEffect(() => {
    const fetchModelDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        let res;
        try {
          res = await api.get("/contests/my-dashboard");
        } catch (err: any) {
          if (err.response?.status === 404) {
            try {
              res = await api.get("/contest-participation/my-dashboard");
            } catch (err2: any) {
              if (err2.response?.status === 404) {
                res = await api.get("/contests");
              } else {
                throw err2;
              }
            }
          } else {
            throw err;
          }
        }
        const data = res.data?.data || res.data;
        if (data) {
          setMyParticipations(Array.isArray(data.myParticipations) ? data.myParticipations : []);
          setUpcomingContests(
            Array.isArray(data.upcomingContestsToJoin)
              ? data.upcomingContestsToJoin
              : Array.isArray(data)
              ? data
              : []
          );
        }
      } catch (err: any) {
        const msg = err.response?.data?.message || err.message || "Failed to load model contest dashboard.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchModelDashboard();
  }, []);

  // Stats calculation
  const totalApplied = myParticipations.length;
  const activeCount = myParticipations.filter(
    (p) => !p.isEliminated && p.registrationStatus === "approved" && p.finalPosition !== "Winner"
  ).length;
  const winnersCount = myParticipations.filter(
    (p) => p.finalPosition === "Winner" || p.finalPosition === "Runner-up" || p.finalPosition === "Top 10"
  ).length;
  const availableToJoin = upcomingContests.length;

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto selection:bg-blue-600 selection:text-white pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30">
              <Trophy className="w-6 h-6" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Model Contest Dashboard
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Track your contest applications, registration approvals, payment status, round evaluations & winner results.
          </p>
        </div>

        <Link
          href="/contests"
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 transition self-start md:self-auto"
        >
          Browse All Contests <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Top Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Applied */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>My Entered Contests</span>
            <UserCheck className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{totalApplied}</div>
          <p className="text-[11px] text-slate-500">Active & past competition entries</p>
        </div>

        {/* Active Stage */}
        <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold uppercase">
            <span>Approved & Active</span>
            <Flame className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-300">{activeCount}</div>
          <p className="text-[11px] text-slate-400">Qualified for evaluation rounds</p>
        </div>

        {/* Positions Achieved */}
        <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-950/20 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-400 font-semibold uppercase">
            <span>Titles / Awards</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-300">{winnersCount}</div>
          <p className="text-[11px] text-slate-400">Winner, Runner-up, or Top 10</p>
        </div>

        {/* Contests Available to Join */}
        <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-950/20 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-xs text-purple-400 font-semibold uppercase">
            <span>Open to Join</span>
            <PlusCircle className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-purple-300">{availableToJoin}</div>
          <p className="text-[11px] text-slate-400">Upcoming published competitions</p>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("participations")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === "participations"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800"
          }`}
        >
          <Layers className="w-4 h-4" /> My Applications & Live Status ({myParticipations.length})
        </button>

        <button
          onClick={() => setActiveTab("upcoming")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === "upcoming"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800"
          }`}
        >
          <Sparkles className="w-4 h-4" /> Upcoming Contests to Join ({upcomingContests.length})
        </button>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="py-20 text-center space-y-3 text-slate-400">
          <Sparkles className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
          <p className="text-xs font-medium">Loading model contest entries...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-center text-xs text-rose-400">
          {error}
        </div>
      ) : (
        <>
          {/* TAB 1: My Participations with Complete Status Journey */}
          {activeTab === "participations" && (
            <div className="space-y-6">
              {myParticipations.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-slate-800 rounded-3xl space-y-3">
                  <Trophy className="w-10 h-10 text-slate-600 mx-auto" />
                  <h3 className="text-base font-bold text-white">No Contest Applications Yet</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    You haven't applied for any modeling competitions yet. Explore open contests to start your journey!
                  </p>
                  <button
                    onClick={() => setActiveTab("upcoming")}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition"
                  >
                    Explore Open Contests <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myParticipations.map((part) => {
                    const contest = part.contest;
                    if (!contest) return null;

                    return (
                      <div
                        key={part._id || part.id}
                        className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-md overflow-hidden hover:border-slate-700 transition-all duration-300 shadow-xl space-y-4"
                      >
                        {/* Header Banner */}
                        <div className="relative h-44 w-full bg-slate-800 overflow-hidden">
                          <img
                            src={
                              contest.bannerImage ||
                              "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"
                            }
                            alt={contest.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                          {/* Primary Status Badges */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                            {part.isEliminated ? (
                              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 backdrop-blur-md">
                                <XCircle className="w-3.5 h-3.5" /> Eliminated (Round {part.eliminatedAtRound || 1})
                              </span>
                            ) : part.finalPosition ? (
                              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                                <Award className="w-3.5 h-3.5 fill-amber-300" /> {part.finalPosition} Winner
                              </span>
                            ) : part.registrationStatus === "pending" ? (
                              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                                <Clock className="w-3.5 h-3.5" /> Review Pending
                              </span>
                            ) : part.registrationStatus === "rejected" ? (
                              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 backdrop-blur-md">
                                <AlertCircle className="w-3.5 h-3.5" /> Application Rejected
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Application Approved
                              </span>
                            )}

                            <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-950/80 text-slate-300 font-mono border border-slate-800">
                              Applied: {formatDate(part.createdAt || "")}
                            </span>
                          </div>

                          {/* Contest Title & Stage Overlay */}
                          <div className="absolute bottom-3 left-4 right-4 z-10 space-y-0.5">
                            <h3 className="text-lg font-bold text-white truncate">{contest.title}</h3>
                            <p className="text-xs text-slate-300 flex items-center gap-2">
                              <span>Active Stage: <strong className="text-amber-300">{part.currentStage || contest.currentStage || "Registered"}</strong></span>
                              <span>•</span>
                              <span>{contest.location?.city}, {contest.location?.state}</span>
                            </p>
                          </div>
                        </div>

                        {/* Status Stepper Summary */}
                        <div className="px-5 space-y-3">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Application Journey Status</h4>

                          <div className="grid grid-cols-3 gap-2 text-xs">
                            {/* Admin Review */}
                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                              <span className="text-[10px] text-slate-500 font-mono block">1. REGISTRATION</span>
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                  part.registrationStatus === "approved"
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : part.registrationStatus === "rejected"
                                    ? "bg-rose-500/20 text-rose-400"
                                    : "bg-amber-500/20 text-amber-400"
                                }`}
                              >
                                {part.registrationStatus === "approved"
                                  ? "Approved"
                                  : part.registrationStatus === "rejected"
                                  ? "Rejected"
                                  : "Reviewing..."}
                              </span>
                            </div>

                            {/* Payment Status */}
                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                              <span className="text-[10px] text-slate-500 font-mono block">2. FEE PAYMENT</span>
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                  part.paymentStatus === "paid" || part.paymentStatus === "not_required"
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : "bg-amber-500/20 text-amber-400"
                                }`}
                              >
                                {part.paymentStatus === "paid" || part.paymentStatus === "not_required"
                                  ? "Fee Completed"
                                  : "Pending Pay"}
                              </span>
                            </div>

                            {/* Submissions */}
                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                              <span className="text-[10px] text-slate-500 font-mono block">3. ENTRIES</span>
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300">
                                {part.roundSubmissions?.length || 0} Submitted
                              </span>
                            </div>
                          </div>

                          {/* Rejection Message if Rejected */}
                          {part.registrationStatus === "rejected" && (
                            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/50 text-xs text-rose-300">
                              Rejection Reason: {part.rejectionReason || "Criteria mismatch."}
                            </div>
                          )}
                        </div>

                        {/* Action Buttons Footer */}
                        <div className="p-5 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                          {part.registrationStatus === "approved" &&
                          (part.paymentStatus === "pending" || part.paymentStatus === "failed") ? (
                            <Link
                              href={`/contests/${contest.slug}/participate`}
                              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/20 transition"
                            >
                              <CreditCard className="w-4 h-4" /> Pay {formatCurrency(contest.participationFee)} & Join Round 1
                            </Link>
                          ) : (
                            <Link
                              href={`/contests/${contest.slug}/participate`}
                              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition shadow-md shadow-blue-600/20"
                            >
                              Open Live Status & Submit Entries <ArrowUpRight className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Upcoming Contests to Join */}
          {activeTab === "upcoming" && (
            <div className="space-y-6">
              {upcomingContests.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-slate-800 rounded-3xl text-slate-400">
                  No upcoming published contests available to join right now. Check back soon!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingContests.map((contest) => (
                    <div
                      key={contest.id || (contest as any)._id}
                      className="group relative rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md overflow-hidden hover:border-slate-700 transition-all duration-300 shadow-xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-44 w-full bg-slate-800 overflow-hidden">
                          <img
                            src={
                              contest.bannerImage ||
                              "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"
                            }
                            alt={contest.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
                              {contest.currentStage || "Published"}
                            </span>
                          </div>
                        </div>

                        <div className="p-5 space-y-3">
                          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition line-clamp-1">
                            {contest.title}
                          </h3>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {contest.description}
                          </p>

                          <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                              <span className="truncate">
                                {contest.location?.city}, {contest.location?.state}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                              <span>
                                Age: {contest.eligibility?.minAge}-{contest.eligibility?.maxAge} yrs ({contest.eligibility?.gender})
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                              <span>Reg Starts: {formatDate(contest.registrationStart)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 pt-0 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-semibold">Entry Fee</span>
                          <span className="text-sm font-extrabold text-emerald-400">
                            {contest.registrationFee === 0 ? "Free" : formatCurrency(contest.registrationFee)}
                          </span>
                        </div>

                        <Link
                          href={`/contests/${contest.slug}`}
                          className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition"
                        >
                          Apply Now <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
