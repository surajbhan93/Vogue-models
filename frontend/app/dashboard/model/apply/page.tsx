"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Contest } from "@/app/admin/contests/types";
import { FileText, Trophy, Upload, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function FastApplyPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [selectedContestId, setSelectedContestId] = useState<string>("");
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [caption, setCaption] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchOpenContests = async () => {
      setLoading(true);
      try {
        let res;
        try {
          res = await api.get("/contests/public");
        } catch {
          res = await api.get("/contests");
        }
        const list = res.data?.data || res.data?.models || res.data || [];
        const openList = Array.isArray(list) ? list : [];
        setContests(openList);
        if (openList.length > 0) {
          setSelectedContestId(openList[0].id || openList[0]._id);
        }
      } catch (err) {
        console.error("Failed to fetch contests for apply page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOpenContests();
  }, []);

  const handleFastApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContestId) return;

    setSubmitting(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      // 1. Register for contest
      let regRes;
      try {
        regRes = await api.post(`/contest-participation/${selectedContestId}/register`);
      } catch (err: any) {
        if (err.response?.status === 404) {
          regRes = await api.post(`/contests-participation/${selectedContestId}/register`);
        } else {
          throw err;
        }
      }

      setSuccessMsg("🎉 Registration submitted successfully! Your application is now under admin review.");
      setMediaUrl("");
      setCaption("");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Failed to submit contest application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 p-4 sm:p-6 lg:p-10 space-y-8 max-w-4xl mx-auto selection:bg-amber-500 selection:text-black pb-24">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-1">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <FileText className="w-6 h-6" />
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Fast Contest Application</h1>
            <p className="text-xs text-slate-400">Select an open modeling contest and submit your audition entry directly.</p>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center space-y-2 text-slate-400">
          <Sparkles className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
          <p className="text-xs">Loading open competitions...</p>
        </div>
      ) : (
        <form onSubmit={handleFastApply} className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6">
          {/* Contest Selector */}
          <div className="space-y-2 text-xs">
            <label className="block font-bold text-white uppercase font-mono tracking-wider">
              Select Competition / Audition
            </label>
            <select
              value={selectedContestId}
              onChange={(e) => setSelectedContestId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 cursor-pointer font-medium"
            >
              {contests.map((c) => (
                <option key={c.id || (c as any)._id} value={c.id || (c as any)._id}>
                  🏆 {c.title} — {c.location?.city || "India"} ({c.registrationFee === 0 ? "Free Entry" : `₹${c.registrationFee}`})
                </option>
              ))}
            </select>
          </div>

          {/* Media Link */}
          <div className="space-y-2 text-xs">
            <label className="block font-bold text-white uppercase font-mono tracking-wider">
              Portfolio Photo / Video Media Link (Cloudinary, Drive, YouTube)
            </label>
            <input
              type="url"
              placeholder="https://res.cloudinary.com/... or https://youtube.com/..."
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Caption */}
          <div className="space-y-2 text-xs">
            <label className="block font-bold text-white uppercase font-mono tracking-wider">
              Audition Caption / Bio Note
            </label>
            <textarea
              rows={3}
              placeholder="Tell the jury about your height, experience, and runway background..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !selectedContestId}
            className="w-full py-3.5 px-6 rounded-2xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            {submitting ? "Submitting Application..." : "Submit Contest Application"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
