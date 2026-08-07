"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { Contest } from "../../../dashboard/admin/contests/types";
import { formatDate, formatCurrency } from "@/lib/utils";
import {
  Trophy,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  Upload,
  Image as ImageIcon,
  Video,
  Award,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Lock,
  Layers,
  ArrowRight,
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

export interface ParticipationDetails {
  _id: string;
  contest: Contest;
  model: string;
  registrationStatus: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  paymentStatus: "not_required" | "pending" | "paid" | "failed" | "refunded";
  paidAmount?: number;
  currentStage: string;
  isEliminated?: boolean;
  eliminatedAtRound?: number;
  roundSubmissions: RoundSubmission[];
  finalPosition?: "Winner" | "Runner-up" | "Top 10" | null;
  createdAt?: string;
}

export default function ModelParticipationPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  const [contest, setContest] = useState<Contest | null>(null);
  const [participation, setParticipation] = useState<ParticipationDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  // Actions Loading State
  const [registering, setRegistering] = useState(false);
  const [paying, setPaying] = useState(false);
  const [submittingEntry, setSubmittingEntry] = useState(false);

  // Round Submission Form State
  const [roundNumInput, setRoundNumInput] = useState<number>(1);
  const [submissionTypeInput, setSubmissionTypeInput] = useState<"photo" | "video">("photo");
  const [urlInput, setUrlInput] = useState<string>("");
  const [captionInput, setCaptionInput] = useState<string>("");

  const showToast = (text: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Fetch Contest & Participation Status
  const loadData = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch Contest by Slug
      let contestRes;
      try {
        contestRes = await api.get(`/contests/public/${slug}`);
      } catch (err: any) {
        if (err.response?.status === 404) {
          contestRes = await api.get(`/contests/${slug}`);
        } else {
          throw err;
        }
      }
      const contestData: Contest = contestRes.data?.data || contestRes.data?.contest || contestRes.data;
      setContest(contestData);

      // 2. Fetch My Status for this contest
      if (contestData?.id || (contestData as any)._id) {
        const contestId = contestData.id || (contestData as any)._id;
        try {
          let statusRes;
          try {
            statusRes = await api.get(`/contest-participation/${contestId}/my-status`);
          } catch (err: any) {
            if (err.response?.status === 404) {
              statusRes = await api.get(`/contests-participation/${contestId}/my-status`);
            } else {
              throw err;
            }
          }
          const partData = statusRes.data?.data || statusRes.data;
          setParticipation(partData);
        } catch {
          // Model has not registered yet
          setParticipation(null);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to load contest data");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Action 1: Register for Contest (Free)
  const handleRegister = async () => {
    if (!contest) return;
    const contestId = contest.id || (contest as any)._id;
    setRegistering(true);
    try {
      let res;
      try {
        res = await api.post(`/contest-participation/${contestId}/register`);
      } catch (err: any) {
        if (err.response?.status === 404) {
          try {
            res = await api.post(`/contests-participation/${contestId}/register`);
          } catch (err2: any) {
            if (err2.response?.status === 404) {
              res = await api.post(`/contests/${contestId}/register`);
            } else {
              throw err2;
            }
          }
        } else {
          throw err;
        }
      }
      showToast(res.data?.message || "Registration submitted! Awaiting admin review.", "success");
      await loadData();
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to register";
      showToast(msg, "error");
    } finally {
      setRegistering(false);
    }
  };

  // Helper to dynamically load Razorpay SDK Script
  const loadRazorpaySDK = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined") return resolve(false);
      if ((window as any).Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Action 2: Initiate & Launch Interactive Razorpay Modal Popup
  const handlePayFee = async () => {
    if (!participation || !contest) return;
    setPaying(true);

    try {
      // Step 1: Load Razorpay Checkout Script
      const isLoaded = await loadRazorpaySDK();
      if (!isLoaded) {
        alert("Failed to load Razorpay Payment Gateway SDK. Please check your internet connection.");
        setPaying(false);
        return;
      }

      // Step 2: Initiate Payment in Backend
      let payRes;
      try {
        payRes = await api.post(`/contest-participation/${participation._id}/pay`, {
          type: "contest_participation",
          purpose: "contest_participation",
        });
      } catch (err: any) {
        if (err.response?.status === 404) {
          payRes = await api.post(`/contests-participation/${participation._id}/pay`, {
            type: "contest_participation",
            purpose: "contest_participation",
          });
        } else {
          throw err;
        }
      }

      const paymentData = payRes.data?.data?.payment || payRes.data?.payment || payRes.data;
      const razorpayOrderId = paymentData?.razorpayOrderId || paymentData?.orderId || paymentData?._id;
      const amountInRupees = contest.participationFee || 1999;

      // Step 3: Configure & Launch Razorpay Interactive Checkout Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_VogueAgency123",
        amount: amountInRupees * 100, // amount in paise
        currency: "INR",
        name: "Vogue Agency Contests",
        description: `Participation Fee for ${contest.title}`,
        image: contest.bannerImage || "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80",
        order_id: razorpayOrderId && razorpayOrderId.startsWith("order_") ? razorpayOrderId : undefined,
        handler: async function (response: any) {
          setPaying(true);
          try {
            // Step 4: Confirm Payment on Gateway Callback
            let confirmRes;
            const txnId = response.razorpay_payment_id || `PAY-${Date.now()}`;
            try {
              confirmRes = await api.patch(`/contest-participation/${participation._id}/confirm-payment`, {
                transactionId: txnId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                status: "paid",
              });
            } catch (err: any) {
              if (err.response?.status === 404) {
                confirmRes = await api.patch(`/contests-participation/${participation._id}/confirm-payment`, {
                  transactionId: txnId,
                  status: "paid",
                });
              } else {
                throw err;
              }
            }

            showToast("🎉 Payment Successful! You are now entered into Round 1.", "success");
            await loadData();
          } catch (confirmErr: any) {
            showToast(confirmErr.response?.data?.message || "Payment confirmation failed", "error");
          } finally {
            setPaying(false);
          }
        },
        prefill: {
          name: "Model Candidate",
          email: "candidate@example.com",
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: function () {
            setPaying(false);
            showToast("Payment checkout closed.", "info");
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Payment initiation failed";
      showToast(msg, "error");
      setPaying(false);
    }
  };

  // Action 3: Submit Round Entry
  const handleSubmitRoundEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!participation || !urlInput) return;

    setSubmittingEntry(true);
    try {
      let res;
      try {
        res = await api.post(`/contest-participation/${participation._id}/submit-round`, {
          roundNumber: Number(roundNumInput),
          submissionType: submissionTypeInput,
          url: urlInput,
          caption: captionInput,
        });
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.post(`/contests-participation/${participation._id}/submit-round`, {
            roundNumber: Number(roundNumInput),
            submissionType: submissionTypeInput,
            url: urlInput,
            caption: captionInput,
          });
        } else {
          throw err;
        }
      }

      showToast("Entry submitted successfully for admin evaluation!", "success");
      setUrlInput("");
      setCaptionInput("");
      await loadData();
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to submit entry";
      showToast(msg, "error");
    } finally {
      setSubmittingEntry(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06080e] flex flex-col items-center justify-center text-slate-400 space-y-3">
        <Sparkles className="w-8 h-8 text-blue-400 animate-spin" />
        <p className="text-xs font-medium">Loading participation details...</p>
      </div>
    );
  }

  if (error || !contest) {
    return (
      <div className="min-h-screen bg-[#06080e] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold text-white">Contest Error</h2>
        <p className="text-sm text-slate-400 mt-1">{error || "Contest not found"}</p>
        <Link href="/contests" className="mt-4 px-4 py-2 bg-blue-600 rounded-xl text-xs font-bold text-white">
          Return to Contests
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 selection:bg-blue-600 selection:text-white pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-md text-xs font-bold animate-slide-in ${
            toastMessage.type === "success"
              ? "bg-emerald-950/90 text-emerald-300 border-emerald-500/40"
              : toastMessage.type === "error"
              ? "bg-rose-950/90 text-rose-300 border-rose-500/40"
              : "bg-blue-950/90 text-blue-300 border-blue-500/40"
          }`}
        >
          {toastMessage.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {toastMessage.type === "error" && <AlertCircle className="w-4 h-4 text-rose-400" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href={`/contests/${contest.slug}`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition"
          >
            <ChevronLeft className="w-4 h-4" /> Contest Details
          </Link>
          <span className="text-xs text-slate-400 font-mono">/{contest.slug}</span>
        </div>

        {/* Contest Banner Card */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/80 p-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase mb-2">
                {contest.currentStage || "Registration Open"}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">{contest.title}</h1>
              <p className="text-xs text-slate-400 mt-1">{contest.location?.city}, {contest.location?.state} • {formatDate(contest.registrationStart)} - {formatDate(contest.registrationEnd)}</p>
            </div>

            <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6">
              <span className="text-[11px] text-slate-400 block uppercase font-semibold">Participation Fee</span>
              <span className="text-2xl font-black text-emerald-400">{formatCurrency(contest.participationFee)}</span>
            </div>
          </div>
        </div>

        {/* STEP 1: NOT REGISTERED YET */}
        {!participation && (
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-6">
            <div className="p-4 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 w-16 h-16 flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h2 className="text-xl font-bold text-white">Join {contest.title}</h2>
              <p className="text-xs text-slate-400">
                Initial registration is <strong>100% Free</strong>. Once your application is reviewed and approved by admin, you will unlock participation fee payment & Round 1 entry.
              </p>
            </div>

            <button
              onClick={handleRegister}
              disabled={registering}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-black text-white bg-blue-600 hover:bg-blue-500 rounded-2xl shadow-xl shadow-blue-600/30 transition transform hover:scale-[1.02] disabled:opacity-50"
            >
              {registering ? "Registering..." : "Complete Free Registration"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: REGISTERED - SHOW STATUS & JOURNEY */}
        {participation && (
          <div className="space-y-8">
            {/* Status Stepper Banner */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" /> Competition Journey Status
              </h3>

              {/* Status Alert Banner */}
              {participation.isEliminated ? (
                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-900/60 flex items-start gap-3 text-xs text-rose-300">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-rose-200 block text-sm">Eliminated</strong>
                    You were eliminated in Round {participation.eliminatedAtRound || 1}. Keep sharpening your skills for upcoming competitions!
                  </div>
                </div>
              ) : participation.finalPosition ? (
                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-900/60 flex items-start gap-3 text-xs text-amber-300">
                  <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-amber-200 block text-sm">🏆 {participation.finalPosition} Awarded!</strong>
                    Congratulations! You have achieved {participation.finalPosition} in {contest.title}.
                  </div>
                </div>
              ) : participation.registrationStatus === "pending" ? (
                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-900/50 flex items-start gap-3 text-xs text-amber-300">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-amber-200 block">Registration Pending Review</strong>
                    Your application is being reviewed by contest admins. You will be notified once approved to proceed with participation fee payment.
                  </div>
                </div>
              ) : participation.registrationStatus === "rejected" ? (
                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-900/60 flex items-start gap-3 text-xs text-rose-300">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-rose-200 block">Registration Rejected</strong>
                    Reason: {participation.rejectionReason || "Criteria mismatch."}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-900/50 flex items-start gap-3 text-xs text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-emerald-200 block">Registration Approved!</strong>
                    Current Active Stage: <strong className="text-white">{participation.currentStage}</strong>
                  </div>
                </div>
              )}

              {/* Progress Steps Timeline */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {/* Step A: Registered */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">STEP 1</span>
                  <p className="font-bold text-slate-200">Registration</p>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold">
                    Done
                  </span>
                </div>

                {/* Step B: Admin Approval */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">STEP 2</span>
                  <p className="font-bold text-slate-200">Admin Approval</p>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                      participation.registrationStatus === "approved"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : participation.registrationStatus === "rejected"
                        ? "bg-rose-500/20 text-rose-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {participation.registrationStatus}
                  </span>
                </div>

                {/* Step C: Payment */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">STEP 3</span>
                  <p className="font-bold text-slate-200">Fee Payment</p>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                      participation.paymentStatus === "paid" || participation.paymentStatus === "not_required"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {participation.paymentStatus}
                  </span>
                </div>

                {/* Step D: Stage */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">STEP 4</span>
                  <p className="font-bold text-slate-200">Stage Progress</p>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-400 font-semibold truncate max-w-full">
                    {participation.currentStage}
                  </span>
                </div>
              </div>
            </div>

            {/* PAYMENT SECTION (If Approved & Pending Payment) */}
            {participation.registrationStatus === "approved" &&
              (participation.paymentStatus === "pending" || participation.paymentStatus === "failed") && (
                <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 to-slate-900/80 border border-indigo-500/30 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Complete Participation Fee Payment</h3>
                      <p className="text-xs text-slate-400">
                        Your registration has been approved! Pay the participation fee to confirm your slot in Round 1.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400 block">Amount Payable</span>
                      <span className="text-xl font-extrabold text-emerald-400">{formatCurrency(contest.participationFee)}</span>
                    </div>

                    <button
                      onClick={handlePayFee}
                      disabled={paying}
                      className="px-6 py-2.5 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-600/30 transition disabled:opacity-50"
                    >
                      {paying ? "Processing..." : `Pay ${formatCurrency(contest.participationFee)} & Join Round 1`}
                    </button>
                  </div>
                </div>
              )}

            {/* ROUND SUBMISSION SECTION (If Payment Completed & Not Eliminated) */}
            {(participation.paymentStatus === "paid" || participation.paymentStatus === "not_required") &&
              !participation.isEliminated && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Submission Form */}
                  <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                      <Upload className="w-4 h-4 text-blue-400" /> Submit Round Entry
                    </h3>

                    <form onSubmit={handleSubmitRoundEntry} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Select Competition Round</label>
                        <select
                          value={roundNumInput}
                          onChange={(e) => setRoundNumInput(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                          {contest.rounds?.map((r) => (
                            <option key={r.roundNumber} value={r.roundNumber}>
                              Round {r.roundNumber}: {r.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Submission Type</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setSubmissionTypeInput("photo")}
                            className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition ${
                              submissionTypeInput === "photo"
                                ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30"
                                : "bg-slate-950 text-slate-400 border-slate-800"
                            }`}
                          >
                            <ImageIcon className="w-4 h-4" /> Photo Upload
                          </button>
                          <button
                            type="button"
                            onClick={() => setSubmissionTypeInput("video")}
                            className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition ${
                              submissionTypeInput === "video"
                                ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30"
                                : "bg-slate-950 text-slate-400 border-slate-800"
                            }`}
                          >
                            <Video className="w-4 h-4" /> Video Upload
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          {submissionTypeInput === "photo" ? "Photo Image URL *" : "Video URL (YouTube/Drive/Vimeo) *"}
                        </label>
                        <input
                          type="url"
                          required
                          placeholder={submissionTypeInput === "photo" ? "https://cdn.example.com/photo.jpg" : "https://youtube.com/watch?v=..."}
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Caption / Description</label>
                        <textarea
                          rows={3}
                          placeholder="Add details about your submission..."
                          value={captionInput}
                          onChange={(e) => setCaptionInput(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submittingEntry}
                        className="w-full py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition disabled:opacity-50"
                      >
                        {submittingEntry ? "Submitting..." : "Submit Entry for Evaluation"}
                      </button>
                    </form>
                  </div>

                  {/* Previous Submissions List */}
                  <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                      <Layers className="w-4 h-4 text-purple-400" /> My Round Submissions ({participation.roundSubmissions?.length || 0})
                    </h3>

                    {participation.roundSubmissions?.length === 0 ? (
                      <div className="py-12 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                        No submissions uploaded yet for current rounds.
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                        {participation.roundSubmissions?.map((sub, idx) => (
                          <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-200">Round {sub.roundNumber} ({sub.submissionType})</span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  sub.result === "selected"
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : sub.result === "rejected"
                                    ? "bg-rose-500/20 text-rose-400"
                                    : "bg-amber-500/20 text-amber-400"
                                }`}
                              >
                                {sub.result || "Pending"}
                              </span>
                            </div>

                            <a
                              href={sub.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-400 hover:underline text-[11px] truncate block"
                            >
                              {sub.url}
                            </a>

                            {sub.caption && <p className="text-[11px] text-slate-400 italic">"{sub.caption}"</p>}

                            {sub.score !== null && sub.score !== undefined && (
                              <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px] text-slate-400">
                                <span>Score: <strong className="text-emerald-400 font-bold">{sub.score}/100</strong></span>
                                {sub.feedback && <span>Feedback: {sub.feedback}</span>}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
