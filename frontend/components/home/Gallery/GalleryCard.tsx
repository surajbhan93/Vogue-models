'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Eye } from 'lucide-react';
import { GalleryItem } from './Gallery';

interface GalleryCardProps {
  item: GalleryItem;
  onClick?: () => void;
}

export function GalleryCard({ item, onClick }: GalleryCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:-translate-y-1.5 cursor-pointer"
    >
      {/* Editorial Image */}
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-center filter brightness-95 saturate-[1.05] transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Light Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

      {/* Top Album/Category Badge */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <span className="px-3 py-1 rounded-full text-[9px] font-mono font-bold bg-slate-950/80 text-amber-300 border border-amber-500/30 uppercase tracking-widest backdrop-blur-md">
          {item.album}
        </span>
        <div className="w-8 h-8 rounded-full bg-slate-950/80 border border-white/15 flex items-center justify-center text-slate-300 group-hover:bg-amber-500 group-hover:text-black transition-colors backdrop-blur-md">
          <Eye className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Bottom Title Info */}
      <div className="absolute bottom-5 left-5 right-5 space-y-1 z-10">
        {item.issueDate && (
          <span className="text-[9px] uppercase tracking-widest text-amber-400 font-mono font-bold block">
            {item.issueDate}
          </span>
        )}
        <h4 className="text-sm font-serif font-extrabold text-white group-hover:text-amber-200 transition-colors line-clamp-2 leading-tight">
          {item.title}
        </h4>
      </div>
    </div>
  );
}