import React from 'react';
import { SectionBadge } from '@/components/shared/SectionBadge';

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionTitle({
  badge,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionTitleProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : align === 'right' ? 'text-right ml-auto' : 'text-left';

  return (
    <div className={`space-y-3 max-w-3xl ${alignClass} ${className}`}>
      {badge && <SectionBadge>{badge}</SectionBadge>}
      <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
