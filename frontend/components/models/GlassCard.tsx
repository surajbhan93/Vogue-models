'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

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
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-3xl overflow-hidden bg-white border border-amber-300 p-6 md:p-10 
        box-border shadow-md transition-all duration-300 text-slate-900
        ${glow ? 'shadow-xl border-amber-400 ring-2 ring-amber-400/20' : 'hover:border-amber-400'} 
        ${className}`}
      {...props}
    >
      {/* Decorative luxury golden top line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-10 text-slate-900">
        {children}
      </div>
    </motion.div>
  );
};
