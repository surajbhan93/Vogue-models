import React from 'react';
import { Sparkles } from 'lucide-react';

interface SectionBadgeProps {
  children: React.ReactNode;
  icon?: boolean;
  className?: string;
}

export function SectionBadge({ children, icon = false, className = '' }: SectionBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 glass-panel border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-[0.3em] ${className}`}
    >
      {icon && <Sparkles className="w-3.5 h-3.5" />}
      <span>{children}</span>
    </span>
  );
}
