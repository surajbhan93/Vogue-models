'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown, ArrowRight } from 'lucide-react';
import { Benefits } from './Benefits';
import { Stats } from './Stats';
import { ImageGallery } from './ImageGallery';

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden pt-6 pb-10">
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Header Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-6"
        >
          <Crown className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-semibold font-mono">
            Vogue Vibe Global Talent Scouting 2026
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Copy, Benefits & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6"
          >
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Become a Vogue Vibe <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 italic font-serif">
                Creative Talent
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed max-w-xl">
              We scout, represent, and launch the world’s next generation of iconic models, actors, singers, painters, dancers, and musicians. Partnering with top global luxury brands, film directors, and record labels.
            </p>

            {/* Benefits */}
            <Benefits />

            {/* Statistics */}
            <Stats />
          </motion.div>

          {/* Right Column: 3 Luxury Overlapping Images */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            <ImageGallery />
          </motion.div>
        </div>
      </div>
    </div>
  );
};