import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center bg-obsidian-950">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 glass-panel border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-[0.3em] rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>404 ERROR</span>
        </div>

        <h1 className="font-serif text-6xl md:text-8xl font-bold text-white tracking-tight">
          LOOKBOOK <span className="gold-gradient-text italic font-normal">NOT</span> FOUND
        </h1>

        <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed">
          The editorial page or comp card portfolio you are seeking has been moved, archived, or is private.
        </p>

        <div className="pt-4 flex justify-center gap-4">
          <Link href="/">
            <Button variant="primary" size="lg">
              RETURN TO HOME
            </Button>
          </Link>
          <Link href="/models">
            <Button variant="outline" size="lg">
              BROWSE TALENT ROSTER
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
