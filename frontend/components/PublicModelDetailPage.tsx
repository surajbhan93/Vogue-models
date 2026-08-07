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
  Palette,
  Mic,
  Drama,
  Music,
  Activity,
  Briefcase
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

// Dynamic Back Path based on candidate category
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex flex-col items-center justify-center text-slate-400 space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.08),transparent_60%)]" />
        <div className="relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl flex flex-col items-center gap-3 shadow-2xl">
          <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-xs font-medium text-slate-300 tracking-wide">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !model) {
    const defaultRoster = getCategoryRosterPath();
    return (
      <div className="min-h-screen bg-[#07090e] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(225,29,72,0.05),transparent_70%)]" />
        <div className="relative max-w-md w-full p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl shadow-2xl flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-center mb-4 text-slate-500 shadow-inner">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white tracking-wide">Profile Not Found</h2>
          <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed">{error || "The requested profile does not exist."}</p>
          <Link
            href={defaultRoster.path}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
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

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-amber-500 selection:text-black pb-24 relative overflow-x-hidden">
      {/* Ambient Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-purple-600/5 blur-[140px] rounded-full" />
      </div>

      {/* Cover / Banner Section */}
      <div className="relative h-80 sm:h-[450px] w-full bg-slate-950 overflow-hidden">
        <img
          src={
            model.coverImage ||
            model.profileImage ||
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80"
          }
          alt={model.name || categoryTag}
          className="w-full h-full object-cover filter brightness-90 saturate-[1.05]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/80 via-transparent to-transparent h-32" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/75 via-40% to-transparent" />

        {/* Dynamic Back Button Container */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between max-w-6xl mx-auto z-10">
          <Link
            href={rosterInfo.path}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/70 hover:bg-slate-900/90 border border-slate-700/50 text-xs font-semibold text-slate-200 backdrop-blur-md transition-all duration-300 shadow-xl hover:border-amber-500/40"
          >
            <ChevronLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to {rosterInfo.label}</span>
          </Link>

          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-purple-900/80 text-purple-200 border border-purple-400/40 uppercase tracking-widest backdrop-blur-md shadow-lg">
            {categoryTag}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-10 space-y-8">
        
        {/* Profile Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center md:items-end justify-between gap-6 hover:border-slate-700/60 transition">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            
            {/* Avatar Profile */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-2 border-amber-500/20 bg-slate-950 shadow-2xl shrink-0 ring-8 ring-slate-950/80 group">
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

            {/* Title & Info */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-white tracking-wide">{model.name}</h1>
                {model.isVerified && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Profile
                  </span>
                )}
              </div>

              {loc.city && (
                <p className="text-xs sm:text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                  {loc.city}, {loc.state || loc.country || "India"}
                </p>
              )}

              {/* Stat Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                  {model.experience || "Talent"}
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-semibold">
                  Category: {categoryTag}
                </span>
                {model.gender && (
                  <span className="px-3.5 py-1.5 rounded-xl bg-slate-950/80 text-slate-300 border border-slate-800 text-xs font-semibold">
                    {model.gender}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center gap-5 text-slate-400 text-xs font-medium bg-slate-950/50 px-4 py-2.5 rounded-2xl border border-slate-800/60 backdrop-blur-md">
            {typeof model.views === "number" && (
              <span className="flex items-center gap-1.5 hover:text-slate-200 transition"><Eye className="w-4 h-4 text-slate-400" /> {model.views}</span>
            )}
            {typeof model.likes === "number" && (
              <span className="flex items-center gap-1.5 hover:text-rose-400 transition"><Heart className="w-4 h-4 text-rose-400/80" /> {model.likes}</span>
            )}
            {model.willingToTravel && (
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold"><Plane className="w-4 h-4 animate-pulse" /> Willing to Travel</span>
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Bio */}
            {model.bio && (
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl space-y-3 shadow-xl">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-amber-400" /> Biography & Introduction
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {model.bio}
                </p>
              </div>
            )}

            {/* Specialties */}
            {model.specialties?.length > 0 && (
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl space-y-4 shadow-xl">
                <h3 className="text-base font-bold text-white">{categoryTag} Specialties</h3>
                <div className="flex flex-wrap gap-2.5">
                  {model.specialties.map((spec: string, idx: number) => (
                    <span key={idx} className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-semibold">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Physical Stats (If available) */}
            {(model.height || model.weight || model.measurements?.bust) && (
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl space-y-5 shadow-xl">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Ruler className="w-4.5 h-4.5 text-amber-400" /> Physical Attributes
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                    <span className="text-slate-400 font-medium block">Height</span>
                    <p className="text-base font-bold text-white">{model.height ? `${model.height} cm` : "N/A"}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                    <span className="text-slate-400 font-medium block">Weight</span>
                    <p className="text-base font-bold text-white">{model.weight ? `${model.weight} kg` : "N/A"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Gallery */}
            {portfolio.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold text-white tracking-wide">Portfolio & Works</h3>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
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
                        className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 group transition-all duration-300 hover:border-amber-500/40"
                      >
                        {item.type === "image" ? (
                          <img
                            src={item.url}
                            alt={item.caption || model.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : isYt ? (
                          <div className="w-full h-full relative">
                            <img
                              src={`https://img.youtube.com/vi/${item.url.split(/[?&]v=|youtu\.be\//).pop()?.split("&")[0]}/hqdefault.jpg`}
                              alt={item.caption || "Video"}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <div className="w-10 h-10 rounded-full bg-amber-400/90 text-slate-950 flex items-center justify-center shadow-lg">
                                <Play className="w-5 h-5 fill-current ml-0.5" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full relative">
                            <video src={item.url} className="w-full h-full object-cover" muted />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <div className="w-10 h-10 rounded-full bg-amber-400/90 text-slate-950 flex items-center justify-center shadow-lg">
                                <Play className="w-5 h-5 fill-current ml-0.5" />
                              </div>
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl space-y-6 shadow-2xl sticky top-8">
              <h3 className="text-base font-bold text-white flex items-center justify-between border-b border-slate-800/80 pb-3">
                <span>Social Profiles</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              </h3>

              {social.instagram || social.facebook || social.twitter || social.youtube || social.tiktok ? (
                <div className="space-y-3 text-xs">
                  {social.instagram && (
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-pink-950/30 border border-pink-900/40 text-pink-300 hover:border-pink-500/50 transition font-semibold"
                    >
                      <Instagram className="w-4 h-4 text-pink-400" /> Instagram
                    </a>
                  )}
                  {social.youtube && (
                    <a
                      href={social.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-red-950/30 border border-red-900/40 text-red-300 hover:border-red-500/50 transition font-semibold"
                    >
                      <Youtube className="w-4 h-4 text-red-400" /> YouTube
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic text-center py-2">No social links added.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && portfolio[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 p-3 rounded-full bg-slate-900 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-4xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={portfolio[lightboxIndex].url}
              alt="Portfolio"
              className="w-full h-full max-h-[80vh] object-contain mx-auto rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}