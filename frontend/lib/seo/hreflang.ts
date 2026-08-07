import { SEO_CONFIG, TARGET_COUNTRIES } from '../config/seo-config';

/**
 * Returns Next.js metadata compatible `alternates.languages` record.
 * Supports en-IN, en-US, en-GB, en-CA, en-AE, en-AU, and x-default.
 */
export function buildHreflangAlternates(path: string = ''): Record<string, string> {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const normalizedPath = cleanPath === '/' ? '' : cleanPath.replace(/\/$/, '');
  const baseUrl = SEO_CONFIG.domain;

  const alternates: Record<string, string> = {};

  // Map targeted country hreflang codes
  Object.values(TARGET_COUNTRIES).forEach((country) => {
    alternates[country.hreflang] = `${baseUrl}${normalizedPath}`;
  });

  // Global x-default fallback pointing to primary root
  alternates['x-default'] = `${baseUrl}${normalizedPath}`;

  return alternates;
}
