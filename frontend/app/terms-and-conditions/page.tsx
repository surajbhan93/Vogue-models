import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { CTASection } from '@/components/common/CTASection';
import {
  FileText,
  ShieldCheck,
  Scale,
  Gavel,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  Clock,
  DollarSign,
  AlertTriangle,
  UserCheck,
  Lock,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

// -----------------------------------------------------------------------
// SEO METADATA
// -----------------------------------------------------------------------
export const metadata = generatePageMetadata({
  title: 'Terms & Conditions of Representation & Usage | AURA Couture',
  description:
    'Official Terms and Conditions of Representation and Website Usage for AURA Couture and Vogue Vibe Models. Comprehensive legal terms governing talent scouting agreements, client booking contracts, daily rates, overtime, media buyout licenses, and on-set safety standards across India, USA, and global markets.',
  path: '/terms-and-conditions',
  keywords: [
    'Terms and Conditions',
    'AURA Couture Representation Terms',
    'Modeling Booking Contract Rules',
    'Talent Management Terms 2026',
    'Overtime & Daily Rate Policy',
    'Media Buyout Licensing Terms',
    'On-Set Talent Safety Mandate',
    'Governing Law Bombay New York',
  ],
});

// -----------------------------------------------------------------------
// FAQ DATA FOR AEO / FAQ SCHEMA
// -----------------------------------------------------------------------
const termsFaqs = [
  {
    q: 'Does submitting a scouting application create a binding contract with AURA Couture?',
    a: 'No. Submitting digital polaroids through our website constitutes an initial scouting inquiry. Official agency representation is legally binding only upon the execution of a written Management Agreement signed by an authorized executive of AURA Couture.',
  },
  {
    q: 'What are the standard working hours and overtime rules for client bookings?',
    a: 'Standard shoot bookings are structured for 8 hours (half-day 4 hours). Overtime beyond 8 hours is billed at 1.5x the hourly rate, and time beyond 10 hours is billed at 2.0x the hourly rate. Meal breaks are mandatory every 4 hours.',
  },
  {
    q: 'What happens if a client uses talent imagery beyond the contracted license period?',
    a: 'Unauthorized media usage beyond the agreed territory, media scope, or duration constitutes intentional copyright infringement. Clients will be billed automatic statutory penalty fees equal to 200% to 500% of the original buyout rate.',
  },
  {
    q: 'What safety standards are guaranteed for performers on production sets?',
    a: 'AURA Couture enforces a zero-tolerance policy against physical, verbal, or sexual harassment. Performers have the absolute legal right to halt work and leave any set that violates safety, modesty, or chaperone protocols without financial penalty.',
  },
  {
    q: 'Which court jurisdiction governs legal disputes under these terms?',
    a: 'Disputes concerning Asian and Indian operations are governed by the High Court of Judicature at Bombay, India. Disputes concerning North American and European operations are governed by the Supreme Court of the State of New York, USA.',
  },
];

function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: termsFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

export default function TermsPage() {
  const pageSchema = generateWebPageSchema(
    'Terms & Conditions of Representation & Usage',
    'Official terms governing talent scouting representation, client booking agreements, daily rates, media buyouts, and platform usage.',
    '/terms-and-conditions'
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
        title="TERMS & CONDITIONS OF REPRESENTATION"
        subtitle="Comprehensive legal rules governing talent scouting representation agreements, client booking contracts, media licensing rights, and website usage."
        badge="GLOBAL LEGAL CHARTER • CONTRACT STANDARDS"
        bgImage="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=2000&q=90"
        breadcrumbs={[{ label: 'Terms & Conditions' }]}
      />

      <PageContainer>
        {/* ---------------------------------------------------------- */}
        {/* 1. EXECUTIVE SUMMARY & STATS                                 */}
        {/* ---------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionTitle
              badge="LEGAL FRAMEWORK"
              title="Binding Agreements Built on Trust & Integrity"
              subtitle="AURA Couture enforces transparent contract standards for talent and brand clients worldwide."
            />
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              Welcome to <strong className="text-white">AURA Couture</strong> (operating the{' '}
              <strong className="text-gold-400">Vogue Vibe Models</strong> global network). By accessing our website at <span className="text-gold-400 font-mono">auracouture.com</span>, applying for talent scouting representation, or booking talent through our agency desks in <strong className="text-white">Paris, Milan, London, New York, Mumbai, or Delhi</strong>, you agree to be bound by these Master Terms & Conditions.
            </p>
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              These terms establish legal protections for represented fashion models, actors, singers, dancers, painters, and musicians, as well as binding operational rules for brand clients, production managers, and website visitors.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Gavel className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Binding Terms</h3>
              <p className="text-xs text-zinc-400">Enforceable agreements for clients and talent.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <ShieldCheck className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">₹0 Scouting Fee</h3>
              <p className="text-xs text-zinc-400">Zero upfront fees for talent representation.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Clock className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Overtime Rules</h3>
              <p className="text-xs text-zinc-400">Strict 8-hr day & overtime billing policies.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <ShieldAlert className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Set Safety</h3>
              <p className="text-xs text-zinc-400">Zero-tolerance harassment & safety policy.</p>
            </div>
          </div>
        </div>

        {/* RELATED CONTENT FEATURED IMAGES */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=90"
              alt="Legal Agency Contracts & Corporate Handshake"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Executive Representation Contracts</span>
              <h3 className="text-lg font-bold text-white font-serif">Transparent Talent & Client Agreements</h3>
            </div>
          </div>

          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=90"
              alt="Talent Representation & Client Booking Compliance"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Client Booking Compliance</span>
              <h3 className="text-lg font-bold text-white font-serif">Protected On-Set Working Conditions</h3>
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
            <a href="#scouting-representation" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              1. Scouting & Agency Representation Terms
            </a>
            <a href="#client-booking-rules" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              2. Client Booking Rules & Overtime Rates
            </a>
            <a href="#usage-licensing-penalties" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              3. Usage Licensing & Exceeding Buyout Penalties
            </a>
            <a href="#onset-safety" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              4. On-Set Health & Anti-Harassment Mandates
            </a>
            <a href="#intellectual-property-terms" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              5. Intellectual Property & Anti-Scraping
            </a>
            <a href="#governing-jurisdiction" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              6. Limitation of Liability & Court Jurisdiction
            </a>
            <a href="#terms-faqs" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              7. Frequently Asked Questions
            </a>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 1: SCOUTING & REPRESENTATION TERMS                  */}
        {/* ---------------------------------------------------------- */}
        <section id="scouting-representation" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 01</span>
              <h2 className="font-serif text-2xl font-bold text-white">Scouting & Agency Representation Terms</h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              Submitting digital polaroids, comp cards, or contact details through our website constitutes an application for talent evaluation. Representation terms are governed as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2.5 text-xs md:text-sm text-zinc-300">
              <li>
                <strong className="text-white">Non-Binding Scouting Submissions:</strong> Application submission does not create a binding management contract or guarantee representation. Representation is formalized exclusively through a written Management Agreement signed by an authorized executive.
              </li>
              <li>
                <strong className="text-white">Zero Upfront Representation Fees:</strong> AURA Couture NEVER charges application fees, registration fees, mandatory portfolio photo fees, or sign-up charges. Commission (standard 20%) is deducted only from paid client bookings.
              </li>
              <li>
                <strong className="text-white">Minor Applicants (Under 18):</strong> All scouting communications, contract negotiations, and booking agreements for minors require countersignatures from a parent or legal guardian.
              </li>
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 2: CLIENT BOOKING RULES & OVERTIME RATES            */}
        {/* ---------------------------------------------------------- */}
        <section id="client-booking-rules" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 02</span>
              <h2 className="font-serif text-2xl font-bold text-white">Client Booking Rules, Hours & Overtime Policy</h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              Clients booking talent through AURA Couture agree to strictly adhere to standardized shoot duration and overtime rate guidelines:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
                <h3 className="font-serif text-base font-bold text-white">Standard Shoot Day</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Full day rate covers up to <strong className="text-white">8 hours</strong> (including 1-hour catered meal break). Half day rate covers up to 4 hours.
                </p>
              </div>

              <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
                <h3 className="font-serif text-base font-bold text-white">Overtime Multipliers</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Hours 8 to 10 are billed at <strong className="text-white">1.5x hourly rate</strong>. Hours exceeding 10 are billed at <strong className="text-white">2.0x hourly rate</strong>.
                </p>
              </div>

              <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
                <h3 className="font-serif text-base font-bold text-white">Fitting & Travel Rates</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Wardrobe fitting sessions are billed at 50% of hourly rate. Travel days outside home city hubs are billed at 50% day rate plus per diem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 4: ON-SET HEALTH & ANTI-HARASSMENT MANDATES         */}
        {/* ---------------------------------------------------------- */}
        <section id="onset-safety" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 04</span>
              <h2 className="font-serif text-2xl font-bold text-white">On-Set Health, Safety & Anti-Harassment Mandates</h2>
            </div>
          </div>

          <div className="glass-panel p-8 border border-gold-500/30 rounded-md bg-zinc-950/90 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white flex items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
              Zero-Tolerance Safety Policy
            </h3>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-light">
              AURA Couture maintains a zero-tolerance policy against physical abuse, verbal harassment, sexual misconduct, or un-chaperoned minor shoots. Production clients must provide secure changing areas, adequate hydration, temperature-controlled environments, and chaperoned access.
            </p>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
              Talent and booking agents retain the immediate legal right to halt performance and leave any set that violates safety or modesty rules without financial penalty or breach of contract.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQ SCHEMA)          */}
        {/* ---------------------------------------------------------- */}
        <section id="terms-faqs" className="mt-20 space-y-6">
          <SectionTitle
            badge="COMMON INQUIRIES"
            title="Frequently Asked Questions"
            subtitle="Clear answers regarding representation terms, overtime, and contract enforcement."
            centered
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-4">
            {termsFaqs.map(({ q, a }) => (
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

        {/* CONTACT LEGAL COUNSEL DESK */}
        <div className="mt-24 glass-panel border border-gold-500/20 rounded-md p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">
              Contact Agency Legal Counsel & Contract Desk
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              For questions regarding agency contracts, client booking agreements, or legal terms, reach out to our legal department:
            </p>
            <div className="space-y-2 text-xs md:text-sm text-zinc-300 pt-2">
              <p className="flex items-center">
                <Mail className="w-4 h-4 text-gold-400 mr-2" />
                legal@auracouture.com
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
              Contact Legal Desk
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
          description="Book elite talent under legally transparent contracts and protected working conditions."
          primaryButtonText="Browse Talent Roster"
          primaryButtonHref="/models"
          secondaryButtonText="Become a Talent"
          secondaryButtonHref="/become-a-model"
        />
      </PageContainer>
    </>
  );
}
