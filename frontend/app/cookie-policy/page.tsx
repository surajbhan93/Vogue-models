import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { CTASection } from '@/components/common/CTASection';
import {
  Cookie,
  ShieldCheck,
  Eye,
  Lock,
  Settings,
  CheckCircle2,
  HelpCircle,
  Globe,
  FileText,
  Database,
  Sliders,
  UserCheck,
  MapPin,
  Mail,
  Phone,
  Server,
  BarChart3,
  Layers,
  ArrowRight,
} from 'lucide-react';

// -----------------------------------------------------------------------
// SEO METADATA
// -----------------------------------------------------------------------
export const metadata = generatePageMetadata({
  title: 'Cookie Policy | Technical Cookies & Data Privacy Declaration',
  description:
    'Comprehensive Cookie Policy for AURA Couture and Vogue Vibe Models. Learn how we deploy essential technical cookies, analytics, preference storage, and media delivery tokens to protect user privacy across India, USA, Europe and global fashion hubs.',
  path: '/cookie-policy',
  keywords: [
    'Cookie Policy',
    'AURA Couture Cookies',
    'Vogue Vibe Models Privacy',
    'Essential Technical Cookies',
    'Analytics Cookies Modeling Agency',
    'GDPR Cookie Compliance',
    'CCPA Privacy Declaration',
    'Indian DPDP Act Cookie Policy',
    'Cookie Preference Management',
  ],
});

// -----------------------------------------------------------------------
// FAQ DATA FOR AEO / FAQ SCHEMA
// -----------------------------------------------------------------------
const cookieFaqs = [
  {
    q: 'Why does AURA Couture / Vogue Vibe Models use cookies?',
    a: 'We use cookies primarily to deliver high-resolution model portfolio images smoothly, maintain secure talent management login sessions, preserve your region and currency preferences (e.g. INR vs USD), and analyze anonymous site performance so casting directors can browse rosters without latency.',
  },
  {
    q: 'Can I disable non-essential cookies while browsing model rosters?',
    a: 'Yes! You can customize your cookie preferences at any time through our Cookie Preference Center or directly within your web browser settings. Disabling non-essential analytics cookies will not restrict your ability to view model portfolios or submit casting inquiries.',
  },
  {
    q: 'Does AURA Couture sell my personal data or cookies to third-party brokers?',
    a: 'No. Under no circumstances do we sell, rent, or trade your personal data, browser storage records, or digital tracking identifiers to third-party data brokers or external marketing agencies.',
  },
  {
    q: 'How long do cookies remain stored on my device?',
    a: 'Session cookies expire automatically when you close your web browser. Persistent preferences cookies (such as language, currency, and shortlisted model portfolios) remain stored for up to 12 months unless cleared manually.',
  },
  {
    q: 'Are cookies compliant with GDPR, CCPA, and the Indian DPDP Act 2023?',
    a: 'Yes. Our cookie practices strictly adhere to the European Union GDPR, California CCPA/CPRA, United Kingdom Data Protection Act, and the Indian Digital Personal Data Protection (DPDP) Act 2023.',
  },
];

function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cookieFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

export default function CookiePolicyPage() {
  const pageSchema = generateWebPageSchema(
    'Cookie Policy & Technical Declaration',
    'Comprehensive information regarding essential technical cookies, performance measurement, regional preferences, and user privacy rights on AURA Couture.',
    '/cookie-policy'
  );
  const faqSchema = buildFaqSchema();

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        title="COOKIE POLICY & TECHNICAL DECLARATION"
        subtitle="Transparent disclosures regarding how we utilize technical cookies, local storage, and media delivery tokens to protect privacy and optimize performance."
        badge="LAST UPDATED: AUGUST 2026 • GLOBAL PRIVACY COMPLIANCE"
        bgImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=90"
        breadcrumbs={[{ label: 'Cookie Policy' }]}
      />

      <PageContainer>
        {/* ---------------------------------------------------------- */}
        {/* 1. EXECUTIVE SUMMARY & STATS                                 */}
        {/* ---------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionTitle
              badge="DATA TRANSPARENCY"
              title="Protecting Your Privacy Across Every Click"
              subtitle="AURA Couture (Vogue Vibe Models) is committed to complete transparency in how we collect, store, and utilize technical cookies."
            />
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              At <strong className="text-white">AURA Couture</strong> (operating the{' '}
              <strong className="text-gold-400">Vogue Vibe Models</strong> global talent network), we believe that luxury digital experiences must be built upon a foundation of absolute privacy, data security, and user respect. As a full-spectrum talent management agency representing fashion models, actors, dancers, singers, musicians, and painters across <strong className="text-white">India, USA, UK, UAE, and Europe</strong>, our website serves thousands of casting directors, luxury brand managers, talent agents, and aspiring performers daily.
            </p>
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              This Cookie Policy explains what cookies and tracking technologies we deploy when you visit{' '}
              <span className="text-gold-400 font-mono">auracouture.com</span>, why we use them, how they enable high-performance portfolio image streaming, and how you can exercise complete control over your cookie preferences in compliance with the <strong className="text-white">EU General Data Protection Regulation (GDPR)</strong>, <strong className="text-white">California Consumer Privacy Act (CCPA/CPRA)</strong>, and the <strong className="text-white">Indian Digital Personal Data Protection (DPDP) Act 2023</strong>.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <ShieldCheck className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">0% Data Sales</h3>
              <p className="text-xs text-zinc-400">We never sell tracking data to third-party data brokers.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Lock className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">SSL Encrypted</h3>
              <p className="text-xs text-zinc-400">256-bit encryption for all session storage tokens.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Globe className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Global Standards</h3>
              <p className="text-xs text-zinc-400">Full compliance across India, USA, EU & UK jurisdictions.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Sliders className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Full Control</h3>
              <p className="text-xs text-zinc-400">Manage or revoke cookie permissions anytime.</p>
            </div>
          </div>
        </div>

        {/* RELATED CONTENT FEATURED IMAGES */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=90"
              alt="Data Privacy & Technical Infrastructure"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">High-Performance Infrastructure</span>
              <h3 className="text-lg font-bold text-white font-serif">Encrypted Edge Media Caching</h3>
            </div>
          </div>

          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90"
              alt="Fashion Model Digital Portfolio Streaming"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Optimized Portfolio Browsing</span>
              <h3 className="text-lg font-bold text-white font-serif">Zero-Latency Digitals Delivery</h3>
            </div>
          </div>
        </div>

        {/* TABLE OF CONTENTS */}
        <div className="mt-16 glass-panel border border-gold-500/20 rounded-md p-8 bg-zinc-950/80">
          <h2 className="font-serif text-lg font-bold text-white flex items-center mb-4">
            <FileText className="w-5 h-5 text-gold-400 mr-2" />
            Table of Contents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs md:text-sm text-zinc-300">
            <a href="#what-are-cookies" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              1. What Are Cookies & Tracking Tech?
            </a>
            <a href="#why-we-use-cookies" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              2. Purpose & Use Cases on AURA Couture
            </a>
            <a href="#categories-of-cookies" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              3. Comprehensive Cookie Classification
            </a>
            <a href="#talent-agency-cookies" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              4. Cookies for Models & Casting Directors
            </a>
            <a href="#legal-frameworks" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              5. Global Compliance (GDPR, CCPA, DPDP)
            </a>
            <a href="#how-to-manage-cookies" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              6. Managing & Disabling Cookies
            </a>
            <a href="#third-party-cookies" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              7. Third-Party Media & Analytics Services
            </a>
            <a href="#policy-updates" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              8. Policy Updates & Revision History
            </a>
            <a href="#cookie-faqs" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              9. Frequently Asked Questions
            </a>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 1: WHAT ARE COOKIES                                 */}
        {/* ---------------------------------------------------------- */}
        <section id="what-are-cookies" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 01</span>
              <h2 className="font-serif text-2xl font-bold text-white">What Are Cookies & Similar Technologies?</h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              A <strong>cookie</strong> is a small text file containing a string of alphanumeric characters that is transferred to your web browser (or mobile device) when you visit a website. Cookies allow the website to recognize your browser, remember your user preferences across visits, ensure secure user authentication, and optimize the speed of digital media assets.
            </p>
            <p>
              In addition to traditional HTTP cookies, AURA Couture may also utilize related browser storage technologies to maintain an effortless browsing experience:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>
                <strong className="text-white">Local Storage & Session Storage:</strong> Web storage objects built into HTML5 that allow data (such as temporary casting candidate shortlists or filtered search parameters) to be stored locally within your browser without sending extra data overhead to our servers on every page request.
              </li>
              <li>
                <strong className="text-white">Web Beacons & Tracking Pixels:</strong> Transparent 1x1 image graphics embedded within specific pages or email notifications that measure whether a message was opened or whether a user navigated to a specific high-resolution portfolio lookbook.
              </li>
              <li>
                <strong className="text-white">CDN Cache Tokens:</strong> Temporary cryptographic tokens stored at our Content Delivery Network (CDN) edge locations (such as Cloudflare or AWS CloudFront) to verify image request signatures for high-resolution model digitals and video showreels.
              </li>
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 2: WHY WE USE COOKIES                               */}
        {/* ---------------------------------------------------------- */}
        <section id="why-we-use-cookies" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Server className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 02</span>
              <h2 className="font-serif text-2xl font-bold text-white">Purpose & Use Cases on AURA Couture</h2>
            </div>
          </div>

          <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
            As a global modeling and creative talent agency representing performers in high-stakes environments—such as Paris Fashion Week, Lakmé Fashion Week Mumbai, and Hollywood casting calls—our platform must deliver flawless image quality, instant video playback, and robust account security. We deploy technical cookies for four core operational reasons:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
              <div className="flex items-center space-x-3">
                <Lock className="w-6 h-6 text-gold-400" />
                <h3 className="font-serif text-lg font-bold text-white">1. Security & Authentication</h3>
              </div>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                Protecting talent portal logins, preventing Cross-Site Request Forgery (CSRF) attacks, and keeping client booking inquiries secure. Without essential security cookies, secure talent registration and agent contract portals cannot function.
              </p>
            </div>

            <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
              <div className="flex items-center space-x-3">
                <Eye className="w-6 h-6 text-gold-400" />
                <h3 className="font-serif text-lg font-bold text-white">2. High-Speed Portfolio Delivery</h3>
              </div>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                Remembering screen resolution parameters, device network speeds, and WebP/AVIF image capabilities to instantly stream high-definition model digitals and video reels without page buffering.
              </p>
            </div>

            <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
              <div className="flex items-center space-x-3">
                <Globe className="w-6 h-6 text-gold-400" />
                <h3 className="font-serif text-lg font-bold text-white">3. Regional & Currency Preferences</h3>
              </div>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                Remembering your selected market region (e.g. India, USA, UK, UAE) and preferred currency display (INR, USD, EUR, GBP) so casting directors do not need to re-select geographic preferences on every page visit.
              </p>
            </div>

            <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-6 h-6 text-gold-400" />
                <h3 className="font-serif text-lg font-bold text-white">4. Anonymous Performance Analytics</h3>
              </div>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                Measuring aggregate page traffic, popular category searches (e.g. Female Runway vs Commercial Actors), and server response times to continuously optimize website speed and casting search filters.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 3: COMPREHENSIVE CLASSIFICATION                     */}
        {/* ---------------------------------------------------------- */}
        <section id="categories-of-cookies" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 03</span>
              <h2 className="font-serif text-2xl font-bold text-white">Comprehensive Cookie Classification</h2>
            </div>
          </div>

          <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
            The cookies used on AURA Couture are categorized below based on their specific technical function, lifetime, and whether they are managed by us (first-party) or our technical infrastructure partners (third-party).
          </p>

          {/* TABLE 1: STRICTLY NECESSARY */}
          <div className="space-y-4 pt-4">
            <h3 className="font-serif text-xl font-bold text-white flex items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
              Category 1: Strictly Necessary & Essential Technical Cookies
            </h3>
            <p className="text-xs md:text-sm text-zinc-400">
              These cookies are strictly necessary to enable basic website functions such as secure navigation, page load balancing, and account authentication. They cannot be switched off in our systems.
            </p>
            <div className="overflow-x-auto glass-panel border border-gold-500/20 rounded-md">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-gold-500/30 bg-zinc-900/80 text-gold-400">
                    <th className="p-3.5 font-bold">Cookie Name</th>
                    <th className="p-3.5 font-bold">Type & Provider</th>
                    <th className="p-3.5 font-bold">Duration</th>
                    <th className="p-3.5 font-bold">Technical Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  <tr>
                    <td className="p-3.5 font-mono text-amber-300">__aura_session</td>
                    <td className="p-3.5">First-Party / Essential</td>
                    <td className="p-3.5">Session</td>
                    <td className="p-3.5">Maintains active talent portal and booking session security.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono text-amber-300">__aura_csrf_token</td>
                    <td className="p-3.5">First-Party / Security</td>
                    <td className="p-3.5">Session</td>
                    <td className="p-3.5">Prevents Cross-Site Request Forgery on forms and booking requests.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono text-amber-300">__cf_bm</td>
                    <td className="p-3.5">Cloudflare / Security</td>
                    <td className="p-3.5">30 Minutes</td>
                    <td className="p-3.5">Distinguishes human users from malicious automated bot traffic.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* TABLE 2: PERFORMANCE & ANALYTICS */}
          <div className="space-y-4 pt-6">
            <h3 className="font-serif text-xl font-bold text-white flex items-center">
              <BarChart3 className="w-5 h-5 text-blue-400 mr-2" />
              Category 2: Performance & Analytics Measurement Cookies
            </h3>
            <p className="text-xs md:text-sm text-zinc-400">
              These cookies help us measure aggregate visitor counts, popular search queries, and page loading speeds so we can improve site performance. All analytical data is collected in anonymized form.
            </p>
            <div className="overflow-x-auto glass-panel border border-gold-500/20 rounded-md">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-gold-500/30 bg-zinc-900/80 text-gold-400">
                    <th className="p-3.5 font-bold">Cookie Name</th>
                    <th className="p-3.5 font-bold">Type & Provider</th>
                    <th className="p-3.5 font-bold">Duration</th>
                    <th className="p-3.5 font-bold">Technical Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  <tr>
                    <td className="p-3.5 font-mono text-amber-300">_ga</td>
                    <td className="p-3.5">Google Analytics 4</td>
                    <td className="p-3.5">2 Years</td>
                    <td className="p-3.5">Distinguishes unique users for aggregate statistical reporting.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono text-amber-300">_ga_*</td>
                    <td className="p-3.5">Google Analytics 4</td>
                    <td className="p-3.5">2 Years</td>
                    <td className="p-3.5">Maintains aggregate session status for Core Web Vitals monitoring.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono text-amber-300">__vercel_insights</td>
                    <td className="p-3.5">Vercel Speed Insights</td>
                    <td className="p-3.5">Session</td>
                    <td className="p-3.5">Measures real-time Interaction to Next Paint (INP) and LCP speeds.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 4: COOKIES FOR MODELS & CASTING DIRECTORS          */}
        {/* ---------------------------------------------------------- */}
        <section id="talent-agency-cookies" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 04</span>
              <h2 className="font-serif text-2xl font-bold text-white">Cookies for Models & Casting Directors</h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              Because AURA Couture operates as a two-sided professional network connecting registered creative talent with brand clients, specific cookies support customized workflows for talent and casting representatives:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
                <h3 className="font-serif text-lg font-bold text-white">For Models & Performers</h3>
                <ul className="list-disc pl-5 text-xs md:text-sm text-zinc-300 space-y-2">
                  <li>Maintains persistent login across digital portfolio editing sessions.</li>
                  <li>Saves upload progress when submitting digital polaroids, comp cards, and video reels.</li>
                  <li>Stores audition contest entry progress for active scouting competitions.</li>
                </ul>
              </div>
              <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
                <h3 className="font-serif text-lg font-bold text-white">For Casting Directors & Brands</h3>
                <ul className="list-disc pl-5 text-xs md:text-sm text-zinc-300 space-y-2">
                  <li>Saves complex filter criteria (e.g., Height 5'10"+, Location Delhi, Category Runway).</li>
                  <li>Allows exportable candidate PDF shortlists to be stored temporarily in browser cache.</li>
                  <li>Remembers direct booking consultation requests for swift checkout.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 5: GLOBAL COMPLIANCE FRAMEWORKS                     */}
        {/* ---------------------------------------------------------- */}
        <section id="legal-frameworks" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 05</span>
              <h2 className="font-serif text-2xl font-bold text-white">Global Compliance Frameworks (GDPR, CCPA, DPDP)</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
              <h3 className="font-serif text-base font-bold text-white flex items-center">
                <Globe className="w-4 h-4 text-gold-400 mr-2" />
                EU & UK GDPR
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Non-essential cookies are deployed only after receiving your explicit, opt-in consent via our Cookie Banner. You have the right to withdraw consent at any time without affecting prior lawful processing.
              </p>
            </div>

            <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
              <h3 className="font-serif text-base font-bold text-white flex items-center">
                <ShieldCheck className="w-4 h-4 text-gold-400 mr-2" />
                California CCPA / CPRA
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                California residents have the right to opt out of the sale or sharing of personal information. We do not sell personal data. You may exercise "Do Not Sell/Share My Info" options directly.
              </p>
            </div>

            <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
              <h3 className="font-serif text-base font-bold text-white flex items-center">
                <Lock className="w-4 h-4 text-gold-400 mr-2" />
                Indian DPDP Act 2023
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Compliant with India’s Digital Personal Data Protection Act. We collect data for specified, legitimate business purposes with clear consent notices provided in plain, unambiguous language.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 6: MANAGING & DISABLING COOKIES                      */}
        {/* ---------------------------------------------------------- */}
        <section id="how-to-manage-cookies" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 06</span>
              <h2 className="font-serif text-2xl font-bold text-white">How to Control, Disable & Manage Cookies</h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              You have complete autonomy over how cookies are stored on your computer or mobile device. You can adjust your preferences through browser controls or our built-in cookie settings:
            </p>

            <div className="space-y-4 pt-2">
              <h3 className="font-serif text-lg font-bold text-white">1. Browser Level Settings</h3>
              <p className="text-xs md:text-sm text-zinc-400">
                Most web browsers allow you to block, manage, or delete cookies altogether. Follow the instructions for your specific browser below:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass-panel border border-gold-500/20 rounded-md text-gold-400 hover:text-white transition-colors text-center font-medium"
                >
                  Google Chrome →
                </a>
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass-panel border border-gold-500/20 rounded-md text-gold-400 hover:text-white transition-colors text-center font-medium"
                >
                  Apple Safari →
                </a>
                <a
                  href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass-panel border border-gold-500/20 rounded-md text-gold-400 hover:text-white transition-colors text-center font-medium"
                >
                  Mozilla Firefox →
                </a>
                <a
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63447330-810d-47d5-b270-27323543f9f4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass-panel border border-gold-500/20 rounded-md text-gold-400 hover:text-white transition-colors text-center font-medium"
                >
                  Microsoft Edge →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 9: FREQUENTLY ASKED QUESTIONS (FAQ SCHEMA)          */}
        {/* ---------------------------------------------------------- */}
        <section id="cookie-faqs" className="mt-20 space-y-6">
          <SectionTitle
            badge="COMMON INQUIRIES"
            title="Frequently Asked Questions"
            subtitle="Clear answers regarding technical cookies, privacy guarantees, and browser controls."
          
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-4">
            {cookieFaqs.map(({ q, a }) => (
              <details
                key={q}
                className="glass-panel border border-gold-500/20 rounded-md p-6 group"
              >
                <summary className="font-serif text-base md:text-lg font-bold text-white cursor-pointer list-none flex items-center justify-between gap-4">
                  {q}
                  <span className="text-gold-400 text-xl leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-zinc-400 text-sm leading-relaxed mt-3">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CONTACT & DPO SECTION */}
        <div className="mt-24 glass-panel border border-gold-500/20 rounded-md p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">
              Questions Regarding Our Cookie Policy?
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              If you have any questions regarding our use of cookies or wish to contact our Data Protection Officer (DPO), please reach out to our privacy compliance desk.
            </p>
            <div className="space-y-2 text-xs md:text-sm text-zinc-300 pt-2">
              <p className="flex items-center">
                <Mail className="w-4 h-4 text-gold-400 mr-2" />
                privacy@auracouture.com
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 text-gold-400 mr-2" />
                +91-22-6789-9900 (India) / +1-212-555-0199 (USA)
              </p>
              <p className="flex items-center">
                <MapPin className="w-4 h-4 text-gold-400 mr-2" />
                BKC Horizon Tower, Bandra Kurla Complex, Mumbai, India
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 justify-end">
            <Link
              href="/privacy-policy"
              className="px-6 py-3.5 rounded-md font-semibold text-xs uppercase tracking-wider bg-gold-500 hover:bg-gold-400 text-zinc-950 transition-all text-center"
            >
              Privacy Policy
            </Link>
            <Link
              href="/ContactPage"
              className="px-6 py-3.5 rounded-md font-semibold text-xs uppercase tracking-wider bg-zinc-900 border border-gold-500/30 text-white hover:bg-zinc-800 transition-all text-center"
            >
              Contact DPO Desk
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <CTASection
          title="Explore Vogue Vibe Global Roster"
          description="Browse thousands of verified models, actors, dancers, singers, musicians, and painters across India, USA, and global fashion capitals."
          primaryButtonText="Browse Models Directory"
          primaryButtonHref="/models"
          secondaryButtonText="Become a Talent"
          secondaryButtonHref="/become-a-model"
        />
      </PageContainer>
    </>
  );
}
