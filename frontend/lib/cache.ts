import { cache } from 'react';

/**
 * Cache configuration tags and durations for Next.js Server Components.
 */
export const CACHE_TAGS = {
  homeData: 'home-data',
  models: 'featured-models',
  gallery: 'home-gallery',
  blogs: 'latest-blogs',
} as const;

export const REVALIDATE_TIME = {
  HOURLY: 3600,
  DAILY: 86400,
  FAST: 300,
} as const;

/**
 * React cache wrapper to deduplicate server-side data requests during rendering.
 */
export const memoizedCache = <T extends (...args: any[]) => Promise<any>>(fn: T): T => {
  return cache(fn) as T;
};
