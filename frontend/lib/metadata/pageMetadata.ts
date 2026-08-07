import { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auracouture.com';

interface GeneratePageMetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  image,
  keywords = [],
  noIndex = false,
}: GeneratePageMetadataProps): Metadata {
  const fullTitle = `${title} | AURA Couture Global Talent`;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;
  const ogImage = image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&h=630&q=90';

  return {
    title: fullTitle,
    description,
    keywords: [
      'AURA Couture',
      'Modeling Agency',
      'Vogue Vibe Models',
      'High Fashion Talent',
      'Talent Management Agency',
      'Runway Models India & USA',
      ...keywords,
    ],
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-IN': canonicalUrl,
        'en-US': canonicalUrl,
        'en-GB': canonicalUrl,
        'en-AE': canonicalUrl,
        'en-CA': canonicalUrl,
        'en-AU': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: 'AURA Couture Management',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@auracouture',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
    })),
  };
}

export function generateWebPageSchema(title: string, description: string, path: string) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`,
    publisher: {
      '@type': 'Organization',
      name: 'AURA Couture Management',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
  };
}
