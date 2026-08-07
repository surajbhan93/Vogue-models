import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionBadge } from '@/components/shared/SectionBadge';

interface CTASectionProps {
  badge?: string;
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export function CTASection({
  badge = 'Elevate Your Vision',
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
}: CTASectionProps) {
  return (
    <div className="relative glass-panel border border-gold-500/30 p-10 md:p-16 overflow-hidden text-center space-y-6 rounded-lg my-12">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

      {badge && <SectionBadge>{badge}</SectionBadge>}

      <h2 className="font-serif text-3xl md:text-5xl font-bold text-white max-w-2xl mx-auto leading-tight">
        {title}
      </h2>

      <p className="text-zinc-300 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light">
        {description}
      </p>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href={primaryButtonHref} className="w-full sm:w-auto">
          <Button variant="primary" size="lg" className="w-full sm:w-auto">
            {primaryButtonText}
          </Button>
        </Link>
        {secondaryButtonText && secondaryButtonHref && (
          <Link href={secondaryButtonHref} className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {secondaryButtonText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
