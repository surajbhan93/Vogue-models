import React from 'react';
import { Metadata } from 'next';
import { Crown, Sparkles, Globe, Shield, ArrowLeft, CheckCircle2, Award, Star } from 'lucide-react';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { RegistrationForm } from '@/components/models/RegistrationForm';

export const metadata: Metadata = {
  title: 'Become a Vogue Model & Actor | High Fashion Talent Representation 2026',
  description: 'Apply for representation with Vogue Model & Talent Management. International fashion shows, brand campaigns, cinema casting, and editorial photoshoots.',
};

export default function BecomeModelPage() {
  return (
    <div className="min-h-screen bg-[#070709] text-white relative selection:bg-amber-400 selection:text-black flex flex-col justify-between overflow-x-hidden">
      
      {/* 🌟 LUXURY EDITORIAL BACKGROUND IMAGE & AMBIENT GLOWS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1920&auto=format&fit=crop"
          alt="Luxury Vogue Backdrop"
          className="w-full h-full object-cover object-top opacity-20 filter brightness-75 contrast-125 saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/90 via-[#070709]/85 to-[#070709]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-600/10 blur-[160px] rounded-full" />
      </div>

      {/* Navigation Return Button Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase backdrop-blur-md">
          <Crown className="w-3.5 h-3.5 text-amber-400" /> Vogue Casting Portal
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 space-y-12 pb-24">
        
        {/* Top Hero Section */}
        <section className="pt-2">
          <Hero />
        </section>

        {/* 🏆 GLOBAL AGENCY PARTNERS TICKER STRIP */}
        <section className="border-y border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
              Vogue Represented Talent Featured In
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 text-sm font-serif font-bold text-zinc-300 tracking-wider">
              <span>VOGUE PARIS</span>
              <span>HARPER'S BAZAAR</span>
              <span>PARIS FASHION WEEK</span>
              <span>CANNES FILM FESTIVAL</span>
              <span>ELLE MAGAZINE</span>
              <span>GQ EDITORIAL</span>
            </div>
          </div>
        </section>

        {/* Form Anchor Section */}
        <section id="register" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              Official Vogue Scouting Roster 2026
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Submit Your Digital Scouting Profile
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
              No prior agency experience required. Our international bookers evaluate natural charisma, potential, and creative talent.
            </p>
          </div>

          {/* Real API Registration Form */}
          <RegistrationForm />
        </section>

        {/* 🔒 AGENCY GUARANTEE TRUST CARDS */}
        <section className="max-w-5xl mx-auto px-4 pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center space-y-2 backdrop-blur-md">
              <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-white">100% Free Scouting</h4>
              <p className="text-xs text-zinc-400">Vogue never charges registration or evaluation fees for talent representation.</p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center space-y-2 backdrop-blur-md">
              <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-white">Verified Representation</h4>
              <p className="text-xs text-zinc-400">Direct connections to top luxury fashion houses, film studios, and record labels.</p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center space-y-2 backdrop-blur-md">
              <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-white">Global Reach</h4>
              <p className="text-xs text-zinc-400">Placements across Paris, Milan, New York, London, Hollywood, and Tokyo.</p>
            </div>
          </div>
        </section>

      </main>

      {/* Luxury Footer */}
      <footer className="relative z-10 border-t border-zinc-800/80 bg-zinc-950 py-6 px-6 text-center text-xs text-zinc-500 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img
            src="http://images.unsplash.com/photo-1568535904307-f48b760a39f3?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Footer Background"
            className="w-full h-full object-cover object-center opacity-35 filter brightness-75 contrast-125 saturate-50 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/85 to-zinc-950/95" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px]">
          <div>© 2026 VOGUE MODEL & TALENT MANAGEMENT • GLOBAL SCOUTING</div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>PARIS</span> • <span>MILAN</span> • <span>NEW YORK</span> • <span>LONDON</span> • <span>TOKYO</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
