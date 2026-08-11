"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import {
  User,
  MapPin,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Ruler,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Music2,
  Sparkles,
  Eye,
  Heart,
  Plane,
  X,
  Play,
  Calendar,
  Globe,
  Award,
  Share2,
  Zap,
} from "lucide-react";

type PortfolioItem = {
  _id: string;
  type: "image" | "video";
  url: string;
  category?: string;
  caption?: string;
  isCover?: boolean;
};

const isYoutubeUrl = (url = "") => url.includes("youtube.com") || url.includes("youtu.be");

const getYoutubeEmbedUrl = (url: string) => {
  try {
    if (url.includes("youtu.be")) {
      const id = url.split("/").pop()?.split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    const id = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return "";
  }
};

const getAge = (dob?: string | Date) => {
  if (!dob) return null;
  const birth = new Date(dob);
  if (isNaN(birth.getTime())) return null;
  const diff = Date.now() - birth.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

const formatHeight = (cm?: number) => {
  if (!cm) return "N/A";
  const realInches = cm / 2.54;
  const feet = Math.floor(realInches / 12);
  const inches = Math.round(realInches % 12);
  return `${cm} cm (${feet}'${inches}")`;
};

const getCategoryRosterPath = (category?: string) => {
  switch (category?.toLowerCase()) {
    case "actor":
      return { path: "/actors", label: "Actor Roster" };
    case "singer":
      return { path: "/singers", label: "Singer Roster" };
    case "painter":
      return { path: "/painters", label: "Painter Roster" };
    case "dancer":
      return { path: "/dancers", label: "Dancer Roster" };
    case "musician":
      return { path: "/musicians", label: "Musician Roster" };
    default:
      return { path: "/models", label: "Model Roster" };
  }
};

export default function PublicModelDetailPage() {
  const params = useParams();
  const slug = (params?.id || params?.slug) as string;

  const [model, setModel] = useState<any | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!slug) return;

    const fetchModelDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/models/${slug}`);
        const payload = res.data;

        const modelObj = payload?.model || payload?.data || payload;
        const portfolioList: PortfolioItem[] = payload?.portfolio || [];

        if (modelObj && (modelObj.name || modelObj._id)) {
          setModel(modelObj);
          setPortfolio(portfolioList);
          setLikesCount(modelObj.likes || 0);
        } else {
          setError("Profile not found.");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchModelDetail();
  }, [slug]);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => Math.max(0, prev - 1));
      setIsLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030508] flex flex-col items-center justify-center text-slate-400 space-y-4 relative overflow-hidden">
        <div className="relative p-5 rounded-2xl bg-zinc-950/80 border border-amber-500/30 flex flex-col items-center gap-3 shadow-2xl backdrop-blur-xl">
          <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-xs font-medium text-slate-300 tracking-wide">Loading full talent portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !model) {
    const defaultRoster = getCategoryRosterPath();
    return (
      <div className="min-h-screen bg-[#030508] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
        <div className="relative max-w-md w-full p-8 rounded-3xl bg-zinc-950 border border-amber-500/30 shadow-2xl backdrop-blur-2xl flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-400 shadow-inner">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white tracking-wide">Profile Not Found</h2>
          <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed">{error || "The requested profile does not exist."}</p>
          <Link
            href={defaultRoster.path}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-black bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20"
          >
            <ChevronLeft className="w-4 h-4" /> Back to {defaultRoster.label}
          </Link>
        </div>
      </div>
    );
  }

  const social = model.socialMedia || {};
  const loc = model.preferredLocation || {};
  const categoryTag = model.category || "Model";
  const rosterInfo = getCategoryRosterPath(categoryTag);
  const age = getAge(model.dateOfBirth);
  const measurements = model.measurements || {};
  const hasMeasurements = measurements.bust || measurements.waist || measurements.hips;

  return (
    <div className="min-h-screen bg-[#030508] text-slate-200 selection:bg-amber-500 selection:text-black pb-24 relative overflow-x-hidden">
      {/* Cover / Banner Section */}
      <div className="relative h-80 sm:h-[450px] w-full bg-zinc-950 overflow-hidden">
        <img
          src={
            model.coverImage ||
            model.profileImage ||
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80"
          }
          alt={model.name || categoryTag}
          className="w-full h-full object-cover filter brightness-75 contrast-125"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent h-32" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-[#030508]/60 to-transparent" />

        {/* Dynamic Back Button Container */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between max-w-6xl mx-auto z-10">
          <Link
            href={rosterInfo.path}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 shadow-xl backdrop-blur-md transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to {rosterInfo.label}</span>
          </Link>

          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-widest backdrop-blur-md shadow-inner">
            {categoryTag}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-10 space-y-8">
        
        {/* Profile Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-amber-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            
            {/* Avatar Profile */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-zinc-900 shadow-2xl shrink-0 ring-8 ring-black/50 group">
              <img
                src={
                  model.profileImage ||
                  (model.gender === "Female"
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                    : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80")
                }
                alt={model.name || categoryTag}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Title & Primary Badges */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-white tracking-wide">{model.name}</h1>
                {model.isVerified && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Roster
                  </span>
                )}
              </div>

              {/* Location & Age Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-zinc-400">
                {(loc.city || loc.state || loc.country) && (
                  <p className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                    {[loc.city, loc.state, loc.country].filter(Boolean).join(", ")}
                  </p>
                )}
                {age && (
                  <p className="flex items-center gap-1 font-mono text-amber-400">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" /> {age} Years Old
                  </p>
                )}
              </div>

              {/* Stat Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                  {model.experience || "Intermediate"}
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-semibold">
                  Category: {categoryTag}
                </span>
                {model.gender && (
                  <span className="px-3.5 py-1.5 rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-800 text-xs font-semibold">
                    Gender: {model.gender}
                  </span>
                )}
                {model.availability && (
                  <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase">
                    ● {model.availability}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Engagement & Travel Bar */}
          <div className="flex items-center gap-4 text-zinc-400 text-xs font-medium bg-zinc-900/90 px-4 py-3 rounded-2xl border border-zinc-800 shadow-inner">
            {typeof model.views === "number" && (
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-slate-500" /> {model.views} Views
              </span>
            )}
            <button
              type="button"
              onClick={handleLike}
              className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                isLiked ? "text-rose-500 font-bold" : "text-zinc-400 hover:text-rose-400"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500 text-rose-500" : "text-rose-400"}`} />
              <span>{likesCount}</span>
            </button>
            {model.willingToTravel && (
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold border-l border-zinc-800 pl-3">
                <Plane className="w-4 h-4 animate-pulse" /> Willing to Travel
              </span>
            )}
          </div>
        </div>

        {/* 🌟 FULL ATTRIBUTE DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 📏 PHYSICAL STATS */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 space-y-6 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-amber-400" /> Physical &amp; Vital Statistics
                </h3>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                  Full Roster Specs
                </span>
              </div>

              {/* Physical Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-1">
                  <span className="text-zinc-400 font-medium block text-[11px] uppercase tracking-wider">Height</span>
                  <p className="text-base font-bold text-white font-mono">{formatHeight(model.height)}</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-1">
                  <span className="text-zinc-400 font-medium block text-[11px] uppercase tracking-wider">Weight</span>
                  <p className="text-base font-bold text-white font-mono">{model.weight ? `${model.weight} kg` : "N/A"}</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-1">
                  <span className="text-zinc-400 font-medium block text-[11px] uppercase tracking-wider">Hair Color</span>
                  <p className="text-base font-bold text-white capitalize">{model.hairColor || "Black"}</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-1">
                  <span className="text-zinc-400 font-medium block text-[11px] uppercase tracking-wider">Eye Color</span>
                  <p className="text-base font-bold text-white capitalize">{model.eyeColor || "Brown"}</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-1">
                  <span className="text-zinc-400 font-medium block text-[11px] uppercase tracking-wider">Age / DOB</span>
                  <p className="text-base font-bold text-white font-mono">{age ? `${age} Yrs` : "N/A"}</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-1">
                  <span className="text-zinc-400 font-medium block text-[11px] uppercase tracking-wider">Gender</span>
                  <p className="text-base font-bold text-white capitalize">{model.gender || "Female"}</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-1">
                  <span className="text-zinc-400 font-medium block text-[11px] uppercase tracking-wider">Experience Level</span>
                  <p className="text-base font-bold text-amber-400 capitalize">{model.experience || "Intermediate"}</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-1">
                  <span className="text-zinc-400 font-medium block text-[11px] uppercase tracking-wider">Discipline</span>
                  <p className="text-base font-bold text-purple-400 capitalize">{categoryTag}</p>
                </div>
              </div>

              {/* Bust / Waist / Hips Banner */}
              {hasMeasurements && (
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-300 uppercase tracking-wider">
                    <span>Bust – Waist – Hips Measurements</span>
                    <span className="font-mono text-[10px] text-zinc-400">Inches (in)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center pt-1 font-mono">
                    <div className="p-3 rounded-xl bg-zinc-950 border border-amber-500/30">
                      <span className="text-[10px] text-zinc-400 uppercase block">Bust</span>
                      <span className="text-lg font-bold text-amber-400">{measurements.bust || "--"}"</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-950 border border-amber-500/30">
                      <span className="text-[10px] text-zinc-400 uppercase block">Waist</span>
                      <span className="text-lg font-bold text-amber-400">{measurements.waist || "--"}"</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-950 border border-amber-500/30">
                      <span className="text-[10px] text-zinc-400 uppercase block">Hips</span>
                      <span className="text-lg font-bold text-amber-400">{measurements.hips || "--"}"</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 📝 BIOGRAPHY */}
            {model.bio && (
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 space-y-4 shadow-xl backdrop-blur-md">
                <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2 border-b border-zinc-900 pb-3">
                  <Sparkles className="w-5 h-5 text-amber-400" /> Biography &amp; Professional Introduction
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line font-light">
                  {model.bio}
                </p>
              </div>
            )}

            {/* 🌟 SPECIALTIES */}
            {model.specialties?.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 space-y-4 shadow-xl backdrop-blur-md">
                <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2 border-b border-zinc-900 pb-3">
                  <Award className="w-5 h-5 text-amber-400" /> {categoryTag} Specialties &amp; Industry Focus
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {model.specialties.map((spec: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold tracking-wide"
                    >
                      ✦ {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 🗣️ LANGUAGES */}
            {model.languages?.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 space-y-4 shadow-xl backdrop-blur-md">
                <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2 border-b border-zinc-900 pb-3">
                  <Globe className="w-5 h-5 text-amber-400" /> Languages Spoken &amp; Communication
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {model.languages.map((lang: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-800 text-xs font-semibold"
                    >
                      🗣️ {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 🖼️ PORTFOLIO GALLERY */}
            {portfolio.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 space-y-6 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" /> Portfolio Showcase &amp; Works
                  </h3>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {portfolio.length} {portfolio.length === 1 ? "Item" : "Items"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {portfolio.map((item, i) => {
                    const isYt = item.type === "video" && isYoutubeUrl(item.url);
                    return (
                      <button
                        key={item._id}
                        onClick={() => setLightboxIndex(i)}
                        className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 group transition-all duration-300 hover:border-amber-400/70 shadow-lg cursor-pointer"
                      >
                        {item.type === "image" ? (
                          <img
                            src={item.url}
                            alt={item.caption || model.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : isYt ? (
                          <div className="w-full h-full relative">
                            <img
                              src={`https://img.youtube.com/vi/${item.url.split(/[?&]v=|youtu\.be\//).pop()?.split("&")[0]}/hqdefault.jpg`}
                              alt={item.caption || "Video"}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg">
                                <Play className="w-5 h-5 fill-current ml-0.5" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full relative">
                            <video src={item.url} className="w-full h-full object-cover" muted />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg">
                                <Play className="w-5 h-5 fill-current ml-0.5" />
                              </div>
                            </div>
                          </div>
                        )}

                        {item.isCover && (
                          <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-black px-2 py-0.5 rounded-md shadow-md">
                            Cover
                          </span>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
                          {item.category && (
                            <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wide">
                              {item.category}
                            </span>
                          )}
                          {item.caption && (
                            <p className="text-xs text-zinc-200 line-clamp-1 mt-0.5 font-normal">
                              {item.caption}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* SOCIAL PROFILES */}
            <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800 space-y-6 shadow-xl backdrop-blur-md sticky top-8">
              <div className="border-b border-zinc-900 pb-3 flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-amber-400" /> Verified Social Profiles
                </h3>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              </div>

              {social.instagram || social.facebook || social.twitter || social.youtube || social.tiktok || social.portfolioWebsite ? (
                <div className="space-y-3 text-xs">
                  {social.instagram && (
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:border-pink-500/50 hover:text-pink-400 transition duration-300 font-semibold shadow-inner group"
                    >
                      <div className="p-2 rounded-xl bg-pink-500/10 group-hover:scale-110 transition-transform">
                        <Instagram className="w-4 h-4 text-pink-400" />
                      </div>
                      <span className="truncate">Instagram Profile</span>
                    </a>
                  )}
                  {social.youtube && (
                    <a
                      href={social.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:border-red-500/50 hover:text-red-400 transition duration-300 font-semibold shadow-inner group"
                    >
                      <div className="p-2 rounded-xl bg-red-500/10 group-hover:scale-110 transition-transform">
                        <Youtube className="w-4 h-4 text-red-400" />
                      </div>
                      <span className="truncate">YouTube Channel</span>
                    </a>
                  )}
                  {social.facebook && (
                    <a
                      href={social.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:border-blue-500/50 hover:text-blue-400 transition duration-300 font-semibold shadow-inner group"
                    >
                      <div className="p-2 rounded-xl bg-blue-500/10 group-hover:scale-110 transition-transform">
                        <Facebook className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="truncate">Facebook Profile</span>
                    </a>
                  )}
                  {social.twitter && (
                    <a
                      href={social.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:border-sky-500/50 hover:text-sky-400 transition duration-300 font-semibold shadow-inner group"
                    >
                      <div className="p-2 rounded-xl bg-sky-500/10 group-hover:scale-110 transition-transform">
                        <Twitter className="w-4 h-4 text-sky-400" />
                      </div>
                      <span className="truncate">X (Twitter) Handle</span>
                    </a>
                  )}
                  {social.tiktok && (
                    <a
                      href={social.tiktok}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:border-slate-400 transition duration-300 font-semibold shadow-inner group"
                    >
                      <div className="p-2 rounded-xl bg-slate-800 group-hover:scale-110 transition-transform">
                        <Music2 className="w-4 h-4 text-slate-300" />
                      </div>
                      <span className="truncate">TikTok Profile</span>
                    </a>
                  )}
                  {social.portfolioWebsite && (
                    <a
                      href={social.portfolioWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:border-amber-400 transition duration-300 font-semibold shadow-inner group"
                    >
                      <div className="p-2 rounded-xl bg-amber-500/10 group-hover:scale-110 transition-transform">
                        <Globe className="w-4 h-4 text-amber-400" />
                      </div>
                      <span className="truncate">Official Website</span>
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-xs text-zinc-500 italic text-center py-2">No social links attached.</p>
              )}

              {/* Status Details */}
              <div className="pt-4 border-t border-zinc-900 text-xs text-zinc-400 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <span className="text-zinc-400 font-medium">Profile Verification</span>
                  <span className="text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                    {model.isVerified ? "Verified" : "Pending"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <span className="text-zinc-400 font-medium">Current Availability</span>
                  <span className="text-amber-300 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                    {model.availability || "Available"}
                  </span>
                </div>
              </div>

              {/* Booking CTA Button */}
              <div className="pt-2">
                <Link
                  href={`/ContactPage?subject=Booking Inquiry: ${encodeURIComponent(model.name)}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black px-6 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider hover:from-amber-300 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
                >
                  <Zap className="w-4 h-4 text-black" />
                  <span>Book {model.name}</span>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && portfolio[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 p-3 rounded-full bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
              className="absolute left-3 sm:left-6 p-3 rounded-full bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 transition-all z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {lightboxIndex < portfolio.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
              className="absolute right-3 sm:right-6 p-3 rounded-full bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 transition-all z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {portfolio[lightboxIndex].type === "image" ? (
              <img
                src={portfolio[lightboxIndex].url}
                alt={portfolio[lightboxIndex].caption || model.name}
                className="w-full h-full max-h-[80vh] object-contain mx-auto rounded-2xl shadow-2xl border border-zinc-800"
              />
            ) : isYoutubeUrl(portfolio[lightboxIndex].url) ? (
              <iframe
                src={getYoutubeEmbedUrl(portfolio[lightboxIndex].url)}
                className="w-full aspect-video rounded-2xl border border-zinc-800 shadow-2xl"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video src={portfolio[lightboxIndex].url} controls autoPlay className="w-full max-h-[80vh] rounded-2xl border border-zinc-800 shadow-2xl" />
            )}
            {portfolio[lightboxIndex].caption && (
              <p className="mt-4 text-center text-sm text-zinc-300 bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 backdrop-blur-md">
                {portfolio[lightboxIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}