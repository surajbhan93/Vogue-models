import { Metadata } from 'next';
import { SEO_MASTER_CONFIG } from './seo.config';
import { getCanonicalUrl, getHreflangAlternates } from './technical-seo';

export interface PageMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

export function generatePageMetadata(options: PageMetadataOptions = {}): Metadata {
  const title = options.title
    ? `${options.title} | ${SEO_MASTER_CONFIG.siteName}`
    : SEO_MASTER_CONFIG.defaultTitle;
  const description = options.description || SEO_MASTER_CONFIG.defaultDescription;
  const keywords = options.keywords || SEO_MASTER_CONFIG.defaultKeywords;
  const path = options.path || '';
  const canonicalUrl = getCanonicalUrl(path);
  const alternates = getHreflangAlternates(path);
  const image = options.image || SEO_MASTER_CONFIG.defaultOgImage;

  return {
    metadataBase: new URL(SEO_MASTER_CONFIG.domain),
    title,
    description,
    keywords,
    authors: (options.authors || [SEO_MASTER_CONFIG.companyName]).map((a) => ({ name: a })),
    creator: SEO_MASTER_CONFIG.companyName,
    publisher: SEO_MASTER_CONFIG.companyName,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    robots: {
      index: !options.noIndex,
      follow: !options.noIndex,
      googleBot: {
        index: !options.noIndex,
        follow: !options.noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SEO_MASTER_CONFIG.siteName,
      locale: 'en_IN',
      type: options.type || 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: SEO_MASTER_CONFIG.twitterHandle,
      images: [image],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
    verification: {
      google: SEO_MASTER_CONFIG.verification.google,
      other: {
        'msvalidate.01': SEO_MASTER_CONFIG.verification.bing,
      },
    },
  };
}
