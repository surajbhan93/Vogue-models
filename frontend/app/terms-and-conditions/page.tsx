import React from 'react';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata/pageMetadata';
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
  Award,
  Globe,
  Sparkles,
  Camera,
  Film,
  Mic,
  Palette,
  Scissors,
} from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Official Terms & Conditions 2027 | Vogue Agency & Boom Boom Night In America',
  description:
    'Comprehensive legal Terms & Conditions for Vogue Agency / Boom Boom Night In America 2027 covering Modeling, Singing, Painting, Fashion Designing, and Acting categories, 4-stage online auditions, ₹3,00,000 mega prizes, 30% TDS rules, and I Catch Management USA certifications.',
  path: '/terms-and-conditions',
  keywords: [
    'Vogue Agency Terms and Conditions',
    'Boom Boom Night In America 2027 Rules',
    'Multi-Talent Hunt Terms',
    'I Catch Management USA Certification',
    '30 Percent TDS Cash Prize Rule',
    'Modeling Acting Singing Contest Terms',
  ],
});

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#030508] text-slate-300 selection:bg-amber-500 selection:text-black">
      {/* Page Hero */}
      <PageHero
        badge="Official Legal Document"
        title="Terms & Conditions"
        subtitle="Official Rules, Regulations, Judging Criteria, and Participant Guidelines for Vogue Agency / Boom Boom Night In America 2027 Multi-Talent Launchpad."
        breadcrumbs={[{ label: 'Terms & Conditions' }]}
      />

      <PageContainer className="py-16 space-y-16">
        
        {/* Intro Overview Banner */}
        <div className="p-8 rounded-3xl bg-zinc-950 border border-amber-500/30 shadow-[0_0_30px_rgba(212,175,55,0.15)] space-y-4">
          <div className="flex items-center gap-3 text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
            <Award className="w-4 h-4" />
            <span>Official Event Announcement &amp; Legal Binding</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Welcome to Vogue Agency / Boom Boom Night In America 2027
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed font-light">
            By registering and participating in this premier multi-talent launchpad across <strong>Modeling, Singing, Painting, Fashion Designing, and Acting</strong>, all participants and their legal guardians agree to strictly abide by the following official rules, terms, and conditions established by The Organizers (Vogue Agency in collaboration with registered USA entities <strong>I Catch Management, Hiba Entertainment USA, and Kash Patel Production</strong>).
          </p>
        </div>

        {/* 1. Eligibility Criteria */}
        <section className="space-y-6">
          <SectionTitle
            badge="Section 1"
            title="1. Eligibility Criteria & Age Boundaries"
            subtitle="Participation guidelines for Junior and Senior talent categories."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <h3 className="text-white font-bold text-lg font-serif flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> Age Group Boundaries
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300 font-light leading-relaxed">
                <li>• <strong>Master Age Limit:</strong> Open to candidates within the age group of 14 to 35 years at the time of registration.</li>
                <li>• <strong>Junior Category (Age 10 to 15 Years):</strong> Dedicated focus for Painting, Singing, and Acting.</li>
                <li>• <strong>Senior Category (Age 16 to 35 Years):</strong> Prime career launchpad for Modeling, Fashion Designing, Acting, and Singing.</li>
                <li>• <strong>Identity Proof:</strong> Participants must submit valid government-issued ID (Aadhaar Card, Passport, or Driving License) during registration.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <h3 className="text-white font-bold text-lg font-serif flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Minor Legal Consent (Under 18)
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300 font-light leading-relaxed">
                <li>• Minor participants (under 18 years) must provide parent or legal guardian phone number and written consent.</li>
                <li>• Any cash prize or international travel reward won by a minor will legally be handed over to their parents/legal guardians.</li>
                <li>• Accuracy of information is mandatory. Any false identity will lead to immediate disqualification.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. Registration & Evaluation Fee Structure */}
        <section className="space-y-6">
          <SectionTitle
            badge="Section 2"
            title="2. 4-Stage Audition & Fee Structure"
            subtitle="Transparent registration steps and fee breakdown."
          />
          <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900 border border-amber-500/20 text-center space-y-1">
                <span className="text-xs font-mono text-amber-400 uppercase font-bold">Stage 1</span>
                <h4 className="text-white font-bold text-base">Free Registration</h4>
                <p className="text-[11px] text-zinc-400">Fill details &amp; select category</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-amber-500/20 text-center space-y-1">
                <span className="text-xs font-mono text-amber-400 uppercase font-bold">Step 2 Fee</span>
                <h4 className="text-white font-bold text-base">₹ 999 Evaluation</h4>
                <p className="text-[11px] text-zinc-400">Strictly non-refundable &amp; non-transferable</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-amber-500/20 text-center space-y-1">
                <span className="text-xs font-mono text-amber-400 uppercase font-bold">Step 3 Masterclass</span>
                <h4 className="text-white font-bold text-base">₹ 1,499 Training</h4>
                <p className="text-[11px] text-zinc-400">Free USA expert grooming workshop</p>
              </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              *All registration fees are strictly non-refundable and non-transferable under any circumstances, including voluntary withdrawal, technical failure, or disqualification.
            </p>
          </div>
        </section>

        {/* 3. Competition Categories & Judging Rules */}
        <section className="space-y-6">
          <SectionTitle
            badge="Section 3"
            title="3. Category Judging Criteria & Guidelines"
            subtitle="Online submission rules across all 5 talent categories."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Modeling */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Camera className="w-4 h-4" /> Modeling
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Submit a 30-sec home runway walk video + 30-sec spoken intro video. Shortlisted models attend a live Zoom runway walk &amp; jury Q&amp;A.
              </p>
            </div>

            {/* Singing */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Mic className="w-4 h-4" /> Singing &amp; Vocalists
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Submit 1-min raw unedited singing video (no mic, auto-tune, or studio filters). Finalists perform Live via Zoom Video Conference.
              </p>
            </div>

            {/* Painting */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Palette className="w-4 h-4" /> Painting &amp; Fine Art
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Submit a 1-min time-lapse video of painting creation + final photo proof. Finalists complete a Live 2-Hour Theme Painting Session on camera.
              </p>
            </div>

            {/* Fashion Designing */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Scissors className="w-4 h-4" /> Fashion Designing
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Submit a digital lookbook (3 to 5 photos/video) of stitched garments on mannequin or model. Present concept live to the jury panel.
              </p>
            </div>

            {/* Acting */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 lg:col-span-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Film className="w-4 h-4" /> Acting Skills (Judging Criteria)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300 font-light pt-1">
                <div>• <strong>Voice Modulation:</strong> Projection, tone, &amp; dialogue pacing.</div>
                <div>• <strong>Facial Expressions:</strong> Emotional authenticity &amp; micro-expressions.</div>
                <div>• <strong>Body Language:</strong> Posture, movement, &amp; physical stage control.</div>
                <div>• <strong>Characterization &amp; Stage Presence:</strong> Command over audience.</div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. USA Certification & Prizes */}
        <section className="space-y-6">
          <SectionTitle
            badge="Section 4"
            title="4. USA Certification & Mega Cash Prizes"
            subtitle="Details on I Catch Management certification, 30% TDS, and USA Trip rewards."
          />
          <div className="p-8 rounded-3xl bg-zinc-950 border border-amber-500/30 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="p-5 rounded-2xl bg-zinc-900 border border-amber-500/20 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">1st Prize Mega Winner</span>
                <h4 className="text-white font-serif text-xl font-bold">₹ 3,00,000 Cash OR USA Trip</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Mega Winner in each category secures ₹3 Lakh OR 5-Day Sponsored USA Trip to perform live at Boom Boom Night In America with Bollywood stars.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-amber-500/20 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">2nd &amp; 3rd Prizes</span>
                <h4 className="text-white font-serif text-xl font-bold">₹ 1,75,000 / ₹ 1,00,000</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  2nd Prize winner receives ₹1,75,000 and 3rd Prize receives ₹1,00,000. Plus 5 Consolation Prizes of ₹20,000 in each category.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-amber-500/20 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">USA Certification</span>
                <h4 className="text-white font-serif text-xl font-bold">I Catch Management (USA)</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  All participants completing mandatory rounds receive verifiable Digital Certificates (PDF) with unique ID from I Catch Management (USA).
                </p>
              </div>

            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 space-y-1">
              <strong className="block text-amber-200">Taxation (30% TDS) &amp; Travel Conditions:</strong>
              <p className="font-light">
                In accordance with Indian Tax Laws (Section 194B of Income Tax Act 1961), a 30% TDS applies to all cash prizes exceeding ₹10,000. The USA trip includes economy air travel and standard hotel accommodation. Passport and Visa fees must be borne by the participant. If visa is rejected, winner receives cash prize net of TDS.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Contact & Jurisdiction */}
        <section className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" /> Contact &amp; Legal Jurisdiction
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed font-light">
            Any legal disputes arising out of this event shall be subject exclusively to the jurisdiction of the courts located in Thrissur, Kerala, India.
          </p>
          <div className="pt-2 text-xs text-zinc-300 font-mono space-y-1">
            <p><strong>Official Address:</strong> 58/78 Near Kairali Homes Building, Near Kurinjakkal Lane, Ayyanthole, Thrissur, Kerala – 680 003</p>
            <p><strong>Official Email:</strong> info@voguevibemodels.com | <strong>Helpline:</strong> +91 9336289192</p>
          </div>
        </section>

      </PageContainer>
    </main>
  );
}
