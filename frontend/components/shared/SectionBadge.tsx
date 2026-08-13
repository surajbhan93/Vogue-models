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
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-mono font-bold uppercase tracking-widest shadow-sm ${className}`}
    >
      {icon && <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
      <span>{children}</span>
    </span>
  );
}
