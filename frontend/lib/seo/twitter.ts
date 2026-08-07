import { Metadata } from 'next';
import { SEO_CONFIG } from '../config/seo-config';

export interface TwitterOptions {
  title?: string;
  description?: string;
  image?: string;
  card?: 'summary' | 'summary_large_image' | 'player' | 'app';
}

export function buildTwitterMetadata(options: TwitterOptions = {}): Metadata['twitter'] {
  return {
    card: options.card || 'summary_large_image',
    title: options.title || SEO_CONFIG.defaultTitle,
    description: options.description || SEO_CONFIG.defaultDescription,
    site: SEO_CONFIG.twitterHandle,
    creator: SEO_CONFIG.twitterHandle,
    images: [options.image || SEO_CONFIG.defaultOgImage],
  };
}
