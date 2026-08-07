'use client';

import React from 'react';

interface TransitionOverlayProps {
  isEnding: boolean;
  whiteFlash: boolean;
}

export function TransitionOverlay({ isEnding, whiteFlash }: TransitionOverlayProps) {
  return (
    <>
      {/* 1. High-Fashion Golden Radial Starlight Lens Flare */}
      <div
        className={`fixed inset-0 z-[120] pointer-events-none transition-all duration-300 ease-out flex items-center justify-center ${
          whiteFlash ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
        }`}
      >
        {/* Core Intense White Lens Burst */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

        {/* Radial Golden Light Beam Aura */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,rgba(212,175,55,0.7)_40%,rgba(5,5,5,0)_80%)] animate-pulse" />

        {/* Anamorphic Golden Light Streak Line */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-amber-200 to-transparent shadow-[0_0_25px_#fef08a]" />
      </div>

      {/* 2. Cinematic Split Curtain & Luxury Dark Mask Transition */}
      <div
        className={`fixed inset-0 z-[110] pointer-events-none transition-all duration-700 ease-in-out ${
          isEnding ? 'opacity-100 backdrop-blur-md' : 'opacity-0 backdrop-blur-none'
        }`}
      >
        {/* Top Shutter Curtain */}
        <div
          className={`absolute top-0 left-0 right-0 h-1/2 bg-[#050505] border-b border-amber-500/30 transition-transform duration-700 ease-in-out ${
            isEnding ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          {/* Glowing Golden Line Detail */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#d4af37]" />
        </div>

        {/* Bottom Shutter Curtain */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#050505] border-t border-amber-500/30 transition-transform duration-700 ease-in-out ${
            isEnding ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          {/* Glowing Golden Line Detail */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#d4af37]" />
        </div>

        {/* Center Transition Emblem Watermark */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-amber-400 font-serif tracking-[0.4em] text-xs uppercase font-semibold transition-opacity duration-500 ${
            isEnding ? 'opacity-100 delay-200' : 'opacity-0'
          }`}
        >
          <span className="text-2xl animate-spin-slow mb-1">✦</span>
          <span className="text-[10px] tracking-[0.5em] text-zinc-300">VOGUE VIBE</span>
        </div>
      </div>
    </>
  );
}