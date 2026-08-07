"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { Contest } from "../../dashboard/admin/contests/types";
import { formatDate, formatCurrency } from "@/lib/utils";
import {
  Trophy,
  MapPin,
  Calendar,
  ShieldCheck,
  Award,
  Layers,
  ChevronLeft,
  Share2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  X,
  User,
  Mail,
  Phone,
  HelpCircle,
  FileText,
  AlertCircle,
  CheckSquare,
  Lock,
  UserX,
  UserCheck,
  ChevronDown,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Globe,
} from "lucide-react";

export default function PublicContestDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [contest, setContest] = useState<Contest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // User Auth & Model Profile State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [modelProfile, setModelProfile] = useState<any | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);

  // Share Modal & Toast State
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [toast, setToast] = useState<{ text: string; type: "error" | "success" | "info" } | null>(null);

  // Apply Modal Flow State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [applyStep, setApplyStep] = useState<"case_incomplete" | "eligibility_preview" | "terms_pay" | "submitted">("eligibility_preview");
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [submittingReg, setSubmittingReg] = useState<boolean>(false);
  const [registeredParticipation, setRegisteredParticipation] = useState<any | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Check Authentication & Model Profile on Mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("modelToken") || localStorage.getItem("accessToken");
      const modelStr = localStorage.getItem("model");

      if (token && modelStr) {
        setIsLoggedIn(true);
        try {
          const parsedModel = JSON.parse(modelStr);
          setModelProfile(parsedModel);

          // Check if profile is complete
          const hasName = Boolean(parsedModel.name || parsedModel.fullName);
          const hasPhone = Boolean(parsedModel.phone || parsedModel.mobile);
          const completeFlag = parsedModel.isProfileComplete !== false && hasName && hasPhone;
          setIsProfileComplete(completeFlag);
        } catch {
          setIsLoggedIn(false);
        }
      } else if (token) {
        setIsLoggedIn(true);
        setIsProfileComplete(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []);

  // Fetch Contest Details by Slug
  useEffect(() => {
    if (!slug) return;

    const fetchContestDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        let res;
        try {
          res = await api.get(`/contests/public/${slug}`);
        } catch (err: any) {
          if (err.response?.status === 404) {
            res = await api.get(`/contests/public/${slug}`);
          } else {
            throw err;
          }
        }
        const data = res.data?.data || res.data?.contest || res.data;
        if (data) {
          setContest(data);
        } else {
          setError("Contest details not found.");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Failed to load contest details.");
      } finally {
        setLoading(false);
      }
    };

    fetchContestDetail();
  }, [slug]);

  // Handle auto-open apply modal if user returned from login/profile completion
  useEffect(() => {
    if (searchParams?.get("autoApply") === "true" && isLoggedIn && contest) {
      handleApplyClick();
    }
  }, [searchParams, isLoggedIn, contest]);

  // Copy Link Handler
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    }
  };

  // =========================================================
  // PRIMARY CTA: APPLY NOW BUTTON HANDLER (3 CASES)
  // =========================================================
  const handleApplyClick = () => {
    if (!contest) return;

    // CASE 1: User is NOT logged in
    if (!isLoggedIn) {
      setToast({
        text: "Sorry, aap logged in nahi hain! Redirecting to login page...",
        type: "error",
      });
      setTimeout(() => setToast(null), 3000);

      const currentPath = `/contests/${slug}`;
      setTimeout(() => {
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      }, 1200);
      return;
    }

    // CASE 2: Logged in, but Profile is NOT Complete
    if (!isProfileComplete) {
      setApplyStep("case_incomplete");
      setIsApplyModalOpen(true);
      return;
    }

    // CASE 3: Logged in + Profile Complete
    setApplyStep("eligibility_preview");
    setIsApplyModalOpen(true);
  };

  // Submit Free Registration API Call (POST /api/contest-participation/:contestId/register)
  const handleFinalSubmitApplication = async () => {
    if (!contest || !agreedToTerms) return;
    setSubmittingReg(true);

    const contestId = contest.id || (contest as any)._id;
    try {
      let res;
      try {
        res = await api.post(`/contest-participation/${contestId}/register`);
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.post(`/contest-participation/${contestId}/register`);
        } else {
          throw err;
        }
      }

      const partData = res.data?.data || res.data;
      setRegisteredParticipation(partData);
      setApplyStep("submitted");
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || "Registration failed. You may already be registered.");
    } finally {
      setSubmittingReg(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06080e] flex flex-col items-center justify-center text-slate-400 space-y-3">
        <Sparkles className="w-8 h-8 text-blue-400 animate-spin" />
        <p className="text-xs font-medium">Loading contest details...</p>
      </div>
    );
  }

  if (error || !contest) {
    return (
      <div className="min-h-screen bg-[#06080e] flex flex-col items-center justify-center p-4 text-center">
        <div className="p-4 rounded-full bg-slate-900 border border-slate-800 text-rose-400 mb-4">
          <Trophy className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Contest Not Found</h2>
        <p className="text-sm text-slate-400 mt-1 max-w-sm">{error || "The contest you are looking for does not exist."}</p>
        <Link
          href="/contests"
          className="mt-6 flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition"
        >
          <ChevronLeft className="w-4 h-4" /> Back to All Contests
        </Link>
      </div>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out ${contest.title} modeling competition on Vogue Agency!`;

  const faqs = [
    {
      q: "Is initial registration for this contest free?",
      a: "Yes, initial application & registration is 100% Free. A participation fee applies only after your profile is reviewed & approved by judges.",
    },
    {
      q: "How will I know if I qualify for Round 1?",
      a: "Our admin selection panel will review your profile submission. Once approved, your status will update to 'Approved' in your Model Dashboard, unlocking Round 1 entry.",
    },
    {
      q: "What types of photos or videos are required?",
      a: "Round 1 requires standard headshots and full-body digitals. Specific guidelines are listed under the Competition Rounds section.",
    },
    {
      q: "Can candidates from any city apply?",
      a: "Yes! Online rounds (Round 1 & Round 2) can be submitted from anywhere in India. Semi-Finals & Grand Finale will be hosted live at the official venue.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 selection:bg-blue-600 selection:text-white pb-32">
      {/* Toast Alert Banner */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl bg-rose-950/90 text-rose-200 border border-rose-500/40 shadow-2xl backdrop-blur-xl text-xs font-bold animate-bounce">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{toast.text}</span>
        </div>
      )}

      {/* 1. HERO BANNER CONTAINER (PADDING APPLIED TO PREVENT NAV OVERLAP) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        <div className="relative h-80 sm:h-[400px] w-full rounded-3xl bg-slate-900 overflow-hidden border border-slate-800 shadow-2xl">
          <img
            src={contest.bannerImage || "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"}
            alt={contest.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-[#06080e]/60 to-transparent" />

          {/* Top Floating Navigation */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <Link
              href="/contests"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-700/60 text-xs font-bold text-slate-200 backdrop-blur-md transition shadow-lg"
            >
              <ChevronLeft className="w-4 h-4" /> All Contests
            </Link>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-700/60 text-xs font-bold text-slate-200 hover:text-white backdrop-blur-md transition shadow-lg"
              title="Share Contest"
            >
              <Share2 className="w-4 h-4 text-blue-400" /> Share
            </button>
          </div>

          {/* 2. TITLE & OVERVIEW OVERLAY */}
          <div className="absolute bottom-6 left-6 right-6 space-y-3 z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
                {contest.currentStage || "Registration Open"}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {contest.registrationFee === 0 ? "Free Reg" : `Fee: ${formatCurrency(contest.registrationFee)}`}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {contest.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-400" />
                {contest.location?.venue}, {contest.location?.city}, {contest.location?.state}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-400" />
                {formatDate(contest.registrationStart)} - {formatDate(contest.registrationEnd)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SECTIONS */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Column (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview Description */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" /> Competition Overview
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {contest.description}
              </p>
            </div>

            {/* 3. PRIZE POOL SECTION */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Prize Pool & Rewards</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {contest.prizes?.map((prize, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-purple-500/10 border border-amber-500/20 space-y-2 text-center"
                  >
                    <span className="inline-block p-2 rounded-xl bg-amber-500/20 text-amber-400 font-bold text-xs">
                      {prize.position}
                    </span>
                    <h4 className="text-sm font-bold text-white">{prize.title}</h4>
                    <p className="text-xl font-black text-emerald-400">{formatCurrency(prize.cashPrize)}</p>
                    <p className="text-xs text-slate-400">{prize.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. EVALUATION ROUNDS SECTION */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-6">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-bold text-white">Competition Rounds ({contest.rounds?.length || 0})</h2>
              </div>

              <div className="space-y-4">
                {contest.rounds?.map((round, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white font-extrabold text-xs">
                          {round.roundNumber}
                        </span>
                        <h3 className="text-base font-bold text-white">{round.name}</h3>
                      </div>
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 font-semibold uppercase">
                        {round.submissionType}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 pl-10">{round.description}</p>

                    <div className="pl-10 pt-2 flex flex-wrap items-center gap-4 text-[11px] text-slate-500 border-t border-slate-900 mt-2">
                      <span>Max Selected: <strong className="text-slate-300">{round.maxParticipantsSelected} contestants</strong></span>
                      <span>Dates: <strong className="text-slate-300">{formatDate(round.startDate)} - {formatDate(round.endDate)}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. ELIGIBILITY SECTION */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-bold text-white">Eligibility Criteria</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium">Age Range</span>
                  <p className="text-base font-bold text-white">{contest.eligibility?.minAge} - {contest.eligibility?.maxAge} Years</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium">Gender Requirement</span>
                  <p className="text-base font-bold text-white">{contest.eligibility?.gender} Candidates</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium">Location / Nationality</span>
                  <p className="text-base font-bold text-white">India (Open to all cities)</p>
                </div>
              </div>
            </div>

            {/* 6. TIMELINE SECTION */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-bold text-white">Important Schedule & Timeline</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block font-semibold">Registration Opens</span>
                  <span className="text-sm font-bold text-emerald-400">{formatDate(contest.registrationStart)}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block font-semibold">Registration Closes</span>
                  <span className="text-sm font-bold text-rose-400">{formatDate(contest.registrationEnd)}</span>
                </div>
              </div>
            </div>

            {/* 7. RULES SECTION */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Official Contest Rules</h2>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 list-disc pl-5 leading-relaxed">
                <li>Candidates must submit genuine photos/videos without heavy distortion filters.</li>
                <li>Initial registration is free. Shortlisted candidates pay the participation fee upon approval.</li>
                <li>Candidates who fail to submit round entries before deadlines will be eliminated.</li>
                <li>The decision of the contest jury & judging panel is final.</li>
              </ul>
            </div>

            {/* 8. FAQS SECTION */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden text-xs">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-white hover:text-blue-400 transition"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openFaqIndex === idx ? "rotate-180 text-blue-400" : "text-slate-500"}`} />
                    </button>
                    {openFaqIndex === idx && (
                      <div className="p-4 pt-0 text-slate-400 leading-relaxed border-t border-slate-900">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Card */}
          <div className="space-y-6">
            <div className="sticky top-6 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl space-y-6 shadow-2xl">
              <div className="space-y-1 text-center border-b border-slate-800 pb-4">
                <span className="text-xs text-slate-400 font-semibold uppercase">Registration Fee</span>
                <div className="text-3xl font-black text-emerald-400">
                  {contest.registrationFee === 0 ? "Free Entry" : formatCurrency(contest.registrationFee)}
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Participation Fee: {formatCurrency(contest.participationFee)}
                </span>
              </div>

              {/* 9. SINGLE PRIMARY CTA BUTTON: APPLY NOW */}
              <button
                onClick={handleApplyClick}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-sm shadow-xl shadow-blue-600/30 transition transform hover:scale-[1.02]"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-slate-400 text-center space-y-1">
                <p>🔒 100% Safe & Verified Contest</p>
                <p className="text-slate-500">Free registration for all eligible candidates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING BOTTOM CTA BAR (SINGLE PRIMARY CTA) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 border-t border-slate-800 p-4 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <h4 className="text-sm font-bold text-white line-clamp-1">{contest.title}</h4>
            <p className="text-xs text-slate-400">Registration Ends: {formatDate(contest.registrationEnd)}</p>
          </div>

          <button
            onClick={handleApplyClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-blue-600/30 transition transform hover:scale-105"
          >
            Apply Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SOCIAL SHARE MODAL */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Share Contest</h3>
                  <p className="text-xs text-slate-400">{contest.title}</p>
                </div>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Link Copy Box */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Copy Contest Link</label>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-2">
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  className="flex-1 bg-transparent border-none text-xs text-slate-300 focus:outline-none truncate px-2 font-mono"
                />
                <button
                  onClick={handleCopyLink}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    linkCopied
                      ? "bg-emerald-600 text-white"
                      : "bg-blue-600 hover:bg-blue-500 text-white"
                  }`}
                >
                  {linkCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {linkCopied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Social Icons Grid */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Share via Social Media</label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${currentUrl}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/60 text-emerald-300 hover:bg-emerald-900/50 transition font-semibold"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-950/40 border border-blue-900/60 text-blue-300 hover:bg-blue-900/50 transition font-semibold"
                >
                  <Globe className="w-4 h-4 text-blue-400" /> Facebook
                </a>

                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800 transition font-semibold"
                >
                  <ExternalLink className="w-4 h-4 text-slate-400" /> Twitter / X
                </a>

                {/* Instagram / Copy for Story */}
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-pink-950/40 border border-pink-900/60 text-pink-300 hover:bg-pink-900/50 transition font-semibold"
                >
                  <Share2 className="w-4 h-4 text-pink-400" /> Instagram Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* APPLY NOW MODAL (HANDLES CASE 2 & CASE 3) */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Contest Application</h3>
                  <p className="text-xs text-slate-400">{contest.title}</p>
                </div>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CASE 2: LOGGED IN BUT INCOMPLETE PROFILE */}
            {applyStep === "case_incomplete" && (
              <div className="py-6 text-center space-y-5">
                <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
                  <UserX className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">Complete Your Profile First</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Your model registration profile is incomplete. Please complete your profile with full name, contact details, and portfolio to apply for contests.
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    href={`/dashboard/model?redirect=/contests/${slug}`}
                    className="w-full py-3 px-4 text-xs font-extrabold text-white bg-amber-500 hover:bg-amber-400 rounded-xl transition shadow-lg shadow-amber-500/20"
                  >
                    Complete Profile & Auto Redirect <ArrowRight className="w-4 h-4 inline ml-1" />
                  </Link>
                  <button
                    onClick={() => setIsApplyModalOpen(false)}
                    className="text-xs text-slate-400 hover:text-white py-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* CASE 3 STEP A & B: ELIGIBILITY CHECK & APPLICATION PREVIEW */}
            {applyStep === "eligibility_preview" && (
              <div className="space-y-5 text-xs">
                {/* Eligibility Status Alert */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-900/50 flex items-center gap-3 text-emerald-300">
                  <UserCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="font-bold text-white block">Eligibility Verified!</strong>
                    <span>Candidate matches age ({contest.eligibility?.minAge}-{contest.eligibility?.maxAge} yrs) and gender ({contest.eligibility?.gender}) requirements.</span>
                  </div>
                </div>

                {/* Candidate Preview */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Candidate Profile Preview</h4>
                  <div className="space-y-1 text-slate-200">
                    <p><strong>Name:</strong> {modelProfile?.name || modelProfile?.fullName || "Model Candidate"}</p>
                    <p><strong>Email:</strong> {modelProfile?.email}</p>
                    <p><strong>Phone:</strong> {modelProfile?.phone || modelProfile?.mobile || "+91 98765 43210"}</p>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/40 border border-slate-800">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500 bg-slate-950 mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs text-slate-300 cursor-pointer leading-relaxed">
                    I agree to the official contest rules, terms of participation, and evaluation criteria for <strong>{contest.title}</strong>.
                  </label>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-4 py-2 font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!agreedToTerms || submittingReg}
                    onClick={handleFinalSubmitApplication}
                    className="px-6 py-2.5 font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition disabled:opacity-50"
                  >
                    {submittingReg ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </div>
            )}

            {/* CASE 3 STEP C: APPLICATION SUBMITTED CONFIRMATION */}
            {applyStep === "submitted" && (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Application Submitted!</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Your free registration for <strong>{contest.title}</strong> has been received and sent to contest admins for review.
                </p>

                <div className="pt-4 flex flex-col gap-2">
                  <Link
                    href={`/contests/${slug}/participate`}
                    className="w-full py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition shadow-lg shadow-blue-600/20"
                  >
                    Track Status in Model Dashboard <ArrowRight className="w-4 h-4 inline ml-1" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
