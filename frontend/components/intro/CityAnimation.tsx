'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TALENT_SEQUENCE = [
  { city: 'MILAN', code: 'MXP', country: 'ITALY', category: 'HIGH FASHION MODELS' },
  { city: 'PARIS', code: 'CDG', country: 'FRANCE', category: 'INTERNATIONAL ACTORS & LEADS' },
  { city: 'NEW YORK', code: 'JFK', country: 'UNITED STATES', category: 'STAGE SINGERS & MUSICIANS' },
  { city: 'LONDON', code: 'LHR', country: 'UNITED KINGDOM', category: 'EDITORIAL & VOGUE MUSES' },
  { city: 'TOKYO', code: 'HND', country: 'JAPAN', category: 'AVANT-GARDE TALENT' },
  { city: 'DUBAI', code: 'DXB', country: 'UNITED ARAB EMIRATES', category: 'CELEBRITY BRAND AMBASSADORS' },
];

export function CityAnimation({ currentIndex, isVisible }: { currentIndex: number; isVisible: boolean }) {
  if (!isVisible || currentIndex < 0 || currentIndex >= TALENT_SEQUENCE.length) {
    return <div className="h-20" />;
  }

  const item = TALENT_SEQUENCE[currentIndex];

  return (
    <div className="relative h-20 flex flex-col items-center justify-center overflow-hidden my-4 z-30">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.city}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-center space-y-1.5 text-center"
        >
          <div className="flex items-center space-x-3 text-amber-300 text-[10px] sm:text-[11px] uppercase tracking-[0.45em] font-bold bg-black/50 px-4 py-1 rounded-full border border-amber-500/20 backdrop-blur-md">
            <span>{item.code}</span>
            <span>•</span>
            <span>{item.country}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-[0.3em] text-white uppercase leading-none">
            {item.city}
          </h2>

          <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-amber-400 font-bold">
            ✦ {item.category} ✦
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}