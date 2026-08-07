import React from 'react';
import Link from 'next/link';
import { SEO_CONFIG, POPULAR_CITIES, TALENT_CATEGORIES } from '@/lib/config/seo-config';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-850 text-slate-400 text-sm pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-extrabold tracking-tight text-white">
                TALENT<span className="text-gold-400">PRIME</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm max-w-sm">
              The world’s premier modeling agency & casting platform. Connecting top fashion, commercial, child, and influencer talent with global luxury brands and production houses across India, USA, UK, UAE & Australia.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              <p>📍 {SEO_CONFIG.contact.address}, {SEO_CONFIG.contact.city}, {SEO_CONFIG.contact.country}</p>
              <p>✉️ {SEO_CONFIG.contact.email} | 📞 {SEO_CONFIG.contact.phone}</p>
            </div>
          </div>

          {/* Categories Internal Linking */}
          <div>
            <h3 className="text-xs uppercase font-bold text-white tracking-widest mb-4">
              Talent Categories
            </h3>
            <ul className="space-y-2.5 text-xs">
              {TALENT_CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-gold-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location SEO Internal Linking */}
          <div>
            <h3 className="text-xs uppercase font-bold text-white tracking-widest mb-4">
              Popular Cities
            </h3>
            <ul className="space-y-2.5 text-xs">
              {POPULAR_CITIES.slice(0, 8).map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/city/${city.slug}`}
                    className="hover:text-gold-400 transition-colors"
                  >
                    Models in {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* EEAT & Trust Policies */}
          <div>
            <h3 className="text-xs uppercase font-bold text-white tracking-widest mb-4">
              Trust & Legal (EEAT)
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-gold-400 transition-colors">
                  About Us & Leadership
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-gold-400 transition-colors">
                  Editorial Policy & Safety
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors">
                  Contact & Verification
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gold-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold-400 transition-colors">
                  Terms of Service & DMCA
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Country Target Links */}
        <div className="pt-8 border-t border-slate-900 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center space-x-4">
              <span className="text-slate-500 font-semibold uppercase">Global Hubs:</span>
              <Link href="/country/india" className="hover:text-gold-400 transition-colors">India (Primary)</Link>
              <Link href="/country/usa" className="hover:text-gold-400 transition-colors">United States</Link>
              <Link href="/country/uk" className="hover:text-gold-400 transition-colors">United Kingdom</Link>
              <Link href="/country/canada" className="hover:text-gold-400 transition-colors">Canada</Link>
              <Link href="/country/uae" className="hover:text-gold-400 transition-colors">UAE (Dubai)</Link>
              <Link href="/country/australia" className="hover:text-gold-400 transition-colors">Australia</Link>
            </div>
            <p className="text-slate-600 text-xs">
              © {new Date().getFullYear()} {SEO_CONFIG.companyName}. All rights reserved. Google Search & EEAT Optimized.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
