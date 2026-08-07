import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './global.css';

// Existing Imports
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// =============================================================================
// 1. FONT OPTIMIZATION (Next.js 15 zero-CLS font loader)
// =============================================================================
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  adjustFontFallback: true,
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  adjustFontFallback: true,
});

// =============================================================================
// 2. NEXT.JS 15 VIEWPORT API
// =============================================================================
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#07090e' },
    { media: '(prefers-color-scheme: light)', color: '#07090e' },
  ],
  colorScheme: 'dark',
};

// =============================================================================
// 3. NEXT.JS 15 METADATA API (Complete SEO, AEO, GEO & Social Metadata)
// =============================================================================
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://voguevibemodels.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Vogue Vibe Models | Global Luxury Modeling & Talent Management Agency',
    template: '%s | Vogue Vibe Models',
  },
  description:
    'Vogue Vibe Models is the premier international luxury modeling agency and talent management platform. Representing high-fashion models, actors, singers, painters, dancers, musicians, commercial talent, and top-tier influencers for world-class photoshoots, Fashion Week campaigns, and high-end artistic bookings.',
  keywords: [
    'Luxury Modeling Agency',
    'Fashion Models',
    'High Fashion Modeling',
    'Actors',
    'Singers',
    'Painters',
    'Musicians',
    'Dancers',
    'Casting Agency',
    'Talent Management',
    'Fashion Photoshoots',
    'Paris Fashion Week',
    'New York Fashion Week',
    'Milan Fashion Week',
    'Editorial Models',
    'Commercial Models',
    'Influencers',
    'International Modeling Agency',
    'High Concept Runway Models',
    'Celebrity Talent Booking',
    'Artist Representation',
    'Luxury Brand Ambassadors',
  ],
  authors: [{ name: 'Vogue Vibe Models Executive Team', url: `${SITE_URL}/about` }],
  creator: 'Vogue Vibe Global Platform Architect',
  publisher: 'Vogue Vibe Global Inc.',
  applicationName: 'Vogue Vibe Models',
  category: 'Fashion & Entertainment',
  classification: 'Talent Management & High Fashion Modeling Agency',
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-US': `${SITE_URL}/en-US`,
      'fr-FR': `${SITE_URL}/fr-FR`,
      'it-IT': `${SITE_URL}/it-IT`,
    },
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Vogue Vibe Models | Global Luxury Modeling & Talent Management',
    description:
      'Discover and book world-class fashion models, actors, singers, painters, and musicians with Vogue Vibe Models. Redefining high fashion, editorial campaigns, and global talent representation.',
    siteName: 'Vogue Vibe Models',
    images: [
      {
        url: `${SITE_URL}/OG-image.png`,
        width: 1200,
        height: 630,
        alt: 'Vogue Vibe Models - Premier Luxury Modeling & Talent Management Agency',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vogue Vibe Models | Luxury Modeling & Talent Agency',
    description:
      'Premier global fashion talent agency representing elite models, actors, musicians, and artists for luxury campaigns and international runway shows.',
    site: '@voguevibemodels',
    creator: '@voguevibemodels',
    images: [`${SITE_URL}/OG-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Vogue Vibe Models',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification-token',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || 'yandex-verification-token',
    other: {
      me: ['contact@voguevibemodels.com', SITE_URL],
    },
  },
  other: {
    'ai-search-agent': 'index, follow',
    'chatgpt-seo': 'optimized',
    'perplexity-discovery': 'enabled',
    'generative-engine-optimization': 'vogue-vibe-luxury-entity-v1',
  },
};

// =============================================================================
// 4. STRUCTURED DATA / JSON-LD GENERATOR
// =============================================================================
function generateJsonLd() {
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Vogue Vibe Models',
        description: 'Global Luxury Modeling & Talent Management Agency',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
        '@id': `${SITE_URL}/#organization`,
        name: 'Vogue Vibe Models',
        legalName: 'Vogue Vibe Global Inc.',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/OG-image.png`,
          caption: 'Vogue Vibe Models Logo',
        },
        image: `${SITE_URL}/OG-image.png`,
        description:
          'International luxury modeling and talent management agency representing elite fashion models, actors, singers, painters, dancers, and musicians.',
        email: 'contact@voguevibemodels.com',
        telephone: '+1-800-555-VOGUE',
        priceRange: '$$$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '745 Fifth Avenue, Suite 1800',
          addressLocality: 'New York',
          addressRegion: 'NY',
          postalCode: '10151',
          addressCountry: 'US',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+1-800-555-VOGUE',
            contactType: 'booking services',
            email: 'bookings@voguevibemodels.com',
            availableLanguage: ['English', 'French', 'Italian'],
          },
        ],
        sameAs: [
          'https://www.instagram.com/voguevibemodels',
          'https://www.facebook.com/voguevibemodels',
          'https://twitter.com/voguevibemodels',
          'https://www.linkedin.com/company/voguevibemodels',
          'https://www.youtube.com/@voguevibemodels',
        ],
        knowsAbout: [
          'High Fashion Modeling',
          'Runway and Editorial Photoshoots',
          'Talent Management',
          'Casting Agency',
          'Actor Representation',
          'Musician Representation',
          'Artisan and Painter Booking',
          'Commercial Talent Representation',
          'Fashion Week Directing',
        ],
      },
    ],
  };

  return JSON.stringify(jsonLdGraph);
}

// =============================================================================
// 5. ROOT LAYOUT COMPONENT
// =============================================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${inter.variable} ${playfair.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preload" as="image" href="/OG-image.png" type="image/png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateJsonLd() }}
        />
      </head>

      <body className="bg-[#07090e] text-zinc-100 font-sans min-h-screen flex flex-col antialiased selection:bg-amber-500 selection:text-black">
        {/* Accessibility Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-amber-500 focus:text-black focus:font-semibold focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
          {children}
        </main>

        {/* Footer */}
        <Footer />

        <noscript>
          <div className="fixed bottom-0 left-0 right-0 bg-amber-500 text-black text-center p-3 text-sm font-semibold z-50">
            For the optimal luxury experience on Vogue Vibe Models, please enable JavaScript in your browser.
          </div>
        </noscript>
      </body>
    </html>
  );
}