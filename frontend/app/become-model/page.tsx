

import React from 'react';
import { Metadata } from 'next';
import { Crown, Sparkles, Globe, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { RegistrationForm } from '@/components/models/RegistrationForm';

export const metadata: Metadata = {
  title: 'Become a Vogue Model | High Fashion Talent Registration',
  description: 'Apply for representation with Vogue Model Management. International fashion shows, brand campaigns, and editorial photoshoots.',
};

export default function BecomeModelPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white relative selection:bg-gold selection:text-black flex flex-col justify-between">
      {/* Top Luxury Navigation Bar */}
      

      {/* Main Content */}
      <main className="flex-1 space-y-12 pb-24">
        {/* Top Hero Section */}
        <section className="pt-6">
          <Hero />
        </section>

        {/* Form Anchor Section */}
        <section id="register" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Official Talent Casting 2026
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
              Submit Your Digital Scouting Card
            </h2>
            <p className="text-gray-400 text-sm">
              No prior modeling experience required. Our bookers evaluate natural beauty and potential.
            </p>
          </div>

          <RegistrationForm />
        </section>
      </main>

      {/* Luxury Footer */}
    
    </div>
  );
}

