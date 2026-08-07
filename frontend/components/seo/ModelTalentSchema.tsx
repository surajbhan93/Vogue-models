import React from 'react';
import { JsonLd } from './JsonLd';
import { masterSchemaGenerators, TalentProfileSchemaInput } from '@/lib/seo/schema-builder';
import { buildGeoEntityKnowledgeGraph } from '@/lib/seo/geo-engine';

interface ModelTalentSchemaProps {
  profile: TalentProfileSchemaInput;
}

export function ModelTalentSchema({ profile }: ModelTalentSchemaProps) {
  const personSchema = masterSchemaGenerators.talentPerson(profile);
  const breadcrumbsSchema = masterSchemaGenerators.breadcrumbs([
    { name: 'Talent', item: '/models' },
    { name: profile.talentCategory, item: `/categories` },
    { name: profile.cityName, item: `/city/${profile.cityName.toLowerCase()}` },
    { name: profile.name, item: `/models/${profile.slug}` },
  ]);
  const geoKnowledgeGraph = buildGeoEntityKnowledgeGraph(profile.talentCategory, profile.cityName, profile.countryName);

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={breadcrumbsSchema} />
      <JsonLd data={geoKnowledgeGraph} />
    </>
  );
}
