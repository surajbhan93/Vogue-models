import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { CTASection } from '@/components/common/CTASection';
import {
  ShieldCheck,
  Lock,
  Globe,
  FileText,
  UserCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  Eye,
  Server,
  Database,
  Sliders,
  ArrowRight,
  Key,
  ShieldAlert,
} from 'lucide-react';

// -----------------------------------------------------------------------
// SEO METADATA
// -----------------------------------------------------------------------
export const metadata = generatePageMetadata({
  title: 'Privacy Policy & Data Protection Declaration | AURA Couture',
  description:
    'Official Privacy Policy and Data Protection declaration for AURA Couture and Vogue Vibe Models. Learn how we collect, process, and protect model digital polaroids, physical measurements, and client casting data under EU GDPR, California CCPA/CPRA, and the Indian DPDP Act 2023.',
  path: '/privacy-policy',
  keywords: [
    'Privacy Policy',
    'AURA Couture Data Protection',
    'Vogue Vibe Models Privacy',
    'GDPR Compliance Modeling Agency',
    'Indian DPDP Act Compliance',
    'CCPA Privacy Rights',
    'Talent Polaroid Data Security',
    'Model Physical Measurements Privacy',
    'Data Protection Officer Mumbai NYC',
  ],
});

// -----------------------------------------------------------------------
// FAQ DATA FOR AEO / FAQ SCHEMA
// -----------------------------------------------------------------------
const privacyFaqs = [
  {
    q: 'How does AURA Couture protect my personal digital polaroids and physical measurements?',
    a: 'All digital polaroids, physical measurement matrices, and talent contact information submitted to AURA Couture are stored in 256-bit encrypted secure vaults. Scouting assets are accessible only to accredited talent agents and verified casting directors for professional booking evaluations.',
  },
  {
    q: 'Does AURA Couture sell my personal data or comp cards to third parties?',
    a: 'NO. Absolute Zero Data Sales. Under no circumstances do we sell, rent, license, or monetize personal applicant data, measurement files, or user contact records to third-party data brokers or external marketing agencies.',
  },
  {
    q: 'What are my rights regarding data erasure ("Right to be Forgotten") under GDPR & DPDP?',
    a: 'You retain full statutory rights to access, inspect, update, or permanently delete your personal data from our systems at any time. To request complete data erasure, simply email our Data Protection Officer at privacy@auracouture.com.',
  },
  {
    q: 'How are minors (under 18) protected under AURA Couture’s Privacy Policy?',
    a: 'Data processing for minor applicants requires verified parent or legal guardian consent. Minor talent profiles are restricted from public search indexation and are presented strictly to vetted, identity-verified casting directors under chaperoned protocols.',
  },
  {
    q: 'How does AURA Couture handle international data transfers between India, USA, and Europe?',
    a: 'Cross-border data transfers between our offices in Mumbai, Delhi, New York, London, Paris, and Milan are conducted using Standard Contractual Clauses (SCCs) approved by the European Commission, ensuring equivalent data protection globally.',
  },
];

function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: privacyFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

export default function PrivacyPolicyPage() {
  const pageSchema = generateWebPageSchema(
    'Privacy Policy & Data Protection Declaration',
    'Official standards governing personal data collection, digital polaroids protection, client casting security, and global privacy rights compliance.',
    '/privacy-policy'
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
        title="PRIVACY POLICY & DATA PROTECTION"
        subtitle="Comprehensive disclosures regarding personal data collection, digital polaroid safeguards, client casting security, and international privacy rights."
        badge="LAST UPDATED: AUGUST 2026 • GLOBAL PRIVACY STANDARDS"
        bgImage="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=2000&q=90"
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <PageContainer>
        {/* ---------------------------------------------------------- */}
        {/* 1. EXECUTIVE SUMMARY & STATS                                 */}
        {/* ---------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionTitle
              badge="DATA SAFEGUARDS"
              title="Your Privacy is Our Absolute Commitment"
              subtitle="AURA Couture operates under strict global privacy frameworks across India, USA, UK, UAE, and Europe."
            />
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              At <strong className="text-white">AURA Couture</strong> (operating the{' '}
              <strong className="text-gold-400">Vogue Vibe Models</strong> global network), we respect the privacy of every model applicant, represented performer, luxury brand client, and website visitor. As an elite international talent agency representing performers across <strong className="text-white">Paris, Milan, London, New York, Mumbai, and Delhi</strong>, we collect and process sensitive creative assets—including digital polaroids, physical measurement matrices, audition reels, and contact credentials.
            </p>
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              This Privacy Policy explains what personal data we collect, why we collect it, how we safeguard it, and how you can exercise your statutory rights under the <strong className="text-white">EU General Data Protection Regulation (GDPR)</strong>, the <strong className="text-white">UK Data Protection Act 2018</strong>, the <strong className="text-white">California Consumer Privacy Act (CCPA/CPRA)</strong>, and the <strong className="text-white">Indian Digital Personal Data Protection (DPDP) Act 2023</strong>.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <ShieldCheck className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">0% Data Sales</h3>
              <p className="text-xs text-zinc-400">We NEVER sell, rent, or trade your personal records.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Lock className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">256-bit Encryption</h3>
              <p className="text-xs text-zinc-400">SOC2 Type II compliant encrypted talent vaults.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Globe className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Global Compliance</h3>
              <p className="text-xs text-zinc-400">Full GDPR, CCPA & Indian DPDP Act 2023 compliance.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <UserCheck className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Full Rights</h3>
              <p className="text-xs text-zinc-400">Instant right to access, export, or erase your data.</p>
            </div>
          </div>
        </div>

        {/* RELATED CONTENT FEATURED IMAGES */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=90"
              alt="Encrypted Talent Database & Privacy Vault"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Enterprise Data Infrastructure</span>
              <h3 className="text-lg font-bold text-white font-serif">Encrypted Talent Assets Vault</h3>
            </div>
          </div>

          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=90"
              alt="Verified Executive Data Controller & DPO Consultation Desk"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Data Protection Officer</span>
              <h3 className="text-lg font-bold text-white font-serif">Verified Legal Compliance Desk</h3>
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
            <a href="#categories-of-data" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              1. Categories of Personal Data Collected
            </a>
            <a href="#legal-bases" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              2. Purposes & Legal Bases for Processing
            </a>
            <a href="#data-sharing" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              3. Data Sharing & Client Disclosures
            </a>
            <a href="#minor-privacy" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              4. Minor Talent (Under 18) Privacy Safeguards
            </a>
            <a href="#data-retention" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              5. Retention & International Transfers
            </a>
            <a href="#statutory-rights" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              6. Your Statutory Data Privacy Rights
            </a>
            <a href="#privacy-faqs" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              7. Frequently Asked Questions
            </a>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 1: CATEGORIES OF PERSONAL DATA COLLECTED           */}
        {/* ---------------------------------------------------------- */}
        <section id="categories-of-data" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 01</span>
              <h2 className="font-serif text-2xl font-bold text-white">Categories of Personal Data We Collect</h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              To operate a professional global talent management platform, AURA Couture processes specific categories of personal information:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
                <UserCheck className="w-6 h-6 text-gold-400" />
                <h3 className="font-serif text-base font-bold text-white">1. Talent Applicants & Performers</h3>
                <ul className="list-disc pl-4 text-xs text-zinc-400 space-y-1.5">
                  <li>Full legal name, stage name, DOB, and nationality.</li>
                  <li>Physical measurements (height, bust/chest, waist, hips, shoe size).</li>
                  <li>Digital polaroids, comp card photos, and audition showreels.</li>
                  <li>Contact details, email address, phone, and social handles.</li>
                </ul>
              </div>

              <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
                <Building2 className="w-6 h-6 text-gold-400" />
                <h3 className="font-serif text-base font-bold text-white">2. Brand Clients & Directors</h3>
                <ul className="list-disc pl-4 text-xs text-zinc-400 space-y-1.5">
                  <li>Executive name, brand name, corporate address.</li>
                  <li>Business registration numbers and tax identifiers.</li>
                  <li>Casting briefs, shortlisted model lists, and call sheets.</li>
                  <li>Billing contacts and payment transaction records.</li>
                </ul>
              </div>

              <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
                <Server className="w-6 h-6 text-gold-400" />
                <h3 className="font-serif text-base font-bold text-white">3. Automatic Site Telemetry</h3>
                <ul className="list-disc pl-4 text-xs text-zinc-400 space-y-1.5">
                  <li>IP address, browser type, device screen resolution.</li>
                  <li>Geographic location (country & city level).</li>
                  <li>Session durations and page navigation history.</li>
                  <li>Essential cookies and CDN performance tokens.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 2: PURPOSES & LEGAL BASES FOR PROCESSING           */}
        {/* ---------------------------------------------------------- */}
        <section id="legal-bases" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Key className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 02</span>
              <h2 className="font-serif text-2xl font-bold text-white">Purposes & Legal Bases for Data Processing</h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              Under Article 6 of the GDPR and Section 4 of the Indian DPDP Act 2023, AURA Couture processes personal data only under lawful, specified legal grounds:
            </p>
            <ul className="list-disc pl-6 space-y-2.5 text-xs md:text-sm text-zinc-300">
              <li>
                <strong className="text-white">Contractual Necessity:</strong> Processing talent measurements and digital polaroids is necessary to present candidate options to casting directors, negotiate management contracts, and disburse talent payments.
              </li>
              <li>
                <strong className="text-white">Legitimate Business Interests:</strong> Evaluating scouting applications, maintaining website security, verifying agent credentials, and preventing impersonation fraud.
              </li>
              <li>
                <strong className="text-white">Explicit Legal Consent:</strong> Sending industry newsletters, featuring talent portfolios in public search engines, and placing non-essential analytics cookies.
              </li>
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 3: DATA SHARING & CLIENT DISCLOSURES               */}
        {/* ---------------------------------------------------------- */}
        <section id="data-sharing" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Eye className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 03</span>
              <h2 className="font-serif text-2xl font-bold text-white">Data Sharing & Client Disclosures (Zero Data Sales)</h2>
            </div>
          </div>

          <div className="glass-panel p-8 border border-gold-500/30 rounded-md bg-zinc-950/90 space-y-4">
            <div className="flex items-center space-x-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero Monetization Guarantee</span>
            </div>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-light">
              AURA Couture <strong className="text-white">NEVER sells, rents, licenses, or monetizes</strong> personal data, phone numbers, email addresses, or digital polaroids to third-party advertising networks, data brokers, or marketing aggregators.
            </p>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
              Talent comp cards and digital polaroids are shared strictly with accredited casting directors, luxury fashion houses, and production managers for legitimate booking evaluations under confidential booking agreements.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 6: YOUR STATUTORY DATA PRIVACY RIGHTS              */}
        {/* ---------------------------------------------------------- */}
        <section id="statutory-rights" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Sliders className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 06</span>
              <h2 className="font-serif text-2xl font-bold text-white">Your Statutory Data Privacy Rights</h2>
            </div>
          </div>

          <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
            Regardless of your geographic location, AURA Couture affords all talent applicants and client users comprehensive privacy controls:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            <div className="p-5 glass-panel border border-gold-500/20 rounded-md space-y-2">
              <h3 className="font-serif text-base font-bold text-white">Right of Access</h3>
              <p className="text-xs text-zinc-400">Request a complete copy of all personal records and comp cards stored in our vault.</p>
            </div>
            <div className="p-5 glass-panel border border-gold-500/20 rounded-md space-y-2">
              <h3 className="font-serif text-base font-bold text-white">Right to Erasure</h3>
              <p className="text-xs text-zinc-400">Request permanent deletion of your scouting application and digital polaroids ("Right to be Forgotten").</p>
            </div>
            <div className="p-5 glass-panel border border-gold-500/20 rounded-md space-y-2">
              <h3 className="font-serif text-base font-bold text-white">Right to Rectification</h3>
              <p className="text-xs text-zinc-400">Update or correct inaccurate physical measurements, contact info, or agency status.</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQ SCHEMA)          */}
        {/* ---------------------------------------------------------- */}
        <section id="privacy-faqs" className="mt-20 space-y-6">
          <SectionTitle
            badge="COMMON INQUIRIES"
            title="Frequently Asked Questions"
            subtitle="Clear answers regarding data security, polaroid privacy, and GDPR rights."
            centered
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-4">
            {privacyFaqs.map(({ q, a }) => (
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

        {/* CONTACT DPO SECTION */}
        <div className="mt-24 glass-panel border border-gold-500/20 rounded-md p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">
              Contact Our Data Protection Officer (DPO)
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              If you wish to exercise your data privacy rights, request data erasure, or inquire about cross-border data protection:
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
                BKC Horizon Tower, Bandra Kurla Complex, Mumbai / 500 5th Ave NYC
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 justify-end">
            <Link
              href="/cookie-policy"
              className="px-6 py-3.5 rounded-md font-semibold text-xs uppercase tracking-wider bg-gold-500 hover:bg-gold-400 text-zinc-950 transition-all text-center"
            >
              Cookie Policy
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
          title="Work With Vogue Vibe Models"
          description="Join an elite global agency where your personal data, digital polaroids, and privacy are protected by highest international standards."
          primaryButtonText="Browse Talent Roster"
          primaryButtonHref="/models"
          secondaryButtonText="Become a Talent"
          secondaryButtonHref="/become-a-model"
        />
      </PageContainer>
    </>
  );
}
