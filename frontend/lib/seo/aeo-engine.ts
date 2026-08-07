import { SEO_MASTER_CONFIG } from './seo.config';

export interface VoiceQueryAnswer {
  question: string;
  directAnswer: string;
  bulletPoints?: string[];
  entityCategory?: string;
  targetRegion?: 'India' | 'USA' | 'Global';
}

export const AEO_PRESET_ANSWERS: Record<string, VoiceQueryAnswer> = {
  'hire-models-india': {
    question: 'How do I hire female or male models in India?',
    directAnswer:
      'You can hire verified female, male, and commercial models in India through AURA Couture / Vogue Vibe Models by browsing online portfolios, checking physical measurements, and submitting direct booking requests for Mumbai, Delhi, and Bangalore campaigns.',
    bulletPoints: [
      'Select talent category (Fashion Models, Commercial, Actors, Dancers, Singers).',
      'Filter by location (Mumbai, Delhi NCR, Bangalore, Hyderabad).',
      'Review digital polaroids, reels, and physical specs.',
      'Submit direct online booking inquiry or call +91-22-6789-9900.',
    ],
    entityCategory: 'Talent Booking',
    targetRegion: 'India',
  },
  'hire-models-usa': {
    question: 'How do I book fashion models in New York or Los Angeles?',
    directAnswer:
      'To book fashion and commercial models in New York or Los Angeles, request talent through AURA Couture’s USA agency portal. Filter by NYFW runway experience, SAG-AFTRA acting credentials, and physical specs.',
    bulletPoints: [
      'Choose discipline: NYFW Runway, Commercial Print, SAG Acting.',
      'Filter by USA cities: New York, Los Angeles, Miami, Chicago.',
      'Review verified client ratings and campaign history.',
      'Book online or contact NYC Office at +1-212-555-0199.',
    ],
    entityCategory: 'Talent Booking',
    targetRegion: 'USA',
  },
  'become-model-steps': {
    question: 'What are the steps to become a professional model in 2026?',
    directAnswer:
      'To become a professional model, determine your niche (Fashion vs. Commercial), shoot simple unedited digitals in natural light, create a profile on AURA Couture / Vogue Vibe Models, and submit your portfolio to accredited agents.',
    bulletPoints: [
      'Step 1: Identify your modeling niche (Fashion, Commercial, Fitness).',
      'Step 2: Take natural digital polaroids without heavy makeup.',
      'Step 3: Register your official profile or enter open contests.',
      'Step 4: Practice camera posing and runway posture daily.',
    ],
    entityCategory: 'Career Advice',
    targetRegion: 'Global',
  },
};

export function buildAeoSpeakableSchema(url: string, cssSelectors: string[] = ['.aeo-direct-answer', '.aeo-question']) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#speakable-page`,
    url,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  };
}
