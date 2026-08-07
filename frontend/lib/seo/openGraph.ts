import { Metadata } from 'next';
import { SEO_CONFIG } from '../config/seo-config';

export interface OpenGraphOptions {
  title?: string;
  description?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  gender?: string;
}

export function buildOpenGraphMetadata(options: OpenGraphOptions = {}): Metadata['openGraph'] {
  const title = options.title || SEO_CONFIG.defaultTitle;
  const description = options.description || SEO_CONFIG.defaultDescription;
  const url = options.url || SEO_CONFIG.domain;
  const image = options.image || SEO_CONFIG.defaultOgImage;
  const type = options.type || 'website';

  const baseOg: Metadata['openGraph'] = {
    title,
    description,
    url,
    siteName: SEO_CONFIG.siteName,
    locale: SEO_CONFIG.locale,
    type,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
        type: 'image/jpeg',
      },
    ],
  };

  if (type === 'article') {
    return {
      ...baseOg,
      type: 'article',
      publishedTime: options.publishedTime,
      modifiedTime: options.modifiedTime,
      authors: options.authors || [SEO_CONFIG.companyName],
    };
  }

  return baseOg;
}
