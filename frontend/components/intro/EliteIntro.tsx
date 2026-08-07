'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { BackgroundVideo } from './BackgroundVideo';
import { IntroLogo } from './IntroLogo';
import { CityAnimation } from './CityAnimation';
import { TransitionOverlay } from './TransitionOverlay';
import { ELITE_CITIES } from '@/constants/cities';

interface EliteIntroProps {
  onComplete: () => void;
}

export function EliteIntro({ onComplete }: EliteIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const [currentCityIndex, setCurrentCityIndex] = useState<number>(-1);
  const [citiesVisible, setCitiesVisible] = useState<boolean>(false);
  const [whiteFlash, setWhiteFlash] = useState<boolean>(false);
  const [isEnding, setIsEnding] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          onComplete();
        },
      });

      tl.to(containerRef.current, { opacity: 1, duration: 0.7, ease: 'power2.inOut' });

      tl.to(
        logoRef.current,
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.0, ease: 'power3.out' },
        0.7
      );

      tl.call(() => {
        setCitiesVisible(true);
        runCitySequence();
      }, undefined, 1.8);

      tl.to(logoRef.current, { scale: 1.06, duration: 0.8, ease: 'power2.inOut' }, 5.6);

      tl.call(() => {
        setWhiteFlash(true);
        setTimeout(() => setWhiteFlash(false), 200);
        setIsEnding(true);
      }, undefined, 6.2);

      tl.to({}, { duration: 0.6 });
    }, containerRef);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [onComplete]);

  const runCitySequence = () => {
    let index = 0;
    setCurrentCityIndex(0);

    const interval = setInterval(() => {
      index++;
      if (index < ELITE_CITIES.length) {
        setCurrentCityIndex(index);
      } else {
        clearInterval(interval);
        setCitiesVisible(false);
      }
    }, 500);
  };

  const handleSkip = () => {
    sessionStorage.setItem('introPlayed', 'true');
    document.body.style.overflow = '';
    onComplete();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-between py-8 px-6 sm:px-12 overflow-hidden select-none opacity-0 font-sans"
    >
      <BackgroundVideo />

      <div className="relative z-20 w-full max-w-7xl flex items-center justify-between text-xs text-zinc-300">
        <span className="uppercase tracking-[0.35em] text-[10px] sm:text-xs font-bold text-amber-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
          VOGUE VIBE MODELS • INTRO EXPERIENCE
        </span>
        <button
          onClick={handleSkip}
          className="uppercase tracking-[0.25em] text-[10px] sm:text-xs text-zinc-200 hover:text-amber-400 border border-amber-500/30 hover:border-amber-500/70 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md transition-all focus:outline-none cursor-pointer"
        >
          SKIP EXPERIENCE →
        </button>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center space-y-4 my-auto">
        <IntroLogo ref={logoRef} />
        <CityAnimation currentIndex={currentCityIndex} isVisible={citiesVisible} />
      </div>

      <div className="relative z-20 text-[10px] sm:text-xs text-zinc-300 uppercase tracking-[0.4em] font-medium text-center">
        MILAN • PARIS • LONDON • NEW YORK • TOKYO • DUBAI
      </div>

      <TransitionOverlay isEnding={isEnding} whiteFlash={whiteFlash} />
    </div>
  );
}