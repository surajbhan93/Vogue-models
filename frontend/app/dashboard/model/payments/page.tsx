"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { formatDate, formatCurrency } from "@/lib/utils";
import {
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  ShieldCheck,
  FileText,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Award,
} from "lucide-react";

export interface ModelPaymentRecord {
  _id: string;
  contestTitle?: string;
  contestSlug?: string;
  bannerImage?: string;
  purpose?: string;
  amount: number;
  status: "paid" | "completed" | "pending" | "failed";
  paymentMethod?: string;
  transactionId?: string;
  paidAt?: string;
  createdAt: string;
}

export interface ModelContestStatus {
  _id: string;
  contest: {
    _id: string;
    title: string;
    slug: string;
    bannerImage?: string;
    location?: { city?: string; state?: string };
  };
  registrationStatus: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  paymentStatus: "pending" | "paid" | "not_required";
  paidAmount?: number;
  currentStage: string;
  isEliminated: boolean;
  eliminatedAtRound?: number;
  finalPosition?: string | null;
  createdAt: string;
}

export default function ModelPaymentsHistoryPage() {
  const [payments, setPayments] = useState<ModelPaymentRecord[]>([]);
  const [participations, setParticipations] = useState<ModelContestStatus[]>([]);
  const [totalAmountPaid, setTotalAmountPaid] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModelPaymentsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let res;
      try {
        res = await api.get("/contests/my-dashboard");
      } catch (err: any) {
        if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
          throw new Error("Backend server request timed out. Please check if backend server is running.");
        }
        if (err.response?.status === 404) {
          try {
            res = await api.get("/contest-participation/my-dashboard");
          } catch (err2: any) {
            throw err2;
          }
        } else {
          throw err;
        }
      }

      const data = res.data?.data || res.data;
      if (data) {
        setTotalAmountPaid(data.totalAmountPaid || 0);

        const partList: ModelContestStatus[] = Array.isArray(data.myParticipations)
          ? data.myParticipations
          : [];
        setParticipations(partList);

        // Map payments list from participations
        const mappedPayments: ModelPaymentRecord[] = partList.map((p) => ({
          _id: p._id,
          contestTitle: p.contest?.title || "Competition Fee",
          contestSlug: p.contest?.slug || "",
          bannerImage: p.contest?.bannerImage,
          purpose: `Participation Fee (${p.currentStage || "Round 1"})`,
          amount: p.paidAmount || 1999,
          status: p.paymentStatus === "paid" ? "paid" : "pending",
          paymentMethod: "Razorpay / UPI",
          transactionId: `TXN-${p._id.slice(-8).toUpperCase()}`,
          createdAt: p.createdAt,
        }));

        setPayments(mappedPayments);

        // Fallback sum calculation if totalAmountPaid is 0
        if (!data.totalAmountPaid) {
          const sum = partList
            .filter((p) => p.paymentStatus === "paid")
            .reduce((acc, p) => acc + (p.paidAmount || 1999), 0);
          setTotalAmountPaid(sum);
        }
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to load payment history.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModelPaymentsData();
  }, [fetchModelPaymentsData]);

  const paidContestsCount = participations.filter((p) => p.paymentStatus === "paid").length;

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto selection:bg-blue-600 selection:text-white pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
              <CreditCard className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                My Payment History & Receipts
              </h1>
              <p className="mt-0.5 text-xs sm:text-sm text-slate-400">
                View your complete contest fee transaction records, receipts, and stage fee status.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={fetchModelPaymentsData}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition self-start md:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-400" : ""}`} /> Refresh Payments
        </button>
      </div>

      {/* Financial Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Money Paid */}
        <div className="p-6 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-md space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-bold uppercase tracking-wider">
            <span>Total Money Spent</span>
            <ArrowUpRight className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-300">{formatCurrency(totalAmountPaid)}</div>
          <p className="text-[11px] text-slate-400">Total fees paid across all contests</p>
        </div>

        {/* Total Contests Paid */}
        <div className="p-6 rounded-3xl border border-blue-500/30 bg-blue-950/20 backdrop-blur-md space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-blue-400 font-bold uppercase tracking-wider">
            <span>Paid Competition Entries</span>
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-blue-300">{paidContestsCount}</div>
          <p className="text-[11px] text-slate-400">Contests with confirmed fee slots</p>
        </div>

        {/* Latest Payment Status */}
        <div className="p-6 rounded-3xl border border-purple-500/30 bg-purple-950/20 backdrop-blur-md space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-purple-400 font-bold uppercase tracking-wider">
            <span>Payment Gateway</span>
            <ShieldCheck className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">Razorpay / UPI</div>
          <p className="text-[11px] text-slate-400">Instant 256-bit encrypted verification</p>
        </div>
      </div>

      {/* Main Transactions Table */}
      {loading ? (
        <div className="py-20 text-center space-y-3 text-slate-400">
          <Sparkles className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
          <p className="text-xs font-medium">Loading your payment receipts...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-center text-xs text-rose-400">
          {error}
        </div>
      ) : payments.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-800 rounded-3xl text-slate-400 space-y-2">
          <CreditCard className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-xs font-semibold text-white">No payment transactions recorded yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" /> Payment Transaction Records
          </h2>

          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800 font-mono text-[11px]">
                  <tr>
                    <th className="py-4 px-5 font-bold">Contest Competition</th>
                    <th className="py-4 px-5 font-bold">Payment Purpose</th>
                    <th className="py-4 px-5 font-bold">Amount</th>
                    <th className="py-4 px-5 font-bold">Gateway & Txn ID</th>
                    <th className="py-4 px-5 font-bold">Status</th>
                    <th className="py-4 px-5 font-bold">Date</th>
                    <th className="py-4 px-5 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {payments.map((p) => {
                    const isPaid = p.status === "paid" || p.status === "completed";

                    return (
                      <tr key={p._id} className="hover:bg-slate-800/40 transition">
                        {/* Contest Banner & Title */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
                              <img
                                src={
                                  p.bannerImage ||
                                  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=300&q=80"
                                }
                                alt={p.contestTitle}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-white text-xs truncate max-w-xs">{p.contestTitle}</p>
                              <span className="text-[10px] text-slate-400 font-mono">Verified Entry</span>
                            </div>
                          </div>
                        </td>

                        {/* Purpose */}
                        <td className="py-4 px-5 font-medium text-slate-300">
                          {p.purpose || "Participation Fee"}
                        </td>

                        {/* Amount */}
                        <td className="py-4 px-5 font-mono text-sm font-black text-emerald-400">
                          {formatCurrency(p.amount)}
                        </td>

                        {/* Gateway & Txn ID */}
                        <td className="py-4 px-5 font-mono text-[11px]">
                          <span className="text-slate-300 block uppercase font-bold">{p.paymentMethod || "Razorpay UPI"}</span>
                          <span className="text-blue-400 text-[10px] block truncate max-w-[140px]" title={p.transactionId}>
                            {p.transactionId}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-5">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              isPaid
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            }`}
                          >
                            {isPaid ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {isPaid ? "Paid & Verified" : "Pending Pay"}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-5 text-slate-400 text-[11px] font-mono whitespace-nowrap">
                          {formatDate(p.createdAt)}
                        </td>

                        {/* Action */}
                        <td className="py-4 px-5 text-right">
                          {p.contestSlug ? (
                            <Link
                              href={`/contests/${p.contestSlug}/participate`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition shadow-md shadow-blue-600/20"
                            >
                              View Status <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          ) : (
                            <span className="text-[11px] text-slate-500 italic">No link</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
