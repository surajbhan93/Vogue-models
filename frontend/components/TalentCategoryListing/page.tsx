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
  ArrowUpRight,
  Mic,
  Music,
  Palette,
  Drama,
} from "lucide-react";

export interface ModelProfile {
  _id: string;
  category?: string;
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

interface TalentCategoryPageProps {
  category: 'Model' | 'Actor' | 'Singer' | 'Painter' | 'Dancer' | 'Musician' | 'Other';
  title: string;
  subtitle: string;
  icon: 'user' | 'mic' | 'music' | 'palette' | 'drama';
}

const getAge = (dob?: string) => {
  if (!dob) return null;
  const birth = new Date(dob);
  if (isNaN(birth.getTime())) return null;
  const diff = Date.now() - birth.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

export default function TalentCategoryListing({
 category,
  title,
  subtitle,
  icon,
}: TalentCategoryPageProps) {
const iconMap = {
    user: User,
    mic: Mic,
    music: Music,
    palette: Palette,
    drama: Drama,
  };

  const CategoryIcon = iconMap[icon];
  const [talents, setTalents] = useState<ModelProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [experienceFilter, setExperienceFilter] = useState<string>("all");

  useEffect(() => {
    const fetchTalents = async () => {
      setLoading(true);
      try {
        let res;
        const params = { category };
        try {
          res = await api.get("/models", { params });
        } catch (err: any) {
          if (err.response?.status === 404) {
            res = await api.get("/api/models", { params });
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

        setTalents(list);
      } catch (err) {
        console.error(`Failed to load ${category}s:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchTalents();
  }, [category]);

  const filteredTalents = talents.filter((talent) => {
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      const matchName = talent.name?.toLowerCase().includes(q);
      const matchCity = talent.preferredLocation?.city?.toLowerCase().includes(q);
      const matchState = talent.preferredLocation?.state?.toLowerCase().includes(q);
      const matchBio = talent.bio?.toLowerCase().includes(q);
      const matchExp = talent.experience?.toLowerCase().includes(q);
      const matchSpecialty = talent.specialties?.some((s) => s.toLowerCase().includes(q));

      if (!matchName && !matchCity && !matchState && !matchBio && !matchExp && !matchSpecialty) {
        return false;
      }
    }

    if (genderFilter !== "all") {
      if (talent.gender?.toLowerCase() !== genderFilter.toLowerCase()) {
        return false;
      }
    }

    if (experienceFilter !== "all") {
      if (talent.experience?.toLowerCase() !== experienceFilter.toLowerCase()) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-amber-500 selection:text-black pt-6 pb-24">
      {/* Background Glow Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-amber-500/10 via-purple-600/5 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase tracking-widest">
            <CategoryIcon className="w-3.5 h-3.5 text-amber-400" /> Official {category} Roster
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Search & Filter Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="relative flex-1 w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/70" />
              <input
                type="text"
                placeholder={`Search by ${category.toLowerCase()} name, city, specialty...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 shadow-inner"
              />
            </div>

            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="bg-slate-950/90 border border-slate-800 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-200 focus:outline-none focus:border-amber-500/60 cursor-pointer"
            >
              <option value="all">All Genders</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="bg-slate-950/90 border border-slate-800 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-200 focus:outline-none focus:border-amber-500/60 cursor-pointer"
            >
              <option value="all">All Experience</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Professional">Professional</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>

        {/* GALLERY GRID */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 space-y-3">
            <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
            <p className="text-xs font-medium">Loading {category.toLowerCase()} roster...</p>
          </div>
        ) : filteredTalents.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl text-slate-400 space-y-2">
            <User className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No {category}s Found</h3>
            <p className="text-xs max-w-sm mx-auto">No records match your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTalents.map((talent) => (
              <TalentCard key={talent._id} talent={talent} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TalentCard({ talent, category }: { talent: ModelProfile; category: string }) {
  const age = getAge(talent.dateOfBirth);
  const primarySpecialty = talent.specialties?.[0] || talent.experience || category;

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black shadow-xl hover:border-amber-500/40 transition-colors duration-300">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={
            talent.profileImage ||
            (talent.gender === "Female"
              ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
              : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80")
          }
          alt={talent.name || category}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          {(talent.isFeatured ?? talent.isVerified) ? (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider backdrop-blur-md">
              Featured
            </span>
          ) : <span />}
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-900/70 text-purple-200 border border-purple-400/30 uppercase tracking-wider backdrop-blur-md">
            {category}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out bg-black/85 backdrop-blur-md px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
          <Stat label="Experience" value={talent.experience || "—"} />
          <Stat label="Gender" value={talent.gender || "—"} />
          <Stat label="Height" value={talent.height ? `${talent.height} cm` : "N/A"} />
          <Stat label="Age" value={age ? `${age} yrs` : "—"} />
        </div>
      </div>

      <div className="p-4 bg-[#0c0c0e] space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            {talent.preferredLocation?.city
              ? `${talent.preferredLocation.city}${talent.preferredLocation.state ? `, ${talent.preferredLocation.state}` : ""}`
              : "Location N/A"}
          </span>
          {typeof talent.rating === "number" && talent.rating > 0 && (
            <span className="flex items-center gap-1 text-amber-300 font-semibold shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-300" /> {talent.rating.toFixed(1)}
            </span>
          )}
        </div>

        <h3 className="text-lg font-serif font-bold text-white truncate flex items-center gap-1.5">
          {talent.name}
          {talent.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
        </h3>

        <div className="text-[11px] text-amber-400/90 font-medium truncate">
          Specialty: {primarySpecialty}
        </div>

        <div className="h-px bg-white/10" />

        <Link
          href={`/models/${talent.slug}`}
          className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-amber-300 hover:text-amber-200 transition-colors pt-1"
        >
          View Portfolio Card
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-slate-400 uppercase tracking-wide text-[9px]">{label}</span>
      <span className="block text-slate-100 font-semibold truncate">{value}</span>
    </div>
  );
}