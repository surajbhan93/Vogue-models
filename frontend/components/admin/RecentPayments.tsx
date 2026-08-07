"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatDate, formatCurrency } from "@/lib/utils";
import { CreditCard, CheckCircle2, Clock, XCircle, ArrowUpRight, User, Trophy } from "lucide-react";

export interface PaymentItem {
  _id?: string;
  id?: string;
  transactionId?: string;
  model?: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
  relatedContest?: {
    _id: string;
    title: string;
  };
  payerName?: string;
  type?: string;
  purpose?: string;
  amount: number;
  currency?: string;
  status: string;
  date?: string;
  createdAt?: string;
}

export default function RecentPayments() {
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      let res;
      try {
        // 🔹 REAL BACKEND API: Fetch Transactions
        res = await api.get("/admin/payments/transactions");
      } catch (err: any) {
        if (err.response?.status === 404) {
          try {
            res = await api.get("/admin/payments/transactions");
          } catch {
            res = await api.get("/admin/payments");
          }
        } else {
          throw err;
        }
      }

      const list = res?.data?.data || res?.data?.transactions || res?.data || [];
      if (Array.isArray(list) && list.length > 0) {
        setPayments(list);
      } else {
        setPayments([]);
      }
    } catch (err) {
      console.error("Error loading real payments:", err);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate real gross revenue from completed payments
  const totalRevenue = payments
    .filter((p) => (p.status || "").toLowerCase() === "completed" || (p.status || "").toLowerCase() === "paid")
    .reduce((acc, p) => acc + (p.amount || 0), 0);

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
        <div className="h-6 bg-slate-800 rounded w-1/3" />
        <div className="h-48 bg-slate-800/60 rounded-xl w-full" />
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            Financial Ledger & Real-Time Transactions
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time transaction log for candidate contest entry fees & model payments.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono shadow-md">
            TOTAL: {formatCurrency(totalRevenue)}
          </span>
        </div>
      </div>

      {/* Table */}
      {payments.length === 0 ? (
        <div className="py-12 text-center text-xs text-slate-500 font-mono border border-dashed border-slate-800 rounded-xl">
          No payment transactions logged in the database yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead className="bg-slate-950/80 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
              <tr>
                <th className="p-3.5 rounded-l-xl">TRANSACTION ID</th>
                <th className="p-3.5">MODEL CANDIDATE</th>
                <th className="p-3.5">CONTEST / PURPOSE</th>
                <th className="p-3.5">AMOUNT</th>
                <th className="p-3.5">DATE</th>
                <th className="p-3.5 text-right rounded-r-xl">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {payments.map((p, idx) => {
                const status = (p.status || "completed").toLowerCase();
                const isPaid = status === "completed" || status === "paid";
                const dateStr = p.createdAt ? formatDate(p.createdAt) : p.date || "Recent";
                const candidateName = p.model?.name || p.payerName || "Model Candidate";
                const candidateEmail = p.model?.email || "";
                const contestName = p.relatedContest?.title || p.purpose || p.type || "Contest Fee";

                return (
                  <tr key={p._id || p.id || idx} className="hover:bg-white/5 transition-colors">
                    {/* Transaction ID */}
                    <td className="p-3.5 font-mono font-bold text-white text-[11px]">
                      {p.transactionId || `TXN-${1000 + idx}`}
                    </td>

                    {/* Model Candidate */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                          {p.model?.profileImage ? (
                            <img src={p.model.profileImage} alt={candidateName} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-100 text-xs">{candidateName}</p>
                          {candidateEmail && <p className="text-[10px] text-slate-400">{candidateEmail}</p>}
                        </div>
                      </div>
                    </td>

                    {/* Contest / Purpose */}
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-purple-950/60 border border-purple-800 text-purple-300 text-[10px] font-semibold">
                        <Trophy className="w-3 h-3 text-amber-400" /> {contestName}
                      </span>
                    </td>

                    {/* Amount in INR */}
                    <td className="p-3.5 font-bold text-emerald-400 font-mono text-sm">
                      {formatCurrency(p.amount)}
                    </td>

                    {/* Date */}
                    <td className="p-3.5 font-mono text-[11px] text-slate-400">
                      {dateStr}
                    </td>

                    {/* Status */}
                    <td className="p-3.5 text-right">
                      {isPaid ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase font-bold tracking-wider inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> PAID
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] uppercase font-bold tracking-wider inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> PENDING
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}