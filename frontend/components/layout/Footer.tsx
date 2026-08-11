'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
  Share2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Crown,
  Heart,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Code,
  Award,
  BookOpen,
  Newspaper,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Footer = () => {
  const pathname = usePathname();
  const [email, setEmail] = useState('');

  const isDashboardRoute =
    pathname?.includes('/dashboard') ||
    pathname?.includes('/admin') ||
    (typeof window !== 'undefined' &&
      (window.location.pathname.includes('/dashboard') ||
        window.location.pathname.includes('/admin')));

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success('Subscribed to Boom Boom Night In America 2027 Audition Alerts!');
    setEmail('');
  };

  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://www.instagram.com/voguevibemodels/',
      hoverColor: 'hover:text-pink-400 hover:border-pink-500/40',
    },
    {
      icon: Youtube,
      label: 'YouTube',
      href: 'https://www.youtube.com/@VogueVibeModels',
      hoverColor: 'hover:text-red-400 hover:border-red-500/40',
    },
    {
      icon: Facebook,
      label: 'Facebook',
      href: 'https://www.facebook.com/people/Voguevibemodels/61592543384808/',
      hoverColor: 'hover:text-blue-400 hover:border-blue-500/40',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://lnkd.in/gUNKBhKF',
      hoverColor: 'hover:text-sky-400 hover:border-sky-500/40',
    },
    {
      icon: Twitter,
      label: 'X (Twitter)',
      href: 'https://x.com/voguevibemodels',
      hoverColor: 'hover:text-zinc-200 hover:border-zinc-400/40',
    },
    {
      icon: Share2,
      label: 'Pinterest',
      href: 'https://www.pinterest.com/voguevibemodels/',
      hoverColor: 'hover:text-red-500 hover:border-red-500/40',
    },
  ];

  return (
    <footer
      className={`${
        isDashboardRoute ? 'hidden' : 'relative'
      } bg-[#030508] border-t border-amber-500/20 text-slate-400 text-sm overflow-hidden selection:bg-amber-500 selection:text-black`}
    >
      {/* Background Image & Ambient Lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src="http://images.unsplash.com/photo-1568535904307-f48b760a39f3?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Footer Background"
          className="w-full h-full object-cover object-center opacity-35 filter brightness-75 contrast-125 saturate-50 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030508]/90 via-[#030508]/85 to-[#030508]/95" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1100px] h-[400px] bg-gradient-to-t from-amber-500/20 via-amber-600/10 to-transparent blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1650px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-12 md:pt-16 pb-12">
        
        {/* Top Newsletter Banner */}
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-r from-slate-950 via-zinc-900 to-slate-950 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)] mb-12 md:mb-16 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" /> Boom Boom Night In America 2027
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-extrabold text-white tracking-wide">
              Subscribe to Vogue Agency Talent Launchpad
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              Get exclusive audition alerts for Modeling, Singing, Painting, Acting, and Fashion Designing with USA certification from I Catch Management &amp; Hiba Entertainment USA.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-2.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full sm:w-80 lg:w-96 bg-slate-950 text-slate-100 placeholder-slate-500 text-xs sm:text-sm rounded-xl px-4 py-3.5 border border-slate-800 focus:outline-none focus:border-amber-500/60 shadow-inner"
            />
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:from-amber-300 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20 shrink-0 cursor-pointer"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Main Footer Columns (5 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Brand & Address Column */}
          <div className="space-y-5 sm:col-span-2 md:col-span-3 lg:col-span-1 pr-0 lg:pr-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative shrink-0">
                <Image
                  src="https://res.cloudinary.com/ujpa9sap/image/upload/v1786020022/cropped_circle_image_utg5ck.png"
                  alt="Vogue Agency Official Logo"
                  width={44}
                  height={44}
                  priority
                  className="w-11 h-11 object-contain rounded-full border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.25)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-serif text-lg tracking-tight text-white font-extrabold">
                    VOGUE AGENCY
                  </span>
                  <span className="text-[8px] font-bold tracking-widest uppercase text-amber-400 bg-amber-500/15 border border-amber-500/30 px-1 py-0.5 rounded">
                    USA 2027
                  </span>
                </div>
                <span className="text-[8px] tracking-[0.2em] text-slate-400 uppercase font-medium">
                  BOOM BOOM NIGHT IN AMERICA
                </span>
              </div>
            </Link>

            <p className="text-slate-300 text-xs leading-relaxed font-light">
              India’s premier multi-talent launchpad across 5 pillars: Modeling, Singing, Painting, Acting, and Fashion Designing. Partnered with I Catch Management &amp; Hiba Entertainment USA.
            </p>

            <div className="space-y-2 text-xs text-slate-300 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>58/78 Near Kairali Homes Building, Ayyanthole, Thrissur, Kerala – 680 003</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="mailto:info@voguevibemodels.com" className="hover:text-amber-300 transition-colors font-mono">
                  info@voguevibemodels.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+91 9336289192</span>
              </div>
            </div>

            {/* Official Social Links */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block">
                Official Social Networks
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className={`p-2 rounded-xl bg-slate-950/80 border border-slate-700 text-slate-400 ${social.hoverColor} hover:bg-slate-900 transition-all duration-300 group backdrop-blur-sm`}
                  >
                    <social.icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 5 Talent Pillars */}
          <div>
            <h4 className="font-serif text-white font-bold text-sm mb-4 tracking-wide uppercase flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
              5 Talent Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: '👠 Modeling Division', href: '/models' },
                { name: '🎭 Acting & Drama', href: '/actors' },
                { name: '🎤 Singing & Vocalists', href: '/singers' },
                { name: '👗 Fashion Designing', href: '/categories' },
                { name: '🎨 Painting & Fine Art', href: '/painters' },
              ].map((cat, idx) => (
                <li key={idx}>
                  <Link href={cat.href} className="hover:text-amber-300 transition-colors flex items-center gap-2 py-0.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shrink-0" /> {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/become-model#register" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1.5 pt-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Apply For Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* 📰 Fashion & Career Blogs Column */}
          <div>
            <h4 className="font-serif text-white font-bold text-sm mb-4 tracking-wide uppercase flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
              Fashion &amp; Career Blogs
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: '📰 Official Blog Magazine', href: '/blogs' },
                { name: '📸 Model Polaroid Audition Guide', href: '/blogs' },
                { name: '🎤 Acting Voice Modulation Tips', href: '/blogs' },
                { name: '🎨 Time-Lapse Painting Proofs', href: '/blogs' },
                { name: '👗 Fashion Lookbook Strategies', href: '/blogs' },
                { name: '🏆 USA Certificate Verification', href: '/about#certification' },
              ].map((blog, idx) => (
                <li key={idx}>
                  <Link href={blog.href} className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-0.5 text-slate-300">
                    <BookOpen className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{blog.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Global Auditions */}
          <div>
            <h4 className="font-serif text-white font-bold text-sm mb-4 tracking-wide uppercase flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
              Company &amp; Launchpad
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: 'About Us (12 Yrs Legacy)', href: '/about' },
                { name: 'Contests & Mega Finale', href: '/contests' },
                { name: 'USA Partner Certification', href: '/about#certification' },
                { name: 'USA & College Courses', href: '/about#courses' },
                { name: 'Contact Support Helpline', href: '/ContactPage' },
                { name: 'Frequently Asked Questions', href: '/faq' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-amber-300 transition-colors py-0.5 block text-slate-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Policies */}
          <div>
            <h4 className="font-serif text-white font-bold text-sm mb-4 tracking-wide uppercase flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
              Legal &amp; Trust Policies
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: 'Terms & Conditions', href: '/terms-and-conditions' },
                { name: 'Refund & Fee Policy', href: '/refund-policy' },
                { name: 'Cancellation Policy', href: '/cancellation-policy' },
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Copyright & IP Policy', href: '/copyright-policy' },
                { name: 'Disclaimer', href: '/disclaimer' },
              ].map((policy, idx) => (
                <li key={idx}>
                  <Link href={policy.href} className="hover:text-amber-300 transition-colors py-0.5 block text-slate-300">
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & USA Entity Verification Strip */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center md:text-left">
            <span>© 2027 VOGUE AGENCY • BOOM BOOM NIGHT IN AMERICA</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-amber-400">USA Partner: I Catch Management</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> 30% TDS Compliant (Section 194B)
            </span>
            <span>•</span>
            <span className="text-amber-300">₹3,00,000 Grand Prize / USA Trip</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;