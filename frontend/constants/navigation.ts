export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Models', href: '/models' },
  { label: 'Divisions', href: '/categories' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const MEGA_MENU_DATA: NavGroup[] = [
  {
    title: 'Talent Divisions',
    links: [
      { label: 'High Fashion', href: '/models?category=High+Fashion', description: 'Couture runway & luxury campaigns' },
      { label: 'Runway', href: '/models?category=Runway', description: 'Paris, Milan, London & NYC fashion weeks' },
      { label: 'Editorial', href: '/models?category=Editorial', description: 'Vogue, Harper’s Bazaar, & Elle covers' },
      { label: 'Commercial & Beauty', href: '/models?category=Commercial', description: 'Global brand ambassadors & cosmetics' },
    ],
  },
  {
    title: 'Representation Services',
    links: [
      { label: 'Hire a Model', href: '/hire-a-model', description: 'Book talent for campaigns & runway shows' },
      { label: 'Apply for Scouting', href: '/become-model', description: 'Submit digital polaroids & portfolio' },
      { label: 'Agency Services', href: '/services', description: 'Full spectrum talent management' },
      { label: 'Visual Portfolio', href: '/models', description: 'Curated editorial showcases' },
    ],
  },
  {
    title: 'Agency Insights',
    links: [
      { label: 'About AURA', href: '/about', description: 'Heritage & 4 fashion capitals' },
      { label: 'Visual Archives', href: '/gallery', description: 'Behind the scenes & recent runways' },
      { label: 'Fashion Journal', href: '/blog', description: 'Industry news & model spotlights' },
      { label: 'Client Testimonials', href: '/testimonials', description: 'Endorsements from couture houses' },
    ],
  },
];

export const FOOTER_SECTIONS = {
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press & Media', href: '/press' },
      { label: 'Global Partners', href: '/partners' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  agency: {
    title: 'Agency',
    links: [
      { label: 'All Talent', href: '/models' },
      { label: 'Divisions', href: '/categories' },
      { label: 'Visual Portfolio', href: '/portfolio' },
      { label: 'Gallery Archives', href: '/gallery' },
      { label: 'Hire a Model', href: '/hire-a-model' },
      { label: 'Become a Model', href: '/become-a-model' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Fashion Journal', href: '/blog' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Editorial Policy', href: '/editorial-policy' },
      { label: 'Copyright Policy', href: '/copyright-policy' },
    ],
  },
  legal: {
    title: 'Legal & Policies',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-and-conditions' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Refund Policy', href: '/refund-policy' },
      { label: 'Cancellation Policy', href: '/cancellation-policy' },
      { label: 'Shipping Policy', href: '/shipping-policy' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'DMCA Notice', href: '/dmca' },
    ],
  },
};
