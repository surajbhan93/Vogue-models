'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { CategoryItem } from './Categories';

interface CategoryCardProps {
  category: CategoryItem;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={category.href}
      className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] hover:-translate-y-1.5"
    >
      {/* Background Image with Smooth Zoom */}
      <Image
        src={category.image}
        alt={category.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-center brightness-90 saturate-[1.1] transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Light Speed / Ambient Glow Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Seamless Multi-layer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/50 via-50% to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

      {/* Top Badge Tag */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-amber-300 border border-amber-500/30 uppercase tracking-widest backdrop-blur-md shadow-md flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          {category.count}
        </span>

        <div className="w-9 h-9 rounded-full bg-slate-950/80 border border-white/15 flex items-center justify-center text-slate-300 group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-400 transition-all duration-300 backdrop-blur-md">
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>

      {/* Bottom Information */}
      <div className="absolute bottom-6 left-6 right-6 space-y-1.5 z-10">
        {category.subtitle && (
          <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-bold block">
            {category.subtitle}
          </span>
        )}
        <h3 className="font-serif text-2xl font-extrabold text-white group-hover:text-amber-200 transition-colors tracking-wide">
          {category.title}
        </h3>
      </div>
    </Link>
  );
}