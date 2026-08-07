'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
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
      className={`relative rounded-2xl bg-dark-card/60 backdrop-blur-xl border border-gold/20 p-6 md:p-8 
        box-border shadow-2xl transition-all duration-300
        ${glow ? 'shadow-gold-glow hover:border-gold/50' : 'hover:border-gold/40'} 
        ${className}`}
      {...props}
    >
      {/* Decorative luxury golden top line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      
      {children}
    </motion.div>
  );
};
