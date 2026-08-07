"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Star, ShieldCheck, ArrowUpRight } from "lucide-react";
import { ModelData } from "@/types/home";

interface FeaturedModelCardProps {
  model: ModelData;
}

export function FeaturedModelCard({ model }: FeaturedModelCardProps) {
  const category = model.category || model.experience || "Model";

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black shadow-xl hover:border-amber-500/40 transition-colors duration-300">
      {/* Portrait photo */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={
            model.image ||
            (model.gender === "Female"
              ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
              : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80")
          }
          alt={model.name || "Model"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          {(model.isFeatured ?? model.isVerified) && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-400/40 uppercase tracking-wider backdrop-blur-md">
              Featured
            </span>
          )}
          <span className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-slate-100 border border-white/15 uppercase tracking-wider backdrop-blur-md">
            {category}
          </span>
        </div>

        {/* Hover-reveal stats panel */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out bg-black/75 backdrop-blur-md px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
          <Stat label="Height" value={model.height ? `${model.height} cm` : "—"} />
          <Stat label="Weight" value={model.weight ? `${model.weight} kg` : "—"} />
          <Stat label="Gender" value={model.gender || "—"} />
          <Stat label="Age" value={model.age ? `${model.age} yrs` : "—"} />
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="p-4 bg-[#0c0c0e] space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            {model.location || "Location N/A"}
          </span>
          {typeof model.rating === "number" && model.rating > 0 && (
            <span className="flex items-center gap-1 text-amber-300 font-semibold shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-300" /> {model.rating.toFixed(1)}
            </span>
          )}
        </div>

        <h3 className="text-lg font-serif font-bold text-white truncate flex items-center gap-1.5">
          {model.name}
          {model.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
        </h3>

        <div className="h-px bg-white/10" />

        <Link
          href={`/models/${model.slug}`}
          className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-amber-300 hover:text-amber-200 transition-colors pt-1"
        >
          View Comp Card
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
      <span className="block text-slate-100 font-semibold">{value}</span>
    </div>
  );
}