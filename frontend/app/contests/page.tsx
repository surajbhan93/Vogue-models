"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
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
  const [contests, setContests] = useState<any[]>([]);
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
        let list: any[] = [];

        if (Array.isArray(payload)) {
          list = payload;
        } else if (Array.isArray(payload?.data)) {
          list = payload.data;
        } else if (Array.isArray(payload?.contests)) {
          list = payload.contests;
        }

        setContests(list);
      } catch (err) {
        console.warn("Could not fetch public contests list:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicContests();
  }, []);

  const filteredContests = contests.filter((c) => {
    const matchesSearch =
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.city?.toLowerCase().includes(search.toLowerCase()) ||
      c.venue?.toLowerCase().includes(search.toLowerCase());

    const matchesGender =
      genderFilter === "all" ||
      !c.targetGender ||
      c.targetGender === "All" ||
      c.targetGender === genderFilter;

    return matchesSearch && matchesGender;
  });

  const featuredContests = filteredContests.filter((c) => c.isFeatured);
  const regularContests = filteredContests.filter((c) => !c.isFeatured);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-amber-500 selection:text-white pt-4 pb-24">
      {/* Background Luxury Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-amber-100/50 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* HERO FASHION INDUSTRY BANNER CARD */}
        <div className="relative rounded-3xl overflow-hidden border border-amber-300 bg-white p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 tracking-wide uppercase shadow-sm">
              <Crown className="w-3.5 h-3.5 text-amber-600" /> Official Vogue Modeling &amp; Pageant Hunts
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight">
              Discover &amp; Compete in Premier <span className="gold-gradient-text">Fashion Hunts</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Showcase your talent through photo submissions, runway walks, and live judge interviews. Get scouted by top international modeling agencies &amp; fashion brands.
            </p>

            {/* SEARCH & FILTER BAR */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
                <input
                  type="text"
                  placeholder="Search contests by title, city, or venue..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition shadow-sm"
                />
              </div>

              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full sm:w-auto bg-white border border-slate-300 rounded-2xl px-5 py-3.5 text-sm font-semibold text-slate-900 focus:outline-none focus:border-amber-500 cursor-pointer shadow-sm"
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
              <Flame className="w-5 h-5 text-amber-600" />
              <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">Featured Competitions</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredContests.map((contest) => (
                <div
                  key={contest.id || contest._id}
                  className="group relative rounded-3xl border border-amber-300 bg-white overflow-hidden hover:border-amber-400 transition-all duration-300 shadow-md p-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Contest Banner Image */}
                    <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img
                        src={contest.bannerImage || "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"}
                        alt={contest.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-black shadow-md">
                          <Star className="w-3.5 h-3.5 fill-black" /> Featured
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-emerald-800 border border-emerald-300 backdrop-blur-md shadow-sm">
                          {contest.currentStage || "Registration Open"}
                        </span>
                      </div>

                      {/* Prize Tag Overlay */}
                      {contest.prizes && contest.prizes[0] && (
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-amber-300 text-xs shadow-md">
                          <span className="text-slate-700 flex items-center gap-1.5 font-medium">
                            <Trophy className="w-4 h-4 text-amber-600" /> Winner Cash Prize
                          </span>
                          <span className="font-serif font-extrabold text-amber-900">
                            {formatCurrency(contest.prizes[0].amount || contest.prizes[0].prizeAmount || 300000)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-amber-800 font-semibold uppercase tracking-wider">
                        <span>{contest.category || "Fashion & Runway"}</span>
                        <span>{contest.targetGender ? `${contest.targetGender} Category` : "Open to All"}</span>
                      </div>

                      <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                        {contest.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-light">
                        {contest.description}
                      </p>
                    </div>

                    {/* Event Meta Badges */}
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 font-medium pt-2">
                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="truncate">{formatDate(contest.startDate || contest.createdAt || new Date())}</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                        <span className="truncate">{contest.city || "Thrissur, Kerala"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs">
                      <span className="text-slate-500 block">Registration Fee</span>
                      <span className="text-slate-900 font-bold font-mono text-sm">
                        {contest.entryFee ? formatCurrency(contest.entryFee) : "Step 1 Free (₹999 Step 2)"}
                      </span>
                    </div>

                    <Link
                      href={`/dashboard/model/apply?contestId=${contest.id || contest._id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-amber-600 transition-all shadow-md"
                    >
                      <span>Apply Now</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ALL CONTESTS LIST GRID */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" /> Active Competitions &amp; Audition Calls
            </h2>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              {filteredContests.length} {filteredContests.length === 1 ? "Contest" : "Contests"}
            </span>
          </div>

          {loading ? (
            <div className="text-center py-20 space-y-3">
              <Sparkles className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
              <p className="text-xs font-medium text-slate-600">Loading live audition contests...</p>
            </div>
          ) : filteredContests.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <Trophy className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No Audition Contests Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try adjusting your search keywords or category filters to find upcoming talent hunts.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContests.map((contest) => (
                <div
                  key={contest.id || contest._id}
                  className="group rounded-2xl border border-amber-300 bg-white p-5 hover:border-amber-400 transition-all duration-300 shadow-md flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img
                        src={contest.bannerImage || "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"}
                        alt={contest.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/90 text-slate-900 uppercase tracking-wider backdrop-blur-md shadow-sm">
                        {contest.category || "Modeling"}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                      {contest.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-light">
                      {contest.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{contest.city || "Thrissur, Kerala"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{formatDate(contest.startDate || contest.createdAt || new Date())}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 font-mono">
                      {contest.entryFee ? formatCurrency(contest.entryFee) : "Step 1 Free"}
                    </span>

                    <Link
                      href={`/dashboard/model/apply?contestId=${contest.id || contest._id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 text-black font-extrabold text-[11px] uppercase tracking-wider hover:bg-amber-600 transition-all shadow-sm"
                    >
                      <span>Apply</span>
                      <ChevronRight className="w-3.5 h-3.5" />
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
