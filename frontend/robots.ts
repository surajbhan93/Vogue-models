import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/config/seo-config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SEO_CONFIG.domain;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/dashboard/',
          '/login',
          '/register',
          '/api/auth/',
          '/api/register',
          '/private/',
          '/*?*sort=', // Prevent duplicate parameter indexing
          '/*?*filter=',
        ],
      },
      {
        // Dedicated rules for AI Search Scrapers (Google AI, ChatGPT, Perplexity, Claude)
        userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'],
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/private/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
