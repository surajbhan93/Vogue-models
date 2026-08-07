import { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auracouture.com';

export function generateHomeMetadata(): Metadata {
  const title = 'AURA Couture | Premier Global Modeling & Talent Agency';
  const description =
    'Connecting haute couture brands with world-class editorial, runway, and commercial talent across Paris, Milan, London & New York since 2012.';

  return {
    title,
    description,
    keywords: [
      'Modeling Agency',
      'Haute Couture',
      'Runway Models',
      'Editorial Models',
      'Paris Fashion Week',
      'Milan Fashion Week',
      'Luxury Model Management',
    ],
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: 'AURA Couture',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&h=630&q=90',
          width: 1200,
          height: 630,
          alt: 'AURA Couture Global Modeling Agency',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&h=630&q=90'],
      creator: '@auracouture',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateHomeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'AURA Couture Management',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        sameAs: [
          'https://instagram.com/auracouture',
          'https://twitter.com/auracouture',
          'https://linkedin.com/company/auracouture',
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Milan',
          addressCountry: 'IT',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'AURA Couture',
        description: 'Premier Global Modeling & Talent Agency',
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
        ],
      },
    ],
  };
}
