'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

// 🔹 FILTER DEFINITIONS
const FILTER_GROUPS = [
  {
    key: 'gender',
    label: 'Cast',
    options: [
      { value: 'female', label: 'Female Models' },
      { value: 'male', label: 'Male Models' },
    ],
  },
  {
    key: 'category',
    label: 'Genre',
    options: [
      { value: 'Fashion', label: 'Fashion' },
      { value: 'Commercial', label: 'Commercial' },
      { value: 'Editorial', label: 'Editorial' },
      { value: 'Runway', label: 'Runway' },
    ],
  },
  {
    key: 'location',
    label: 'Territory',
    options: [
      { value: 'Delhi', label: 'Delhi' },
      { value: 'Mumbai', label: 'Mumbai' },
      { value: 'USA', label: 'USA' },
      { value: 'New York', label: 'New York' },
    ],
  },
];

const frameNo = (i: number) => `N°${String(i + 1).padStart(3, '0')}`;

export default function PortfolioShowcase() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [active, setActive] = useState<{ [key: string]: Set<string> }>({
    gender: new Set(),
    category: new Set(),
    location: new Set(),
  });

  const toggleFilter = (group: string, value: string) => {
    setActive((prev) => {
      const next = new Set(prev[group]);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return { ...prev, [group]: next };
    });
  };

  const clearAll = () =>
    setActive({ gender: new Set(), category: new Set(), location: new Set() });

  const activeCount =
    active.gender.size + active.category.size + active.location.size;

  useEffect(() => {
    setLoading(true);
    const params = {
      gender: [...active.gender].join(',') || undefined,
      category: [...active.category].join(',') || undefined,
      location: [...active.location].join(',') || undefined,
    };

    api
      .get('/portfolio', { params })
      .then(({ data }) => setItems(data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [active]);

  // Client-side search filter
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.model?.name?.toLowerCase().includes(q) ||
        item.title?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.caption?.toLowerCase().includes(q)
    );
  }, [items, searchQuery]);

  return (
    <div className="min-h-screen bg-[#070708] text-[#f4f1ea] selection:bg-[#e11d48] selection:text-white font-sans">
      {/* Dynamic Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#e11d48]/10 via-[#c81e3a]/5 to-transparent blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* ============================================================
            HERO MASTHEAD
        ============================================================ */}
        <header className="border-b border-white/10 bg-[#09090b]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] tracking-[0.25em] uppercase text-[#a1a1aa] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48] animate-pulse" />
                  The Agency — Editorial Showcase
                </div>
                <h1 className="text-5xl sm:text-7xl font-serif font-light tracking-tight text-[#fafafa] leading-none">
                  Portfolio <span className="text-[#e11d48] font-normal">.</span>
                </h1>
                <p className="mt-4 max-w-lg text-sm text-[#a1a1aa] leading-relaxed">
                  Curated editorial, commercial and high-fashion archives from our featured talent across India and global fashion capitals.
                </p>
              </div>

              {/* Stats & Search Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search model or shoot..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#fafafa] placeholder-[#71717a] focus:outline-none focus:border-[#e11d48] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#71717a] hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="px-4 py-2.5 rounded-full border border-white/10 bg-white/5 text-xs text-[#a1a1aa] whitespace-nowrap text-center">
                  <span className="text-white font-semibold">{filteredItems.length}</span> Shoots Archived
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ============================================================
            STICKY FILTER BAR
        ============================================================ */}
        <div className="sticky top-0 z-30 bg-[#070708]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {FILTER_GROUPS.map((group, gi) => (
                <div key={group.key} className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#71717a] mr-1">
                    {group.label}
                  </span>
                  {group.options.map((opt) => {
                    const isActive = active[group.key].has(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => toggleFilter(group.key, opt.value)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                          isActive
                            ? 'bg-[#e11d48] border-[#e11d48] text-white shadow-lg shadow-[#e11d48]/25 scale-105'
                            : 'border-white/10 text-[#a1a1aa] bg-white/[0.02] hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                  {gi < FILTER_GROUPS.length - 1 && (
                    <span className="hidden lg:block h-4 w-px bg-white/10 mx-2" />
                  )}
                </div>
              ))}
            </div>

            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-[#e11d48] hover:text-[#f43f5e] font-medium underline underline-offset-4 transition-colors"
              >
                Reset Filters ({activeCount})
              </button>
            )}
          </div>
        </div>

        {/* ============================================================
            PORTFOLIO GRID
        ============================================================ */}
        <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="animate-pulse bg-white/5 rounded-2xl h-[460px] border border-white/10" />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-32 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
              <p className="text-2xl font-serif text-[#fafafa]">No shoots match your filter criteria.</p>
              <p className="text-xs text-[#71717a] mt-2">Try clearing your filters or searching for another term.</p>
              <button
                onClick={clearAll}
                className="mt-5 px-6 py-2.5 rounded-full bg-[#e11d48] text-white text-xs font-semibold hover:bg-[#f43f5e] transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, i) => (
                <LuxuryPortfolioCard key={item._id || item.slug || i} item={item} index={i} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ============================================================
// 🔹 LUXURY CARD COMPONENT WITH HOVER PREVIEW & ACTION OVERLAYS
// ============================================================
function LuxuryPortfolioCard({ item, index }: { item: any; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { slug, url, type, category, title, caption, model } = item;

  const modelName = model?.name || 'Featured Model';
  const modelSlug = model?.slug || model?._id;
  const agency = model?.agency || 'Agency Model';
  const location = model?.city || model?.location || '';

  return (
    <div
      className="group relative flex flex-col bg-[#0c0c0e] rounded-2xl border border-white/10 overflow-hidden shadow-xl hover:border-white/30 transition-all duration-500"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 🎞️ FILM SPROCKET HEADER */}
      <div className="h-3.5 bg-[#141417] border-b border-white/5 flex items-center justify-between px-3">
        <div className="flex space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#070708]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#070708]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#070708]" />
        </div>
        <span className="text-[9px] font-mono tracking-widest text-[#71717a] uppercase">
          FILM {frameNo(index)}
        </span>
        <div className="flex space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#070708]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#070708]" />
        </div>
      </div>

      {/* 📸 IMAGE / VIDEO CONTAINER */}
      <Link href={`/portfolio/${slug || item._id}`} className="relative aspect-[3/4] w-full overflow-hidden bg-black block">
        {type === 'video' ? (
          <video
            src={url}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            muted
            loop
            autoPlay={hovered}
            playsInline
          />
        ) : (
          <img
            src={url}
            alt={title || modelName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        )}

        {/* Category & Type Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] tracking-wider uppercase font-semibold text-[#fafafa]">
            {category || 'Editorial'}
          </span>
          {type === 'video' && (
            <span className="px-2 py-1 rounded-md bg-[#e11d48]/90 text-[10px] font-bold uppercase text-white flex items-center gap-1">
              ▶ Video
            </span>
          )}
        </div>

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Bottom Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end z-10">
          <p className="text-xs uppercase tracking-widest text-[#e11d48] font-semibold mb-1">
            {title || 'Fashion Editorial'}
          </p>
          <h3 className="text-xl font-serif font-medium text-white leading-tight">
            {modelName}
          </h3>
        </div>

        {/* Hover Center CTA Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <span className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold tracking-wider uppercase shadow-2xl hover:bg-[#e11d48] hover:text-white transition-colors transform translate-y-2 group-hover:translate-y-0 transition-transform">
            Open Shoot Details →
          </span>
        </div>
      </Link>

      {/* 👤 FOOTER BAR: MODEL INFO & VIEW MODEL LINK */}
      <div className="p-4 bg-[#09090b] border-t border-white/5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          {model?.avatar ? (
            <img src={model.avatar} alt={modelName} className="w-7 h-7 rounded-full object-cover border border-white/20" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center font-bold text-[10px] text-white">
              {modelName[0]}
            </div>
          )}
          <div className="truncate">
            <p className="text-[#fafafa] font-medium truncate">{modelName}</p>
            <p className="text-[10px] text-[#71717a] truncate">
              {agency} {location && `• ${location}`}
            </p>
          </div>
        </div>

        {/* 🔹 VIEW MODEL ROUTE LINK */}
        <Link
          href={`/models/${modelSlug}`}
          className="ml-3 shrink-0 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-[#e11d48] hover:bg-[#e11d48] hover:text-white hover:border-[#e11d48] transition-all duration-200"
        >
          View Model →
        </Link>
      </div>
    </div>
  );
}