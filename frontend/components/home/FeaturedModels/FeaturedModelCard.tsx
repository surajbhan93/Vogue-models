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
    <div className="group relative rounded-2xl overflow-hidden border border-amber-300 bg-white shadow-md hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between">
      {/* Portrait photo */}
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          {(model.isFeatured ?? model.isVerified) && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-black shadow-sm uppercase tracking-wider">
              Featured
            </span>
          )}
          <span className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-slate-900 border border-slate-200 uppercase tracking-wider backdrop-blur-md shadow-sm">
            {category}
          </span>
        </div>

        {/* Hover-reveal stats panel */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out bg-white/95 backdrop-blur-md px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-slate-900 border-t border-amber-200">
          <Stat label="Height" value={model.height ? `${model.height} cm` : "—"} />
          <Stat label="Weight" value={model.weight ? `${model.weight} kg` : "—"} />
          <Stat label="Gender" value={model.gender || "—"} />
          <Stat label="Age" value={model.age ? `${model.age} yrs` : "—"} />
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="p-4 bg-white border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-600">
          <span className="flex items-center gap-1 truncate font-medium">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            {model.location || "Location N/A"}
          </span>
          {typeof model.rating === "number" && model.rating > 0 && (
            <span className="flex items-center gap-1 text-amber-800 font-bold shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {model.rating.toFixed(1)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors flex items-center gap-1">
            <span className="truncate">{model.name}</span>
            {model.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />}
          </h3>

          <Link
            href={`/models/${model.slug || model.id}`}
            className="p-2 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-500 hover:text-black transition-all shadow-sm shrink-0"
            aria-label={`View comp card for ${model.name}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <Link
          href={`/models/${model.slug || model.id}`}
          className="block text-[11px] font-bold text-amber-800 hover:text-amber-900 uppercase tracking-wider group-hover:translate-x-0.5 transition-transform pt-1"
        >
          View Comp Card →
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-1">
      <span className="text-slate-500 uppercase tracking-wider text-[10px] font-medium">{label}</span>
      <span className="text-slate-900 font-bold font-mono">{value}</span>
    </div>
  );
}