import React from 'react';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Calendar, Shield, Sparkles } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Hire a Model | Client Casting Inquiry',
  description: 'Book international couture, runway, editorial, and commercial models for brand campaigns, fashion week shows, and editorial shoots.',
  path: '/hire-a-model',
});

export default function HireAModelPage() {
  const schema = generateWebPageSchema('Hire a Model', 'Book international couture talent.', '/hire-a-model');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        title="BOOK WORLD-CLASS TALENT"
        subtitle="Connect with our global booking table to secure international talent for Paris, Milan, London & NYC projects."
        badge="EXECUTIVE CASTING DESK"
        breadcrumbs={[{ label: 'Hire a Model' }]}
      />

      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column Info */}
          <div className="lg:col-span-5 space-y-8">
            <SectionTitle
              badge="DIRECT REPRESENTATION"
              title="Tailored Talent Booking"
              subtitle="We streamline client casting, option requests, call-sheets, and usage licensing."
            />

            <div className="space-y-4">
              <div className="glass-panel p-5 border border-gold-500/20 rounded flex items-start gap-4">
                <Calendar className="w-6 h-6 text-gold-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-white text-base">Direct Options & Holds</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                    Request first or second options for specific production dates across Paris, Milan, London, and NYC.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-5 border border-gold-500/20 rounded flex items-start gap-4">
                <Shield className="w-6 h-6 text-gold-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-white text-base">Clear Legal Contracts</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                    Transparent daily rates, usage terms, overtime rates, and image rights licensing.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-5 border border-gold-500/20 rounded flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-gold-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-white text-base">Concierge Travel Logistics</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                    Our team handles visas, international flights, chaperones, and luxury accommodations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Booking Request Form */}
          <div className="lg:col-span-7 glass-panel border border-gold-500/30 p-8 md:p-12 rounded-lg space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white">Client Casting Request Form</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Submit your project details below to receive a curated package of available comp cards and day rates within 2 hours.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-400 mb-1 font-semibold">Client / Brand Name</label>
                  <input type="text" required placeholder="e.g. Dior, Vogue, Cartier" className="w-full bg-obsidian-950 border border-gold-500/30 px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-400 rounded-sm" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-400 mb-1 font-semibold">Casting Director / Contact</label>
                  <input type="text" required placeholder="Your Name" className="w-full bg-obsidian-950 border border-gold-500/30 px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-400 rounded-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-400 mb-1 font-semibold">Executive Email</label>
                  <input type="email" required placeholder="casting@brand.com" className="w-full bg-obsidian-950 border border-gold-500/30 px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-400 rounded-sm" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-400 mb-1 font-semibold">Shoot Location</label>
                  <input type="text" required placeholder="Paris / Milan Studio / Outdoor" className="w-full bg-obsidian-950 border border-gold-500/30 px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-400 rounded-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-400 mb-1 font-semibold">Division Required</label>
                  <select className="w-full bg-obsidian-950 border border-gold-500/30 px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-400 rounded-sm">
                    <option>High Fashion Couture</option>
                    <option>Haute Couture Runway</option>
                    <option>Editorial Cover & Lookbook</option>
                    <option>Commercial & Beauty Campaign</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-400 mb-1 font-semibold">Proposed Dates</label>
                  <input type="text" placeholder="e.g. Oct 12 - Oct 15, 2026" className="w-full bg-obsidian-950 border border-gold-500/30 px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-400 rounded-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-400 mb-1 font-semibold">Project Brief & Usage Scope</label>
                <textarea rows={4} placeholder="Include details on media usage (Print, Billboard, Online), territory (Global, Europe, US), and duration..." className="w-full bg-obsidian-950 border border-gold-500/30 px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400 rounded-sm" />
              </div>

              <Button variant="primary" size="lg" className="w-full">
                SUBMIT CASTING BRIEF NOW
              </Button>
            </form>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
