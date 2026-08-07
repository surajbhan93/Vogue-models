'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { GalleryCard } from '@/components/home/Gallery/GalleryCard';
import { Sparkles, Crown, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = ['All', 'Magazine Cover', 'Runway Showcase', 'Brand Campaign', 'Editorial Shoot'];

export default function PublicGalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchEditorials();
  }, []);

  const fetchEditorials = async () => {
    setLoading(true);
    try {
      const response = await api.get('/editorials');
      if (response.data?.success && Array.isArray(response.data.data)) {
        const formatted = response.data.data.map((item: any) => ({
          id: item._id,
          title: item.title,
          album: item.category || 'Editorial',
          imageUrl: item.image,
          magazineName: item.magazineName,
          issueDate: item.issueDate,
        }));
        setItems(formatted);
      }
    } catch (err) {
      console.error('Failed to fetch gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedCategory !== 'All' && item.album !== selectedCategory) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.title?.toLowerCase().includes(q) ||
        item.album?.toLowerCase().includes(q) ||
        item.magazineName?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-amber-500 selection:text-black pt-6 pb-24 relative">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-amber-500/10 via-purple-600/5 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase tracking-widest">
            <Crown className="w-3.5 h-3.5 text-amber-400" /> Vogue Vibe Visual Archives
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight">
            Editorials &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">Runway Gallery</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Browse our complete press portfolio including magazine covers, fashion week showcases, and brand campaigns.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/70" />
            <input
              type="text"
              placeholder="Search covers, brand campaigns, magazines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 shadow-inner"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 space-y-3">
            <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
            <p className="text-xs font-medium">Loading gallery showcase...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl text-slate-400 space-y-2">
            <h3 className="text-base font-bold text-white">No Editorials Found</h3>
            <p className="text-xs max-w-sm mx-auto">No showcase images match your selected category or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => (
              <GalleryCard key={item.id} item={item} onClick={() => setLightboxIndex(idx)} />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 p-3 rounded-full bg-slate-900 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-4xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredItems[lightboxIndex].imageUrl}
              alt={filteredItems[lightboxIndex].title}
              className="w-full h-full max-h-[80vh] object-contain mx-auto rounded-2xl border border-slate-800"
            />
            <p className="mt-4 text-center text-sm font-serif font-bold text-white">
              {filteredItems[lightboxIndex].title} ({filteredItems[lightboxIndex].album})
            </p>
          </div>
        </div>
      )}
    </div>
  );
}