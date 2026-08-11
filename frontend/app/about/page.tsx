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
    <main className="min-h-screen bg-[#030508] text-slate-300 selection:bg-amber-500 selection:text-black">
      
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest">
              <Award className="w-4 h-4 text-amber-400" />
              12 Years of International Fashion &amp; Talent Excellence
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Transforming Passion Into Global Success
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
              We have been in this field for the last <strong>12 years</strong>, hosting high-profile fashion shows and talent launches across <strong>America, England, India, Dubai, and France</strong>. Thousands of successful candidates have achieved their dreams through our platform.
            </p>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
              <strong>Vogue Agency / Boom Boom Night In America 2027</strong> is designed to elevate the next generation of creative minds across 5 core pillars: <strong>Modeling, Singing, Painting, Acting, and Fashion Designing</strong>.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-500/20 text-center space-y-1">
                <span className="font-serif text-2xl font-bold text-amber-400">12+ Yrs</span>
                <p className="text-[11px] text-zinc-400 font-mono">Global Experience</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-500/20 text-center space-y-1">
                <span className="font-serif text-2xl font-bold text-amber-400">5 Countries</span>
                <p className="text-[11px] text-zinc-400 font-mono">USA, UK, Dubai, France, India</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-500/20 text-center space-y-1 col-span-2 sm:col-span-1">
                <span className="font-serif text-2xl font-bold text-amber-400">1000s</span>
                <p className="text-[11px] text-zinc-400 font-mono">Successful Alumni</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-[0_0_50px_rgba(212,175,55,0.2)] bg-zinc-950">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop"
                alt="Vogue Agency Global Showcase"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                  USA Official Partner Entity
                </span>
                <h4 className="text-white font-bold text-lg font-serif">I Catch Management (USA)</h4>
                <p className="text-xs text-zinc-300 font-light">
                  Issuing verifiable Digital Certificates of Merit &amp; Global Talent Registrations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5 Creative Pillars */}
        <section className="space-y-8">
          <SectionTitle
            badge="The 4-Pillars & Acting Division"
            title="5 Talent Categories"
            subtitle="Tailored grooming, mentorship, and international platform for every creative discipline."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <Camera className="w-5 h-5" /> 1. Modeling
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Rule the mega runway wearing collections by upcoming fashion designers while performing live in front of international casting directors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <Mic className="w-5 h-5" /> 2. Singing &amp; Vocal Arts
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Perform unedited raw vocals live on video conference and stage to touch hearts and secure music video opportunities.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <Palette className="w-5 h-5" /> 3. Painting &amp; Fine Art
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Color canvas live on camera and stage while models walk the runway, showcasing original artwork to global collectors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <Scissors className="w-5 h-5" /> 4. Fashion Designing
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Launch your independent clothing brand and showcase stitched collections live on high-fashion runway models.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 md:col-span-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <Film className="w-5 h-5" /> 5. Acting Division
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Perform live stage monologues and dramatic acts evaluated on Voice Modulation, Facial Expressions, Body Language, Characterization, and Stage Presence.
              </p>
            </div>
          </div>
        </section>

        {/* Mega Winners Rewards & USA Exposure */}
        <section id="certification" className="p-8 rounded-3xl bg-zinc-950 border border-amber-500/30 space-y-6">
          <SectionTitle
            badge="Rewards & International Recognition"
            title="Winning Candidates Reward Package"
            subtitle="Grand cash prizes, 5-day USA sponsored trips, and Bollywood celebrity co-stage opportunities."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/20 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">1st Prize Mega Winner</span>
              <h4 className="text-white font-serif text-2xl font-bold">₹ 3,00,000 OR USA Trip</h4>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                5-Day Sponsored USA Trip to perform live in America alongside Bollywood Celebrities with <strong>HIBA ENTERTAINMENT USA</strong> &amp; <strong>KASH PATEL PRODUCTION</strong>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/20 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">2nd &amp; 3rd Prizes</span>
              <h4 className="text-white font-serif text-2xl font-bold">₹ 1,75,000 / ₹ 1,00,000</h4>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                2nd Prize ₹1,75,000 cash and 3rd Prize ₹1,00,000 cash. Plus 5 Consolation Prizes of ₹20,000 in each category.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/20 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Global Runway Exposure</span>
              <h4 className="text-white font-serif text-2xl font-bold">NYC, Cannes &amp; Paris</h4>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                Chance to walk in New York Fashion Show, Cannes Film Festival, Paris Milan Fashion Shows, USA Magazine features, and music video debuts.
              </p>
            </div>
          </div>
        </section>

        {/* USA College Tracks & Courses */}
        <section id="courses" className="space-y-6">
          <SectionTitle
            badge="USA Academic & Certificate Tracks"
            title="Affiliated Courses & Educational Pathways"
            subtitle="Online certificates and degree options from world-renowned US fashion & design institutes."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <h4 className="text-white font-serif font-bold text-lg flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-400" /> Short-Term Certificates (Weeks to Months)
              </h4>
              <ul className="space-y-2 text-xs text-zinc-300 font-light leading-relaxed">
                <li>• <strong>Parsons x Yellowbrick Certificates:</strong> 5 to 8 weeks online track in Fashion Industry Essentials &amp; Visual Merchandising with Teen Vogue editors.</li>
                <li>• <strong>Vogue College of Fashion:</strong> Retail Design, Visual Merchandising, Creative Direction &amp; Media.</li>
                <li>• <strong>California College of the Arts (CCA):</strong> Pre-college &amp; introductory fashion design tracks.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <h4 className="text-white font-serif font-bold text-lg flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-400" /> Formal University Degrees (2 to 4 Years)
              </h4>
              <ul className="space-y-2 text-xs text-zinc-300 font-light leading-relaxed">
                <li>• <strong>Academy of Art University (San Francisco):</strong> Remote BFA &amp; Master's tracks in Jewelry &amp; Metal Arts, Fashion Design, and Fashion Merchandising.</li>
                <li>• Digital submissions, textile creation, sketching, and portfolio development.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Official Address & Contact */}
        <section className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" /> Official Headquarters &amp; Communication
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-300 font-mono">
            <div className="space-y-1">
              <p><strong>Registered Address:</strong></p>
              <p className="text-zinc-400 font-sans">
                58/78 Near Kairali Homes Building, Near Kurinjakkal Lane, Ayyanthole, Thrissur, Kerala – 680 003
              </p>
            </div>
            <div className="space-y-1">
              <p><strong>Official Contact Channels:</strong></p>
              <p className="text-zinc-400 font-sans">Email: info@voguevibemodels.com</p>
              <p className="text-zinc-400 font-sans">Helpline: +91 9336289192</p>
            </div>
          </div>
        </section>

      </PageContainer>
    </main>
  );
}