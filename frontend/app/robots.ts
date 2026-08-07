import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auracouture.com';

export default function robots(): MetadataRoute.Robots {
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
          '/verify-email',
          '/forgot-password',
          '/api/',
          '/*?*sort=',
          '/*?*filter=',
        ],
      },
      {
        // Explicit AI Search Engine permissions for Google AI Overviews, ChatGPT Search, Gemini, Perplexity, Claude
        userAgent: [
          'GPTBot',
          'PerplexityBot',
          'ClaudeBot',
          'Google-Extended',
          'Bingbot',
        ],
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
