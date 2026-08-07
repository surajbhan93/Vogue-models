import React from 'react';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';

export const metadata = generatePageMetadata({
  title: 'Press Coverage & Media Kit',
  description: 'Official press releases, Vogue coverage, media contact, and downloadable media kits for AURA Couture.',
  path: '/press',
});

export default function PressPage() {
  const schema = generateWebPageSchema('Press & Media', 'Official press coverage.', '/press');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        title="PRESS COVERAGE & MEDIA ROOM"
        subtitle="Media inquiries, press releases, and editorial coverage featuring AURA Couture talent worldwide."
        badge="MEDIA ROOM"
        breadcrumbs={[{ label: 'Press' }]}
      />

      <PageContainer>
        <SectionTitle
          badge="MEDIA INQUIRIES"
          title="Press Contact & Assets"
          subtitle="For interview requests, executive commentary, or image licensing press kits, contact press@auracouture.com."
        />
      </PageContainer>
    </>
  );
}
