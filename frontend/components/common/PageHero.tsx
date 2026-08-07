import React from 'react';
import Image from 'next/image';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';
import { SectionBadge } from '@/components/shared/SectionBadge';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  bgImage?: string;
  breadcrumbs: BreadcrumbItem[];
}

export function PageHero({
  title,
  subtitle,
  badge,
  bgImage = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=90',
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[45vh] flex items-center justify-center pt-32 pb-16 overflow-hidden border-b border-gold-500/15">
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          quality={85}
          className="object-cover object-center filter brightness-[0.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
        <div className="flex justify-center">
          <Breadcrumb items={breadcrumbs} />
        </div>

        {badge && (
          <div>
            <SectionBadge icon>{badge}</SectionBadge>
          </div>
        )}

        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
