import React from 'react';
import { cn } from '@/lib/utils';

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn('glass-panel rounded-2xl p-6 transition-all duration-300 hover:border-zinc-700', className)}>
    {children}
  </div>
);
