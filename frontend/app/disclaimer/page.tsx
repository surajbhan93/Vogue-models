import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { CTASection } from '@/components/common/CTASection';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
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
  HelpCircle,
  Users,
  Search,
  ArrowRight,
} from 'lucide-react';

// -----------------------------------------------------------------------
// SEO METADATA
// -----------------------------------------------------------------------
export const metadata = generatePageMetadata({
  title: 'Representation & Scouting Fraud Disclaimer | Safety Warning',
  description:
    'Official Scouting Fraud Disclaimer and Safety Advisory for AURA Couture and Vogue Vibe Models. Learn how to verify official talent agents, avoid upfront portfolio scams, report impersonators, and protect your digital privacy across India, USA, and global fashion markets.',
  path: '/disclaimer',
  keywords: [
    'Scouting Fraud Disclaimer',
    'Modeling Agency Scam Warning',
    'AURA Couture Scout Verification',
    'Fake Modeling Scout Warning',
    'Upfront Portfolio Fee Scam',
    'Instagram Scout Impersonation',
    'Talent Representation Security',
    'Minor Model Protection Rules',
    'Report Modeling Scam Mumbai NYC',
  ],
});

// -----------------------------------------------------------------------
// FAQ DATA FOR AEO / FAQ SCHEMA
// -----------------------------------------------------------------------
const disclaimerFaqs = [
  {
    q: 'Does AURA Couture / Vogue Vibe Models charge money to sign or scout new talent?',
    a: 'NO. Absolute Zero Upfront Fees. AURA Couture NEVER charges application fees, registration fees, mandatory portfolio photoshoot charges, or audition processing fees. We earn strictly on commission from legitimate client bookings after talent is paid.',
  },
  {
    q: 'How can I verify if someone claiming to be an AURA Couture scout is legitimate?',
    a: 'Official scouts communicate ONLY from @auracouture.com email addresses. Never trust communications from personal Gmail, Yahoo, WhatsApp, Telegram, or unofficial Instagram DMs. You can verify any agent by emailing security@auracouture.com.',
  },
  {
    q: 'Will an official scout ever ask me for explicit or nude polaroid photos?',
    a: 'NEVER. Official scouts will NEVER ask for explicit, nude, lingerie, or unclad photos via private messaging apps. Digitals are taken in basic form-fitting clothing (e.g. plain t-shirt and jeans) in natural lighting.',
  },
  {
    q: 'What should I do if a fake scout asks me for money via UPI, GooglePay, or Wire Transfer?',
    a: 'Do NOT send money or private personal details. Block the account immediately, take screenshots of the conversation, and report the fraudulent user to security@auracouture.com and your local cybercrime department.',
  },
  {
    q: 'How are minors (under 18) protected during scouting and auditions?',
    a: 'Communications regarding minor applicants must involve a parent or legal guardian. All auditions, test shoots, and client bookings for minors require chaperones, parent contract signatures, and strict legal oversight.',
  },
];

function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: disclaimerFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

export default function DisclaimerPage() {
  const pageSchema = generateWebPageSchema(
    'Representation & Fraud Safety Disclaimer',
    'Official advisory regarding unauthorized talent scouts, social media impersonation scams, zero upfront fee guarantees, and security verification protocols.',
    '/disclaimer'
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
        title="REPRESENTATION & SCOUTING FRAUD DISCLAIMER"
        subtitle="Critical safety advisory regarding unauthorized talent scouts, social media impersonation, zero-fee representation guarantees, and verification protocols."
        badge="SECURITY & SAFETY ADVISORY • GLOBAL TALENT PROTECTION"
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=90"
        breadcrumbs={[{ label: 'Disclaimer' }]}
      />

      <PageContainer>
        {/* ---------------------------------------------------------- */}
        {/* 1. EXECUTIVE WARNING & STATS                                 */}
        {/* ---------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionTitle
              badge="SAFETY MANDATE"
              title="Protecting Aspiring Talent from Scouting Scams"
              subtitle="AURA Couture strictly enforces zero-fee representation and zero-tolerance safety policies worldwide."
            />
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              At <strong className="text-white">AURA Couture</strong> (operating the{' '}
              <strong className="text-gold-400">Vogue Vibe Models</strong> global network), the safety, physical integrity, and security of aspiring models, actors, singers, dancers, musicians, and artists across <strong className="text-white">India, USA, UK, UAE, and Europe</strong> is our highest priority.
            </p>
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              Due to the global reputation of our agency, unauthorized individuals or fraudulent entities frequently attempt to impersonate AURA Couture agents, talent scouts, or casting directors on social media platforms (Instagram, Telegram, WhatsApp, Facebook, TikTok) to scam aspiring performers. This Disclaimer outlines our strict security protocols, verification steps, and zero-tolerance policies.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="glass-panel p-5 border border-rose-500/30 bg-rose-950/20 rounded-md space-y-2">
              <XCircle className="w-7 h-7 text-rose-400" />
              <h3 className="font-serif text-lg font-bold text-white">₹0 Upfront Fees</h3>
              <p className="text-xs text-zinc-400">We NEVER charge application, registration, or portfolio fees.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <CheckCircle2 className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Official Emails</h3>
              <p className="text-xs text-zinc-400">Communications come ONLY from @auracouture.com domains.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <ShieldCheck className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Minor Protection</h3>
              <p className="text-xs text-zinc-400">Mandatory parent/guardian involvement for talent under 18.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Lock className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Instant Verify</h3>
              <p className="text-xs text-zinc-400">Verify any agent 24/7 at security@auracouture.com.</p>
            </div>
          </div>
        </div>

        {/* RELATED CONTENT FEATURED IMAGES */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=90"
              alt="Official Agent Safety Verification Desk"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Security & Verification</span>
              <h3 className="text-lg font-bold text-white font-serif">Verified Scout Credential Check</h3>
            </div>
          </div>

          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=90"
              alt="Verified Professional Model Representation"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Ethical Talent Representation</span>
              <h3 className="text-lg font-bold text-white font-serif">Safe & Professional Casting Environment</h3>
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
            <a href="#golden-rules" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              1. The 4 Golden Rules of Scouting Security
            </a>
            <a href="#common-scams" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              2. Recognizing Scouting Scams in India & USA
            </a>
            <a href="#verification-process" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              3. Agent Verification Protocol
            </a>
            <a href="#minor-protection" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              4. Minor Talent (Under 18) Protection Rules
            </a>
            <a href="#website-disclaimer" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              5. Website & Representation Disclaimer
            </a>
            <a href="#report-fraud" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              6. How to Report Fraud & Cybercrime
            </a>
            <a href="#disclaimer-faqs" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              7. Frequently Asked Questions
            </a>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 1: THE 4 GOLDEN RULES OF SCOUTING SECURITY          */}
        {/* ---------------------------------------------------------- */}
        <section id="golden-rules" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 01</span>
              <h2 className="font-serif text-2xl font-bold text-white">The 4 Golden Rules of Scouting Security</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 border border-emerald-500/30 bg-emerald-950/10 rounded-md space-y-3">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30">1</span>
                <h3 className="font-serif text-lg font-bold text-white">Zero Upfront Representation Fees</h3>
              </div>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                AURA Couture works strictly on commission earned from paid client bookings. We <strong className="text-emerald-400">NEVER</strong> ask for money, application fees, portfolio photoshoot charges, or sign-up payments. If someone asks for money, they are 100% a scammer.
              </p>
            </div>

            <div className="glass-panel p-6 border border-emerald-500/30 bg-emerald-950/10 rounded-md space-y-3">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30">2</span>
                <h3 className="font-serif text-lg font-bold text-white">Official Email Domains Only</h3>
              </div>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                All legitimate emails from our agents, bookers, and scouts originate exclusively from <span className="text-gold-400 font-mono">@auracouture.com</span>. We do not use Gmail, Yahoo, Hotmail, Outlook, or unofficial messaging handles to conduct official business.
              </p>
            </div>

            <div className="glass-panel p-6 border border-emerald-500/30 bg-emerald-950/10 rounded-md space-y-3">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30">3</span>
                <h3 className="font-serif text-lg font-bold text-white">Zero Explicit Imagery Requests</h3>
              </div>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                Our scouts will <strong className="text-emerald-400">NEVER</strong> ask for nude, lingerie, or unclad photos over WhatsApp, Telegram, or Instagram DMs. Digital polaroids require basic fitted attire (t-shirt & jeans) in plain natural light.
              </p>
            </div>

            <div className="glass-panel p-6 border border-emerald-500/30 bg-emerald-950/10 rounded-md space-y-3">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30">4</span>
                <h3 className="font-serif text-lg font-bold text-white">Parent / Guardian Presence</h3>
              </div>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                For any applicant under 18 years of age, all scout communications, meetings, auditions, and contracts must involve a parent or legal guardian. Unaccompanied meetings with minors are strictly prohibited.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQ SCHEMA)          */}
        {/* ---------------------------------------------------------- */}
        <section id="disclaimer-faqs" className="mt-20 space-y-6">
          <SectionTitle
            badge="COMMON INQUIRIES"
            title="Frequently Asked Questions"
            subtitle="Clear answers regarding representation safety, zero-fee policies, and verification."
            centered
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-4">
            {disclaimerFaqs.map(({ q, a }) => (
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

        {/* CONTACT SECURITY DESK SECTION */}
        <div className="mt-24 glass-panel border border-gold-500/20 rounded-md p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">
              Need 24/7 Agent Verification Assistance?
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              If you have been contacted by a scout and wish to verify their identity, reach out directly to our Security & Fraud Advisory Desk.
            </p>
            <div className="space-y-2 text-xs md:text-sm text-zinc-300 pt-2">
              <p className="flex items-center">
                <Mail className="w-4 h-4 text-gold-400 mr-2" />
                security@auracouture.com
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
              Verify An Agent
            </Link>
            <Link
              href="/become-a-model"
              className="px-6 py-3.5 rounded-md font-semibold text-xs uppercase tracking-wider bg-zinc-900 border border-gold-500/30 text-white hover:bg-zinc-800 transition-all text-center"
            >
              Official Application
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <CTASection
          title="Apply for Official Representation"
          description="Submit your digital polaroids directly to accredited AURA Couture agents with zero upfront fees."
          primaryButtonText="Submit Scouting Application"
          primaryButtonHref="/become-a-model"
          secondaryButtonText="View Talent Roster"
          secondaryButtonHref="/models"
        />
      </PageContainer>
    </>
  );
}
