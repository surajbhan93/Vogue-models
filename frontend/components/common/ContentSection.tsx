import React from 'react';

interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentSection({ children, className = '' }: ContentSectionProps) {
  return (
    <div className={`glass-panel border border-gold-500/20 p-8 md:p-12 rounded-lg space-y-6 text-zinc-300 leading-relaxed font-light ${className}`}>
      {children}
    </div>
  );
}
