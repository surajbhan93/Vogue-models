'use client';

import React from 'react';
import Image from 'next/image';
import { Globe, Award, ShieldCheck, Sparkles, Star, CheckCircle2 } from 'lucide-react';
import { WHY_CHOOSE_US_DATA } from '@/constants/home';
import { SectionBadge } from '@/components/shared/SectionBadge';

export function WhyChooseUs() {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-stone-50 to-amber-50/40 py-24 border-y border-amber-500/20 overflow-hidden">
      {/* Light Luxury Studio Ambient Background Lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-200/30 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-100/40 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Copy & Stats */}
        <div className="space-y-8">
          <SectionBadge className="bg-amber-500/10 text-amber-800 border-amber-500/30">
            {WHY_CHOOSE_US_DATA.badge}
          </SectionBadge>

          <h2 className="font-serif text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {WHY_CHOOSE_US_DATA.heading}
          </h2>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
            {WHY_CHOOSE_US_DATA.description}
          </p>

          {/* Quick Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              'Scouting across 40+ Countries',
              'Legal Contract Safeguards',
              'Direct Casting Director Access',
              'Dedicated Portfolio Bookers'
            ].map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Light Glass Stat Cards */}
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="p-6 rounded-3xl bg-white/80 border border-amber-500/20 backdrop-blur-xl shadow-xl shadow-amber-950/5 space-y-2 hover:border-amber-500/40 transition-all duration-300">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-2xl font-serif font-extrabold text-slate-900">4 Capitals</h4>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Milan • Paris • London • NYC
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/80 border border-amber-500/20 backdrop-blur-xl shadow-xl shadow-amber-950/5 space-y-2 hover:border-amber-500/40 transition-all duration-300">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-2xl font-serif font-extrabold text-slate-900">120+ Covers</h4>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Vogue, Elle &amp; Bazaar Covers
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero High Fashion Image */}
        <div className="relative">
          {/* Decorative Back Accent Glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400/20 via-amber-200/30 to-purple-300/20 rounded-[40px] blur-2xl -z-10" />

          <div className="aspect-[4/5] rounded-[32px] border border-amber-500/30 overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.12)] bg-white">
            <Image
              src={WHY_CHOOSE_US_DATA.image}
              alt="Behind the scenes high fashion shoot"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            
            {/* Seamless Light Gradient Bottom Blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

            {/* Floating Safety & Verification Glass Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/90 border border-white/60 backdrop-blur-2xl shadow-2xl space-y-2">
              <div className="flex items-center space-x-2.5 text-amber-700">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-xs uppercase tracking-widest font-extrabold text-slate-900">
                  {WHY_CHOOSE_US_DATA.safetyTitle || 'Verified & Secure Management'}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {WHY_CHOOSE_US_DATA.safetyText}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}