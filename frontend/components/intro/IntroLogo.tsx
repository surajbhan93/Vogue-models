'use client';

import React, { forwardRef } from 'react';

export const IntroLogo = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (_props, ref) => {
    const customLogoUrl =
      'https://res.cloudinary.com/ujpa9sap/image/upload/v1786020022/cropped_circle_image_utg5ck.png';

    return (
      <div
        ref={ref}
        className="flex flex-col items-center justify-center text-center opacity-0 scale-95 filter blur-md select-none z-30"
      >
        <div className="relative mb-6 flex items-center justify-center group cursor-pointer">
          <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-amber-400/40 border-t-amber-300 border-r-transparent animate-spin-slow pointer-events-none" />
          <div className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-amber-500/20 border-b-amber-400/60 pointer-events-none animate-pulse" />
          <div className="absolute w-28 h-28 rounded-full bg-amber-400/20 blur-2xl pointer-events-none animate-pulse" />

          <img
            src={customLogoUrl}
            alt="Vogue Vibe Models Logo"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-[0_0_50px_rgba(212,175,55,0.5)] border-2 border-amber-400/60 relative z-10 transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute -bottom-2 right-1 z-20 w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center text-black text-xs font-bold shadow-lg border border-amber-200">
            ✦
          </div>
        </div>

        <div className="relative flex flex-col items-center">
          <span className="text-[10px] sm:text-xs font-extrabold tracking-[0.55em] text-amber-400 uppercase mb-2">
            GLOBAL CELEBRITY & TALENT AGENCY
          </span>

          <h1 className="text-4xl sm:text-7xl md:text-8xl font-serif font-black tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-amber-400 drop-shadow-[0_12px_40px_rgba(212,175,55,0.35)] uppercase leading-none">
            VOGUE VIBE
          </h1>

          <div className="flex items-center space-x-3 my-3">
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-amber-400" />
            <span className="text-amber-400 text-sm font-serif">✦</span>
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-amber-400" />
          </div>

          <span className="text-xs sm:text-sm tracking-[0.45em] font-medium text-zinc-200 uppercase">
            MODELS • ACTORS • SINGERS • ICONS
          </span>
        </div>
      </div>
    );
  }
);

IntroLogo.displayName = 'IntroLogo';