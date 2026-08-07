import React from 'react';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { ContentSection } from '@/components/common/ContentSection';

export const metadata = generatePageMetadata({
  title: 'Cancellation & Weather Permit Policy',
  description: 'Shoot cancellation terms, lead time requirements, and weather-permitting reschedule rules.',
  path: '/cancellation-policy',
});

export default function CancellationPolicyPage() {
  const schema = generateWebPageSchema('Cancellation Policy', 'Cancellation & reschedule rules.', '/cancellation-policy');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        title="CANCELLATION & WEATHER PERMIT POLICY"
        subtitle="Operational rules regarding shoot cancellations, lead times, and weather holds."
        badge="AGENCY POLICY"
        breadcrumbs={[{ label: 'Cancellation Policy' }]}
      />

      <PageContainer>
        <ContentSection>
          <h2 className="font-serif text-2xl font-bold text-white">Cancellation Lead Times</h2>
          <p>
            Cancellations made within 24 hours of scheduled call time require 100% payment of agreed daily rates plus incurred international travel expenses. Cancellations made between 24 and 72 hours require 50% daily rate compensation.
          </p>
        </ContentSection>
      </PageContainer>
    </>
  );
}
