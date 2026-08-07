import { MetadataRoute } from 'next';
import { SEO_CONFIG, TALENT_CATEGORIES, POPULAR_CITIES, TARGET_COUNTRIES } from '@/lib/config/seo-config';
import { MOCK_MODELS, MOCK_BLOGS, MOCK_SERVICES } from '@/lib/data/mock-db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SEO_CONFIG.domain;
  const currentDate = new Date().toISOString();

  // 1. Static Pages
  const staticRoutes = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/models`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/editorial-policy`, lastModified: currentDate, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: currentDate, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: currentDate, changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  // 2. Programmatic Model Profile Routes
  const modelRoutes = MOCK_MODELS.map((model) => ({
    url: `${baseUrl}/models/${model.slug}`,
    lastModified: new Date(model.updatedAt).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Talent Category Routes
  const categoryRoutes = TALENT_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.85,
  }));

  // 4. City Hub Routes
  const cityRoutes = POPULAR_CITIES.map((city) => ({
    url: `${baseUrl}/city/${city.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 5. Country Hub Routes
  const countryRoutes = Object.keys(TARGET_COUNTRIES).map((countryKey) => ({
    url: `${baseUrl}/country/${countryKey}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 6. Blog Post Routes
  const blogRoutes = MOCK_BLOGS.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  // 7. Service Routes
  const serviceRoutes = MOCK_SERVICES.map((srv) => ({
    url: `${baseUrl}/services/${srv.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...modelRoutes,
    ...categoryRoutes,
    ...cityRoutes,
    ...countryRoutes,
    ...blogRoutes,
    ...serviceRoutes,
  ];
}
