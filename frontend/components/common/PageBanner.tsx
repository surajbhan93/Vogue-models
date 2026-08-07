import React from 'react';
import { Sparkles } from 'lucide-react';

interface PageBannerProps {
  message: string;
  actionText?: string;
  actionHref?: string;
}

export function PageBanner({ message, actionText, actionHref }: PageBannerProps) {
  return (
    <div className="bg-gold-500/10 border-y border-gold-500/20 py-3 px-6 text-center text-xs tracking-wider text-gold-300 flex items-center justify-center gap-3">
      <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
      <span>{message}</span>
      {actionText && actionHref && (
        <a href={actionHref} className="underline font-bold text-white hover:text-gold-400 transition-colors">
          {actionText} →
        </a>
      )}
    </div>
  );
}
