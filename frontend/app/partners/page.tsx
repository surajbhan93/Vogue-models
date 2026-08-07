import React from 'react';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';

export const metadata = generatePageMetadata({
  title: 'Global Partners & Brand Collaborations',
  description: 'AURA Couture maintains strategic partnerships with world-leading fashion houses, magazine publications, and cosmetics conglomerates.',
  path: '/partners',
});

const PARTNERS_LIST = ['Vogue Italia', 'Chanel Haute Couture', 'Dior Paris', 'Saint Laurent', 'Tom Ford Beauty', 'Harper’s Bazaar'];

export default function PartnersPage() {
  const schema = generateWebPageSchema('Partners', 'Global fashion brand partners.', '/partners');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        title="GLOBAL BRAND PARTNERSHIPS"
        subtitle="Collaborating with the world's most prestigious fashion houses and editorial publications."
        badge="LUXURY PARTNERS"
        breadcrumbs={[{ label: 'Partners' }]}
      />

      <PageContainer>
        <SectionTitle
          badge="PREFERRED AGENCY PARTNER"
          title="Industry Alliance"
          subtitle="Providing curated talent for flagship global fashion campaigns."
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {PARTNERS_LIST.map((partner, idx) => (
            <div key={idx} className="glass-panel border border-gold-500/20 p-8 rounded text-center flex items-center justify-center font-serif text-xl font-bold text-white hover:border-gold-500/50 transition-colors">
              {partner}
            </div>
          ))}
        </div>
      </PageContainer>
    </>
  );
}
