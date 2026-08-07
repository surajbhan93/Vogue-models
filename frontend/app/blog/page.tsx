import React from 'react';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = generatePageMetadata({
  title: 'Fashion Journal & Industry Insights',
  description: 'Insights on international model scouting, Paris Fashion Week highlights, runway trends, and career advice.',
  path: '/blog',
});

const ARTICLES = [
  {
    title: 'Navigating Paris Fashion Week SS26: Behind the Scenes with AURA Talent',
    category: 'Fashion Week',
    date: 'July 24, 2026',
    excerpt: 'An exclusive look into model casting routines, fitting schedules, and backstage prep during Haute Couture week.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'The Evolution of High Fashion Scouting: What Casting Directors Look For Today',
    category: 'Scouting Insights',
    date: 'July 18, 2026',
    excerpt: 'How versatility, strong runway technique, and authentic digital polaroids shape success in global capitals.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Model Welfare & Legal Standards: Building Sustainable International Careers',
    category: 'Agency Ethics',
    date: 'July 10, 2026',
    excerpt: 'Why strict legal protection, transparent contract management, and mental health support matter in modeling.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
  },
];

export default function BlogPage() {
  const schema = generateWebPageSchema('Fashion Journal', 'Industry insights and editorial articles.', '/blog');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        title="FASHION JOURNAL & INSIGHTS"
        subtitle="Behind the scenes analysis, model spotlights, scouting guides, and industry news."
        badge="EDITORIAL JOURNAL"
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <PageContainer>
        <SectionTitle
          badge="LATEST DISPATCHES"
          title="Industry Perspectives"
          subtitle="Read analysis from our global scouting and booking directors in Milan and Paris."
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((art, idx) => (
            <div key={idx} className="glass-panel border border-gold-500/20 rounded-lg overflow-hidden flex flex-col justify-between group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={art.image} alt={art.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-gold-500/90 text-black px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-sm">{art.category}</div>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-1">{art.date}</span>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-300 transition-colors leading-snug">{art.title}</h3>
                  <p className="text-xs text-zinc-400 font-light mt-2 leading-relaxed">{art.excerpt}</p>
                </div>
                <div className="pt-4 border-t border-gold-500/10">
                  <span className="text-xs text-gold-400 font-bold uppercase tracking-widest group-hover:text-white transition-colors">Read Article →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </>
  );
}
