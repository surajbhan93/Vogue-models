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
  Award,
  Sparkles,
  Camera,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  UserCheck,
  Globe,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Scale,
} from 'lucide-react';

// -----------------------------------------------------------------------
// SEO METADATA
// -----------------------------------------------------------------------
export const metadata = generatePageMetadata({
  title: 'Editorial Policy & Content Quality Standards | AURA Couture',
  description:
    'Official Editorial Policy and Content Quality Declaration for AURA Couture and Vogue Vibe Models. Learn about our strict EEAT journalism standards, non-retouched digital polaroid disclosures, creative attribution rules, body positivity mandates, and anti-scam editorial independence across India, USA, and global fashion markets.',
  path: '/editorial-policy',
  keywords: [
    'Editorial Policy',
    'AURA Couture Content Standards',
    'EEAT Fashion Journalism',
    'Non-Retouched Digitals Policy',
    'Un-edited Polaroid Disclosures',
    'Creative Attribution Rules',
    'Healthy Body Mass Index Fashion',
    'Modelling Agency Review Integrity',
    'Fact-Checking Standards Fashion',
  ],
});

// -----------------------------------------------------------------------
// FAQ DATA FOR AEO / FAQ SCHEMA
// -----------------------------------------------------------------------
const editorialFaqs = [
  {
    q: 'What is AURA Couture’s policy on digital photo retouching for scouting?',
    a: 'All scouting polaroids and digital comp cards displayed for agency evaluation are 100% un-retouched. We strictly prohibit skin smoothing filters, digital body reshaping, or artificial AI enhancements on scouting digitals to preserve natural authenticity for casting directors.',
  },
  {
    q: 'How does AURA Couture ensure EEAT (Experience, Expertise, Authoritativeness, Trust) in its blog articles?',
    a: 'Every industry guide, agency review, and career article published on our blog is authored or fact-checked by veteran talent agents, senior casting directors, and fashion journalists with at least 8+ years of direct industry experience in Paris, New York, Milan, or Mumbai.',
  },
  {
    q: 'Does AURA Couture accept paid reviews or sponsored agency rankings?',
    a: 'NO. We maintain strict editorial independence. We do not accept payment, sponsored placements, or commercial incentives from third-party modeling agencies or schools in exchange for positive reviews or listicle rankings.',
  },
  {
    q: 'How are creative teams (photographers, stylists, makeup artists) credited?',
    a: 'We enforce full editorial attribution. Every publication spread, lookbook photo, or video clip credits the original photographer, hair and makeup artists, fashion stylist, and publishing magazine where applicable.',
  },
  {
    q: 'What body health and diversity standards does Vogue Vibe Models support?',
    a: 'In accordance with French and Italian fashion regulations, we promote healthy body standards, reject unhealthy weight pressure on runway models, and actively foster inclusive representation across diverse backgrounds, skin tones, height ranges, and adaptive talent.',
  },
];

function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: editorialFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

export default function EditorialPolicyPage() {
  const pageSchema = generateWebPageSchema(
    'Editorial Policy & Content Quality Standards',
    'Official standards governing journalism integrity, non-retouched digitals disclosures, creative team attribution, and EEAT fact-checking.',
    '/editorial-policy'
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
        title="EDITORIAL POLICY & CONTENT STANDARDS"
        subtitle="Standards governing fashion journalism integrity, non-retouched polaroid disclosures, creative team attributions, and EEAT fact-checking."
        badge="EEAT JOURNALISM INTEGRITY • UNCOMPROMISED AUTHENTICITY"
        bgImage="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=90"
        breadcrumbs={[{ label: 'Editorial Policy' }]}
      />

      <PageContainer>
        {/* ---------------------------------------------------------- */}
        {/* 1. EXECUTIVE SUMMARY & STATS                                 */}
        {/* ---------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionTitle
              badge="INTEGRITY CHARTER"
              title="Truth, Transparency & Creative Integrity"
              subtitle="AURA Couture enforces strict European and North American media transparency standards across all publications."
            />
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              At <strong className="text-white">AURA Couture</strong> (operating the{' '}
              <strong className="text-gold-400">Vogue Vibe Models</strong> editorial house), we believe that fashion journalism and talent representation must adhere to the highest ethical and factual standards. Serving a global audience of casting directors, fashion houses, talent agents, and aspiring performers across <strong className="text-white">Paris, Milan, London, New York, Mumbai, and Delhi</strong>, our published content reaches thousands of industry professionals daily.
            </p>
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              This Editorial Policy outlines our strict adherence to Google Search Quality Rater Guidelines (<strong className="text-white">Experience, Expertise, Authoritativeness, and Trustworthiness - EEAT</strong>), our non-retouched digital polaroid mandate, creative team attribution rules, and body positivity disclosures.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Camera className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">100% Raw Digitals</h3>
              <p className="text-xs text-zinc-400">Scouting polaroids are strictly un-retouched.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Award className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">EEAT Certified</h3>
              <p className="text-xs text-zinc-400">Authored & fact-checked by veteran industry agents.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <ShieldCheck className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">0% Sponsored Reviews</h3>
              <p className="text-xs text-zinc-400">Strict editorial independence; no paid rankings.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Heart className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Body Positivity</h3>
              <p className="text-xs text-zinc-400">Healthy BMI & inclusive diversity standards.</p>
            </div>
          </div>
        </div>

        {/* RELATED CONTENT FEATURED IMAGES */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90"
              alt="Authentic Un-retouched Digitals & Polaroid Standards"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Un-retouched Disclosures</span>
              <h3 className="text-lg font-bold text-white font-serif">100% Authentic Digital Polaroids</h3>
            </div>
          </div>

          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=90"
              alt="Vogue Vibe Editorial Reporting & EEAT Author Integrity"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">EEAT Fashion Journalism</span>
              <h3 className="text-lg font-bold text-white font-serif">Verified Industry Expert Authors</h3>
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
            <a href="#unretouched-polaroids" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              1. Non-Retouched Digitals Policy
            </a>
            <a href="#eeat-standards" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              2. EEAT Fact-Checking & Expert Review
            </a>
            <a href="#editorial-independence" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              3. Anti-Scam & Editorial Independence
            </a>
            <a href="#creative-attribution" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              4. Creative Team Attribution Standards
            </a>
            <a href="#body-positivity" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              5. Body Positivity & Health Mandates
            </a>
            <a href="#minor-safeguards" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              6. Minor Talent Editorial Safeguards
            </a>
            <a href="#corrections-policy" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              7. Corrections & Errata Policy
            </a>
            <a href="#editorial-faqs" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              8. Frequently Asked Questions
            </a>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 1: NON-RETOUCHED DIGITALS POLICY                   */}
        {/* ---------------------------------------------------------- */}
        <section id="unretouched-polaroids" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 01</span>
              <h2 className="font-serif text-2xl font-bold text-white">Non-Retouched Digitals & Imagery Disclosure Policy</h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              In compliance with European Union media transparency legislation and French Law (décret n° 2017-738 regarding commercial photo disclosures), AURA Couture operates under a strict imagery labeling standard:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
                <h3 className="font-serif text-lg font-bold text-white flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
                  Scouting Digitals (100% Un-retouched)
                </h3>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  All polaroids, digital comp cards, and initial scouting headshots displayed in our talent search directory are 100% un-retouched. We strictly forbid digital skin smoothing, body contour reshaping, eye enlargement, or AI facial alterations on scouting assets.
                </p>
              </div>

              <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
                <h3 className="font-serif text-lg font-bold text-white flex items-center">
                  <Sparkles className="w-5 h-5 text-gold-400 mr-2" />
                  Published Editorial Spreads
                </h3>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  For published magazine covers, haute couture lookbooks, or brand campaign spreads where post-production retouching was performed by third-party publications, clear editorial attribution and notice are provided.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 2: EEAT FACT-CHECKING & EXPERT REVIEW               */}
        {/* ---------------------------------------------------------- */}
        <section id="eeat-standards" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 02</span>
              <h2 className="font-serif text-2xl font-bold text-white">EEAT Fact-Checking & Expert Review Process</h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              Google's Search Quality Rater Guidelines emphasize <strong className="text-white">Experience, Expertise, Authoritativeness, and Trustworthiness (EEAT)</strong>. To ensure our readers and talent receive the most accurate career advice:
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-5 glass-panel border border-gold-500/20 rounded-md flex items-start space-x-4">
                <UserCheck className="w-6 h-6 text-gold-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-base font-bold text-white">Author Credentials</h4>
                  <p className="text-xs md:text-sm text-zinc-400">
                    All articles, agency reviews, and scouting guides are authored by named industry professionals—including veteran model agents, casting directors, and entertainment attorneys—with verified biographies.
                  </p>
                </div>
              </div>

              <div className="p-5 glass-panel border border-gold-500/20 rounded-md flex items-start space-x-4">
                <BookOpen className="w-6 h-6 text-gold-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-base font-bold text-white">Multi-Source Verification</h4>
                  <p className="text-xs md:text-sm text-zinc-400">
                    Industry statistics, height/measurement standards, labor law updates, and contract guidelines are cross-checked against official fashion week federation records and legal statutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 3: ANTI-SCAM & EDITORIAL INDEPENDENCE              */}
        {/* ---------------------------------------------------------- */}
        <section id="editorial-independence" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 03</span>
              <h2 className="font-serif text-2xl font-bold text-white">Anti-Scam & Absolute Editorial Independence</h2>
            </div>
          </div>

          <div className="glass-panel p-8 border border-gold-500/20 rounded-md space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">Protecting Aspiring Performers</h3>
            <p className="text-zinc-300 text-sm leading-relaxed font-light">
              To protect aspiring models from predatory modeling scams:
            </p>
            <ul className="list-disc pl-5 text-xs md:text-sm text-zinc-300 space-y-2">
              <li>We do not publish sponsored agency reviews or pay-for-placement rankings.</li>
              <li>Every agency directory listing is thoroughly audited for legitimate client bookings and zero-upfront-fee practices.</li>
              <li>Commercial partnerships never influence our editorial coverage, career guides, or fraud advisories.</li>
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 4: CREATIVE TEAM ATTRIBUTION STANDARDS             */}
        {/* ---------------------------------------------------------- */}
        <section id="creative-attribution" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 04</span>
              <h2 className="font-serif text-2xl font-bold text-white">Creative Team Attribution & Credit Standards</h2>
            </div>
          </div>

          <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
            Fashion is a collaborative art form. AURA Couture enforces full creative team attribution for every portfolio image, magazine cover, and campaign video featured on our platform:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-zinc-300 pt-2">
            <div className="p-3 glass-panel border border-gold-500/20 rounded-md">
              <span className="block text-gold-400 font-bold uppercase">Photographer</span>
              <span>Full Name & Studio</span>
            </div>
            <div className="p-3 glass-panel border border-gold-500/20 rounded-md">
              <span className="block text-gold-400 font-bold uppercase">Stylist</span>
              <span>Wardrobe Director</span>
            </div>
            <div className="p-3 glass-panel border border-gold-500/20 rounded-md">
              <span className="block text-gold-400 font-bold uppercase">MUA & Hair</span>
              <span>Beauty Artists</span>
            </div>
            <div className="p-3 glass-panel border border-gold-500/20 rounded-md">
              <span className="block text-gold-400 font-bold uppercase">Publication</span>
              <span>Magazine / Brand</span>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 5: BODY POSITIVITY & HEALTH MANDATES               */}
        {/* ---------------------------------------------------------- */}
        <section id="body-positivity" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 05</span>
              <h2 className="font-serif text-2xl font-bold text-white">Body Positivity & Healthy Talent Mandates</h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              In alignment with international fashion health charters (such as the LVMH and Kering Charter for Model Wellbeing and French Public Health Laws), AURA Couture is committed to talent health, mental wellbeing, and body positivity:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 text-xs md:text-sm">
              <li>We require medical certificates attesting to healthy physical wellbeing for runway models prior to fashion week bookings.</li>
              <li>We actively reject client requests promoting extreme, unhealthful weight loss or unsafe body transformations.</li>
              <li>Our agency actively champions diversity across curve models, petite categories, mature models, adaptive talent, and all ethnic backgrounds.</li>
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 8: FREQUENTLY ASKED QUESTIONS (FAQ SCHEMA)          */}
        {/* ---------------------------------------------------------- */}
        <section id="editorial-faqs" className="mt-20 space-y-6">
          <SectionTitle
            badge="COMMON INQUIRIES"
            title="Frequently Asked Questions"
            subtitle="Clear answers regarding our editorial integrity, un-retouched digitals, and EEAT standards."
            centered
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-4">
            {editorialFaqs.map(({ q, a }) => (
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

        {/* CONTACT EDITORIAL DESK SECTION */}
        <div className="mt-24 glass-panel border border-gold-500/20 rounded-md p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">
              Contact Our Editorial & Fact-Checking Desk
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              For editorial inquiries, photographer attribution updates, fact-checking corrections, or press kit requests, contact our Chief Editor:
            </p>
            <div className="space-y-2 text-xs md:text-sm text-zinc-300 pt-2">
              <p className="flex items-center">
                <Mail className="w-4 h-4 text-gold-400 mr-2" />
                editorial@auracouture.com
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
              href="/blog"
              className="px-6 py-3.5 rounded-md font-semibold text-xs uppercase tracking-wider bg-gold-500 hover:bg-gold-400 text-zinc-950 transition-all text-center"
            >
              Industry Blog
            </Link>
            <Link
              href="/ContactPage"
              className="px-6 py-3.5 rounded-md font-semibold text-xs uppercase tracking-wider bg-zinc-900 border border-gold-500/30 text-white hover:bg-zinc-800 transition-all text-center"
            >
              Contact Press Desk
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <CTASection
          title="Work With Vogue Vibe Models"
          description="Partner with an agency built on absolute transparency, un-retouched authenticity, and ethical representation."
          primaryButtonText="Browse Models Roster"
          primaryButtonHref="/models"
          secondaryButtonText="Apply for Scouting"
          secondaryButtonHref="/become-a-model"
        />
      </PageContainer>
    </>
  );
}
