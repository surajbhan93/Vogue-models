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
  FileCheck2,
  Lock,
  Globe,
  FileText,
  AlertTriangle,
  Building2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  Scale,
  ArrowRight,
  Gavel,
  CheckSquare,
} from 'lucide-react';

// -----------------------------------------------------------------------
// SEO METADATA
// -----------------------------------------------------------------------
export const metadata = generatePageMetadata({
  title: 'DMCA Takedown Notice & Copyright Policy | AURA Couture',
  description:
    'Official DMCA Takedown Notice procedures and Copyright Infringement policy for AURA Couture and Vogue Vibe Models. Submit legal copyright claims, counter-notifications, and takedown requests under US 17 U.S.C. § 512 and the Indian Copyright Act.',
  path: '/dmca',
  keywords: [
    'DMCA Takedown Notice',
    'Copyright Infringement Claim',
    'AURA Couture DMCA Agent',
    'Vogue Vibe Models Copyright',
    'Digital Millennium Copyright Act',
    'Indian Copyright Act Section 52',
    'DMCA Counter Notification',
    'Fashion Photography Takedown',
    'Repeat Infringer Policy',
  ],
});

// -----------------------------------------------------------------------
// FAQ DATA FOR AEO / FAQ SCHEMA
// -----------------------------------------------------------------------
const dmcaFaqs = [
  {
    q: 'How do I submit a DMCA Takedown Notice to AURA Couture?',
    a: 'You can submit a formal DMCA notice by emailing our Designated Copyright Agent at dmca@auracouture.com. Your notice must contain all six legally required elements specified under 17 U.S.C. § 512(c)(3).',
  },
  {
    q: 'How quickly does AURA Couture process DMCA takedown requests?',
    a: 'We review and process valid DMCA notices within 24 business hours. Upon verifying that a notice meets legal standards, the infringing image, video, or asset is immediately removed or disabled.',
  },
  {
    q: 'What happens if a false or bad-faith DMCA notice is filed against my portfolio?',
    a: 'Under 17 U.S.C. § 512(f), any person who knowingly materially misrepresents that material is infringing may be held liable for statutory damages, court costs, and attorney fees incurred by the alleged infringer or agency.',
  },
  {
    q: 'Can a talent or user submit a Counter-Notification if material was removed by mistake?',
    a: 'Yes. If your content was removed due to mistake or misidentification, you may submit a formal Counter-Notification detailing the legal basis for your ownership. We will forward it to the original claimant.',
  },
  {
    q: 'Does AURA Couture have a policy for repeat copyright infringers?',
    a: 'Yes. In compliance with international copyright standards, AURA Couture enforces a strict repeat infringer policy. Accounts, registered talent, or users that repeatedly infringe copyrights will have their accounts permanently terminated.',
  },
];

function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dmcaFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

export default function DMCAPage() {
  const pageSchema = generateWebPageSchema(
    'DMCA Takedown Notice & Copyright Infringement Policy',
    'Official procedures for submitting copyright infringement claims, counter-notifications, and legal takedown requests.',
    '/dmca'
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
        title="DMCA TAKEDOWN & COPYRIGHT NOTICES"
        subtitle="Formal procedures for submitting copyright infringement claims, takedown notices, and counter-notifications under international IP law."
        badge="LEGAL ENFORCEMENT • DIGITAL MILLENNIUM COPYRIGHT ACT"
        bgImage="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=2000&q=90"
        breadcrumbs={[{ label: 'DMCA Notice' }]}
      />

      <PageContainer>
        {/* ---------------------------------------------------------- */}
        {/* 1. EXECUTIVE SUMMARY & STATS                                 */}
        {/* ---------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionTitle
              badge="COPYRIGHT COMPLIANCE"
              title="Expeditious Resolution of Intellectual Property Claims"
              subtitle="AURA Couture responds swiftly to legitimate copyright takedown requests while protecting our roster's valid IP."
            />
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              At <strong className="text-white">AURA Couture</strong> (operating the{' '}
              <strong className="text-gold-400">Vogue Vibe Models</strong> global network), we respect the intellectual property rights of fashion photographers, creative directors, artists, and brand owners worldwide. We maintain a zero-tolerance policy for unauthorized copyright infringement.
            </p>
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              This DMCA Takedown Notice & Copyright Infringement Policy governs the procedure for submitting formal takedown notifications under Title 17 of the <strong className="text-white">United States Code, Section 512 (Digital Millennium Copyright Act)</strong> and Section 52(1)(c) of the <strong className="text-white">Indian Copyright Act 1957</strong>. If you believe your copyrighted photographic, video, audio, or textual work has been improperly published on <span className="text-gold-400 font-mono">auracouture.com</span>, this page provides explicit instructions on how to notify our Designated Copyright Agent.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Gavel className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">DMCA § 512</h3>
              <p className="text-xs text-zinc-400">Full statutory compliance under US copyright law.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <ShieldAlert className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">24-Hour Review</h3>
              <p className="text-xs text-zinc-400">Expeditious review and response to valid claims.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Scale className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Counter-Notice</h3>
              <p className="text-xs text-zinc-400">Fair hearing for mistaken or invalid takedowns.</p>
            </div>
            <div className="glass-panel p-5 border border-gold-500/20 rounded-md space-y-2">
              <Lock className="w-7 h-7 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-white">Repeat Infringers</h3>
              <p className="text-xs text-zinc-400">Strict account termination policy for violators.</p>
            </div>
          </div>
        </div>

        {/* RELATED CONTENT FEATURED IMAGES */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=90"
              alt="Official Legal Takedown & Documentation Review"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Legal Takedown Desk</span>
              <h3 className="text-lg font-bold text-white font-serif">Expeditious Review of Copyright Claims</h3>
            </div>
          </div>

          <div className="relative h-72 rounded-xl overflow-hidden border border-gold-500/20 glass-panel group">
            <Image
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=90"
              alt="Fashion Photography Asset Protection"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Photographer & Model IP</span>
              <h3 className="text-lg font-bold text-white font-serif">Asset Ownership Verification</h3>
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
            <a href="#takedown-checklist" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              1. DMCA Takedown Requirements (6 Points)
            </a>
            <a href="#designated-agent" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              2. Designated Copyright Agent Details
            </a>
            <a href="#counter-notice-process" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              3. DMCA Counter-Notification Process
            </a>
            <a href="#repeat-infringers" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              4. Repeat Infringer Policy
            </a>
            <a href="#bad-faith-warning" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              5. Warning Against Bad-Faith Claims (§ 512(f))
            </a>
            <a href="#dmca-faqs" className="hover:text-gold-400 transition-colors flex items-center">
              <ArrowRight className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" />
              6. Frequently Asked Questions
            </a>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 1: DMCA TAKEDOWN REQUIREMENTS                      */}
        {/* ---------------------------------------------------------- */}
        <section id="takedown-checklist" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <CheckSquare className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 01</span>
              <h2 className="font-serif text-2xl font-bold text-white">DMCA Takedown Notice Requirements (6 Statutory Points)</h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              To ensure prompt action, any formal DMCA Takedown Notice submitted to AURA Couture must be written in English and contain the following six legally mandated elements under 17 U.S.C. § 512(c)(3):
            </p>

            <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-4 bg-zinc-950/70">
              <div className="space-y-3 text-xs md:text-sm text-zinc-300">
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                  <div>
                    <strong className="text-white">Physical or Electronic Signature:</strong> A physical signature or authorized digital signature of the copyright owner or their legally authorized agent.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                  <div>
                    <strong className="text-white">Identification of Copyrighted Work:</strong> Specific description of the copyrighted fashion photograph, comp card layout, video reel, or audio composition claimed to have been infringed.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                  <div>
                    <strong className="text-white">Identification of Infringing URL Location:</strong> The exact web URL link(s) on <span className="text-gold-400 font-mono">auracouture.com</span> where the alleged infringing asset is hosted so our technical team can locate and disable access immediately.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">4</span>
                  <div>
                    <strong className="text-white">Contact Information:</strong> Your full legal name, company name (if applicable), mailing address, phone number, and official email address.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">5</span>
                  <div>
                    <strong className="text-white">Good Faith Belief Statement:</strong> The statement: <em>"I have a good faith belief that use of the copyrighted material described above is not authorized by the copyright owner, its agent, or the law."</em>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">6</span>
                  <div>
                    <strong className="text-white">Accuracy & Penalty of Perjury Statement:</strong> The statement: <em>"I swear, under penalty of perjury, that the information in this notification is accurate and that I am the copyright owner or am authorized to act on behalf of the owner of an exclusive right that is allegedly infringed."</em>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 2: DESIGNATED COPYRIGHT AGENT                       */}
        {/* ---------------------------------------------------------- */}
        <section id="designated-agent" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 02</span>
              <h2 className="font-serif text-2xl font-bold text-white">Designated Copyright Agent Contact</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 border border-gold-500/20 rounded-md space-y-4">
              <h3 className="font-serif text-lg font-bold text-white">Electronic Submission (Recommended)</h3>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                For the fastest processing within 24 hours, email your formal notice to our electronic DMCA desk:
              </p>
              <div className="p-4 bg-zinc-950 border border-gold-500/30 rounded-md text-sm font-mono text-gold-400 flex items-center justify-between">
                <span>dmca@auracouture.com</span>
                <Mail className="w-4 h-4 text-gold-400" />
              </div>
            </div>

            <div className="glass-panel p-8 border border-gold-500/20 rounded-md space-y-4">
              <h3 className="font-serif text-lg font-bold text-white">Physical Mail Desks</h3>
              <div className="space-y-2 text-xs text-zinc-300">
                <p>
                  <strong className="text-white">India Desk:</strong> AURA Couture Legal Counsel, BKC Horizon Tower, Bandra Kurla Complex, Mumbai, MH 400051
                </p>
                <p>
                  <strong className="text-white">USA Desk:</strong> AURA Couture DMCA Agent, 500 5th Avenue, 28th Floor, New York, NY 10110
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 3: COUNTER-NOTIFICATION PROCESS                    */}
        {/* ---------------------------------------------------------- */}
        <section id="counter-notice-process" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 03</span>
              <h2 className="font-serif text-2xl font-bold text-white">DMCA Counter-Notification Process</h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              If content you uploaded (such as a model digital polaroid, acting audition clip, or musical score) was removed due to a DMCA notice and you believe the removal was a result of mistake or misidentification, you may submit a formal Counter-Notification pursuant to 17 U.S.C. § 512(g)(2)-(3).
            </p>
            <p>
              Your Counter-Notice must include your signature, identification of the removed material, your physical address, a statement under penalty of perjury that you have a good faith belief the material was misidentified, and consent to local court jurisdiction. Upon receiving a valid counter-notice, we will forward it to the original claimant.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 4: REPEAT INFRINGER POLICY                         */}
        {/* ---------------------------------------------------------- */}
        <section id="repeat-infringers" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 04</span>
              <h2 className="font-serif text-2xl font-bold text-white">Repeat Infringer Termination Policy</h2>
            </div>
          </div>

          <div className="glass-panel p-6 border border-gold-500/20 rounded-md bg-zinc-950/80 space-y-3">
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
              In accordance with Section 512(i) of the Digital Millennium Copyright Act and applicable global copyright laws, AURA Couture enforces a strict policy of terminating registration privileges, user accounts, and agency portal access for users or registered talent determined to be repeat copyright infringers.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 5: BAD-FAITH WARNING                               */}
        {/* ---------------------------------------------------------- */}
        <section id="bad-faith-warning" className="mt-20 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">Section 05</span>
              <h2 className="font-serif text-2xl font-bold text-white">Legal Warning Against Bad-Faith Claims (§ 512(f))</h2>
            </div>
          </div>

          <div className="glass-panel p-6 border border-rose-500/30 rounded-md bg-rose-950/10 space-y-3">
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
              <strong className="text-rose-400">Caution:</strong> Under 17 U.S.C. § 512(f), any person who knowingly materially misrepresents that material or activity is infringing, or that material was removed by mistake, may be subject to severe financial liability for statutory damages, legal fees, and court costs incurred by AURA Couture or the affected copyright owner.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* SECTION 6: FREQUENTLY ASKED QUESTIONS (FAQ SCHEMA)          */}
        {/* ---------------------------------------------------------- */}
        <section id="dmca-faqs" className="mt-20 space-y-6">
          <SectionTitle
            badge="COMMON INQUIRIES"
            title="Frequently Asked Questions"
            subtitle="Clear answers regarding DMCA notices, legal requirements, and counter-notifications."
            centered
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-4">
            {dmcaFaqs.map(({ q, a }) => (
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

        {/* CONTACT DMCA DESK SECTION */}
        <div className="mt-24 glass-panel border border-gold-500/20 rounded-md p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">
              Submit a Legal Takedown Request
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              If you have a copyright claim to file, send your formal notice directly to our Designated DMCA Agent.
            </p>
            <div className="space-y-2 text-xs md:text-sm text-zinc-300 pt-2">
              <p className="flex items-center">
                <Mail className="w-4 h-4 text-gold-400 mr-2" />
                dmca@auracouture.com
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 text-gold-400 mr-2" />
                +91-22-6789-9900 (India) / +1-212-555-0199 (USA)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 justify-end">
            <Link
              href="/copyright-policy"
              className="px-6 py-3.5 rounded-md font-semibold text-xs uppercase tracking-wider bg-gold-500 hover:bg-gold-400 text-zinc-950 transition-all text-center"
            >
              Copyright Policy
            </Link>
            <Link
              href="/ContactPage"
              className="px-6 py-3.5 rounded-md font-semibold text-xs uppercase tracking-wider bg-zinc-900 border border-gold-500/30 text-white hover:bg-zinc-800 transition-all text-center"
            >
              Contact Legal Desk
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <CTASection
          title="Work With Vogue Vibe Models"
          description="Join an elite global agency representing creative talent under strict intellectual property and legal safeguards."
          primaryButtonText="Browse Talent Roster"
          primaryButtonHref="/models"
          secondaryButtonText="Become a Talent"
          secondaryButtonHref="/become-a-model"
        />
      </PageContainer>
    </>
  );
}
