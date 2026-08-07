import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { CTASection } from '@/components/common/CTASection';
import {
  Truck,
  Package,
  Globe,
  Clock,
  ShieldCheck,
  FileCheck2,
  Building2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Search,
  ArrowRight,
  Plane,
} from 'lucide-react';

// -----------------------------------------------------------------------
// SEO METADATA
// -----------------------------------------------------------------------
export const metadata = generatePageMetadata({
  title: 'Physical Comp Card Shipping Policy | AURA Couture Logistics',
  description:
    'Official Physical Comp Card and Agency Portfolio Book Shipping Policy for AURA Couture and Vogue Vibe Models. Learn about express international courier dispatch timelines, DHL/FedEx/BlueDart delivery schedules, customs duties, tracking, and reprint guarantees across India, USA, UK, UAE, and Europe.',
  path: '/shipping-policy',
  keywords: [
    'Comp Card Shipping Policy',
    'AURA Couture Physical Dispatch',
    'Model Portfolio Book Delivery',
    'DHL Express Comp Card Shipping',
    'FedEx Priority Modeling Agency',
    'BlueDart Mumbai Delhi Express Shipping',
    'International Casting Book Dispatch',
    'Damaged Comp Card Replacement Guarantee',
  ],
});

// -----------------------------------------------------------------------
// FAQ DATA FOR AEO / FAQ SCHEMA
// -----------------------------------------------------------------------
const shippingFaqs = [
  {
    q: 'How quickly are physical model comp cards and agency lookbooks dispatched?',
    a: 'Orders for physical composite cards and hardcover agency portfolio books are printed and dispatched within 24 to 48 business hours from our print hubs in Milan, New York, or Mumbai via priority air express couriers.',
  },
  {
    q: 'Which courier services does AURA Couture use for physical shipments?',
    a: 'We partner exclusively with tier-1 international air express couriers: DHL Express Priority, FedEx International Priority, and BlueDart Apex (India). All packages include signature-required proof of delivery and real-time GPS air waybill tracking.',
  },
  {
    q: 'What are the delivery timelines for India, USA, UK, and Europe?',
    a: 'India Domestic (Mumbai, Delhi, Bangalore): 1-2 business days. USA & Canada: 2-3 business days. UK & Europe: 1-3 business days. UAE & Middle East: 2-3 business days. Rest of World: 4-6 business days.',
  },
  {
    q: 'Are customs duties and import taxes included in international shipping charges?',
    a: 'For commercial client casting orders, shipments are sent DDP (Delivered Duty Paid) where duties are pre-calculated at checkout. For standard talent comp card packages sent DDU, recipients may be responsible for local import VAT or customs clearance taxes.',
  },
  {
    q: 'What happens if a physical comp card shipment arrives damaged or lost in transit?',
    a: 'We provide a 100% Free Reprint & Priority Dispatch Guarantee. If your shipment is lost or damaged during courier transit, notify shipping@auracouture.com with your AWB number for an immediate priority replacement.',
  },
];

function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: shippingFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

export default function ShippingPolicyPage() {
  const pageSchema = generateWebPageSchema(
    'Physical Comp Card & Portfolio Shipping Policy',
    'Official standards governing express courier dispatch, international delivery timelines, air waybill tracking, and damaged package reprint guarantees.',
    '/shipping-policy'
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
        title="PHYSICAL COMP CARD SHIPPING POLICY"
        subtitle="Express global courier standards for physical model composite cards, hardcover agency books, lookbooks, and press kits."
        badge="PHYSICAL LOGISTICS • PRIORITY AIR COURIER DISPATCH"
        bgImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=90"
        breadcrumbs={[{ label: 'Shipping Policy' }]}
      />

      <PageContainer>
        {/* ---------------------------------------------------------- */}
        {/* 1. EXECUTIVE SUMMARY & STATS                                 */}
        {/* ---------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionTitle
              badge="GLOBAL LOGISTICS"
              title="Delivering Print Perfection to Casting Desks Worldwide"
              subtitle="AURA Couture enforces high-speed priority courier dispatch for all physical talent presentation assets."
            />
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              At <strong className="text-white">AURA Couture</strong> (operating the{' '}
              <strong className="text-gold-400">Vogue Vibe Models</strong> global network), we understand that while digital portfolios stream seamlessly online, physical luxury presentation materials—such as high-grade printed composite cards (comp cards), hardcover agency lookbooks, and media press kits—remain essential for executive casting sessions in <strong className="text-white">Paris, Milan, London, New York, Mumbai, and Delhi</strong>.
            </p>
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              This Physical Comp Card Shipping Policy outlines our printing lead times, express courier dispatch protocols, domestic and international shipping schedules, customs clearance procedures, and real-time tracking safeguards.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Truck className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">24-48hr Dispatch</h3>
              <p className="text-xs text-zinc-400">Rapid printing and courier pick-up from key hubs.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Plane className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Air Express</h3>
              <p className="text-xs text-zinc-400">DHL Express, FedEx Priority & BlueDart Apex.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Search className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">GPS Tracking</h3>
              <p className="text-xs text-zinc-400">Real-time air waybill tracking & signature delivery.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <ShieldCheck className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Reprint Guarantee</h3>
              <p className="text-xs text-zinc-400">100% free priority reprint for damaged transit items.</p>
            </div>
          </div>
        </div>

        {/* RELATED CONTENT FEATURED IMAGES */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1200&q=90"
              alt="Luxury Print Comp Cards & Hardcover Portfolio Books"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Luxury Print Production</span>
              <h3 className="text-lg font-bold text-white font-serif">Printed Composite Cards & Hardcover Books</h3>
            </div>
          </div>

          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=90"
              alt="Express International Courier Logistics"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Air Express Courier Network</span>
              <h3 className="text-lg font-bold text-white font-serif">DHL Express & FedEx Priority Air Freight</h3>
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
            <a href="#dispatch-windows" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              1. Printing & Dispatch Lead Times
            </a>
            <a href="#delivery-schedules" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              2. Domestic & International Delivery Matrix
            </a>
            <a href="#customs-duties" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              3. Customs Duties & Import Tax Terms
            </a>
            <a href="#tracking-proof" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              4. Real-time Tracking & Delivery Signature
            </a>
            <a href="#reprint-guarantee" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              5. Damaged/Lost Package Reprint Guarantee
            </a>
            <a href="#digital-alternatives" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              6. Instant Digital PDF Downloads
            </a>
            <a href="#shipping-faqs" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              7. Frequently Asked Questions
            </a>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 1: PRINTING & DISPATCH LEAD TIMES                  */}
        {/* ---------------------------------------------------------- */}
        <section id="dispatch-windows" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 01</span>
              <h2 className="font-serif text-2xl font-bold text-white">Printing & Dispatch Lead Times</h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              AURA Couture maintains state-of-the-art digital printing hubs in <strong className="text-white">Milan (Italy)</strong>, <strong className="text-white">New York (USA)</strong>, and <strong className="text-white">Mumbai (India)</strong>. Physical assets are produced on heavyweight 350 GSM luxury matte cardstock with anti-scratch UV coating:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
                <FileCheck2 className="w-6 h-6 text-gold-400" />
                <h3 className="font-serif text-base font-bold text-white">Comp Cards (Standard Batch)</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Printed and handed to air express courier partners within <strong className="text-white">24 business hours</strong> of order confirmation.
                </p>
              </div>

              <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
                <Package className="w-6 h-6 text-gold-400" />
                <h3 className="font-serif text-base font-bold text-white">Hardcover Lookbooks</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Custom bound hardcover agency client books dispatch within <strong className="text-white">48 business hours</strong>.
                </p>
              </div>

              <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
                <Plane className="w-6 h-6 text-gold-400" />
                <h3 className="font-serif text-base font-bold text-white">Same-Day Express Courier</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Available for urgent fashion week casting desks in Mumbai, Delhi, New York, and Milan upon special request.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 2: DOMESTIC & INTERNATIONAL DELIVERY MATRIX        */}
        {/* ---------------------------------------------------------- */}
        <section id="delivery-schedules" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 02</span>
              <h2 className="font-serif text-2xl font-bold text-white">Domestic & International Delivery Schedule Matrix</h2>
            </div>
          </div>

          <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
            Estimated delivery windows following dispatch from our printing hubs:
          </p>

          <div className="overflow-x-auto glass-panel border border-gold-500/20 rounded-md mt-4">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-gold-500/30 bg-zinc-900/80 text-gold-400">
                  <th className="p-3.5 font-bold">Destination Region</th>
                  <th className="p-3.5 font-bold">Courier Partner</th>
                  <th className="p-3.5 font-bold">Estimated Delivery Time</th>
                  <th className="p-3.5 font-bold">Tracking Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                <tr>
                  <td className="p-3.5 font-semibold text-white">India Metro (Mumbai, Delhi, BLR)</td>
                  <td className="p-3.5">BlueDart Apex / Air Express</td>
                  <td className="p-3.5 text-emerald-400 font-bold">1 - 2 Business Days</td>
                  <td className="p-3.5">Live AWB + SMS Alerts</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">India Tier-2 / Tier-3 Regional</td>
                  <td className="p-3.5">BlueDart / DTDC Air</td>
                  <td className="p-3.5">2 - 4 Business Days</td>
                  <td className="p-3.5">Live AWB Tracking</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">USA & Canada (Major Cities)</td>
                  <td className="p-3.5">FedEx International Priority</td>
                  <td className="p-3.5 text-emerald-400 font-bold">2 - 3 Business Days</td>
                  <td className="p-3.5">Signature Required</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">UK, EU & Europe (Paris, Milan, London)</td>
                  <td className="p-3.5">DHL Express Worldwide</td>
                  <td className="p-3.5 text-emerald-400 font-bold">1 - 3 Business Days</td>
                  <td className="p-3.5">Signature Required</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">UAE & Middle East (Dubai, Abu Dhabi)</td>
                  <td className="p-3.5">Aramex / DHL Express</td>
                  <td className="p-3.5">2 - 3 Business Days</td>
                  <td className="p-3.5">Signature Required</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Rest of World (Australia, Japan, S. America)</td>
                  <td className="p-3.5">DHL Express Worldwide</td>
                  <td className="p-3.5">4 - 6 Business Days</td>
                  <td className="p-3.5">Air Waybill GPS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 5: DAMAGED PACKAGE REPRINT GUARANTEE               */}
        {/* ---------------------------------------------------------- */}
        <section id="reprint-guarantee" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 05</span>
              <h2 className="font-serif text-2xl font-bold text-white">Damaged or Lost Package Reprint Guarantee</h2>
            </div>
          </div>

          <div className="glass-panel p-8 border border-gold-500/30 rounded-md bg-zinc-950/90 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white flex items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
              100% Free Priority Reprint Promise
            </h3>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-light">
              All physical shipments are fully insured. If your comp card package or lookbook volume is damaged during transit or lost by the courier, AURA Couture will reprint and re-dispatch your order via priority air express at <strong className="text-white">Zero Additional Cost</strong>.
            </p>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
              Simply email photos of the damaged package and your order AWB number to <span className="text-gold-400 font-mono">shipping@auracouture.com</span> within 48 hours of delivery.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQ SCHEMA)          */}
        {/* ---------------------------------------------------------- */}
        <section id="shipping-faqs" className="mt-20 space-y-6">
          <SectionTitle
            badge="COMMON INQUIRIES"
            title="Frequently Asked Questions"
            subtitle="Clear answers regarding courier dispatch, tracking, and international delivery."
            
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-4">
            {shippingFaqs.map(({ q, a }) => (
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

        {/* CONTACT LOGISTICS DESK */}
        <div className="mt-24 glass-panel border border-gold-500/20 rounded-md p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">
              Need Assistance with a Physical Shipment?
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              For order tracking, urgent casting delivery requests, or address modifications, contact our Logistics Desk:
            </p>
            <div className="space-y-2 text-xs md:text-sm text-zinc-300 pt-2">
              <p className="flex items-center">
                <Mail className="w-4 h-4 text-gold-400 mr-2" />
                shipping@auracouture.com
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
              Contact Logistics Desk
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
          title="Work With Vogue Vibe Models"
          description="Access instant digital comp card PDFs or order luxury printed portfolio books delivered via express air courier globally."
          primaryButtonText="Browse Talent Roster"
          primaryButtonHref="/models"
          secondaryButtonText="Become a Talent"
          secondaryButtonHref="/become-a-model"
        />
      </PageContainer>
    </>
  );
}
