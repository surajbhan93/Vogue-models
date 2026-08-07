"use client";

import React, { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { Contest } from "../types";
import { formatDate, formatCurrency } from "@/lib/utils";
import {
  Users,
  X,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  Filter,
  Sparkles,
  ChevronDown,
  User,
  Eye,
} from "lucide-react";

interface RoundSubmission {
  roundNumber: number;
  submissionType: string;
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  submittedAt?: string;
  score?: number;
  feedback?: string;
  result?: string;
}

interface Participant {
  _id: string;
  contest: string;
  model: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    profileImage?: string;
  };
  registrationStatus: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  paymentStatus: "not_required" | "pending" | "paid" | "failed" | "refunded";
  currentStage: string;
  isEliminated: boolean;
  eliminatedAtRound?: number;
  finalPosition?: string;
  roundSubmissions: RoundSubmission[];
  createdAt: string;
}

interface ParticipantsDialogProps {
  contest: Contest | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ParticipantsDialog: React.FC<ParticipantsDialogProps> = ({
  contest,
  isOpen,
  onClose,
}) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [regFilter, setRegFilter] = useState<string>("all");
  const [rejectionModalId, setRejectionModalId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [expandedSubmissionsId, setExpandedSubmissionsId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const fetchParticipants = useCallback(async () => {
    if (!contest) return;
    const contestId = contest.id || (contest as any)._id;
    setLoading(true);
    try {
      let res;
      try {
        res = await api.get(`/contest-participation/contest/${contestId}`);
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.get(`/api/contest-participation/contest/${contestId}`);
        } else {
          throw err;
        }
      }
      const list = res.data?.data || res.data || [];
      setParticipants(Array.isArray(list) ? list : []);
    } catch (err: any) {
      console.error("Error fetching participants:", err);
    } finally {
      setLoading(false);
    }
  }, [contest]);

  useEffect(() => {
    if (isOpen && contest) {
      fetchParticipants();
    }
  }, [isOpen, contest, fetchParticipants]);

  if (!isOpen || !contest) return null;

  // Review Registration: Approve or Reject
  const handleReviewRegistration = async (id: string, decision: "approved" | "rejected", reason?: string) => {
    setActionLoading(true);
    try {
      let res;
      try {
        res = await api.patch(`/contest-participation/${id}/review`, {
          decision,
          rejectionReason: reason,
        });
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.patch(`/api/contest-participation/${id}/review`, {
            decision,
            rejectionReason: reason,
          });
        } else {
          throw err;
        }
      }
      setRejectionModalId(null);
      setRejectionReason("");
      await fetchParticipants();
    } catch (err: any) {
      alert(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  // Helper for stage progression button labels
  const getNextStageLabel = (roundNum: number) => {
    if (roundNum === 1) return "Round 2";
    if (roundNum === 2) return "Semi Final";
    if (roundNum === 3) return "Grand Finale";
    return "Winner";
  };

  // Evaluate Round & Promote Candidate to Next Enum Stage
  const handleEvaluateAndPromote = async (
    id: string,
    roundNumber: number,
    result: "selected" | "rejected"
  ) => {
    const nextStageName = getNextStageLabel(roundNumber);
    setActionLoading(true);
    try {
      let res;
      try {
        res = await api.patch(`/contest-participation/${id}/evaluate`, {
          roundNumber,
          result,
          nextStage: result === "selected" ? nextStageName : undefined,
          isEliminated: result === "rejected",
        });
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.patch(`/api/contest-participation/${id}/evaluate`, {
            roundNumber,
            result,
            nextStage: result === "selected" ? nextStageName : undefined,
            isEliminated: result === "rejected",
          });
        } else {
          throw err;
        }
      }
      alert(res.data?.message || "Candidate evaluated successfully!");
      await fetchParticipants();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to evaluate candidate");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredParticipants = participants.filter((p) => {
    if (regFilter !== "all" && p.registrationStatus !== regFilter) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Contest Participants & Submissions</h2>
              <p className="text-xs text-slate-400">{contest.title} • {participants.length} Registered Candidates</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-2xl border border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 font-semibold">Filter Registration Status:</span>
            <select
              value={regFilter}
              onChange={(e) => setRegFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="all">All Candidates</option>
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <span className="text-slate-400">Total: <strong className="text-white">{filteredParticipants.length}</strong></span>
        </div>

        {/* Participants Data Table */}
        {loading ? (
          <div className="py-16 text-center text-slate-400 space-y-2">
            <Sparkles className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
            <p className="text-xs">Fetching candidate submissions from server...</p>
          </div>
        ) : filteredParticipants.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-2xl">
            No candidate registrations match the selected filter.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Model Candidate</th>
                  <th className="py-3.5 px-4 font-semibold">Reg Status</th>
                  <th className="py-3.5 px-4 font-semibold">Fee Payment</th>
                  <th className="py-3.5 px-4 font-semibold">Current Stage</th>
                  <th className="py-3.5 px-4 font-semibold">Submissions</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredParticipants.map((p) => {
                  const hasSubmissions = p.roundSubmissions && p.roundSubmissions.length > 0;
                  const isExpanded = expandedSubmissionsId === p._id;

                  return (
                    <React.Fragment key={p._id}>
                      <tr className="hover:bg-slate-800/30 transition">
                        {/* Model Profile */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center text-slate-400 font-bold shrink-0">
                              {p.model?.profileImage ? (
                                <img src={p.model.profileImage} alt={p.model.name} className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-slate-100">{p.model?.name || "Model Candidate"}</p>
                              <p className="text-[11px] text-slate-400">{p.model?.email}</p>
                              {p.model?.phone && <p className="text-[10px] text-slate-500">{p.model.phone}</p>}
                            </div>
                          </div>
                        </td>

                        {/* Registration Status */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold text-[11px] ${
                              p.registrationStatus === "approved"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : p.registrationStatus === "rejected"
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            }`}
                          >
                            {p.registrationStatus === "approved" && <CheckCircle2 className="w-3 h-3" />}
                            {p.registrationStatus === "rejected" && <XCircle className="w-3 h-3" />}
                            {p.registrationStatus === "pending" && <Clock className="w-3 h-3" />}
                            {p.registrationStatus}
                          </span>
                        </td>

                        {/* Payment Status */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                              p.paymentStatus === "paid"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : p.paymentStatus === "not_required"
                                ? "bg-slate-800 text-slate-400"
                                : "bg-amber-500/20 text-amber-400"
                            }`}
                          >
                            {p.paymentStatus === "paid" ? "Paid" : p.paymentStatus}
                          </span>
                        </td>

                        {/* Current Stage */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-0.5">
                            <p className="font-extrabold text-amber-300">{p.currentStage || "Registered"}</p>
                            {p.isEliminated && (
                              <span className="text-[10px] text-rose-400 font-semibold block">
                                Eliminated in R{p.eliminatedAtRound || 1}
                              </span>
                            )}
                            {p.finalPosition && (
                              <span className="text-[10px] text-amber-300 font-bold block">
                                🏆 {p.finalPosition}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Primary Submissions Button */}
                        <td className="py-3.5 px-4">
                          {hasSubmissions ? (
                            <button
                              onClick={() => setExpandedSubmissionsId(isExpanded ? null : p._id)}
                              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition shadow-lg cursor-pointer ${
                                isExpanded
                                  ? "bg-purple-600 text-white shadow-purple-600/40 ring-2 ring-purple-400"
                                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/30"
                              }`}
                            >
                              <span>📷 View {p.roundSubmissions.length} Media</span>
                              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-500 italic">No submissions</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {p.registrationStatus === "pending" && (
                              <>
                                <button
                                  disabled={actionLoading}
                                  onClick={() => handleReviewRegistration(p._id, "approved")}
                                  className="px-3 py-1.5 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition"
                                >
                                  Approve
                                </button>
                                <button
                                  disabled={actionLoading}
                                  onClick={() => setRejectionModalId(p._id)}
                                  className="px-3 py-1.5 text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition"
                                >
                                  Reject
                                </button>
                              </>
                            )}

                            {hasSubmissions && (
                              <button
                                onClick={() => setExpandedSubmissionsId(isExpanded ? null : p._id)}
                                className="px-3 py-1.5 text-[11px] font-bold text-purple-300 bg-purple-950/60 border border-purple-800 rounded-lg hover:bg-purple-900 transition flex items-center gap-1"
                              >
                                <Eye className="w-3.5 h-3.5" /> {isExpanded ? "Hide" : "Media"}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* EXPANDABLE SUBMISSIONS VIEW ACCORDION */}
                      {isExpanded && hasSubmissions && (
                        <tr>
                          <td colSpan={6} className="bg-slate-950/95 p-5 border-t border-b border-purple-500/40">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-xs font-bold text-purple-300 flex items-center gap-2">
                                  <Sparkles className="w-4 h-4 text-amber-400" /> Candidate Submissions for {p.model?.name} ({p.roundSubmissions.length})
                                </h4>
                                <button
                                  onClick={() => setExpandedSubmissionsId(null)}
                                  className="text-[11px] font-bold text-slate-400 hover:text-white"
                                >
                                  ✕ Close Drawer
                                </button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {p.roundSubmissions.map((sub, sIdx) => {
                                  const targetStageLabel = getNextStageLabel(sub.roundNumber);

                                  return (
                                    <div
                                      key={sIdx}
                                      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative text-xs flex flex-col justify-between"
                                    >
                                      <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                          <span className="font-extrabold text-white">
                                            Round {sub.roundNumber} ({sub.submissionType?.toUpperCase()})
                                          </span>
                                          <span
                                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                              sub.result === "selected"
                                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                                : sub.result === "rejected"
                                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                                : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                            }`}
                                          >
                                            {sub.result || "Pending Evaluation"}
                                          </span>
                                        </div>

                                        {/* Preview Image if Photo */}
                                        {sub.url && (
                                          <div className="h-44 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative group">
                                            <img
                                              src={sub.url}
                                              alt={`Submission Round ${sub.roundNumber}`}
                                              className="w-full h-full object-cover group-hover:scale-105 transition"
                                              onError={(e) => {
                                                (e.target as HTMLElement).style.display = "none";
                                              }}
                                            />
                                          </div>
                                        )}

                                        {/* Caption */}
                                        {sub.caption && (
                                          <p className="text-slate-300 italic text-[11px]">"{sub.caption}"</p>
                                        )}
                                      </div>

                                      {/* Action Buttons: Promote to Valid Enum Stage OR Reject */}
                                      <div className="pt-3 border-t border-slate-800 space-y-2">
                                        <a
                                          href={sub.url}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-[11px] transition"
                                        >
                                          Open Original Media ↗
                                        </a>

                                        <div className="grid grid-cols-2 gap-2 pt-1">
                                          <button
                                            disabled={actionLoading}
                                            onClick={() =>
                                              handleEvaluateAndPromote(
                                                p._id,
                                                sub.roundNumber,
                                                "selected"
                                              )
                                            }
                                            className="py-2 px-2 rounded-xl text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1"
                                          >
                                            <CheckCircle2 className="w-3.5 h-3.5" /> Promote to {targetStageLabel}
                                          </button>

                                          <button
                                            disabled={actionLoading}
                                            onClick={() =>
                                              handleEvaluateAndPromote(p._id, sub.roundNumber, "rejected")
                                            }
                                            className="py-2 px-2 rounded-xl text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-500 transition shadow-md shadow-rose-600/20 flex items-center justify-center gap-1"
                                          >
                                            <XCircle className="w-3.5 h-3.5" /> Reject & Eliminate
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Rejection Modal */}
        {rejectionModalId && (
          <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-900 space-y-3">
            <h4 className="text-xs font-bold text-rose-200">Rejection Reason</h4>
            <input
              type="text"
              placeholder="Enter reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setRejectionModalId(null)} className="px-3 py-1 text-xs text-slate-400">
                Cancel
              </button>
              <button
                onClick={() => handleReviewRegistration(rejectionModalId, "rejected", rejectionReason)}
                className="px-4 py-1 text-xs font-bold text-white bg-rose-600 rounded-lg"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantsDialog;