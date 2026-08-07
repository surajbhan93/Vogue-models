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
    <div className="space-y-8">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <SectionBadge icon>{badgeText}</SectionBadge>
      </div>

      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none uppercase animate-in fade-in slide-in-from-bottom-6 duration-1000">
        {titlePrefix}{' '}
        <span className="gold-gradient-text italic font-normal lowercase">
          {titleHighlight}
        </span>{' '}
        {titleSuffix}
      </h1>

      <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {subtitle}
      </p>
    </div>
  );
}

export default HeroContent;
