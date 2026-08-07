import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auracouture.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // 1. Core High-Priority Pages
  const mainPages = [
    { url: SITE_URL, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${SITE_URL}/models`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.95 },
    { url: `${SITE_URL}/hire-a-model`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.95 },
    { url: `${SITE_URL}/hire-model`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${SITE_URL}/become-a-model`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/become-model`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${SITE_URL}/gallery`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${SITE_URL}/portfolio`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.85 },
  ];

  // 2. Creative Disciplines & Talent Categories
  const disciplinePages = [
    { url: `${SITE_URL}/actors`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${SITE_URL}/dancers`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${SITE_URL}/singers`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${SITE_URL}/musicians`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.85 },
    { url: `${SITE_URL}/painters`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.85 },
    { url: `${SITE_URL}/categories`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.85 },
  ];

  // 3. Content, Services & Engagement
  const contentPages = [
    { url: `${SITE_URL}/blog`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${SITE_URL}/blogs`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/contests`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/testimonials`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/careers`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.65 },
    { url: `${SITE_URL}/partners`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${SITE_URL}/press`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${SITE_URL}/intro`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  // 4. India & USA Geotargeted City Location Pages
  const citySlugs = [
    // India Cities
    'mumbai', 'delhi', 'bangalore', 'hyderabad', 'kolkata', 'pune', 'chennai', 'ahmedabad',
    // USA Cities
    'new-york', 'los-angeles', 'chicago', 'miami', 'dallas', 'houston', 'san-francisco',
  ];

  const cityPages = citySlugs.map((slug) => ({
    url: `${SITE_URL}/city/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 5. Trust, Legal & EEAT Compliance Pages
  const trustPages = [
    { url: `${SITE_URL}/about`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/ContactPage`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/editorial-policy`, lastModified: currentDate, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: currentDate, changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${SITE_URL}/terms-and-conditions`, lastModified: currentDate, changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${SITE_URL}/cookie-policy`, lastModified: currentDate, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/copyright-policy`, lastModified: currentDate, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/cancellation-policy`, lastModified: currentDate, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/refund-policy`, lastModified: currentDate, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/shipping-policy`, lastModified: currentDate, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/disclaimer`, lastModified: currentDate, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/dmca`, lastModified: currentDate, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/faq`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${SITE_URL}/accessibility`, lastModified: currentDate, changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  return [
    ...mainPages,
    ...disciplinePages,
    ...contentPages,
    ...cityPages,
    ...trustPages,
  ];
}
