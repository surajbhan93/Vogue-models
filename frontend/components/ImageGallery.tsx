'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Star, Award, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

export const ALL_11_MODEL_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Elena Rostova',
    role: 'High Fashion & Runway',
    location: 'Paris • Milan',
    label: 'HAUTE COUTURE 2026',
    tag: 'Vogue Cover Star'
  },
  {
    url: 'https://images.unsplash.com/photo-1598815043441-59b8d13362b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNlbGVicml0aWVzfGVufDB8fDB8fHww',
    name: 'Sophia Vane',
    role: 'Editorial & Cinema Actor',
    location: 'Los Angeles',
    label: 'CANNES FILM FESTIVAL',
    tag: 'Dramatic Lead'
  },
  {
    url: 'https://images.unsplash.com/photo-1685016950642-12637189ee1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2VsZWJyaXRpZXN8ZW58MHx8MHx8fDA%3D',
    name: 'Marcus Sterling',
    role: 'Commercial & Male Model',
    location: 'New York',
    label: 'GQ EDITORIAL',
    tag: 'Top Male Model'
  },
  {
    url: 'https://images.unsplash.com/photo-1643756635111-ee5b18e055dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFjdHJlc3N8ZW58MHx8MHx8fDA%3D',
    name: 'Aria Montgomery',
    role: 'Lead Cinema Actress',
    location: 'London • Cannes',
    label: 'BAFTA NOMINEE',
    tag: 'Film Star'
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1661255454444-13277f7679a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFjdHJlc3N8ZW58MHx8MHx8fDA%3D',
    name: 'Isabella Cruz',
    role: 'Luxury Brand Ambassador',
    location: 'Milan • Madrid',
    label: 'HARPER\'S BAZAAR',
    tag: 'Luxury Face'
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1683219368443-cb52cb4bf023?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFjdHJlc3N8ZW58MHx8MHx8fDA%3D',
    name: 'Camila Laurent',
    role: 'Haute Couture Model',
    location: 'Paris Fashion Week',
    label: 'PARIS FASHION WEEK',
    tag: 'Chanel Runway'
  },
  {
    url: 'https://images.unsplash.com/photo-1609087570105-0974d0de19ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFjdHJlc3N8ZW58MHx8MHx8fDA%3D',
    name: 'Natasha Romanov',
    role: 'Theatre & Film Actor',
    location: 'Broadway, NY',
    label: 'BROADWAY LEAD',
    tag: 'Stage Icon'
  },
  {
    url: 'https://images.unsplash.com/photo-1598815000898-7d8cd4dc90f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWN0cmVzc3xlbnwwfHwwfHx8MA%3D%3D',
    name: 'Chloë Bennett',
    role: 'Beauty & Skincare Face',
    location: 'Tokyo • LA',
    label: 'GLOBAL CAMPAIGN',
    tag: 'Beauty Face'
  },
  {
    url: 'https://images.unsplash.com/photo-1686829354875-f8286d8f9d83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWN0cmVzc3xlbnwwfHwwfHx8MA%3D%3D',
    name: 'Zendaya K.',
    role: 'Runway & High Fashion',
    location: 'Milan • NY',
    label: 'MILAN SUPERMODEL',
    tag: 'Supermodel'
  },
  {
    url: 'https://images.unsplash.com/photo-1589363348179-3cced6b7b6d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWN0cmVzc3xlbnwwfHwwfHx8MA%3D%3D',
    name: 'Victoria Thorne',
    role: 'Television & Cinema',
    location: 'Hollywood',
    label: 'HOLLYWOOD CINEMA',
    tag: 'Series Lead'
  },
  {
    url: 'https://images.unsplash.com/photo-1607699032287-f58742a2693d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D',
    name: 'Daria Petrova',
    role: 'Jewelry & Glamour Model',
    location: 'Dubai • Geneva',
    label: 'ELLE SPOTLIGHT',
    tag: 'Cover Star'
  }
];

export const ImageGallery: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeModel = ALL_11_MODEL_IMAGES[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % ALL_11_MODEL_IMAGES.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + ALL_11_MODEL_IMAGES.length) % ALL_11_MODEL_IMAGES.length);
  };

  return (
    <div className="relative w-full space-y-6">
      {/* 🌟 MAIN SPOTLIGHT HERO CARD */}
      <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-[0_0_40px_rgba(212,175,55,0.25)] group bg-zinc-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModel.url}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={activeModel.url}
              alt={activeModel.name}
              className="w-full h-full object-cover object-top filter brightness-[0.88] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Top Badges */}
        <div className="relative z-10 p-5 flex items-center justify-between">
          <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            {activeModel.label}
          </span>
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300 text-xs font-sans">
            {activeModel.location}
          </span>
        </div>

        {/* Bottom Details Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10 space-y-1 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-amber-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            {activeModel.role}
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-wide">
            {activeModel.name}
          </h3>
          <div className="flex items-center gap-3 text-xs text-emerald-400 font-sans pt-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Vogue Scouting Roster 2026</span>
          </div>
        </div>

        {/* Left & Right Navigation Arrows */}
        <button
          onClick={handlePrev}
          type="button"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-amber-500 hover:text-black text-white border border-white/20 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-amber-500 hover:text-black text-white border border-white/20 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 🖼️ THUMBNAIL MATRIX OF ALL 11 UNSPLASH IMAGES */}
      <div>
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2 px-1">
          <span>Represented Talent Roster (11 Profiles)</span>
          <span className="text-amber-400">Click to Preview</span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {ALL_11_MODEL_IMAGES.map((model, idx) => {
            const isSelected = idx === activeIdx;
            return (
              <button
                key={model.url + idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all duration-300 group cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 shadow-[0_0_15px_rgba(212,175,55,0.4)] ring-2 ring-amber-400/50'
                    : 'border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-500'
                }`}
              >
                <img
                  src={model.url}
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-1 flex items-end">
                  <span className="text-[9px] font-bold text-white truncate leading-tight">
                    {model.name.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
