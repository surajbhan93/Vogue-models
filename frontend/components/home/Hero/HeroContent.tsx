'use client';

import React from 'react';
import { SectionBadge } from '@/components/shared/SectionBadge';

interface HeroContentProps {
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  subtitle: string;
}

export function HeroContent({
  badgeText,
  titlePrefix,
  titleHighlight,
  titleSuffix,
  subtitle,
}: HeroContentProps) {
  return (
    <div className="space-y-3.5">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <SectionBadge icon>{badgeText}</SectionBadge>
      </div>

      <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] uppercase animate-in fade-in slide-in-from-bottom-6 duration-1000">
        {titlePrefix}{' '}
        <span className="gold-gradient-text italic font-normal lowercase">
          {titleHighlight}
        </span>{' '}
        {titleSuffix}
      </h1>

      <p className="text-sm md:text-base text-zinc-300 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {subtitle}
      </p>
    </div>
  );
}

export default HeroContent;
