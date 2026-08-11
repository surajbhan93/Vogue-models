'use client';

import React from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  bgImage?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = false,
  bgImage = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1600&auto=format&fit=crop',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-3xl overflow-hidden bg-zinc-950/85 backdrop-blur-2xl border border-amber-500/40 p-6 md:p-10 
        box-border shadow-[0_0_60px_rgba(0,0,0,0.95)] transition-all duration-300
        ${glow ? 'shadow-[0_0_50px_rgba(212,175,55,0.3)] hover:border-amber-400/70' : 'hover:border-amber-400/50'} 
        ${className}`}
      {...props}
    >
      {/* 🌟 VIVID & CLEAR EDITORIAL BACKGROUND IMAGE OVERLAY */}
      {bgImage && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={bgImage}
              src={bgImage}
              alt="Editorial Background"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 0.45, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full object-cover object-top filter brightness-90 contrast-[1.15] saturate-[0.85]"
            />
          </AnimatePresence>
          {/* Dark luxury gradient mask for perfect text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/85 via-zinc-950/80 to-zinc-950/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl" />
        </div>
      )}

      {/* Decorative luxury golden top line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
