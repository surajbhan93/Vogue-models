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
    toast.success('Subscribed to Vogue Vibe VIP Casting Alerts!');
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
      {/* Background Ambient Lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1100px] h-[400px] bg-gradient-to-t from-amber-500/10 via-amber-600/5 to-transparent blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1650px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-12 md:pt-16 pb-12">
        {/* Top Newsletter Banner */}
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-r from-slate-950 via-zinc-900 to-slate-950 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)] mb-12 md:mb-16 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" /> VIP Casting &amp; Event Alerts
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-extrabold text-white tracking-wide">
              Subscribe to Vogue Vibe Scouting Network
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              Get exclusive notifications about international casting calls, fashion weeks, and brand scoutings across Paris, Milan, London, New York, and Mumbai.
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

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-5 sm:col-span-2 md:col-span-3 lg:col-span-2 pr-0 lg:pr-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative shrink-0">
                <Image
                  src="https://res.cloudinary.com/ujpa9sap/image/upload/v1786020022/cropped_circle_image_utg5ck.png"
                  alt="Vogue Vibe Models Official Logo"
                  width={48}
                  height={48}
                  priority
                  className="w-12 h-12 object-contain rounded-full border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.25)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-xl sm:text-2xl tracking-tight text-white font-extrabold">
                    VOGUE VIBE
                  </span>
                  <span className="text-[9px] font-bold tracking-widest uppercase text-amber-400 bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 rounded">
                    MODELS
                  </span>
                </div>
                <span className="text-[9px] tracking-[0.3em] text-slate-400 uppercase font-medium">
                  GLOBAL TALENT MANAGEMENT
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md font-light">
              The premier global talent management platform connecting high fashion models, actors, singers, painters, dancers, and musicians with luxury international brands and casting directors.
            </p>

            <div className="space-y-2 text-xs sm:text-sm text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>BKC Horizon Tower, Bandra Kurla Complex, Mumbai / 5th Ave NYC</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="mailto:scouting@auracouture.com" className="hover:text-amber-300 transition-colors font-mono">
                  scouting@auracouture.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+91-22-6789-9900 (India) / +1-212-555-0199 (USA)</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block">
                Official Social Networks
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 ${social.hoverColor} hover:bg-slate-900 transition-all duration-300 group`}
                  >
                    <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Talent Categories */}
          <div>
            <h4 className="font-serif text-white font-bold text-sm mb-4 tracking-wide uppercase flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
              Talent Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: 'Fashion Models', href: '/models' },
                { name: 'Actors & Actresses', href: '/actors' },
                { name: 'Singers & Vocalists', href: '/singers' },
                { name: 'Painters & Visual Artists', href: '/painters' },
                { name: 'Dancers & Choreographers', href: '/dancers' },
                { name: 'Musicians & Bands', href: '/musicians' },
              ].map((cat, idx) => (
                <li key={idx}>
                  <Link href={cat.href} className="hover:text-amber-300 transition-colors flex items-center gap-2 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shrink-0" /> {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/become-a-model" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1.5 pt-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Apply for Scouting
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Services */}
          <div>
            <h4 className="font-serif text-white font-bold text-sm mb-4 tracking-wide uppercase flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
              Company &amp; Agency
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: 'About Vogue Vibe', href: '/about' },
                { name: 'Hire Talent Request', href: '/hire-a-model' },
                { name: 'Contests & Hunts', href: '/contests' },
                { name: 'Casting Services', href: '/services' },
                { name: 'Fashion & Career Blog', href: '/blogs' },
                { name: 'Gallery Archives', href: '/gallery' },
                { name: 'Contact Support Desk', href: '/ContactPage' },
                { name: 'Knowledge Base FAQ', href: '/faq' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-amber-300 transition-colors py-0.5 block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Trust Policies */}
          <div>
            <h4 className="font-serif text-white font-bold text-sm mb-4 tracking-wide uppercase flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
              Legal &amp; Trust Policies
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: 'Terms & Conditions', href: '/terms-and-conditions' },
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Cookie Policy', href: '/cookie-policy' },
                { name: 'Copyright Policy', href: '/copyright-policy' },
                { name: 'Editorial Policy', href: '/editorial-policy' },
                { name: 'Scouting Fraud Disclaimer', href: '/disclaimer' },
                { name: 'DMCA Takedown Notice', href: '/dmca' },
                { name: 'Refund & Billing Policy', href: '/refund-policy' },
                { name: 'Physical Shipping Policy', href: '/shipping-policy' },
              ].map((policy, idx) => (
                <li key={idx}>
                  <Link href={policy.href} className="hover:text-amber-300 transition-colors py-0.5 block">
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900/90 py-6 bg-[#020305]">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono text-center md:text-left">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>© {new Date().getFullYear()} <strong className="text-slate-300">VOGUE VIBE MODELS</strong> / AURA Couture. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline shrink-0 animate-pulse" />
              <span>for Global Creative Performers</span>
            </div>

            <span className="hidden md:inline text-slate-800">•</span>

            {/* Made by Codelura attribution */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-amber-500/20 text-[11px]">
              <span className="text-slate-400">Designed &amp; Developed by</span>
              <a
                href="https://build.codelura.com/services"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-400 hover:text-amber-300 hover:underline transition-all flex items-center gap-1"
              >
                <span>Codelura</span>
                <ArrowRight className="w-3 h-3 -rotate-45 text-amber-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};