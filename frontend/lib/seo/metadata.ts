import { Metadata } from 'next';
import { SEO_CONFIG } from '../config/seo-config';
import { buildCanonicalUrl } from './canonical';
import { buildHreflangAlternates } from './hreflang';
import { buildOpenGraphMetadata, OpenGraphOptions } from './openGraph';
import { buildTwitterMetadata, TwitterOptions } from './twitter';

export interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  image?: string;
  noIndex?: boolean;
  ogOptions?: OpenGraphOptions;
  twitterOptions?: TwitterOptions;
  authors?: { name: string; url?: string }[];
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Universal Next.js 16 App Router Metadata Generator
 */
export function constructMetadata(options: GenerateMetadataOptions = {}): Metadata {
  const title = options.title
    ? `${options.title} | ${SEO_CONFIG.siteName}`
    : SEO_CONFIG.defaultTitle;
  const description = options.description || SEO_CONFIG.defaultDescription;
  const keywords = options.keywords || SEO_CONFIG.defaultKeywords;
  const path = options.path || '';
  const canonicalUrl = buildCanonicalUrl(path);
  const alternates = buildHreflangAlternates(path);

  const og = buildOpenGraphMetadata({
    title: options.title || SEO_CONFIG.defaultTitle,
    description,
    url: canonicalUrl,
    image: options.image || SEO_CONFIG.defaultOgImage,
    type: options.type || 'website',
    publishedTime: options.publishedTime,
    modifiedTime: options.modifiedTime,
    ...options.ogOptions,
  });

  const twitter = buildTwitterMetadata({
    title: options.title || SEO_CONFIG.defaultTitle,
    description,
    image: options.image || SEO_CONFIG.defaultOgImage,
    ...options.twitterOptions,
  });

  return {
    metadataBase: new URL(SEO_CONFIG.domain),
    title,
    description,
    keywords,
    authors: options.authors || [{ name: SEO_CONFIG.companyName, url: SEO_CONFIG.domain }],
    creator: SEO_CONFIG.companyName,
    publisher: SEO_CONFIG.companyName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
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
    openGraph: og,
    twitter,
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: '/manifest.json',
    verification: {
      google: SEO_CONFIG.verification.google,
      yandex: SEO_CONFIG.verification.yandex,
      other: {
        'msvalidate.01': SEO_CONFIG.verification.bing,
      },
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: SEO_CONFIG.siteName,
    },
  };
}
