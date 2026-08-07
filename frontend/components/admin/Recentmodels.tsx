"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { CheckCircle2, Clock, Ban, Eye, RefreshCw } from "lucide-react";
import Link from "next/link";

export interface Model {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  category?: string;
  status: "active" | "pending" | "suspended" | "inactive" | string;
  profileImage?: string;
  image?: string;
  createdAt?: string;
}

export default function RecentModels() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/models", {
        params: { page: 1, limit: 10 },
      });

      let dataList: Model[] = [];
      if (response.data?.success && Array.isArray(response.data.data)) {
        dataList = response.data.data;
      } else if (Array.isArray(response.data?.data)) {
        dataList = response.data.data;
      } else if (Array.isArray(response.data)) {
        dataList = response.data;
      }

      setModels(dataList);
    } catch (err: any) {
      console.error("Error fetching real models:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/admin/models/${id}/status`, { status: newStatus });
      fetchModels();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-900/60 border border-gray-800 rounded-2xl animate-pulse space-y-4">
        <div className="h-6 bg-gray-800 rounded w-1/4" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-800/60 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900/90 border border-gray-800 rounded-2xl space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Recent Talent Registrations
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Live database records from <code className="text-yellow-400">/admin/models</code>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchModels}
            className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link
            href="/dashboard/admin/talent"
            className="px-3.5 py-1.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider transition"
          >
            Manage Roster ({models.length})
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-300">
          <thead className="bg-black/60 text-gray-400 font-mono text-[11px] uppercase tracking-wider">
            <tr>
              <th className="p-3.5 rounded-l-xl">NAME</th>
              <th className="p-3.5">EMAIL</th>
              <th className="p-3.5">CATEGORY</th>
              <th className="p-3.5">STATUS</th>
              <th className="p-3.5 text-right rounded-r-xl">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {models.map((model) => {
              const modelId = model._id || model.id || "";
              const status = (model.status || "pending").toLowerCase();

              return (
                <tr key={modelId} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 font-bold text-white text-sm">
                    {model.name}
                  </td>
                  <td className="p-3.5 font-mono text-gray-400">
                    {model.email}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded-md bg-gray-800 border border-gray-700 text-[10px] uppercase font-mono text-gray-300">
                      {model.category || "Model"}
                    </span>
                  </td>
                  <td className="p-3.5">
                    {status === "active" && (
                      <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30 text-[10px] font-bold uppercase inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> ACTIVE
                      </span>
                    )}
                    {status === "pending" && (
                      <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 text-[10px] font-bold uppercase inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> PENDING
                      </span>
                    )}
                    {status === "suspended" && (
                      <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase inline-flex items-center gap-1">
                        <Ban className="w-3 h-3" /> SUSPENDED
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <Link
                      href={`/dashboard/admin/talent/${modelId}`}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] inline-flex items-center gap-1 transition"
                    >
                      <Eye className="w-3 h-3" /> View
                    </Link>
                    {status !== "active" && (
                      <button
                        onClick={() => handleStatusUpdate(modelId, "active")}
                        className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold text-[11px] transition"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}