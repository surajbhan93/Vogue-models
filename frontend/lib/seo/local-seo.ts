import { SEO_MASTER_CONFIG, INDIA_CITIES, USA_CITIES, CityLocation } from './seo.config';

export interface LocalBusinessOptions {
  citySlug?: string;
  country?: 'India' | 'USA';
}

export function buildLocalBusinessSchema(options: LocalBusinessOptions = {}) {
  const isUS = options.country === 'USA' || options.citySlug === 'new-york' || options.citySlug === 'los-angeles';
  const city = [...INDIA_CITIES, ...USA_CITIES].find((c) => c.slug === options.citySlug);

  const cityName = city ? city.name : isUS ? 'New York' : 'Mumbai';
  const state = city ? city.state : isUS ? 'NY' : 'Maharashtra';
  const country = city ? city.country : isUS ? 'USA' : 'India';
  const phone = isUS ? SEO_MASTER_CONFIG.contact.phoneUSA : SEO_MASTER_CONFIG.contact.phoneIndia;
  const address = isUS ? SEO_MASTER_CONFIG.contact.addressUSA : SEO_MASTER_CONFIG.contact.addressIndia;
  const lat = city ? city.latitude : isUS ? 40.7128 : 19.076;
  const lng = city ? city.longitude : isUS ? -74.006 : 72.8777;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SEO_MASTER_CONFIG.domain}/#localbusiness-${cityName.toLowerCase().replace(/\s+/g, '-')}`,
    name: `${SEO_MASTER_CONFIG.siteName} (${cityName})`,
    description: `Official modeling agency & casting call office in ${cityName}, ${country}. Book verified female models, male models, commercial actors, and creative talent.`,
    url: `${SEO_MASTER_CONFIG.domain}/city/${cityName.toLowerCase().replace(/\s+/g, '-')}`,
    telephone: phone,
    email: SEO_MASTER_CONFIG.contact.email,
    image: SEO_MASTER_CONFIG.defaultOgImage,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: cityName,
      addressRegion: state,
      addressCountry: country === 'USA' ? 'US' : 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: lat,
      longitude: lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    sameAs: [
      'https://instagram.com/auracouture',
      'https://linkedin.com/company/auracouture',
      'https://twitter.com/auracouture',
    ],
  };
}

export function getCityBySlug(slug: string): CityLocation | undefined {
  return [...INDIA_CITIES, ...USA_CITIES].find((c) => c.slug === slug);
}
