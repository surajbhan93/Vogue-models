export interface ModelProfile {
  id: string;
  slug: string;
  name: string;
  gender: 'female' | 'male' | 'unisex';
  categorySlug: string;
  categoryName: string;
  citySlug: string;
  cityName: string;
  countrySlug: string;
  countryName: string;
  height: string; // e.g. "5'10\" / 178 cm"
  bustBiceps: string;
  waist: string;
  hips: string;
  eyeColor: string;
  hairColor: string;
  shoeSize: string;
  bio: string;
  heroImage: string;
  portfolioImages: string[];
  experienceYears: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  featuredForBrands: string[];
  updatedAt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  readingTimeMinutes: number;
  heroImage: string;
  tags: string[];
  faqs: { question: string; answer: string }[];
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  heroImage: string;
  targetAudience: string;
}

export const MOCK_MODELS: ModelProfile[] = [
  {
    id: 'm1',
    slug: 'priya-sharma-fashion-model-delhi',
    name: 'Priya Sharma',
    gender: 'female',
    categorySlug: 'fashion-models',
    categoryName: 'Fashion Models',
    citySlug: 'delhi',
    cityName: 'Delhi',
    countrySlug: 'india',
    countryName: 'India',
    height: `5'10" (178 cm)`,
    bustBiceps: '34B',
    waist: '25"',
    hips: '35"',
    eyeColor: 'Hazel Brown',
    hairColor: 'Dark Brown',
    shoeSize: '39 EU / 8 US',
    bio: 'Priya Sharma is an elite high-fashion and runway model based in Delhi, India. Having walked for Lakmé Fashion Week and India Couture Week, she specializes in luxury editorial, bridal couture, and international campaigns.',
    heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&fit=crop',
    portfolioImages: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&fit=crop',
    ],
    experienceYears: 6,
    rating: 4.9,
    reviewCount: 48,
    isVerified: true,
    featuredForBrands: ['Vogue India', 'Sabyasachi', 'Manish Malhotra', 'FabIndia'],
    updatedAt: '2026-07-28',
  },
  {
    id: 'm2',
    slug: 'arav-kapoor-commercial-model-mumbai',
    name: 'Arav Kapoor',
    gender: 'male',
    categorySlug: 'commercial-models',
    categoryName: 'Commercial Models',
    citySlug: 'mumbai',
    cityName: 'Mumbai',
    countrySlug: 'india',
    countryName: 'India',
    height: `6'1" (185 cm)`,
    bustBiceps: '40"',
    waist: '31"',
    hips: '38"',
    eyeColor: 'Deep Black',
    hairColor: 'Black',
    shoeSize: '43 EU / 10 US',
    bio: 'Arav Kapoor is a leading commercial actor and fitness model based in Mumbai. He has featured in 35+ television commercials, fitness apparel launches, and top automobile brand campaigns.',
    heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&fit=crop',
    portfolioImages: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&fit=crop',
    ],
    experienceYears: 5,
    rating: 4.8,
    reviewCount: 32,
    isVerified: true,
    featuredForBrands: ['Raymond', 'Nike India', 'BMW', 'Titan'],
    updatedAt: '2026-07-30',
  },
  {
    id: 'm3',
    slug: 'sophia-rossi-high-fashion-model-new-york',
    name: 'Sophia Rossi',
    gender: 'female',
    categorySlug: 'fashion-models',
    categoryName: 'Fashion Models',
    citySlug: 'new-york',
    cityName: 'New York',
    countrySlug: 'usa',
    countryName: 'United States',
    height: `5'11" (180 cm)`,
    bustBiceps: '33A',
    waist: '24"',
    hips: '34"',
    eyeColor: 'Emerald Green',
    hairColor: 'Blonde',
    shoeSize: '40 EU / 9 US',
    bio: 'Sophia Rossi is an international runway and print campaign model based in New York City. Representation across NYFW, Paris Fashion Week, and Milan Fashion Week.',
    heroImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&fit=crop',
    portfolioImages: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&fit=crop',
    ],
    experienceYears: 7,
    rating: 5.0,
    reviewCount: 64,
    isVerified: true,
    featuredForBrands: ['Vogue US', 'Harper Bazaar', 'Calvin Klein', 'Zara'],
    updatedAt: '2026-08-01',
  },
  {
    id: 'm4',
    slug: 'rohan-mehta-influencer-bangalore',
    name: 'Rohan Mehta',
    gender: 'male',
    categorySlug: 'influencers',
    categoryName: 'Influencers & Creators',
    citySlug: 'bangalore',
    cityName: 'Bangalore',
    countrySlug: 'india',
    countryName: 'India',
    height: `5'11" (180 cm)`,
    bustBiceps: '39"',
    waist: '30"',
    hips: '37"',
    eyeColor: 'Brown',
    hairColor: 'Dark Brown',
    shoeSize: '42 EU / 9 US',
    bio: 'Rohan Mehta is a tech, lifestyle, and streetwear content creator with 850k+ follower reach across Instagram and YouTube.',
    heroImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&fit=crop',
    portfolioImages: [
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&fit=crop',
    ],
    experienceYears: 4,
    rating: 4.7,
    reviewCount: 29,
    isVerified: true,
    featuredForBrands: ['Puma', 'OnePlus', 'Myntra', 'Fastrack'],
    updatedAt: '2026-07-25',
  },
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    slug: 'how-to-become-fashion-model',
    title: 'How to Become a Professional Fashion Model in 2026: Complete Step-by-Step Guide',
    description: 'Learn how to start your modeling career, create a portfolio, get signed by top agencies in India, USA, and UK, and land high-paying fashion gigs.',
    content: `
      ## Introduction to Professional Modeling
      Entering the modeling industry requires dedication, a professional portfolio, and knowledge of how modeling agencies operate...

      ## Key Steps to Build Your Modeling Career
      1. Determine your modeling niche (Fashion, Commercial, Runway, Fitness, Child).
      2. Shoot a clean, natural Digitals/Polaroid portfolio.
      3. Apply to verified modeling agencies registered with TalentPrime.
      4. Practice runway walks and camera poses daily.

      ## Modeling Niche Comparison
      - **High Fashion / Editorial**: Requires 5'9"+ for females, 6'0"+ for males.
      - **Commercial**: Open height requirements, high demand for expressive faces.
      - **Fitness**: Focus on athletic physique and muscular tone.

      ## Industry Insights for India & Global Markets
      Modeling opportunities in Mumbai, Delhi, Bangalore, and New York are booming in 2026...
    `,
    authorName: 'Vikramaditya Roy',
    authorRole: 'Senior Casting Director & Talent Strategist',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&fit=crop',
    publishedAt: '2026-06-15',
    updatedAt: '2026-08-01',
    category: 'Career Advice',
    readingTimeMinutes: 8,
    heroImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&fit=crop',
    tags: ['Modeling Guide', 'Career Advice', 'Fashion Industry', 'Agency Casting'],
    faqs: [
      {
        question: 'Do I need professional photos to apply to a modeling agency?',
        answer: 'No! Agencies prefer simple, unedited digital polaroids taken in natural light with zero makeup so they can assess your natural look.',
      },
      {
        question: 'What is the standard height requirement for fashion runway models?',
        answer: 'Female runway models are typically 5 ft 9 in to 6 ft (175 - 183 cm), while male runway models are 6 ft to 6 ft 3 in (183 - 190 cm). Commercial modeling has no strict height requirement.',
      },
      {
        question: 'How do I avoid fake modeling agencies and scams?',
        answer: 'Legitimate agencies never charge upfront portfolio fees or guarantee work. Always verify agency registration on TalentPrime.',
      },
    ],
  },
  {
    slug: 'top-modeling-agencies-mumbai-delhi',
    title: 'Top 10 Verified Modeling Agencies in Mumbai and Delhi [2026 Review]',
    description: 'Comprehensive directory of the best modeling agencies in India, including Lakme Fashion Week talent partners and commercial casting hubs.',
    content: `
      ## Finding the Right Agency in India
      Mumbai and Delhi serve as the double heart of the Indian fashion and commercial film industry...
    `,
    authorName: 'Ananya Verma',
    authorRole: 'Chief Editor, Fashion & Entertainment',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&fit=crop',
    publishedAt: '2026-07-02',
    updatedAt: '2026-07-29',
    category: 'Agency Reviews',
    readingTimeMinutes: 6,
    heroImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&fit=crop',
    tags: ['Mumbai Modeling', 'Delhi Agency', 'Indian Fashion', 'Casting'],
    faqs: [
      {
        question: 'Which city is better for commercial modeling: Mumbai or Delhi?',
        answer: 'Mumbai dominates TV commercial, OTT, and Bollywood casting, while Delhi leads in luxury fashion couture, bridal week, and apparel catalog shoots.',
      },
    ],
  },
];

export const MOCK_SERVICES: ServiceItem[] = [
  {
    slug: 'model-management',
    title: 'Professional Model Management & Career Representation',
    shortDesc: 'End-to-end talent representation, career strategy, contract negotiation, and global booking management for professional models.',
    fullDesc: 'TalentPrime provides top-tier model management for emerging and established models in India, USA, UK, UAE, and Australia. We handle agency contracts, international placements, brand endorsements, and legal rights.',
    features: [
      'Dedicated Talent Manager',
      'Global Agency Placements',
      'Contract & Legal Representation',
      'Brand Endorsement Negotiations',
      'Digital Portfolio Hosting & SEO Indexing',
    ],
    heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&fit=crop',
    targetAudience: 'Fashion & Commercial Models, Influencers, Actors',
  },
  {
    slug: 'casting-directing',
    title: 'Enterprise Casting Directing & Talent Procurement',
    shortDesc: 'Direct access to 25,000+ vetted models, actors, influencers, and creative crew for fashion shows, TV commercials, and feature films.',
    fullDesc: 'We streamline casting workflows for global brands, production houses, and fashion directors. Filter talent by physical attributes, location, availability, and budget with automated call sheets.',
    features: [
      'AI-Powered Talent Matching',
      'Real-Time Audition Management',
      'Location-based Casting (India & Global)',
      'Verified Work History & Client Reviews',
    ],
    heroImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&fit=crop',
    targetAudience: 'Brands, Ad Agencies, Production Houses, Photographers',
  },
];
