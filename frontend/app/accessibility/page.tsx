import React from 'react';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { ContentSection } from '@/components/common/ContentSection';

export const metadata = generatePageMetadata({
  title: 'Accessibility Statement (WCAG 2.1 AA)',
  description: 'Our commitment to web accessibility and providing an inclusive experience for all users.',
  path: '/accessibility',
});

export default function AccessibilityPage() {
  const schema = generateWebPageSchema('Accessibility', 'Web accessibility commitment.', '/accessibility');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        title="WEB ACCESSIBILITY STATEMENT"
        subtitle="Ensuring our digital talent platform meets WCAG 2.1 Level AA accessibility standards."
        badge="INCLUSIVE DESIGN"
        breadcrumbs={[{ label: 'Accessibility' }]}
      />

      <PageContainer>
        <ContentSection>
          <h2 className="font-serif text-2xl font-bold text-white">Our Accessibility Commitment</h2>
          <p>
            AURA Couture is dedicated to ensuring digital accessibility for individuals with disabilities. We continually refine user experience, color contrast ratios, screen reader navigation, and keyboard controls to align with WCAG 2.1 AA benchmarks.
          </p>
        </ContentSection>
      </PageContainer>
    </>
  );
}
