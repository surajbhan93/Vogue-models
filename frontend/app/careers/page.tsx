import React from 'react';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Button } from '@/components/ui/button';

export const metadata = generatePageMetadata({
  title: 'Careers at AURA Couture | Open Positions',
  description: 'Join our team of international model scouts, booking agents, digital campaign strategists, and fashion coordinators.',
  path: '/careers',
});

const POSITIONS = [
  { title: 'Senior High Fashion Booking Agent', location: 'Milan Bureau', type: 'Full-time' },
  { title: 'International Model Scout', location: 'Paris Office', type: 'Full-time' },
  { title: 'Digital Polaroid & Portfolio Coordinator', location: 'London Office', type: 'Full-time' },
  { title: 'Legal & Model Welfare Officer', location: 'NYC Office', type: 'Full-time' },
];

export default function CareersPage() {
  const schema = generateWebPageSchema('Careers', 'Open positions at AURA Couture.', '/careers');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        title="JOIN OUR GLOBAL AGENCY TEAM"
        subtitle="Shape the future of haute couture talent management in Milan, Paris, London, and New York."
        badge="CAREER OPPORTUNITIES"
        breadcrumbs={[{ label: 'Careers' }]}
      />

      <PageContainer>
        <SectionTitle
          badge="CURRENT VACANCIES"
          title="Open Positions"
          subtitle="Explore agency opportunities across our global booking tables."
          className="mb-12"
        />

        <div className="space-y-4">
          {POSITIONS.map((pos, idx) => (
            <div key={idx} className="glass-panel border border-gold-500/20 p-6 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">{pos.title}</h3>
                <p className="text-xs text-zinc-400 mt-1">{pos.location} • {pos.type}</p>
              </div>
              <Button variant="outline" size="sm">Apply Position</Button>
            </div>
          ))}
        </div>
      </PageContainer>
    </>
  );
}
