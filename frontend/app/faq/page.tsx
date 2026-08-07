import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { CTASection } from '@/components/common/CTASection';
import {
  HelpCircle,
  ShieldCheck,
  UserCheck,
  Globe,
  FileText,
  DollarSign,
  Building2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Search,
} from 'lucide-react';

// -----------------------------------------------------------------------
// SEO METADATA
// -----------------------------------------------------------------------
export const metadata = generatePageMetadata({
  title: 'Master FAQ & Knowledge Base | AURA Couture Representation',
  description:
    'Comprehensive Knowledge Base and Master FAQ for AURA Couture and Vogue Vibe Models. Clear answers regarding model scouting criteria, digital polaroids, booking rates, contracts, international travel, and zero-fee representation across India, USA, and global fashion capitals.',
  path: '/faq',
  keywords: [
    'Modeling Agency FAQ',
    'AURA Couture Knowledge Base',
    'How to Apply Modeling Agency',
    'Model Height Requirements 2026',
    'Commercial Model Booking Rates',
    'Upfront Fee Scam Warning',
    'Paris Milan Fashion Week Booking',
    'Mumbai Delhi Casting FAQ',
  ],
});

// -----------------------------------------------------------------------
// COMPREHENSIVE CATEGORIZED FAQ DATA
// -----------------------------------------------------------------------
const FAQ_CATEGORIES = [
  {
    categoryTitle: 'Scouting, Applications & Physical Criteria',
    icon: Search,
    items: [
      {
        q: 'How do I apply to become an AURA Couture / Vogue Vibe model?',
        a: 'You can complete our online scouting application under "Become a Talent". Submit 4 simple digital polaroids (close-up headshot, profile shot, waist-up, and full-length) taken in natural lighting with form-fitting clothing and zero heavy makeup. Applications are reviewed by specialized discipline bookers within 5-7 business days.',
      },
      {
        q: 'What are the minimum height and age requirements for fashion models?',
        a: 'For High Fashion Runway & Editorial: Females generally range from 175 cm to 182 cm (5\'9" to 6\'0"), and Males from 184 cm to 192 cm (6\'0.5" to 6\'3.5"). Age criteria for new faces generally span 16 to 26 years. However, our Commercial, Beauty, Fitness, Acting, Vocal, and Fine Art divisions have broader, highly inclusive criteria with no strict height limits.',
      },
      {
        q: 'Are there any upfront fees to join AURA Couture?',
        a: 'NO. Reputable international fashion agencies NEVER charge upfront scouting fees, registration charges, mandatory portfolio photo package fees, or website listing fees. AURA Couture works strictly on a standard commission basis taken from paid client bookings after talent is paid.',
      },
      {
        q: 'Can I apply if I live outside major fashion capitals like Mumbai, Delhi, or New York?',
        a: 'Yes! We scout talent globally across India (Tier 1 & Tier 2 cities), North America, Europe, the UK, and UAE. Initial reviews are conducted digitally, and selected talent can be placed in regional hubs or offered mother agency representation.',
      },
    ],
  },
  {
    categoryTitle: 'Client Bookings, Rates & Licensing Rights',
    icon: DollarSign,
    items: [
      {
        q: 'How are daily booking rates and talent fees calculated?',
        a: 'Daily rates cover active production days (typically 8 to 10 hours). Rates vary based on performer experience, category (High Fashion vs Commercial Advertising), and shoot complexity. Additional fees apply for overtime, fitting days, and travel days.',
      },
      {
        q: 'What are usage rights and buyouts, and how do they work?',
        a: 'Usage rights (or buyouts) grant brand clients permission to utilize talent imagery or video across specific media channels (Print, Digital, Billboard/OOH, TV Commercials), geographic territories (e.g. India-only vs Worldwide), and time durations (6 Months, 1 Year, 2 Years). Buyout fees are calculated separately from daily shoot rates.',
      },
      {
        q: 'How does AURA Couture streamline casting for brand clients and directors?',
        a: 'Brand clients can search our digital roster, filter by discipline, physical attributes, location (e.g. Mumbai, Delhi, NYC, LA), and request custom candidate shortlists. Our dedicated bookers manage contract negotiations, call sheets, insurance, and billing.',
      },
    ],
  },
  {
    categoryTitle: 'International Markets & Travel Logistics',
    icon: Globe,
    items: [
      {
        q: 'How does AURA Couture handle international travel and work permits?',
        a: 'For talent performing across Paris, Milan, London, New York, Tokyo, or Dubai, our international placement desk manages full travel logistics—including O-1/P-3 work visas, Schengen entertainment permits, flight arrangements, chaperoned model apartments, and daily per diem stipends.',
      },
      {
        q: 'Do you represent international models booking campaigns in India?',
        a: 'Yes. We manage direct placements for international models working in Mumbai and Delhi for luxury Indian bridal couture, TV commercials, OTT film series, and major e-commerce brand campaigns.',
      },
    ],
  },
  {
    categoryTitle: 'Legal Contracts & Minor Protection',
    icon: ShieldCheck,
    items: [
      {
        q: 'What is the difference between an Exclusive and Non-Exclusive contract?',
        a: 'An Exclusive Management Agreement grants AURA Couture sole representation rights within designated territories (e.g., India or North America), allowing us to strategically invest in your career development. Non-Exclusive agreements allow talent to book independent work while benefiting from agency submissions.',
      },
      {
        q: 'How are minor performers (under 18) protected on set?',
        a: 'Minor talent protection is paramount. In strict compliance with US Coogan laws, UK child performance rules, and Indian child labor regulations, all minor bookings require parent/guardian chaperones, capped daily working hours, mandatory schooling breaks, and parent signature on all agreements.',
      },
    ],
  },
];

function buildFaqSchema() {
  const allFaqs = FAQ_CATEGORIES.flatMap((cat) => cat.items);
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

export default function FAQPage() {
  const pageSchema = generateWebPageSchema(
    'Frequently Asked Questions & Knowledge Base',
    'Comprehensive answers regarding model scouting criteria, booking rates, usage licensing, international travel, and agency representation.',
    '/faq'
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
        title="FREQUENTLY ASKED QUESTIONS"
        subtitle="Clear, authoritative answers on scouting criteria, booking rates, usage rights, travel logistics, and global representation."
        badge="KNOWLEDGE BASE • TALENT & CLIENT ADVISORY"
        bgImage="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=2000&q=90"
        breadcrumbs={[{ label: 'FAQs' }]}
      />

      <PageContainer>
        {/* ---------------------------------------------------------- */}
        {/* 1. EXECUTIVE INTRO                                          */}
        {/* ---------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionTitle
              badge="TALENT & CLIENT GUIDE"
              title="Everything You Need to Know About Working with Vogue Vibe"
              subtitle="Whether you are an aspiring face applying for scouting or a brand director booking talent across global capitals."
            />
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              At <strong className="text-white">AURA Couture</strong> (operating the{' '}
              <strong className="text-gold-400">Vogue Vibe Models</strong> talent house), transparency is the hallmark of our agency. Below you will find detailed answers covering scouting criteria, digital polaroid requirements, contract structures, daily booking rates, usage rights licensing, and international travel logistics.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <ShieldCheck className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">₹0 Upfront Fees</h3>
              <p className="text-xs text-zinc-400">We work strictly on booking commissions.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Globe className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">6 Global Hubs</h3>
              <p className="text-xs text-zinc-400">Paris, Milan, London, NY, Mumbai & Delhi.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <UserCheck className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">6 Disciplines</h3>
              <p className="text-xs text-zinc-400">Models, Actors, Dancers, Singers, Musicians, Artists.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Sparkles className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Full Transparency</h3>
              <p className="text-xs text-zinc-400">Clear contract terms & ethical representation.</p>
            </div>
          </div>
        </div>

        {/* FEATURED CONTENT IMAGES */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=90"
              alt="Model Scouting Application & Digital Polaroids"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Scouting & Applications</span>
              <h3 className="text-lg font-bold text-white font-serif">Un-retouched Digital Polaroid Submissions</h3>
            </div>
          </div>

          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=90"
              alt="Client Booking & Talent Representation"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Client & Brand Bookings</span>
              <h3 className="text-lg font-bold text-white font-serif">Professional Daily Rates & Buyout Terms</h3>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* 2. CATEGORIZED FAQ ACCORDION LIST                          */}
        {/* ---------------------------------------------------------- */}
        <div className="mt-20 space-y-16">
          {FAQ_CATEGORIES.map((category, catIdx) => {
            const Icon = category.icon;
            return (
              <section key={catIdx} className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
                  <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-white tracking-tight">
                    {category.categoryTitle}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.items.map((item, idx) => (
                    <details
                      key={idx}
                      className="glass-panel border border-gold-500/20 rounded-md p-6 group transition-colors hover:border-gold-500/40"
                    >
                      <summary className="font-serif text-base md:text-lg font-bold text-white cursor-pointer list-none flex items-center justify-between gap-4">
                        <span className="flex items-start gap-3">
                          <span className="text-gold-400 font-sans text-sm md:text-base shrink-0 mt-0.5">
                            {catIdx + 1}.{idx + 1}
                          </span>
                          <span>{item.q}</span>
                        </span>
                        <span className="text-gold-400 text-xl leading-none group-open:rotate-45 transition-transform shrink-0">
                          +
                        </span>
                      </summary>
                      <p className="text-zinc-300 text-xs md:text-sm font-light leading-relaxed mt-4 pl-7 border-t border-zinc-800/80 pt-3">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* ---------------------------------------------------------- */}
        {/* CONTACT SUPPORT DESK SECTION                               */}
        {/* ---------------------------------------------------------- */}
        <div className="mt-24 glass-panel border border-gold-500/20 rounded-md p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">
              Still Have Questions for Our Agents?
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              If your question is not covered in our Knowledge Base, reach out directly to our global talent desk or client booking team.
            </p>
            <div className="space-y-2 text-xs md:text-sm text-zinc-300 pt-2">
              <p className="flex items-center">
                <Mail className="w-4 h-4 text-gold-400 mr-2" />
                contact@auracouture.com
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
              href="/ContactPage"
              className="px-6 py-3.5 rounded-md font-semibold text-xs uppercase tracking-wider bg-gold-500 hover:bg-gold-400 text-zinc-950 transition-all text-center"
            >
              Contact Support Desk
            </Link>
            <Link
              href="/become-a-model"
              className="px-6 py-3.5 rounded-md font-semibold text-xs uppercase tracking-wider bg-zinc-900 border border-gold-500/30 text-white hover:bg-zinc-800 transition-all text-center"
            >
              Apply for Scouting
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <CTASection
          title="Ready to Work with Vogue Vibe?"
          description="Browse thousands of verified fashion models, actors, dancers, singers, musicians, and painters across global capitals."
          primaryButtonText="Browse Models Directory"
          primaryButtonHref="/models"
          secondaryButtonText="Become a Talent"
          secondaryButtonHref="/become-a-model"
        />
      </PageContainer>
    </>
  );
}
