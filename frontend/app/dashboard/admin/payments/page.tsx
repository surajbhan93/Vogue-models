"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { formatDate, formatCurrency } from "@/lib/utils";
import {
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  RefreshCw,
  Sparkles,
  User,
  ShieldCheck,
  Award,
  Trophy,
  ExternalLink,
} from "lucide-react";

export interface Transaction {
  _id: string;
  model?: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    profileImage?: string;
  };
  relatedContest?: {
    _id: string;
    title: string;
    slug?: string;
  };
  type: "earning" | "withdrawal" | "contest_fee" | "contest_participation" | "subscription" | "booking" | "other";
  purpose?: string;
  amount: number;
  status: "pending" | "completed" | "paid" | "failed" | "refunded";
  method?: "bank_transfer" | "upi" | "paypal" | "card" | "online" | "other";
  transactionId?: string;
  note?: string;
  createdAt: string;
  processedAt?: string;
}

export interface EarningsOverview {
  totalEarnings: number;
  totalWithdrawn: number;
  pendingWithdrawals: number;
}

export default function AdminPaymentsPage() {
  const [overview, setOverview] = useState<EarningsOverview>({
    totalEarnings: 0,
    totalWithdrawn: 0,
    pendingWithdrawals: 0,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Fetch Overview Stats
  const fetchOverview = useCallback(async () => {
    try {
      let res;
      try {
        res = await api.get("/admin/payments/overview");
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.get("/api/admin/payments/overview");
        } else {
          throw err;
        }
      }
      const data = res.data?.overview || res.data?.data || res.data;
      if (data) {
        setOverview({
          totalEarnings: data.totalEarnings || 0,
          totalWithdrawn: data.totalWithdrawn || 0,
          pendingWithdrawals: data.pendingWithdrawals || 0,
        });
      }
    } catch (err) {
      console.error("Failed to load earnings overview:", err);
    }
  }, []);

  // Fetch Transactions List
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url = "/admin/payments/transactions";
      const params = new URLSearchParams();
      if (typeFilter !== "all") params.append("type", typeFilter);
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (params.toString()) url += `?${params.toString()}`;

      let res;
      try {
        res = await api.get(url);
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.get(`/api${url}`);
        } else {
          throw err;
        }
      }

      const list = res.data?.data || res.data?.transactions || res.data || [];
      const txnList: Transaction[] = Array.isArray(list) ? list : [];
      setTransactions(txnList);

      // Auto-calculate client-side total earnings fallback
      const calculatedGross = txnList
        .filter((t) => (t.status === "completed" || t.status === "paid") && t.type !== "withdrawal")
        .reduce((sum, t) => sum + (t.amount || 0), 0);

      const calculatedWithdrawn = txnList
        .filter((t) => (t.status === "completed" || t.status === "paid") && t.type === "withdrawal")
        .reduce((sum, t) => sum + (t.amount || 0), 0);

      const calculatedPending = txnList.filter((t) => t.type === "withdrawal" && t.status === "pending").length;

      setOverview((prev) => ({
        totalEarnings: prev.totalEarnings > 0 ? prev.totalEarnings : calculatedGross,
        totalWithdrawn: prev.totalWithdrawn > 0 ? prev.totalWithdrawn : calculatedWithdrawn,
        pendingWithdrawals: prev.pendingWithdrawals > 0 ? prev.pendingWithdrawals : calculatedPending,
      }));
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to load payment transactions.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [typeFilter, statusFilter]);

  useEffect(() => {
    fetchOverview();
    fetchTransactions();
  }, [fetchOverview, fetchTransactions]);

  // Process / Approve / Reject Withdrawal Request
  const handleProcessWithdrawal = async (id: string, status: "completed" | "failed") => {
    setProcessingId(id);
    try {
      let res;
      try {
        res = await api.patch(`/admin/payments/withdrawals/${id}`, { status });
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.patch(`/api/admin/payments/withdrawals/${id}`, { status });
        } else {
          throw err;
        }
      }
      alert(res.data?.message || `Withdrawal marked as ${status}!`);
      await fetchOverview();
      await fetchTransactions();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to process withdrawal");
    } finally {
      setProcessingId(null);
    }
  };

  // Filter transactions by Search Query
  const filteredTransactions = transactions.filter((t) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const modelName = t.model?.name?.toLowerCase() || "";
    const modelEmail = t.model?.email?.toLowerCase() || "";
    const txnId = t.transactionId?.toLowerCase() || "";
    const contestTitle = t.relatedContest?.title?.toLowerCase() || "";
    return (
      modelName.includes(query) ||
      modelEmail.includes(query) ||
      txnId.includes(query) ||
      contestTitle.includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto selection:bg-blue-600 selection:text-white pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
              <CreditCard className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Payments & Platform Revenue
              </h1>
              <p className="mt-0.5 text-xs sm:text-sm text-slate-400">
                Track candidate contest entry payments, platform earnings, payouts, and model withdrawal requests.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            fetchOverview();
            fetchTransactions();
          }}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-400" : ""}`} /> Refresh Data
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Contest Revenue */}
        <div className="p-5 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-md space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-bold uppercase tracking-wider">
            <span>Total Gross Revenue</span>
            <ArrowUpRight className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-300">{formatCurrency(overview.totalEarnings)}</div>
          <p className="text-[11px] text-slate-400">Contest fees & platform payments</p>
        </div>

        {/* Total Withdrawn */}
        <div className="p-5 rounded-3xl border border-purple-500/30 bg-purple-950/20 backdrop-blur-md space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-purple-400 font-bold uppercase tracking-wider">
            <span>Model Payouts</span>
            <ArrowDownLeft className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-300">{formatCurrency(overview.totalWithdrawn)}</div>
          <p className="text-[11px] text-slate-400">Completed model withdrawals</p>
        </div>

        {/* Pending Withdrawals */}
        <div className="p-5 rounded-3xl border border-amber-500/30 bg-amber-950/20 backdrop-blur-md space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase tracking-wider">
            <span>Pending Payout Requests</span>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-300">{overview.pendingWithdrawals}</div>
          <p className="text-[11px] text-slate-400">Awaiting admin approval</p>
        </div>

        {/* Net Revenue */}
        <div className="p-5 rounded-3xl border border-blue-500/30 bg-blue-950/20 backdrop-blur-md space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-blue-400 font-bold uppercase tracking-wider">
            <span>Net Revenue</span>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-blue-300">
            {formatCurrency(Math.max(0, overview.totalEarnings - overview.totalWithdrawn))}
          </div>
          <p className="text-[11px] text-slate-400">Net retained revenue</p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-4 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3 md:space-y-0 md:flex md:items-center md:justify-between gap-4 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by model candidate name, email, contest name, transaction ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-400 font-medium">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer font-bold"
            >
              <option value="all" className="bg-slate-950 text-white">All Types</option>
              <option value="contest_fee" className="bg-slate-950 text-white">Contest Entry Fees</option>
              <option value="contest_participation" className="bg-slate-950 text-white">Contest Participation</option>
              <option value="withdrawal" className="bg-slate-950 text-white">Model Withdrawals</option>
              <option value="earning" className="bg-slate-950 text-white">Model Earnings</option>
              <option value="subscription" className="bg-slate-950 text-white">Subscriptions</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2">
            <span className="text-slate-400 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer font-bold"
            >
              <option value="all" className="bg-slate-950 text-white">All Statuses</option>
              <option value="completed" className="bg-slate-950 text-white">Completed / Paid</option>
              <option value="paid" className="bg-slate-950 text-white">Paid</option>
              <option value="pending" className="bg-slate-950 text-white">Pending</option>
              <option value="failed" className="bg-slate-950 text-white">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Data Table */}
      {loading ? (
        <div className="py-20 text-center space-y-3 text-slate-400">
          <Sparkles className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
          <p className="text-xs font-medium">Loading platform payment records...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-center text-xs text-rose-400">
          {error}
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-800 rounded-3xl text-slate-400 space-y-2">
          <CreditCard className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-xs font-semibold text-white">No payment transactions match your search filter.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800 font-mono text-[11px]">
                <tr>
                  <th className="py-4 px-5 font-bold">Model Candidate</th>
                  <th className="py-4 px-5 font-bold">Contest Name & Details</th>
                  <th className="py-4 px-5 font-bold">Type</th>
                  <th className="py-4 px-5 font-bold">Amount</th>
                  <th className="py-4 px-5 font-bold">Method & Txn ID</th>
                  <th className="py-4 px-5 font-bold">Status</th>
                  <th className="py-4 px-5 font-bold">Date</th>
                  <th className="py-4 px-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredTransactions.map((t) => {
                  const contestTitle = t.relatedContest?.title || "Mr. India Fashion Hunt 2026";
                  const contestSlug = t.relatedContest?.slug;

                  return (
                    <tr key={t._id} className="hover:bg-slate-800/40 transition">
                      {/* Model Profile Column */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center text-slate-400 font-bold shrink-0">
                            {t.model?.profileImage ? (
                              <img src={t.model.profileImage} alt={t.model.name} className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-white text-xs">{t.model?.name || "Model Candidate"}</p>
                            <p className="text-[11px] text-slate-400">{t.model?.email || "N/A"}</p>
                            {t.model?.phone && <p className="text-[10px] text-slate-500 font-mono">{t.model.phone}</p>}
                          </div>
                        </div>
                      </td>

                      {/* Contest Name & Details Column */}
                      <td className="py-4 px-5">
                        <div className="space-y-1 max-w-xs">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate">{contestTitle}</span>
                          </span>

                          <p className="text-[10px] text-slate-400 font-mono pl-1">
                            Purpose: <strong className="text-slate-300">{t.purpose || "Contest Fee"}</strong>
                          </p>

                          {contestSlug && (
                            <Link
                              href={`/contests/${contestSlug}`}
                              target="_blank"
                              className="inline-flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 font-semibold pl-1"
                            >
                              View Contest Page <ExternalLink className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </td>

                      {/* Type Column */}
                      <td className="py-4 px-5">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            t.type === "withdrawal"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                              : t.type === "earning"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          }`}
                        >
                          {t.type?.replace("_", " ")}
                        </span>
                      </td>

                      {/* Amount Column */}
                      <td className="py-4 px-5">
                        <span
                          className={`text-sm font-black font-mono ${
                            t.type === "withdrawal" ? "text-purple-300" : "text-emerald-400"
                          }`}
                        >
                          {formatCurrency(t.amount)}
                        </span>
                      </td>

                      {/* Method & Txn ID */}
                      <td className="py-4 px-5">
                        <div className="space-y-0.5 font-mono text-[11px]">
                          <span className="text-slate-300 block uppercase font-bold">{t.method || "Razorpay / Online"}</span>
                          {t.transactionId ? (
                            <span className="text-blue-400 text-[10px] block truncate max-w-[140px]" title={t.transactionId}>
                              {t.transactionId}
                            </span>
                          ) : (
                            <span className="text-slate-600 text-[10px]">No Txn ID</span>
                          )}
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            t.status === "completed" || t.status === "paid"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : t.status === "pending"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          }`}
                        >
                          {t.status === "completed" || t.status === "paid" ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : t.status === "pending" ? (
                            <Clock className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {t.status}
                        </span>
                      </td>

                      {/* Date Column */}
                      <td className="py-4 px-5 text-slate-400 text-[11px] font-mono whitespace-nowrap">
                        {formatDate(t.createdAt)}
                      </td>

                      {/* Actions Column */}
                      <td className="py-4 px-5 text-right">
                        {t.type === "withdrawal" && t.status === "pending" ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              disabled={processingId === t._id}
                              onClick={() => handleProcessWithdrawal(t._id, "completed")}
                              className="px-2.5 py-1 text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition shadow-sm"
                            >
                              Approve
                            </button>
                            <button
                              disabled={processingId === t._id}
                              onClick={() => handleProcessWithdrawal(t._id, "failed")}
                              className="px-2.5 py-1 text-[10px] font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition shadow-sm"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-600 italic">No Action</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
