import React from 'react';
import Link from 'next/link';
import { Sparkles, Search, UserCheck } from 'lucide-react';
import { SEO_CONFIG } from '@/lib/config/seo-config';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-500 to-amber-300 p-0.5 shadow-lg shadow-gold-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white block">
              TALENT<span className="text-gold-400">PRIME</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold block">
              Global Modeling Network
            </span>
          </div>
        </Link>

        {/* Primary SEO Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <Link href="/models" className="hover:text-gold-400 transition-colors">
            Find Talent
          </Link>
          <Link href="/category/fashion-models" className="hover:text-gold-400 transition-colors">
            Fashion Models
          </Link>

          {/* Location Hub Dropdown Link */}
          <Link href="/country/india" className="hover:text-gold-400 transition-colors flex items-center">
            <span className="mr-1">🇮🇳</span> India Talent
          </Link>
          <Link href="/country/usa" className="hover:text-gold-400 transition-colors flex items-center">
            <span className="mr-1">🇺🇸</span> USA Talent
          </Link>

          <Link href="/services/model-management" className="hover:text-gold-400 transition-colors">
            Services
          </Link>
          <Link href="/blog" className="hover:text-gold-400 transition-colors">
            Industry Insights
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            href="/models"
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-850 transition-colors"
            title="Search Models & Talent"
          >
            <Search className="w-5 h-5" />
          </Link>
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gold-500 hover:bg-gold-400 text-slate-950 transition-all transform hover:-translate-y-0.5 shadow-md shadow-gold-500/20"
          >
            <UserCheck className="w-4 h-4 mr-1.5" /> Book Models
          </Link>
        </div>
      </div>
    </header>
  );
}
