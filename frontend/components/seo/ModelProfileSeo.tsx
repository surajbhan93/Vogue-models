import React from 'react';
import { ModelProfile } from '@/lib/data/mock-db';
import { JsonLd } from './JsonLd';
import { schemaGenerators } from '@/lib/seo/schema';

interface ModelProfileSeoProps {
  model: ModelProfile;
}

export function ModelProfileSeo({ model }: ModelProfileSeoProps) {
  const modelSchema = schemaGenerators.modelProfile(model);
  const breadcrumbsSchema = schemaGenerators.breadcrumbs([
    { name: 'Models', item: '/models' },
    { name: model.categoryName, item: `/category/${model.categorySlug}` },
    { name: model.cityName, item: `/city/${model.citySlug}` },
    { name: model.name, item: `/models/${model.slug}` },
  ]);

  return (
    <>
      <JsonLd data={modelSchema} />
      <JsonLd data={breadcrumbsSchema} />
    </>
  );
}
