'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface HeroBackgroundProps {
  src?: string;
  alt?: string;
  videoSrc?: string;
}

export function HeroBackground({
  src = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=90',
  alt = 'Luxury Fashion Runway Background',
  videoSrc = 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-on-a-runway-41559-large.mp4',
}: HeroBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && videoRef.current) {
      try {
        videoRef.current.playbackRate = 1.25;
      } catch (err) {
        console.error('Playback speed error:', err);
      }
    }
  }, [isMounted]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
      {/* Fallback Fast-Loading High-Res Image (Instant LCP) */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        quality={85}
        sizes="100vw"
        className={`object-cover object-center filter brightness-[0.35] scale-105 transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-30' : 'opacity-100'
        }`}
      />

      {/* High-Performance Fast Background Video */}
      {isMounted && videoSrc && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setIsVideoLoaded(true)}
          poster={src}
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.15] transition-opacity duration-1000 scale-105 pointer-events-none"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Luxury Ambient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-[#030508]/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030508]/80 via-transparent to-[#030508] z-10 pointer-events-none" />

      {/* Radial Gold Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/15 rounded-full blur-[170px] pointer-events-none z-10 animate-pulse" />
    </div>
  );
}

export default HeroBackground;
