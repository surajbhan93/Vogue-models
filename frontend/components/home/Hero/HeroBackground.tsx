'use client';

import React from 'react';

interface HeroBackgroundProps {
  src?: string;
  alt?: string;
  videoSrc?: string;
}

export function HeroBackground({ src, alt, videoSrc }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-white pointer-events-none">
      {/* Subtle Warm Gold Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-200/30 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-100/40 blur-[160px] rounded-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
    </div>
  );
}

export default HeroBackground;
