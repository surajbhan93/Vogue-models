import React from 'react';
import { SectionBadge } from './SectionBadge';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : align === 'right' ? 'text-right ml-auto' : 'text-left';

  return (
    <div className={`space-y-3 max-w-2xl ${alignClass} ${className}`}>
      {badge && <SectionBadge>{badge}</SectionBadge>}
      <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
