"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import {
  User,
  MapPin,
  Star,
  Search,
  Sparkles,
  ShieldCheck,
  Crown,
  Ruler,
  ArrowUpRight,
} from "lucide-react";

export interface ModelProfile {
  _id: string;
  name: string;
  email: string;
  slug: string;
  gender: string;
  profileImage?: string;
  coverImage?: string;
  bio?: string;
  height?: number;
  weight?: number;
  dateOfBirth?: string;
  experience?: string;
  specialties?: string[];
  preferredLocation?: {
    city?: string;
    state?: string;
    country?: string;
  };
  isVerified?: boolean;
  isFeatured?: boolean;
  rating?: number;
  views?: number;
  likes?: number;
}

const getAge = (dob?: string) => {
  if (!dob) return null;
  const birth = new Date(dob);
  if (isNaN(birth.getTime())) return null;
  const diff = Date.now() - birth.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

export default function PublicModelsPage() {
  const [models, setModels] = useState<ModelProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [experienceFilter, setExperienceFilter] = useState<string>("all");

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      try {
        let res;
        try {
          res = await api.get("/models");
        } catch (err: any) {
          if (err.response?.status === 404) {
            res = await api.get("/api/models");
          } else {
            throw err;
          }
        }

        const payload = res.data;
        let list: ModelProfile[] = [];

        if (Array.isArray(payload)) {
          list = payload;
        } else if (Array.isArray(payload?.data)) {
          list = payload.data;
        } else if (Array.isArray(payload?.models)) {
          list = payload.models;
        } else if (payload?.data && typeof payload.data === "object") {
          const d = payload.data;
          if (Array.isArray(d.models)) list = d.models;
          else if (Array.isArray(d.data)) list = d.data;
        }

        setModels(list);
      } catch (err) {
        console.error("Failed to load models:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  const filteredModels = models.filter((model) => {
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      const matchName = model.name?.toLowerCase().includes(q);
      const matchCity = model.preferredLocation?.city?.toLowerCase().includes(q);
      const matchState = model.preferredLocation?.state?.toLowerCase().includes(q);
      const matchCountry = model.preferredLocation?.country?.toLowerCase().includes(q);
      const matchBio = model.bio?.toLowerCase().includes(q);
      const matchExp = model.experience?.toLowerCase().includes(q);
      const matchSpecialty = model.specialties?.some((s) => s.toLowerCase().includes(q));

      if (
        !matchName &&
        !matchCity &&
        !matchState &&
        !matchCountry &&
        !matchBio &&
        !matchExp &&
        !matchSpecialty
      ) {
        return false;
      }
    }

    if (genderFilter !== "all") {
      if (model.gender?.toLowerCase() !== genderFilter.toLowerCase()) {
        return false;
      }
    }

    if (experienceFilter !== "all") {
      if (model.experience?.toLowerCase() !== experienceFilter.toLowerCase()) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen transition-colors py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Header Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            Vogue Verified Talent Roster
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Discover Exceptional <span className="gold-gradient-text">Models</span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Browse professional fashion, commercial, and runway models available for pageants, fashion hunts, catalog shoots, and brand campaigns.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl flex flex-col md:flex-row items-center gap-4 backdrop-blur-md">
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, city, specialty, or bio..."
              className="w-full bg-zinc-900 text-white placeholder-zinc-500 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 border border-zinc-800 focus:outline-none focus:border-amber-400 shadow-inner"
            />
          </div>

          {/* Gender Filter */}
          <div className="w-full md:w-48">
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="w-full bg-zinc-900 text-white text-xs sm:text-sm rounded-xl px-3 py-3 border border-zinc-800 focus:outline-none focus:border-amber-400"
            >
              <option value="all">All Genders</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Experience Filter */}
          <div className="w-full md:w-48">
            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="w-full bg-zinc-900 text-white text-xs sm:text-sm rounded-xl px-3 py-3 border border-zinc-800 focus:outline-none focus:border-amber-400"
            >
              <option value="all">All Experience</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="professional">Professional</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>

        {/* Models Roster Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="h-96 rounded-3xl bg-zinc-900 border border-zinc-800 animate-pulse"
              />
            ))}
          </div>
        ) : filteredModels.length === 0 ? (
          <div className="text-center py-20 bg-zinc-950/60 border border-zinc-800 rounded-3xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/20">
              <User className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">No Models Found</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              No model profiles match your search criteria. Try adjusting your search query or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredModels.map((m) => {
              const age = getAge(m.dateOfBirth);
              const city = m.preferredLocation?.city || "New York";
              const state = m.preferredLocation?.state || "NY";
              const targetSlug = m.slug || m._id;

              return (
                <Link
                  key={m._id}
                  href={`/models/${targetSlug}`}
                  className="group relative rounded-3xl overflow-hidden bg-zinc-950/80 border border-zinc-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:border-amber-500/50 transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                    <img
                      src={
                        m.profileImage ||
                        (m.gender === "Female"
                          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                          : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80")
                      }
                      alt={m.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      {m.isFeatured ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-400 text-black shadow-md">
                          Featured
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-black/60 backdrop-blur-md text-amber-300 border border-white/20">
                          {m.experience || "Model"}
                        </span>
                      )}

                      {m.specialties && m.specialties.length > 0 && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                          {m.specialties[0]}
                        </span>
                      )}
                    </div>

                    {/* Bottom Info Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                      <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                        <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                        <span>
                          {city}, {state}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                        <span>{m.name}</span>
                        {m.isVerified && (
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </h3>
                    </div>
                  </div>

                  {/* Card Bottom Specs */}
                  <div className="p-4 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                    <div className="flex items-center gap-3">
                      {m.height && (
                        <span className="flex items-center gap-1 font-mono">
                          <Ruler className="w-3.5 h-3.5 text-amber-400" /> {m.height} cm
                        </span>
                      )}
                      {age && <span className="font-mono">{age} Yrs</span>}
                    </div>

                    <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      View Comp Card <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}