'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { CategoryItem } from './Categories';

interface CategoryCardProps {
  category: CategoryItem;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={category.href}
      className="group relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl transition-all duration-500 hover:border-amber-400/80 hover:shadow-[0_0_35px_rgba(212,175,55,0.35)] hover:-translate-y-2 block"
    >
      {/* Background Image with Smooth Parallax Zoom */}
      <Image
        src={category.image}
        alt={category.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-center brightness-90 contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Luxury Golden Ambient Glow Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/25 via-transparent to-purple-600/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Multi-layer Dark Gradient Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

      {/* Top Badges & Interactive Circle Arrow Button */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <span className="px-3.5 py-1.5 rounded-full text-[10px] font-bold bg-black/75 text-amber-300 border border-amber-500/40 uppercase tracking-widest backdrop-blur-md shadow-lg flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          VERIFIED ROSTER
        </span>

        <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 transition-all duration-300 backdrop-blur-md shadow-lg">
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>

      {/* Bottom Information Card */}
      <div className="absolute bottom-6 left-6 right-6 space-y-2 z-10">
        {category.subtitle && (
          <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-bold block">
            {category.subtitle}
          </span>
        )}
        
        <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-200 transition-colors tracking-wide leading-tight">
          {category.title}
        </h3>

        <div className="flex items-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-emerald-400 bg-black/60 px-2.5 py-1 rounded-full border border-emerald-500/30 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            {category.count}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;