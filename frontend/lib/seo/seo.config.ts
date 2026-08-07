export interface CityLocation {
  slug: string;
  name: string;
  state: string;
  country: 'India' | 'USA';
  countryCode: 'IN' | 'US';
  latitude: number;
  longitude: number;
  postalCode?: string;
  addressRegion?: string;
  popularFor: string[];
}

export interface TargetRegion {
  code: 'IN' | 'US' | 'GB' | 'AE' | 'CA' | 'AU';
  name: string;
  hreflang: string;
  currency: string;
  isPrimary?: boolean;
}

export const TARGET_REGIONS: Record<string, TargetRegion> = {
  india: { code: 'IN', name: 'India', hreflang: 'en-IN', currency: 'INR', isPrimary: true },
  usa: { code: 'US', name: 'United States', hreflang: 'en-US', currency: 'USD' },
  uk: { code: 'GB', name: 'United Kingdom', hreflang: 'en-GB', currency: 'GBP' },
  uae: { code: 'AE', name: 'United Arab Emirates', hreflang: 'en-AE', currency: 'AED' },
  canada: { code: 'CA', name: 'Canada', hreflang: 'en-CA', currency: 'CAD' },
  australia: { code: 'AU', name: 'Australia', hreflang: 'en-AU', currency: 'AUD' },
};

export const INDIA_CITIES: CityLocation[] = [
  {
    slug: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    countryCode: 'IN',
    latitude: 19.076,
    longitude: 72.8777,
    postalCode: '400051',
    addressRegion: 'MH',
    popularFor: ['TV Commercials', 'Bollywood Casting', 'Fashion Runway', 'OTT Series'],
  },
  {
    slug: 'delhi',
    name: 'Delhi NCR',
    state: 'Delhi',
    country: 'India',
    countryCode: 'IN',
    latitude: 28.7041,
    longitude: 77.1025,
    postalCode: '110001',
    addressRegion: 'DL',
    popularFor: ['Luxury Fashion Couture', 'Bridal Runway', 'Apparel Catalogs'],
  },
  {
    slug: 'bangalore',
    name: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    countryCode: 'IN',
    latitude: 12.9716,
    longitude: 77.5946,
    postalCode: '560001',
    addressRegion: 'KA',
    popularFor: ['Tech Ads', 'Lifestyle Influencers', 'Fitness Models'],
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    countryCode: 'IN',
    latitude: 17.385,
    longitude: 78.4867,
    postalCode: '500001',
    addressRegion: 'TG',
    popularFor: ['Tollywood Casting', 'Commercial Print', 'Jewelry Shoot'],
  },
  {
    slug: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    countryCode: 'IN',
    latitude: 22.5726,
    longitude: 88.3639,
    postalCode: '700001',
    addressRegion: 'WB',
    popularFor: ['Ethnic Wear Shoot', 'Editorial Photography', 'Performers'],
  },
  {
    slug: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    countryCode: 'IN',
    latitude: 18.5204,
    longitude: 73.8567,
    postalCode: '411001',
    addressRegion: 'MH',
    popularFor: ['Youth Models', 'Automobile Commercials', 'Campus Campaigns'],
  },
];

export const USA_CITIES: CityLocation[] = [
  {
    slug: 'new-york',
    name: 'New York',
    state: 'New York',
    country: 'USA',
    countryCode: 'US',
    latitude: 40.7128,
    longitude: -74.006,
    postalCode: '10001',
    addressRegion: 'NY',
    popularFor: ['NYFW High Fashion', 'Editorial Magazine', 'Global Commercials'],
  },
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    state: 'California',
    country: 'USA',
    countryCode: 'US',
    latitude: 34.0522,
    longitude: -118.2437,
    postalCode: '90001',
    addressRegion: 'CA',
    popularFor: ['Hollywood Acting', 'Commercial Ads', 'Swimwear & Fitness'],
  },
  {
    slug: 'chicago',
    name: 'Chicago',
    state: 'Illinois',
    country: 'USA',
    countryCode: 'US',
    latitude: 41.8781,
    longitude: -87.6298,
    postalCode: '60601',
    addressRegion: 'IL',
    popularFor: ['Print Catalogs', 'Corporate Video', 'Commercial Acting'],
  },
  {
    slug: 'miami',
    name: 'Miami',
    state: 'Florida',
    country: 'USA',
    countryCode: 'US',
    latitude: 25.7617,
    longitude: -80.1918,
    postalCode: '33101',
    addressRegion: 'FL',
    popularFor: ['Resortwear & Bikini', 'Latin Media', 'Music Videos'],
  },
  {
    slug: 'san-francisco',
    name: 'San Francisco',
    state: 'California',
    country: 'USA',
    countryCode: 'US',
    latitude: 37.7749,
    longitude: -122.4194,
    postalCode: '94101',
    addressRegion: 'CA',
    popularFor: ['Tech Brand Ambassador', 'Commercial Print', 'Influencers'],
  },
];

export const TALENT_DISCIPLINES = [
  { slug: 'models', name: 'Fashion Models', plural: 'Fashion Models', schemaType: 'Person' },
  { slug: 'actors', name: 'Actors & Actresses', plural: 'Actors', schemaType: 'Person' },
  { slug: 'dancers', name: 'Dancers & Choreographers', plural: 'Dancers', schemaType: 'Person' },
  { slug: 'singers', name: 'Singers & Vocalists', plural: 'Singers', schemaType: 'Person' },
  { slug: 'musicians', name: 'Musicians & Producers', plural: 'Musicians', schemaType: 'Person' },
  { slug: 'painters', name: 'Painters & Visual Artists', plural: 'Painters', schemaType: 'Person' },
];

export const SEO_MASTER_CONFIG = {
  domain: process.env.NEXT_PUBLIC_SITE_URL || 'https://auracouture.com',
  siteName: 'Vogue Vibe Models | AURA Couture Global Agency',
  companyName: 'AURA Couture Talent Management',
  defaultTitle: 'AURA Couture | Premier Global Modeling & Talent Agency India & USA',
  defaultDescription:
    'Connecting haute couture brands, casting directors, and production houses with world-class fashion models, actors, singers, dancers, painters, and musicians across India (Mumbai, Delhi) & USA (New York, LA).',
  defaultKeywords: [
    'modeling agency',
    'female models india',
    'hire fashion models mumbai',
    'acting agency delhi',
    'top modeling agencies in new york',
    'casting directors los angeles',
    'singer booking agency',
    'dancer representation',
    'musician booking agency',
  ],
  defaultOgImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&h=630&q=90',
  twitterHandle: '@auracouture',
  verification: {
    google: 'google-site-verification-token-2026',
    bing: 'BING_VERIFICATION_TOKEN_AURA',
  },
  contact: {
    email: 'contact@auracouture.com',
    phoneIndia: '+91-22-6789-9900',
    phoneUSA: '+1-212-555-0199',
    addressIndia: 'Level 12, BKC Horizon Tower, Bandra Kurla Complex, Mumbai, Maharashtra 400051',
    addressUSA: '500 5th Avenue, 28th Floor, New York, NY 10110',
  },
};
