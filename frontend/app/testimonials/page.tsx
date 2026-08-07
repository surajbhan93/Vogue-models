import React from 'react';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Star } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Client Endorsements & Testimonials',
  description: 'Testimonials from international casting directors, fashion houses, and luxury brands on working with AURA Couture.',
  path: '/testimonials',
});

const ENDORSEMENTS = [
  {
    quote: 'AURA Couture models possess an irreplaceable combination of timeless elegance and contemporary versatility. They are our first call every Paris Fashion Week.',
    author: 'Jean-Luc Moreau',
    role: 'Casting Director',
    company: 'Haute Couture Paris',
  },
  {
    quote: 'The professionalism, legal clarity, and preparation of AURA talent on set in Milan is unmatched in the luxury campaign industry.',
    author: 'Elena Rossi',
    role: 'Creative Director',
    company: 'Vogue Italia Shoots',
  },
  {
    quote: 'From runway coordination to global media licensing, AURA Couture manages talent logistics flawlessly across continents.',
    author: 'David Sterling',
    role: 'Global Marketing VP',
    company: 'Luxury Fragrance House NYC',
  },
];

export default function TestimonialsPage() {
  const schema = generateWebPageSchema('Testimonials', 'Client endorsements for AURA Couture.', '/testimonials');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        title="CLIENT ENDORSEMENTS"
        subtitle="Feedback from international fashion houses, luxury campaign producers, and casting directors."
        badge="REPUTATION & INTEGRITY"
        breadcrumbs={[{ label: 'Testimonials' }]}
      />

      <PageContainer>
        <SectionTitle
          badge="INDUSTRY TRUST"
          title="What Global Casting Directors Say"
          subtitle="Building long-term partnerships with the world's most prestigious fashion brands."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ENDORSEMENTS.map((item, idx) => (
            <div key={idx} className="glass-panel border border-gold-500/20 p-8 rounded-lg space-y-6 flex flex-col justify-between">
              <div className="flex space-x-1 text-gold-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400" />
                ))}
              </div>
              <blockquote className="font-serif text-lg italic text-zinc-200 leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="border-t border-gold-500/10 pt-4">
                <h4 className="text-sm font-bold text-gold-400 uppercase tracking-widest">{item.author}</h4>
                <p className="text-xs text-zinc-400 uppercase tracking-wider">{item.role}, {item.company}</p>
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </>
  );
}
