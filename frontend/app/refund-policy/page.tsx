import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { CTASection } from '@/components/common/CTASection';
import {
  DollarSign,
  ShieldCheck,
  CreditCard,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Building2,
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  Scale,
  RefreshCw,
  ArrowRight,
  AlertTriangle,
  Receipt,
} from 'lucide-react';

// -----------------------------------------------------------------------
// SEO METADATA
// -----------------------------------------------------------------------
export const metadata = generatePageMetadata({
  title: 'Refund, Cancellation & Financial Policy | AURA Couture',
  description:
    'Official Refund, Cancellation and Financial Billing Policy for AURA Couture and Vogue Vibe Models. Comprehensive guidelines governing client booking retainers, shoot cancellation schedules, weather delays, usage rights buyouts, and talent payout terms across India, USA, and global markets.',
  path: '/refund-policy',
  keywords: [
    'Refund Policy',
    'AURA Couture Financial Policy',
    'Model Booking Cancellation Schedule',
    'Shoot Retainer Deposit Terms',
    'Weather Cancellation Policy Fashion',
    'Talent Usage Buyout Refund',
    'Zero Upfront Talent Fee Guarantee',
    'Indian GST Modeling Invoice Terms',
  ],
});

// -----------------------------------------------------------------------
// FAQ DATA FOR AEO / FAQ SCHEMA
// -----------------------------------------------------------------------
const refundFaqs = [
  {
    q: 'What is AURA Couture’s refund policy on client booking retainers?',
    a: 'Client booking retainers (50% deposit) are 100% refundable if a written cancellation notice is received at least 14 business days prior to scheduled shoot/travel dates. Cancellations made between 7 and 13 days receive a 50% refund, while cancellations with less than 7 days notice are non-refundable to compensate booked talent.',
  },
  {
    q: 'What happens if a photoshoot is cancelled due to adverse weather (Weather Permitting Clause)?',
    a: 'If a location shoot is cancelled due to severe weather, the client may reschedule the shoot within 30 days. The original daily rate covers talent availability for the postponed date at a 50% re-shoot rate plus hard travel expenses.',
  },
  {
    q: 'Are there any fees or payments required for talent scouting applications?',
    a: 'NONE. Scouting applications are 100% FREE. AURA Couture NEVER charges registration fees, application charges, or portfolio photoshoot fees to prospective talent.',
  },
  {
    q: 'Can a client get a refund on media usage buyouts after a campaign launches?',
    a: 'No. Once media assets (print campaigns, digital ads, billboards, TVCs) featuring contracted talent have been published or broadcast, usage buyout fees are strictly non-refundable.',
  },
  {
    q: 'How long does it take to process an approved retainer refund?',
    a: 'Approved refund requests are processed back to the original corporate bank account or credit card within 5 to 7 business days following formal written approval from our financial desk.',
  },
];

function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: refundFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

export default function RefundPolicyPage() {
  const pageSchema = generateWebPageSchema(
    'Refund, Cancellation & Financial Billing Policy',
    'Official standards governing booking retainers, cancellation refund schedules, weather delays, usage buyouts, and talent payouts.',
    '/refund-policy'
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
        title="REFUND, CANCELLATION & FINANCIAL POLICY"
        subtitle="Transparent financial terms governing client booking retainers, cancellation schedules, weather postponements, and talent payout safeguards."
        badge="FINANCIAL TRANSPARENCY • CORPORATE BILLING STANDARDS"
        bgImage="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2000&q=90"
        breadcrumbs={[{ label: 'Refund Policy' }]}
      />

      <PageContainer>
        {/* ---------------------------------------------------------- */}
        {/* 1. EXECUTIVE SUMMARY & STATS                                 */}
        {/* ---------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionTitle
              badge="FINANCIAL CHARTER"
              title="Fair, Clear & Standardized Billing Procedures"
              subtitle="AURA Couture enforces strict corporate accounting and contract protection standards globally."
            />
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              At <strong className="text-white">AURA Couture</strong> (operating the{' '}
              <strong className="text-gold-400">Vogue Vibe Models</strong> global network), we maintain absolute clarity in all financial arrangements with brand clients, production houses, advertising agencies, and represented talent across <strong className="text-white">India, USA, UK, UAE, and Europe</strong>.
            </p>
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              This Financial Policy details the contractual terms governing client booking retainers, production cancellation windows, refund calculation matrices, weather delays, commercial usage buyout terms, and invoicing standards in accordance with international commercial law and the <strong className="text-white">Indian Goods and Services Tax (GST) Act 2017</strong>.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <DollarSign className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">50% Retainer</h3>
              <p className="text-xs text-zinc-400">Advance deposit required to lock talent calendars.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Clock className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">14-Day Notice</h3>
              <p className="text-xs text-zinc-400">Full retainer refund window for client cancellations.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <ShieldCheck className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">₹0 Talent Fee</h3>
              <p className="text-xs text-zinc-400">Talent applications are 100% free with zero fees.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Receipt className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">GST Invoicing</h3>
              <p className="text-xs text-zinc-400">Compliant corporate invoices with input tax credits.</p>
            </div>
          </div>
        </div>

        {/* RELATED CONTENT FEATURED IMAGES */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=90"
              alt="Corporate Client Production Booking Retainers"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Production Accounting</span>
              <h3 className="text-lg font-bold text-white font-serif">Corporate Client Booking Retainers</h3>
            </div>
          </div>

          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=90"
              alt="Verified Talent Booking Payouts & Legal Contracts"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Talent Payout Safeguards</span>
              <h3 className="text-lg font-bold text-white font-serif">Verified Performer Compensation</h3>
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
            <a href="#booking-retainers" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              1. Booking Retainers & Payment Terms
            </a>
            <a href="#cancellation-schedule" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              2. Cancellation & Refund Matrix
            </a>
            <a href="#weather-delays" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              3. Weather Permitting & Postponement Clause
            </a>
            <a href="#talent-zero-fees" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              4. Zero Upfront Fee Guarantee for Talent
            </a>
            <a href="#usage-buyouts" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              5. Usage Rights & Media Buyout Terms
            </a>
            <a href="#tax-invoicing" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              6. Invoicing & Tax Standards (GST / Sales Tax)
            </a>
            <a href="#dispute-resolution" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              7. Dispute Resolution & Chargebacks
            </a>
            <a href="#refund-faqs" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              8. Frequently Asked Questions
            </a>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 1: BOOKING RETAINERS & PAYMENT TERMS               */}
        {/* ---------------------------------------------------------- */}
        <section id="booking-retainers" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 01</span>
              <h2 className="font-serif text-2xl font-bold text-white">Client Booking Retainers & Advance Payment Terms</h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              When a commercial client, fashion brand, or production company confirms a booking for talent represented by AURA Couture, the booking is secured under the following financial terms:
            </p>
            <ul className="list-disc pl-6 space-y-2.5 text-xs md:text-sm text-zinc-300">
              <li>
                <strong className="text-white">50% Advance Retainer Deposit:</strong> Required upon signing the booking agreement to lock talent availability on global calendars and prevent hold overlaps.
              </li>
              <li>
                <strong className="text-white">Final 50% Balance Payment:</strong> Due within 14 calendar days following shoot completion, or prior to the release of high-resolution digital master deliverables and usage license execution.
              </li>
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 2: CANCELLATION & REFUND MATRIX                    */}
        {/* ---------------------------------------------------------- */}
        <section id="cancellation-schedule" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 02</span>
              <h2 className="font-serif text-2xl font-bold text-white">Client Cancellation & Refund Matrix</h2>
            </div>
          </div>

          <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
            Because booking talent requires locking production dates and turning down alternative engagements, client cancellations are subject to the following statutory refund matrix:
          </p>

          <div className="overflow-x-auto glass-panel border border-gold-500/20 rounded-md mt-4">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-gold-500/30 bg-zinc-900/80 text-gold-400">
                  <th className="p-3.5 font-bold">Cancellation Window Notice</th>
                  <th className="p-3.5 font-bold">Retainer Refund Eligible</th>
                  <th className="p-3.5 font-bold">Cancellation Fee Retained</th>
                  <th className="p-3.5 font-bold">Talent Compensation Provision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                <tr>
                  <td className="p-3.5 font-semibold text-white">14+ Business Days Notice</td>
                  <td className="p-3.5 text-emerald-400 font-bold">100% Refund</td>
                  <td className="p-3.5 font-mono text-zinc-400">Processing Fee Only</td>
                  <td className="p-3.5">Talent dates released; full schedule reset.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">7 to 13 Days Notice</td>
                  <td className="p-3.5 text-amber-400 font-bold">50% Refund</td>
                  <td className="p-3.5 font-mono text-zinc-400">50% of Deposit Retained</td>
                  <td className="p-3.5">50% retained fee paid to talent for hold loss.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Less than 7 Days Notice</td>
                  <td className="p-3.5 text-rose-400 font-bold">0% Refund</td>
                  <td className="p-3.5 font-mono text-zinc-400">100% Deposit Retained</td>
                  <td className="p-3.5">Full deposit paid to talent for lost booking opportunity.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">24 Hours / Same-Day Cancel</td>
                  <td className="p-3.5 text-rose-400 font-bold">0% Refund</td>
                  <td className="p-3.5 font-mono text-zinc-400">100% Full Rate Billed</td>
                  <td className="p-3.5">Client billed 100% of contracted total day fee.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 4: ZERO UPFRONT FEE GUARANTEE FOR TALENT           */}
        {/* ---------------------------------------------------------- */}
        <section id="talent-zero-fees" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 04</span>
              <h2 className="font-serif text-2xl font-bold text-white">Zero Upfront Fee Guarantee for Aspiring Talent</h2>
            </div>
          </div>

          <div className="glass-panel p-8 border border-emerald-500/30 rounded-md bg-emerald-950/10 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white flex items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
              Absolute Zero Fees for Applicants
            </h3>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-light">
              For aspiring models, actors, dancers, singers, musicians, and artists: <strong className="text-white">AURA Couture does NOT charge registration fees, application charges, portfolio photoshoot fees, or subscription dues.</strong>
            </p>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
              We earn strictly on standard industry commissions deducted from paid client bookings after you perform. Any individual claiming to represent AURA Couture while demanding upfront money is fraudulent.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 8: FREQUENTLY ASKED QUESTIONS (FAQ SCHEMA)          */}
        {/* ---------------------------------------------------------- */}
        <section id="refund-faqs" className="mt-20 space-y-6">
          <SectionTitle
            badge="COMMON INQUIRIES"
            title="Frequently Asked Questions"
            subtitle="Clear answers regarding retainer refunds, weather delays, and billing procedures."
            centered
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-4">
            {refundFaqs.map(({ q, a }) => (
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

        {/* CONTACT FINANCIAL OPERATIONS DESK */}
        <div className="mt-24 glass-panel border border-gold-500/20 rounded-md p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">
              Contact Financial Operations & Invoicing
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              For client invoice inquiries, retainer refund requests, or GST/tax documentation, reach out to our corporate accounting desk:
            </p>
            <div className="space-y-2 text-xs md:text-sm text-zinc-300 pt-2">
              <p className="flex items-center">
                <Mail className="w-4 h-4 text-gold-400 mr-2" />
                billing@auracouture.com
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
              Contact Billing Desk
            </Link>
            <Link
              href="/models"
              className="px-6 py-3.5 rounded-md font-semibold text-xs uppercase tracking-wider bg-zinc-900 border border-gold-500/30 text-white hover:bg-zinc-800 transition-all text-center"
            >
              Browse Talent Roster
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <CTASection
          title="Book Elite Global Performers"
          description="Secure top models, actors, singers, dancers, painters, and musicians under transparent, professional corporate booking contracts."
          primaryButtonText="Hire Talent Now"
          primaryButtonHref="/hire-a-model"
          secondaryButtonText="View Talent Roster"
          secondaryButtonHref="/models"
        />
      </PageContainer>
    </>
  );
}
