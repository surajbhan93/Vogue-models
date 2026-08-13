import React from 'react';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { CTASection } from '@/components/common/CTASection';
import {
  Globe,
  Award,
  ShieldCheck,
  Sparkles,
  Camera,
  Film,
  Mic,
  Palette,
  Scissors,
  Trophy,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  MapPin,
  Star,
  GraduationCap,
  Plane,
} from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'About Us | 12 Years Legacy | Vogue Agency & Boom Boom Night In America 2027',
  description:
    'Discover Vogue Agency / Boom Boom Night In America 2027 – 12 years of global talent launchpad across USA, England, Dubai, France & India in Modeling, Singing, Painting, Acting, and Fashion Designing.',
  path: '/about',
  keywords: [
    'Vogue Agency About Us',
    '12 Years Talent Launchpad',
    'Boom Boom Night In America 2027',
    'I Catch Management USA Partner',
    'Hiba Entertainment USA Kash Patel Production',
    'Modeling Acting Singing Contest 2027',
  ],
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-amber-500 selection:text-white">
      
      {/* Page Hero */}
      <PageHero
        badge="12 Years International Legacy (2015 – 2027)"
        title="About Vogue Agency"
        subtitle="Discover Boom Boom Night In America 2027 – India's premier multi-talent launchpad bridging raw talent in Modeling, Singing, Painting, Acting, and Fashion Designing with global opportunities."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      <PageContainer className="py-16 space-y-20">
        
        {/* 12 Years Heritage Overview */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
              <Award className="w-4 h-4 text-amber-600" />
              12 Years of International Fashion &amp; Talent Excellence
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Transforming Passion Into Global Success
            </h2>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
              We have been in this field for the last <strong>12 years</strong>, hosting high-profile fashion shows and talent launches across <strong>America, England, India, Dubai, and France</strong>. Thousands of successful candidates have achieved their dreams through our platform.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
              Vogue Agency / Boom Boom Night In America 2027 is designed to elevate the next generation of creative minds across 5 core pillars: <strong>Modeling, Singing, Painting, Acting, and Fashion Designing</strong>.
            </p>

            {/* Quick Stat Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 text-center font-mono">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">12+ Yrs</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Global Experience</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm">
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-800">5 Countries</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">USA, UK, Dubai, France, India</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">1000s</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Successful Alumni</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-amber-300 bg-slate-100 shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80"
                alt="Vogue Agency Global Showcase"
                className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 border border-amber-300 backdrop-blur-xl shadow-xl space-y-2">
                <div className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-widest">
                  USA Official Partner Entity
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-lg">
                  I Catch Management (USA)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  Issuing verifiable Digital Certificates of Merit &amp; Global Talent Registrations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 🎭 THE 5 PILLARS */}
        <section className="space-y-8">
          <SectionTitle
            badge="Core Disciplines"
            title="The 5 Pillars of Creative Arts"
            subtitle="Bridging raw creative talent with international opportunities."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Camera className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-slate-900 text-lg">1. Modeling Division</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                High-fashion runway walk, commercial catalog shoots, magazine covers, and international fashion show placements.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Mic className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-slate-900 text-lg">2. Singing &amp; Vocal Arts</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Raw unedited vocal talent evaluation, live stage performances, and international music video debuts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Palette className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-slate-900 text-lg">3. Painting &amp; Fine Art</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Time-lapse creation videos, canvas showcases, international gallery exhibitions, and art auctions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Scissors className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-slate-900 text-lg">4. Fashion Designing</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Digital garment lookbooks, runway showcase during Mega Finale, and collaborations with upcoming models.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-amber-300 shadow-sm space-y-3 md:col-span-2 lg:col-span-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Film className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-slate-900 text-lg">5. Acting Division (5 Judging Criteria)</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Evaluated by international film directors on 5 criteria: <strong>Voice Modulation, Facial Expressions, Body Language, Characterization, and Stage Presence</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* 🏆 USA PARTNERSHIPS & CERTIFICATION */}
        <section className="p-8 sm:p-10 rounded-3xl bg-amber-50/70 border border-amber-300 space-y-6 shadow-md">
          <SectionTitle
            badge="International Alliances"
            title="Global Validation &amp; USA Partners"
            subtitle="Official USA partner entities and international stage opportunities."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-amber-200 space-y-2 shadow-sm">
              <span className="text-xs font-mono font-bold text-amber-800 uppercase">USA Registered Entity</span>
              <h4 className="text-slate-900 font-serif text-xl font-bold">I CATCH MANAGEMENT (USA)</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Issues official verifiable Digital Certificate of Merit to every participant post audition evaluation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-amber-200 space-y-2 shadow-sm">
              <span className="text-xs font-mono font-bold text-amber-800 uppercase">Celebrity Concert Partners</span>
              <h4 className="text-slate-900 font-serif text-xl font-bold">HIBA ENTERTAINMENT USA</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Presents live stage opportunities alongside A-list Bollywood Celebrities across major US arenas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-amber-200 space-y-2 shadow-sm">
              <span className="text-xs font-mono font-bold text-amber-800 uppercase">USA Show Production</span>
              <h4 className="text-slate-900 font-serif text-xl font-bold">KASH PATEL PRODUCTION</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Executive producers for high-fashion runway shows, concerts, and cinema talent spotlights in America.
              </p>
            </div>
          </div>
        </section>

        {/* 🏢 REGISTERED HEADQUARTERS ADDRESS */}
        <section className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-600" /> Registered India Headquarters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 font-mono">
            <div className="space-y-1">
              <p><strong>Official Registered Address:</strong></p>
              <p className="text-slate-600 font-sans">
                58/78 Near Kairali Homes Building, Near Kurinjakkal Lane, Ayyanthole, Thrissur, Kerala – 680 003
              </p>
            </div>
            <div className="space-y-1">
              <p><strong>Helpline &amp; Email Support:</strong></p>
              <p className="text-slate-600 font-sans">Email: info@voguevibemodels.com</p>
              <p className="text-slate-600 font-sans">Phone Helpline: +91 9336289192</p>
            </div>
          </div>
        </section>

        <CTASection
          title="Ready to Step Onto the Global Stage?"
          description="Join Vogue Agency & Boom Boom Night In America 2027 today. Register now to claim your USA Certificate of Merit and professional grooming."
          primaryButtonText="Register Now as Candidate"
          primaryButtonHref="/become-model"
        />
      </PageContainer>
    </main>
  );
}