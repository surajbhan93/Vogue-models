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
  Camera,
  Copyright,
  FileCheck2,
  Lock,
  Globe,
  FileText,
  AlertTriangle,
  UserCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Scale,
  Cpu,
  ArrowRight,
} from 'lucide-react';

// -----------------------------------------------------------------------
// SEO METADATA
// -----------------------------------------------------------------------
export const metadata = generatePageMetadata({
  title: 'Copyright Policy & Intellectual Property Rights | AURA Couture',
  description:
    'Official Copyright Policy and Intellectual Property Rights declaration for AURA Couture and Vogue Vibe Models. Comprehensive guidelines governing fashion photography licensing, talent image rights, DMCA takedown procedures, and anti-AI scraping prohibitions across India, USA, and global markets.',
  path: '/copyright-policy',
  keywords: [
    'Copyright Policy',
    'Intellectual Property Rights',
    'AURA Couture Trademarks',
    'Fashion Photography Licensing',
    'Model Image Rights',
    'DMCA Takedown Notice Procedure',
    'Indian Copyright Act Compliance',
    'Personality Rights Protection',
    'Anti-AI Scraping Prohibition',
  ],
});

// -----------------------------------------------------------------------
// FAQ DATA FOR AEO / FAQ SCHEMA
// -----------------------------------------------------------------------
const copyrightFaqs = [
  {
    q: 'Can I use model portfolio photos or digitals from AURA Couture on social media?',
    a: 'No. All fashion photography, model digital polaroids, comp cards, and video reels published on auracouture.com are protected by international copyright laws. Reproduction, redistribution, or commercial usage without an executed written license from AURA Couture is strictly prohibited.',
  },
  {
    q: 'How do brand clients obtain commercial image licensing rights for talent?',
    a: 'Brand clients, advertising agencies, and production houses acquire commercial usage rights (e.g. Print, Out-of-Home, Digital, TVC, Global Territory) through a formal booking agreement negotiated by our dedicated talent agents prior to campaign launch.',
  },
  {
    q: 'What is AURA Couture’s policy on AI and Machine Learning image scraping?',
    a: 'We strictly prohibit the automated crawling, scraping, downloading, or ingestion of any talent portfolio photos, composite cards, facial likenesses, or voice recordings for the purpose of training Artificial Intelligence (AI), Machine Learning (ML), or Generative AI models.',
  },
  {
    q: 'How do I submit a DMCA Copyright Infringement Takedown Notice?',
    a: 'If you believe your copyrighted work has been improperly published on our platform, send a formal written notice containing the required DMCA elements to our Designated Copyright Agent at copyright@auracouture.com or mail our Mumbai / New York offices.',
  },
  {
    q: 'Are minor models’ likenesses protected under special legal protocols?',
    a: 'Yes. Imagery and digital comp cards of minor models are subject to enhanced legal protection under international child safety laws, chaperoned booking mandates, and strict privacy controls.',
  },
];

function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copyrightFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

export default function CopyrightPolicyPage() {
  const pageSchema = generateWebPageSchema(
    'Copyright Policy & Intellectual Property Rights',
    'Official guidelines governing intellectual property, fashion photography ownership, talent image rights, DMCA takedowns, and anti-scraping mandates.',
    '/copyright-policy'
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
        title="COPYRIGHT & INTELLECTUAL PROPERTY POLICY"
        subtitle="Comprehensive legal protections for fashion photography, talent personality rights, brand trademarks, and proprietary database records."
        badge="INTELLECTUAL PROPERTY DECLARATION • GLOBAL LEGAL STANDARDS"
        bgImage="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=2000&q=90"
        breadcrumbs={[{ label: 'Copyright Policy' }]}
      />

      <PageContainer>
        {/* ---------------------------------------------------------- */}
        {/* 1. EXECUTIVE SUMMARY & STATS                                 */}
        {/* ---------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionTitle
              badge="IP PROTECTION"
              title="Safeguarding Creative Genius & Talent Assets"
              subtitle="AURA Couture enforces rigorous global intellectual property protections across all six represented creative disciplines."
            />
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              At <strong className="text-white">AURA Couture</strong> (operating the{' '}
              <strong className="text-gold-400">Vogue Vibe Models</strong> talent house), creative work is our core currency. As an elite global agency representing fashion models, actors, singers, dancers, painters, and musicians across <strong className="text-white">Paris, Milan, London, New York, Mumbai, and Delhi</strong>, we curate, produce, and license thousands of high-resolution fashion editorials, runway photographs, commercial video reels, musical compositions, and digital comp cards.
            </p>
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              This Copyright & Intellectual Property Policy sets forth the legal terms governing the ownership, licensing, protection, and enforcement of all visual, audio, typographic, and textual content appearing on{' '}
              <span className="text-gold-400 font-mono">auracouture.com</span>. We operate in strict accordance with the <strong className="text-white">Berne Convention for the Protection of Literary and Artistic Works</strong>, the <strong className="text-white">WIPO Copyright Treaty</strong>, the <strong className="text-white">US Copyright Act (17 U.S.C. § 512 / DMCA)</strong>, and the <strong className="text-white">Indian Copyright Act 1957</strong> (as amended).
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Copyright className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">All Rights Reserved</h3>
              <p className="text-xs text-zinc-400">Protected under international copyright treaties.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Camera className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Image Licensing</h3>
              <p className="text-xs text-zinc-400">Commercial usage requires prior agent licensing.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Cpu className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Anti-AI Scraping</h3>
              <p className="text-xs text-zinc-400">Strict legal prohibition against AI model training.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <ShieldAlert className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">DMCA Agent</h3>
              <p className="text-xs text-zinc-400">Fast 24-hour response to valid takedown notices.</p>
            </div>
          </div>
        </div>

        {/* RELATED CONTENT FEATURED IMAGES */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=90"
              alt="Fashion Editorial Photography Shoot"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Protected Intellectual Property</span>
              <h3 className="text-lg font-bold text-white font-serif">High Fashion Editorial Campaigns</h3>
            </div>
          </div>

          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=90"
              alt="Digital Comp Card Imagery"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Model Image & Personality Rights</span>
              <h3 className="text-lg font-bold text-white font-serif">Digital Polaroids & Comp Cards</h3>
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
            <a href="#ownership-of-content" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              1. Ownership of Content & Assets
            </a>
            <a href="#personality-rights" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              2. Talent Likeness & Personality Rights
            </a>
            <a href="#permitted-prohibited" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              3. Permitted vs. Prohibited Uses
            </a>
            <a href="#anti-ai-scraping" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              4. Anti-AI Scraping Prohibition Clause
            </a>
            <a href="#dmca-takedown" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              5. DMCA & Takedown Procedure
            </a>
            <a href="#commercial-licensing" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              6. Brand Client Licensing Guidelines
            </a>
            <a href="#counter-notification" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              7. Counter-Notice & Repeat Infringers
            </a>
            <a href="#trademarks" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              8. Trademark & Brand Identity Terms
            </a>
            <a href="#copyright-faqs" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              9. Frequently Asked Questions
            </a>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 1: OWNERSHIP OF CONTENT & ASSETS                    */}
        {/* ---------------------------------------------------------- */}
        <section id="ownership-of-content" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Copyright className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 01</span>
              <h2 className="font-serif text-2xl font-bold text-white">Ownership of Content & Creative Assets</h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              Unless otherwise explicitly indicated, all materials contained on this website—including but not limited to fashion editorial photographs, runway imagery, digital polaroid comp cards, video audition reels, sound recordings, choreography clips, original artwork images, textual descriptions, page layouts, graphic designs, software code, and database compilations—are the exclusive property of <strong className="text-white">AURA Couture Management</strong>, its roster of represented talent, or its contributing photographer and brand partners.
            </p>
            <p>
              All creative works are protected by national copyright legislation in India, the United States, the United Kingdom, European Union member states, and international treaties. All rights are reserved globally.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
                <Camera className="w-6 h-6 text-gold-400" />
                <h3 className="font-serif text-base font-bold text-white">Fashion Photography</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Runway, lookbook, and campaign images licensed exclusively for agency roster presentation. Rights remain held by photographers and AURA Couture.
                </p>
              </div>

              <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
                <FileCheck2 className="w-6 h-6 text-gold-400" />
                <h3 className="font-serif text-base font-bold text-white">Digital Comp Cards</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Proprietary talent measurement matrices and composite layouts prepared specifically for casting director review. Unauthorized duplication is prohibited.
                </p>
              </div>

              <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
                <Lock className="w-6 h-6 text-gold-400" />
                <h3 className="font-serif text-base font-bold text-white">Video & Audio Masters</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Commercial showreels, vocal playback masters, self-tape auditions, and original musical scores scored by roster artists.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 4: ANTI-AI SCRAPING PROHIBITION CLAUSE             */}
        {/* ---------------------------------------------------------- */}
        <section id="anti-ai-scraping" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 04</span>
              <h2 className="font-serif text-2xl font-bold text-white">Anti-AI Scraping & Machine Learning Prohibition Clause</h2>
            </div>
          </div>

          <div className="glass-panel p-8 border border-gold-500/30 rounded-md bg-zinc-950/90 space-y-4">
            <div className="flex items-center space-x-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Mandatory Legal Restriction</span>
            </div>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-light">
              AURA Couture strictly prohibits the automated crawling, data mining, harvesting, scraping, or extraction of any photographic assets, digital polaroids, comp card layouts, facial geometry, voice recordings, or performer metadata from <span className="text-gold-400 font-mono">auracouture.com</span> for the purpose of training, fine-tuning, evaluating, or validating Artificial Intelligence (AI), Machine Learning (ML), Generative Adversarial Networks (GANs), or synthetic imagery models.
            </p>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
              Any unauthorized ingestion of talent imagery by AI development entities constitutes intentional copyright infringement, violation of publicity rights, and breach of website terms, entitling AURA Couture and its talent to seek immediate injunctive relief and statutory damages.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 9: FREQUENTLY ASKED QUESTIONS (FAQ SCHEMA)          */}
        {/* ---------------------------------------------------------- */}
        <section id="copyright-faqs" className="mt-20 space-y-6">
          <SectionTitle
            badge="COMMON INQUIRIES"
            title="Frequently Asked Questions"
            subtitle="Clear answers regarding copyright enforcement, image rights, DMCA takedowns, and brand licensing."
            centered
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-4">
            {copyrightFaqs.map(({ q, a }) => (
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

        {/* CONTACT COPYRIGHT AGENT SECTION */}
        <div className="mt-24 glass-panel border border-gold-500/20 rounded-md p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">
              Designated Copyright Agent Contact
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Please direct all DMCA notices, copyright infringement inquiries, or commercial image licensing requests to our Designated IP Agent:
            </p>
            <div className="space-y-2 text-xs md:text-sm text-zinc-300 pt-2">
              <p className="flex items-center">
                <Mail className="w-4 h-4 text-gold-400 mr-2" />
                copyright@auracouture.com
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 text-gold-400 mr-2" />
                +91-22-6789-9900 (India) / +1-212-555-0199 (USA)
              </p>
              <p className="flex items-center">
                <MapPin className="w-4 h-4 text-gold-400 mr-2" />
                AURA Couture Legal Desk, Bandra Kurla Complex, Mumbai / 5th Ave NYC
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 justify-end">
            <Link
              href="/dmca"
              className="px-6 py-3.5 rounded-md font-semibold text-xs uppercase tracking-wider bg-gold-500 hover:bg-gold-400 text-zinc-950 transition-all text-center"
            >
              DMCA Policy
            </Link>
            <Link
              href="/ContactPage"
              className="px-6 py-3.5 rounded-md font-semibold text-xs uppercase tracking-wider bg-zinc-900 border border-gold-500/30 text-white hover:bg-zinc-800 transition-all text-center"
            >
              Contact IP Desk
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <CTASection
          title="Work With Vogue Vibe Models"
          description="Book elite models, actors, singers, dancers, painters, and musicians under transparent, professional licensing terms."
          primaryButtonText="Browse Roster"
          primaryButtonHref="/models"
          secondaryButtonText="Book Talent Now"
          secondaryButtonHref="/hire-a-model"
        />
      </PageContainer>
    </>
  );
}
