import { SEO_MASTER_CONFIG } from './seo.config';

export interface TalentProfileSchemaInput {
  name: string;
  slug: string;
  talentCategory: string;
  cityName: string;
  countryName: string;
  height?: string;
  bustBiceps?: string;
  waist?: string;
  hips?: string;
  eyeColor?: string;
  hairColor?: string;
  bio: string;
  heroImage: string;
  rating?: number;
  reviewCount?: number;
  isVerified?: boolean;
}

export const masterSchemaGenerators = {
  organization() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SEO_MASTER_CONFIG.domain}/#organization`,
      name: SEO_MASTER_CONFIG.companyName,
      alternateName: SEO_MASTER_CONFIG.siteName,
      url: SEO_MASTER_CONFIG.domain,
      logo: `${SEO_MASTER_CONFIG.domain}/logo.png`,
      image: SEO_MASTER_CONFIG.defaultOgImage,
      description: SEO_MASTER_CONFIG.defaultDescription,
      email: SEO_MASTER_CONFIG.contact.email,
      telephone: `${SEO_MASTER_CONFIG.contact.phoneIndia}, ${SEO_MASTER_CONFIG.contact.phoneUSA}`,
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: SEO_MASTER_CONFIG.contact.addressIndia,
          addressLocality: 'Mumbai',
          addressRegion: 'MH',
          postalCode: '400051',
          addressCountry: 'IN',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: SEO_MASTER_CONFIG.contact.addressUSA,
          addressLocality: 'New York',
          addressRegion: 'NY',
          postalCode: '10110',
          addressCountry: 'US',
        },
      ],
      sameAs: [
        'https://instagram.com/auracouture',
        'https://linkedin.com/company/auracouture',
        'https://twitter.com/auracouture',
      ],
    };
  },

  webSite() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SEO_MASTER_CONFIG.domain}/#website`,
      url: SEO_MASTER_CONFIG.domain,
      name: SEO_MASTER_CONFIG.siteName,
      publisher: { '@id': `${SEO_MASTER_CONFIG.domain}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SEO_MASTER_CONFIG.domain}/models?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };
  },

  talentPerson(profile: TalentProfileSchemaInput) {
    const profileUrl = `${SEO_MASTER_CONFIG.domain}/models/${profile.slug}`;
    const ratingVal = profile.rating || 4.9;
    const reviewsVal = profile.reviewCount || 24;

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${profileUrl}#person`,
          name: profile.name,
          jobTitle: profile.talentCategory,
          description: profile.bio,
          url: profileUrl,
          image: profile.heroImage,
          height: profile.height,
          workLocation: {
            '@type': 'Place',
            name: `${profile.cityName}, ${profile.countryName}`,
          },
          worksFor: { '@id': `${SEO_MASTER_CONFIG.domain}/#organization` },
          knowsAbout: [profile.talentCategory, 'Fashion Runway', 'Commercial Acting', 'Brand Campaigns'],
        },
        {
          '@type': 'ProfilePage',
          '@id': profileUrl,
          url: profileUrl,
          name: `${profile.name} - ${profile.talentCategory} in ${profile.cityName}`,
          mainEntity: { '@id': `${profileUrl}#person` },
          isPartOf: { '@id': `${SEO_MASTER_CONFIG.domain}/#website` },
        },
        {
          '@type': 'ProfessionalService',
          '@id': `${profileUrl}#service`,
          name: `${profile.name} Booking Services`,
          image: profile.heroImage,
          url: profileUrl,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: ratingVal,
            reviewCount: reviewsVal,
            bestRating: '5',
            worstRating: '1',
          },
        },
      ],
    };
  },

  breadcrumbs(items: { name: string; item: string }[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.item.startsWith('http') ? crumb.item : `${SEO_MASTER_CONFIG.domain}${crumb.item.startsWith('/') ? crumb.item : `/${crumb.item}`}`,
      })),
    };
  },

  faqPage(faqs: { question: string; answer: string }[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  },

  itemList(title: string, description: string, items: { name: string; url: string; image?: string }[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: title,
      description,
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url.startsWith('http') ? item.url : `${SEO_MASTER_CONFIG.domain}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
        image: item.image,
      })),
    };
  },
};
