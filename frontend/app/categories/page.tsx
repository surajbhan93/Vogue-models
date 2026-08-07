import React from 'react';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Categories as CategoriesSection } from '@/components/home/Categories/Categories';
import { CATEGORIES_DATA } from '@/constants/home';

export const metadata = generatePageMetadata({
  title: 'Agency Divisions & Categories',
  description: 'Explore specialized model divisions including High Fashion, Haute Couture Runway, Editorial, Menswear, and Commercial Beauty.',
  path: '/categories',
});

export default function CategoriesPage() {
  const schema = generateWebPageSchema('Agency Divisions', 'Model representation categories.', '/categories');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        title="SPECIALIZED MODEL DIVISIONS"
        subtitle="Dedicated scouting and representation boards matching global brand needs."
        badge="DIVISIONS INDEX"
        breadcrumbs={[{ label: 'Divisions' }]}
      />

      <PageContainer>
        <CategoriesSection categories={CATEGORIES_DATA} />
      </PageContainer>
    </>
  );
}
