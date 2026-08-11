'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ZoomIn, Camera, Film, Mic, Star, ShieldCheck, Crown } from 'lucide-react';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { HeroButtons } from './HeroButtons';

// 🌟 5 HIGH-FASHION TALENT IMAGES SUPPLIED BY USER (MODELS, ACTORS, SINGERS)
const HERO_TALENT_IMAGES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1647126004051-6e211c360add?w=1000&auto=format&fit=crop&q=85',
    category: 'Model',
    name: 'Elena Rostova',
    title: 'High Fashion & Runway Model',
    location: 'Paris • Milan',
    tag: 'Vogue Cover Star',
    gradient: 'from-amber-500/20 via-rose-500/10 to-transparent',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1598815000898-7d8cd4dc90f1?w=1000&auto=format&fit=crop&q=85',
    category: 'Actor',
    name: 'Sophia Vane',
    title: 'Lead Cinema & TV Actress',
    location: 'Hollywood • Cannes',
    tag: 'Cannes Featured',
    gradient: 'from-purple-500/20 via-blue-500/10 to-transparent',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1617551307538-c9cdb9d71289?w=1000&auto=format&fit=crop&q=85',
    category: 'Actor',
    name: 'Marcus Sterling',
    title: 'GQ Commercial Actor & Model',
    location: 'New York • London',
    tag: 'GQ Top Talent',
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1659095012554-e4cc81fc04c0?w=1000&auto=format&fit=crop&q=85',
    category: 'Singer',
    name: 'Aria Montgomery',
    title: 'Stage Performer & Vocal Artist',
    location: 'Los Angeles • Tokyo',
    tag: 'Global Vocalist',
    gradient: 'from-rose-500/20 via-amber-500/10 to-transparent',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1548361403-cb0c785eea54?w=1000&auto=format&fit=crop&q=85',
    category: 'Model',
    name: 'Isabella Cruz',
    title: 'Haute Couture Brand Ambassador',
    location: 'Milan • Madrid',
    tag: 'Harper\'s Bazaar',
    gradient: 'from-amber-500/20 via-purple-500/10 to-transparent',
  },
];

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'Model' | 'Actor' | 'Singer'>('ALL');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const filteredImages = selectedFilter === 'ALL'
    ? HERO_TALENT_IMAGES
    : HERO_TALENT_IMAGES.filter((img) => img.category === selectedFilter);

  const currentImage = filteredImages[currentIndex % filteredImages.length] || HERO_TALENT_IMAGES[0];

  // Auto-play interval
  useEffect(() => {
    if (isAutoPlaying && !isHovering) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
      }, 4500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, isHovering, filteredImages.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  return (
    <section className="relative min-h-[75vh] lg:min-h-[80vh] flex items-center justify-center pt-2 md:pt-4 pb-6 md:pb-10 overflow-hidden bg-[#030508]">
      
      {/* 🌟 DYNAMIC HERO VIDEO & IMAGE BACKGROUND */}
      <HeroBackground src={HERO_TALENT_IMAGES[0].url} />

      {/* LIGHTBOX ZOOM MODAL */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden border border-amber-500/40 shadow-2xl"
            >
              <img src={zoomImage} alt="Talent Preview" className="w-full h-full object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* 📝 LEFT COLUMN: HERO CONTENT & CTAS */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            
            {/* VIP Scouting Tagline */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Crown className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                Vogue Vibe Global Scouting 2026
              </div>

              {/* Category Pills Filter */}
              <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md p-0.5 rounded-full border border-white/10">
                {[
                  { id: 'ALL', label: 'All' },
                  { id: 'Model', label: 'Models', icon: Camera },
                  { id: 'Actor', label: 'Actors', icon: Film },
                  { id: 'Singer', label: 'Singers', icon: Mic },
                ].map((f) => {
                  const isSelected = selectedFilter === f.id;
                  const Icon = f.icon;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        setSelectedFilter(f.id as any);
                        setCurrentIndex(0);
                      }}
                      className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-400 text-black shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {Icon && <Icon className="w-2.5 h-2.5" />}
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Headline */}
            <HeroContent
              badgeText="Official Roster Scouting"
              titlePrefix="EMPOWERING THE WORLD'S NEXT"
              titleHighlight="iconic talent"
              titleSuffix="IN FASHION & CINEMA"
              subtitle="Representing premier international Supermodels, Cinema & TV Actors, Stage Vocalists, and Performing Artists across Paris, Milan, Hollywood, and New York."
            />

            {/* CTAs */}
            <HeroButtons
              primaryText="Apply For Representation"
              primaryHref="/become-model#register"
              secondaryText="View Full Roster"
              secondaryHref="/models"
            />

            {/* Trust Badges Bar */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400 font-sans font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Free Scouting Evaluation
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-amber-300 font-sans font-medium">
                <Star className="w-4 h-4 text-amber-400" /> Paris • Milan • NY • London
              </span>
            </div>

          </div>

          {/* 🖼️ RIGHT COLUMN: 3D TALENT GALLERY SHOWCASE WITH 5 IMAGES */}
          <div className="lg:col-span-6 relative">
            <div
              className="relative w-full max-w-[480px] mx-auto"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Main Image Card Container */}
              <div className="relative aspect-[4/4.5] rounded-3xl overflow-hidden bg-zinc-950 shadow-[0_0_50px_rgba(212,175,55,0.2)] border-2 border-amber-500/40 group">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage.id}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="absolute inset-0 z-0"
                  >
                    <img
                      src={currentImage.url}
                      alt={currentImage.name}
                      className="w-full h-full object-cover object-top filter brightness-[0.9] contrast-[1.08] group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${currentImage.gradient} opacity-50`} />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
                  </motion.div>
                </AnimatePresence>

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-widest shadow-lg">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    {currentImage.category} • {currentImage.tag}
                  </div>
                </div>

                {/* Top Right Counter */}
                <div className="absolute top-3 right-3 z-10">
                  <div className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-zinc-300 text-[10px] font-mono">
                    {String((currentIndex % filteredImages.length) + 1).padStart(2, '0')} / {String(filteredImages.length).padStart(2, '0')}
                  </div>
                </div>

                {/* Bottom Talent Info Overlay */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-3.5 border border-white/15 space-y-0.5 shadow-2xl">
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1">
                          <span>{currentImage.location}</span>
                        </div>
                        <h3 className="text-white font-serif text-lg sm:text-xl font-bold tracking-tight">
                          {currentImage.name}
                        </h3>
                        <p className="text-zinc-300 text-[11px] uppercase tracking-wider font-light">
                          {currentImage.title}
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setZoomImage(currentImage.url)}
                        className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 hover:bg-amber-400 hover:text-black transition-all shadow-md cursor-pointer shrink-0"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-amber-400 hover:text-black text-white border border-white/20 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-amber-400 hover:text-black text-white border border-white/20 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>

              {/* 🖼️ THUMBNAIL MATRIX OF ALL 5 UNSPLASH IMAGES */}
              <div className="mt-3 flex justify-center gap-2 overflow-x-auto px-1 pb-1">
                {filteredImages.map((thumb, idx) => {
                  const isSelected = idx === (currentIndex % filteredImages.length);
                  return (
                    <motion.button
                      key={thumb.id}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsAutoPlaying(false);
                        setTimeout(() => setIsAutoPlaying(true), 6000);
                      }}
                      className={`relative w-12 h-14 sm:w-14 sm:h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105 shadow-[0_0_12px_rgba(212,175,55,0.5)]'
                          : 'border-zinc-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={thumb.url} alt={thumb.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-0.5 flex items-end">
                        <span className="text-[8px] font-bold text-white truncate leading-tight w-full text-center">
                          {thumb.category}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
