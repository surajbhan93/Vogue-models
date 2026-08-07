"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Briefcase, Trophy, ArrowUpRight, CheckCircle2, Clock, XCircle, Sparkles, Layers } from "lucide-react";

export default function MyApplicationsTrackerPage() {
  const [participations, setParticipations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        let res;
        try {
          res = await api.get("/contests/my-dashboard");
        } catch {
          res = await api.get("/contest-participation/my-dashboard");
        }
        const data = res.data?.data || res.data;
        if (data) {
          setParticipations(Array.isArray(data.myParticipations) ? data.myParticipations : []);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch application records.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto selection:bg-amber-500 selection:text-black pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Briefcase className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">My Submitted Applications</h1>
              <p className="text-xs text-slate-400">Track application evaluation status, fee payments, and contest stage promotions.</p>
            </div>
          </div>
        </div>

        <Link
          href="/dashboard/model/apply"
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 transition rounded-xl shadow-lg shadow-amber-500/20 self-start md:self-auto"
        >
          New Fast Application <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-3 text-slate-400">
          <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
          <p className="text-xs">Loading application records...</p>
        </div>
      ) : participations.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-800 rounded-3xl text-slate-400 space-y-3">
          <Briefcase className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Submitted Applications</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            You haven't submitted any contest applications yet. Apply to live modeling competitions!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {participations.map((p) => {
            const contest = p.contest;
            if (!contest) return null;

            return (
              <div
                key={p._id}
                className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-4 shadow-xl hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
                    <img
                      src={
                        contest.bannerImage ||
                        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=300&q=80"
                      }
                      alt={contest.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white truncate max-w-xs">{contest.title}</h3>
                    <p className="text-xs text-amber-400 font-medium">Stage: {p.currentStage || "Round 1"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono block">APPLICATION STATUS</span>
                    <span
                      className={`inline-flex items-center gap-1 font-bold text-[11px] ${
                        p.registrationStatus === "approved"
                          ? "text-emerald-400"
                          : p.registrationStatus === "rejected"
                          ? "text-rose-400"
                          : "text-amber-400"
                      }`}
                    >
                      {p.registrationStatus === "approved" ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : p.registrationStatus === "rejected" ? (
                        <XCircle className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                      {p.registrationStatus || "Pending Review"}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono block">FEE STATUS</span>
                    <span className="font-mono font-bold text-[11px] text-emerald-400 block">
                      {p.paymentStatus === "paid" ? "Paid (₹1,999)" : "Unpaid"}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/contests/${contest.slug}/participate`}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition shadow-md shadow-blue-600/20"
                  >
                    Open Application & Submissions <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
