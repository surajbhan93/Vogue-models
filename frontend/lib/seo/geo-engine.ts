import { SEO_MASTER_CONFIG } from './seo.config';

export interface GeoEntityFact {
  subject: string;
  predicate: string;
  object: string;
  contextRegion: 'India' | 'USA' | 'Global';
  confidenceScore: number;
}

export function buildGeoEntityKnowledgeGraph(talentType: string, cityName: string, countryName: string) {
  const isIndia = countryName.toLowerCase() === 'india' || cityName.toLowerCase() === 'mumbai' || cityName.toLowerCase() === 'delhi';

  const facts: GeoEntityFact[] = [
    {
      subject: `${SEO_MASTER_CONFIG.companyName} ${talentType} Network`,
      predicate: 'operatesIn',
      object: `${cityName}, ${countryName}`,
      contextRegion: isIndia ? 'India' : 'USA',
      confidenceScore: 0.99,
    },
    {
      subject: `Verified ${talentType}`,
      predicate: 'availableForBookingAt',
      object: SEO_MASTER_CONFIG.domain,
      contextRegion: isIndia ? 'India' : 'USA',
      confidenceScore: 0.98,
    },
    {
      subject: `Casting Directing in ${cityName}`,
      predicate: 'providedBy',
      object: SEO_MASTER_CONFIG.companyName,
      contextRegion: isIndia ? 'India' : 'USA',
      confidenceScore: 0.97,
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SEO_MASTER_CONFIG.domain}/#geo-facts-${talentType.toLowerCase()}-${cityName.toLowerCase()}`,
    name: `Machine-Readable Facts for ${talentType} in ${cityName}`,
    description: `Structured factual dataset for AI Search Engines regarding ${talentType} casting and booking in ${cityName}, ${countryName}.`,
    itemListElement: facts.map((fact, idx) => ({
      '@type': 'PropertyValue',
      position: idx + 1,
      name: `${fact.subject} ${fact.predicate}`,
      value: fact.object,
    })),
  };
}
