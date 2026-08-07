import { SEO_MASTER_CONFIG, TARGET_REGIONS } from './seo.config';

export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const normalized = cleanPath === '/' ? '' : cleanPath.replace(/\/$/, '');
  return `${SEO_MASTER_CONFIG.domain}${normalized}`;
}

export function getHreflangAlternates(path: string = ''): Record<string, string> {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const normalized = cleanPath === '/' ? '' : cleanPath.replace(/\/$/, '');
  const baseUrl = SEO_MASTER_CONFIG.domain;

  const alternates: Record<string, string> = {};

  Object.values(TARGET_REGIONS).forEach((region) => {
    alternates[region.hreflang] = `${baseUrl}${normalized}`;
  });

  alternates['x-default'] = `${baseUrl}${normalized}`;
  return alternates;
}

export const TECHNICAL_SEO_HEADERS = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
];
