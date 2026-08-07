'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { SectionBadge } from '@/components/shared/SectionBadge';

export function CTA() {
  return (
    <SectionContainer>
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 p-10 md:p-16 overflow-hidden text-center space-y-6 shadow-2xl">
        {/* Glow Background Effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-widest mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Apply as a Creative Talent
        </div>

        <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-white max-w-3xl mx-auto leading-tight tracking-tight">
          Ready to Launch Your Global Talent Career?
        </h2>

        <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
          We are actively scouting models, actors, singers, painters, dancers, and musicians for upcoming international fashion weeks, film castings, live performances, and brand campaigns.
        </p>

        <div className="pt-4 flex items-center justify-center">
          <Link href="/become-model">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-2xl hover:from-amber-200 hover:to-amber-400 shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Apply for Scouting Now</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}