export interface CountryConfig {
  code: string;
  name: string;
  hreflang: string;
  currency: string;
  isPrimary?: boolean;
}

export const TARGET_COUNTRIES: Record<string, CountryConfig> = {
  india: { code: 'IN', name: 'India', hreflang: 'en-IN', currency: 'INR', isPrimary: true },
  usa: { code: 'US', name: 'United States', hreflang: 'en-US', currency: 'USD' },
  uk: { code: 'GB', name: 'United Kingdom', hreflang: 'en-GB', currency: 'GBP' },
  canada: { code: 'CA', name: 'Canada', hreflang: 'en-CA', currency: 'CAD' },
  uae: { code: 'AE', name: 'United Arab Emirates', hreflang: 'en-AE', currency: 'AED' },
  australia: { code: 'AU', name: 'Australia', hreflang: 'en-AU', currency: 'AUD' },
};

export const POPULAR_CITIES = [
  { slug: 'mumbai', name: 'Mumbai', country: 'India', countryCode: 'IN' },
  { slug: 'delhi', name: 'Delhi', country: 'India', countryCode: 'IN' },
  { slug: 'bangalore', name: 'Bangalore', country: 'India', countryCode: 'IN' },
  { slug: 'hyderabad', name: 'Hyderabad', country: 'India', countryCode: 'IN' },
  { slug: 'kolkata', name: 'Kolkata', country: 'India', countryCode: 'IN' },
  { slug: 'pune', name: 'Pune', country: 'India', countryCode: 'IN' },
  { slug: 'chennai', name: 'Chennai', country: 'India', countryCode: 'IN' },
  { slug: 'ahmedabad', name: 'Ahmedabad', country: 'India', countryCode: 'IN' },
  { slug: 'new-york', name: 'New York', country: 'USA', countryCode: 'US' },
  { slug: 'los-angeles', name: 'Los Angeles', country: 'USA', countryCode: 'US' },
  { slug: 'chicago', name: 'Chicago', country: 'USA', countryCode: 'US' },
  { slug: 'miami', name: 'Miami', country: 'USA', countryCode: 'US' },
  { slug: 'dallas', name: 'Dallas', country: 'USA', countryCode: 'US' },
  { slug: 'houston', name: 'Houston', country: 'USA', countryCode: 'US' },
  { slug: 'san-francisco', name: 'San Francisco', country: 'USA', countryCode: 'US' },
  { slug: 'london', name: 'London', country: 'United Kingdom', countryCode: 'GB' },
  { slug: 'dubai', name: 'Dubai', country: 'UAE', countryCode: 'AE' },
];

export const TALENT_CATEGORIES = [
  { slug: 'female-models', name: 'Female Models', plural: 'Female Models', singular: 'Female Model' },
  { slug: 'male-models', name: 'Male Models', plural: 'Male Models', singular: 'Male Model' },
  { slug: 'child-models', name: 'Child Models', plural: 'Child Models', singular: 'Child Model' },
  { slug: 'fashion-models', name: 'Fashion Models', plural: 'Fashion Models', singular: 'Fashion Model' },
  { slug: 'commercial-models', name: 'Commercial Models', plural: 'Commercial Models', singular: 'Commercial Model' },
  { slug: 'influencers', name: 'Influencers & Creators', plural: 'Influencers', singular: 'Influencer' },
  { slug: 'actors', name: 'Actors & Performers', plural: 'Actors', singular: 'Actor' },
  { slug: 'photographers', name: 'Fashion Photographers', plural: 'Photographers', singular: 'Photographer' },
  { slug: 'makeup-artists', name: 'Makeup Artists & Stylists', plural: 'Makeup Artists', singular: 'Makeup Artist' },
  { slug: 'brands', name: 'Brand Partners', plural: 'Brands', singular: 'Brand' },
  { slug: 'production-houses', name: 'Production Houses', plural: 'Production Houses', singular: 'Production House' },
];

export const SEO_CONFIG = {
  siteName: 'TalentPrime Models & Agency',
  companyName: 'TalentPrime Global Media Pvt Ltd',
  domain: 'https://www.talentprime.com',
  defaultTitle: 'TalentPrime | Professional Modeling Agency Platform India & Global',
  defaultTitleTemplate: '%s | TalentPrime Modeling Agency',
  defaultDescription:
    'Premier global modeling agency platform connecting top female, male, child, fashion & commercial models, influencers, actors, photographers, and brands across India, USA, UK, UAE & worldwide.',
  defaultKeywords: [
    'modeling agency',
    'female models india',
    'fashion model booking',
    'commercial models mumbai',
    'acting casting agency delhi',
    'fashion photographers new york',
    'child models talent',
    'brand ambassador booking',
    'influencers agency dubai',
  ],
  defaultOgImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&h=630&auto=format&fit=crop',
  twitterHandle: '@TalentPrimeSEO',
  facebookAppId: '1092837491029384',
  locale: 'en_IN',
  locales: ['en-IN', 'en-US', 'en-GB', 'en-CA', 'en-AE', 'en-AU'],
  defaultHreflang: 'en-IN',
  verification: {
    google: 'google-site-verification-token-xyz-1234567890',
    bing: 'BING_SITE_VERIFICATION_9876543210',
    yandex: 'yandex-verification-token',
  },
  contact: {
    email: 'contact@talentprime.com',
    phone: '+91-22-6789-9900',
    address: 'Level 12, BKC Horizon Tower, Bandra Kurla Complex',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400051',
    country: 'India',
  },
  social: {
    instagram: 'https://www.instagram.com/talentprime',
    linkedin: 'https://www.linkedin.com/company/talentprime',
    twitter: 'https://twitter.com/talentprime',
    facebook: 'https://www.facebook.com/talentprime',
    youtube: 'https://www.youtube.com/@talentprime',
  },
};
