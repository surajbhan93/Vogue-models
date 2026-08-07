'use client';

import React from 'react';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import HeroButtons from './HeroButtons';
import { HERO_CONSTANTS } from '@/constants/home';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <HeroBackground
        src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=90"
        alt="Luxury Fashion Runway Background"
        videoSrc="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-on-a-runway-41559-large.mp4"
      />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 mt-12">
        <HeroContent
          badgeText={HERO_CONSTANTS.badge}
          titlePrefix={HERO_CONSTANTS.titlePrefix}
          titleHighlight={HERO_CONSTANTS.titleHighlight}
          titleSuffix={HERO_CONSTANTS.titleSuffix}
          subtitle={HERO_CONSTANTS.subtitle}
        />
        <HeroButtons
          primaryText={HERO_CONSTANTS.ctaPrimaryText}
          primaryHref="/models"
          secondaryText={HERO_CONSTANTS.ctaSecondaryText}
          secondaryHref="/become-a-model"
        />
      </div>
    </section>
  );
}

export default Hero;
