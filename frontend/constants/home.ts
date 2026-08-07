import { CategoryItem, StatItem, TestimonialItem } from '@/types/home';

export const HERO_CONSTANTS = {
  badge: 'Representing Global Elegance Since 2012',
  titlePrefix: 'REDEFINING',
  titleHighlight: 'LUXURY',
  titleSuffix: 'BEAUTY',
  subtitle: 'Connecting haute couture brands with world-class editorial, runway, and commercial talent across Paris, Milan, London & New York.',
  bgImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=90',
  ctaPrimaryText: 'Explore Roster',
  ctaSecondaryText: 'Apply for Scouting',
} as const;

export const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: 'cat-1',
    title: 'High Fashion',
    count: '140+ Models',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    href: '/models?category=High+Fashion',
  },
  {
    id: 'cat-2',
    title: 'Haute Couture Runway',
    count: '90+ Models',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    href: '/models?category=Runway',
  },
  {
    id: 'cat-3',
    title: 'Editorial & Menswear',
    count: '110+ Models',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    href: '/models?category=Editorial',
  },
  {
    id: 'cat-4',
    title: 'Commercial & Beauty',
    count: '85+ Models',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
    href: '/models?category=Commercial',
  },
];

export const STATS_DATA: StatItem[] = [
  { id: 'stat-1', label: 'REPRESENTED TALENT', value: '500+' },
  { id: 'stat-2', label: 'LUXURY BRAND PARTNERS', value: '200+', highlight: true },
  { id: 'stat-3', label: 'CAMPAIGNS EXECUTED', value: '1,500+' },
  { id: 'stat-4', label: 'GLOBAL FASHION HUBS', value: '35', highlight: true },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    quote: 'AURA Couture models possess an irreplaceable combination of timeless elegance and contemporary versatility. They are our first call every Paris Fashion Week.',
    author: 'Jean-Luc Moreau',
    role: 'Casting Director',
    company: 'Haute Couture Paris',
    rating: 5,
  },
];

export const WHY_CHOOSE_US_DATA = {
  badge: 'The AURA Distinction',
  heading: 'Unrivaled Global Presence & Heritage',
  description: 'Founded in Milan, AURA Couture represents over 400 models worldwide. Our agency maintains exclusive partnerships with Vogue, Dior, Chanel, Saint Laurent, and Tom Ford, ensuring our talent secures prime runway spots and global editorial covers.',
  image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
  safetyTitle: 'Guaranteed Safety & Standards',
  safetyText: 'We prioritize total model well-being, strict legal standard representation, and transparent career management.',
};
