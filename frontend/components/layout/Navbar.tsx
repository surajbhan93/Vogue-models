'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Sparkles,
  User,
  ChevronDown,
  Drama,
  Mic,
  Palette,
  Activity,
  Music,
  Crown,
  ArrowRight,
  ShieldCheck,
  Star,
} from 'lucide-react';

const categories = [
  { href: '/models', label: 'Fashion Models', icon: User, desc: 'Runway, Editorial & Commercial', badge: 'Popular' },
  { href: '/actors', label: 'Actors & Actresses', icon: Drama, desc: 'Film, TV & Cinema Casting' },
  { href: '/singers', label: 'Singers & Vocalists', icon: Mic, desc: 'Playback, Bands & Live Performers' },
  { href: '/painters', label: 'Painters & Artists', icon: Palette, desc: 'Fine Art, Canvas & Murals' },
  { href: '/dancers', label: 'Dancers & Choreographers', icon: Activity, desc: 'Classical & Contemporary' },
  { href: '/musicians', label: 'Musicians & Composers', icon: Music, desc: 'Instrumentalists & Producers' },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔹 CLICK OUTSIDE LISTENER (PROPERLY INSIDE useEffect)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 🔹 ROUTE CHECK
  const isDashboardRoute =
    pathname?.includes('/dashboard') ||
    pathname?.includes('/admin') ||
    (typeof window !== 'undefined' &&
      (window.location.pathname.includes('/dashboard') ||
        window.location.pathname.includes('/admin')));

  return (
    <header
      className={`${
        isDashboardRoute ? 'hidden' : 'sticky top-0 z-50'
      } bg-[#07090e]/90 backdrop-blur-2xl border-b border-amber-500/15 shadow-[0_10px_35px_rgba(0,0,0,0.9)] transition-all duration-300 selection:bg-amber-500 selection:text-black`}
    >
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-950/80 via-black to-amber-950/80 border-b border-amber-500/10 text-[11px] font-mono tracking-widest text-amber-300/90 py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
        <span>VOGUE VIBE MODELS — OFFICIAL INTERNATIONAL TALENT SCOUTING 2026</span>
        <Sparkles className="w-3 h-3 text-amber-400 animate-pulse hidden sm:inline" />
      </div>

      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative shrink-0">
            <Image
              src="https://res.cloudinary.com/ujpa9sap/image/upload/v1786020022/cropped_circle_image_utg5ck.png"
              alt="Vogue Vibe Models Official Logo"
              width={48}
              height={48}
              priority
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.25)] group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-lg sm:text-2xl tracking-tight text-white font-extrabold group-hover:text-amber-200 transition-colors">
                VOGUE VIBE
              </span>
              <span className="text-[9px] font-bold tracking-widest uppercase text-amber-400 bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 rounded">
                MODELS
              </span>
            </div>
            <span className="text-[9px] tracking-[0.3em] text-slate-400 uppercase font-medium">
              TALENT MANAGEMENT
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-slate-300">
          <Link href="/" className="hover:text-amber-400 transition-colors py-2 relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* CATEGORIES DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              onMouseEnter={() => setIsCategoryOpen(true)}
              className={`flex items-center gap-1.5 py-2 transition-colors cursor-pointer group ${
                isCategoryOpen ? 'text-amber-400' : 'hover:text-amber-400'
              }`}
            >
              <span>Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180 text-amber-400' : 'group-hover:translate-y-0.5'}`} />
            </button>

            {/* Dropdown Menu */}
            {isCategoryOpen && (
              <div
                onMouseLeave={() => setIsCategoryOpen(false)}
                className="absolute top-full -left-6 w-96 bg-[#0a0d14]/95 border border-amber-500/20 rounded-3xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl animate-in fade-in slide-in-from-top-3 duration-200 z-50 space-y-1.5"
              >
                <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between text-[10px] text-amber-400 font-mono tracking-widest uppercase">
                  <span>Browse By Specialty</span>
                  <Crown className="w-3 h-3" />
                </div>

                <div className="grid grid-cols-1 gap-1">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={() => setIsCategoryOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-gradient-to-r hover:from-amber-500/15 hover:to-transparent border border-transparent hover:border-amber-500/20 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-400 transition-all duration-300 shadow-inner">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white group-hover:text-amber-200 transition-colors flex items-center gap-2">
                              <span>{cat.label}</span>
                              {cat.badge && (
                                <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded-full font-mono uppercase">
                                  {cat.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {cat.desc}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link href="/contests" className="hover:text-amber-400 transition-colors py-2 relative group">
            Contests
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link href="/become-model" className="hover:text-amber-400 transition-colors py-2 relative group">
            Become a Talent
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link href="/ContactPage" className="hover:text-amber-400 transition-colors py-2 relative group">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="/login"
            className="inline-flex items-center px-4 py-2 rounded-xl border border-white/10 bg-slate-950 text-white hover:border-amber-400 text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Sign In
          </Link>

          <Link
            href="/hire-a-model"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Hire Talents</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-200 p-2 rounded-xl border border-slate-800 bg-slate-950 cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#07090e]/95 border-t border-amber-500/15 px-6 py-6 space-y-5 backdrop-blur-2xl">
          <Link
            href="/"
            className="block text-sm font-bold text-white hover:text-amber-400"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          <div className="space-y-3 pt-3 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">
              <span>Explore Categories</span>
              <Crown className="w-3.5 h-3.5" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-amber-500/30 flex items-center gap-3 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="font-semibold block">{cat.label}</span>
                      <span className="text-[10px] text-slate-500 block">{cat.desc}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-800">
            <Link href="/contests" className="block text-sm text-slate-200 hover:text-amber-400" onClick={() => setIsOpen(false)}>
              Contests
            </Link>
            <Link href="/become-model" className="block text-sm text-slate-200 hover:text-amber-400" onClick={() => setIsOpen(false)}>
              Become a Talent
            </Link>
            <Link href="/ContactPage" className="block text-sm text-slate-200 hover:text-amber-400" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 text-center rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs uppercase tracking-wider"
            >
              Sign In
            </Link>
            <Link
              href="/hire-a-model"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 text-center rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              Hire Talents
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};