import { SEO_CONFIG } from '../config/seo-config';

/**
 * Builds clean, absolute canonical URLs stripped of tracking parameters.
 */
export function buildCanonicalUrl(path: string = ''): string {
  // Ensure path starts with slash and no trailing slash duplication
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const normalizedPath = cleanPath === '/' ? '' : cleanPath.replace(/\/$/, '');
  return `${SEO_CONFIG.domain}${normalizedPath}`;
}
