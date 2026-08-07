"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
// import { Contest } from "@/app/admin/contests/types";
import { Contest } from "../dashboard/admin/contests/types";
import { formatDate, formatCurrency } from "@/lib/utils";
import {
  Trophy,
  Sparkles,
  MapPin,
  Calendar,
  Search,
  Star,
  Users,
  ChevronRight,
  ShieldCheck,
  Flame,
  ArrowUpRight,
  Award,
  Crown,
} from "lucide-react";

export default function PublicContestsPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");

  useEffect(() => {
    const fetchPublicContests = async () => {
      setLoading(true);
      try {
        let res;
        try {
          res = await api.get("/contests/public");
        } catch (err: any) {
          if (err.response?.status === 404) {
            res = await api.get("/api/contests/public");
          } else {
            throw err;
          }
        }
        const payload = res.data;
        let list: Contest[] = [];

        if (Array.isArray(payload)) {
          list = payload;
        } else if (Array.isArray(payload?.data)) {
          list = payload.data;
        } else if (payload?.data && typeof payload.data === "object") {
          const d = payload.data;
          list = [
            ...(Array.isArray(d.upcoming) ? d.upcoming : []),
            ...(Array.isArray(d.ongoing) ? d.ongoing : []),
            ...(Array.isArray(d.past) ? d.past : []),
          ];
        } else if (Array.isArray(payload?.contests)) {
          list = payload.contests;
        }

        setContests(list);
      } catch (error) {
        console.error("Error loading public contests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicContests();
  }, []);

  const filteredContests = contests.filter((contest) => {
    if (search) {
      const q = search.toLowerCase();
      const matchTitle = contest.title?.toLowerCase().includes(q);
      const matchCity = contest.location?.city?.toLowerCase().includes(q);
      if (!matchTitle && !matchCity) return false;
    }
    if (genderFilter !== "all") {
      if (contest.eligibility?.gender !== genderFilter && contest.eligibility?.gender !== "All") {
        return false;
      }
    }
    return true;
  });

  const featuredContests = contests.filter((c) => c.isFeatured);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-amber-500 selection:text-black pt-4 pb-24">
      {/* Background Luxury Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-amber-500/10 via-purple-600/5 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* HERO FASHION INDUSTRY BANNER CARD */}
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 p-8 sm:p-12 shadow-2xl">
          {/* Editorial Model Background Image Overlay */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center mix-blend-overlay pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 tracking-wide uppercase">
              <Crown className="w-3.5 h-3.5 text-amber-400" /> Official Vogue Modeling & Pageant Hunts
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-tight">
              Discover & Compete in Premier <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">Fashion Hunts</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Showcase your talent through photo submissions, runway walks, and live judge interviews. Get scouted by top international modeling agencies & fashion brands.
            </p>

            {/* SEARCH & FILTER BAR */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/70" />
                <input
                  type="text"
                  placeholder="Search contests by title, city, or venue..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 transition shadow-inner"
                />
              </div>

              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full sm:w-auto bg-slate-950/90 border border-slate-800 rounded-2xl px-5 py-3.5 text-sm font-semibold text-slate-200 focus:outline-none focus:border-amber-500/60 cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="Male">Male Modeling</option>
                <option value="Female">Female Pageants</option>
              </select>
            </div>
          </div>
        </div>

        {/* FEATURED CONTESTS SECTION */}
        {featuredContests.length > 0 && !search && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <h2 className="text-2xl font-serif font-bold text-white tracking-tight">Featured Competitions</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredContests.map((contest) => (
                <div
                  key={contest.id || (contest as any)._id}
                  className="group relative rounded-3xl border border-amber-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-amber-950/20 backdrop-blur-xl overflow-hidden hover:border-amber-500/60 transition-all duration-300 shadow-2xl p-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Contest Banner Image */}
                    <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-slate-800 border border-slate-800">
                      <img
                        src={contest.bannerImage || "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"}
                        alt={contest.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 shadow-lg">
                          <Star className="w-3.5 h-3.5 fill-slate-950" /> Featured
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                          {contest.currentStage || "Registration Open"}
                        </span>
                      </div>

                      {/* Prize Tag Overlay */}
                      {contest.prizes && contest.prizes[0] && (
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-4 py-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-xs">
                          <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                            <Trophy className="w-4 h-4 text-amber-400" /> Winner Cash Prize
                          </span>
                          <span className="font-extrabold text-amber-300 text-sm">
                            {formatCurrency(contest.prizes[0].cashPrize)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-300 transition">
                        {contest.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {contest.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                      <div className="flex items-center gap-2 text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                        <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                        <span className="truncate">{contest.location?.city}, {contest.location?.state}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                        <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>Deadline: {formatDate(contest.registrationEnd)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Entry Fee</span>
                      <span className="text-base font-black text-emerald-400">
                        {contest.registrationFee === 0 ? "Free Registration" : formatCurrency(contest.registrationFee)}
                      </span>
                    </div>

                    <Link
                      href={`/contests/${contest.slug}`}
                      className="flex items-center gap-1.5 px-6 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-400/20 transition transform group-hover:scale-105"
                    >
                      Apply Now <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ALL CONTESTS GRID */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
              All Modeling Competitions ({filteredContests.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-20 text-slate-400 space-y-3">
              <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
              <p className="text-xs font-medium">Loading fashion contests...</p>
            </div>
          ) : filteredContests.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl text-slate-400 space-y-2">
              <Trophy className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Competitions Found</h3>
              <p className="text-xs max-w-sm mx-auto">No contests match your current search or category filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredContests.map((contest) => (
                <div
                  key={contest.id || (contest as any)._id}
                  className="group relative rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md overflow-hidden hover:border-amber-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
                      <img
                        src={contest.bannerImage || "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"}
                        alt={contest.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 text-blue-400 border border-blue-500/30 backdrop-blur-md">
                          {contest.currentStage || "Active"}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-3">
                      <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition line-clamp-1">
                        {contest.title}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {contest.description}
                      </p>

                      <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800/80">
                        <div className="flex items-center gap-2 text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span className="truncate">{contest.location?.city}, {contest.location?.state}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>Age: {contest.eligibility?.minAge}-{contest.eligibility?.maxAge} yrs ({contest.eligibility?.gender})</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pt-0 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Entry Fee</span>
                      <span className="text-base font-black text-emerald-400">
                        {contest.registrationFee === 0 ? "Free" : formatCurrency(contest.registrationFee)}
                      </span>
                    </div>

                    <Link
                      href={`/contests/${contest.slug}`}
                      className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition shadow-lg shadow-blue-600/20"
                    >
                      Apply Now <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
