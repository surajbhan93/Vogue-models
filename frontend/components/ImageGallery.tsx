'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ImageGallery: React.FC = () => {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
      alt: 'Vogue Model Runway Portrait',
      label: 'HAUTE COUTURE',
      className: 'w-64 h-88 sm:w-72 sm:h-96 md:w-80 md:h-[420px] z-20 shadow-2xl top-0 left-0',
      delay: 0,
      floatDuration: 6,
    },
    {
      url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
      alt: 'High Fashion Editorial Shoot',
      label: 'PARIS FASHION WEEK',
      className: 'w-56 h-76 sm:w-64 sm:h-84 md:w-72 md:h-[380px] z-30 shadow-gold-glow-lg top-12 left-24 sm:left-32 md:left-40',
      delay: 0.2,
      floatDuration: 7,
    },
    {
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      alt: 'Luxury Commercial Model',
      label: 'EDITORIAL 2026',
      className: 'w-52 h-72 sm:w-60 sm:h-80 md:w-64 md:h-[350px] z-10 shadow-2xl top-24 left-48 sm:left-64 md:left-80',
      delay: 0.4,
      floatDuration: 8,
    },
  ];

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] md:h-[550px] flex items-center justify-center select-none overflow-visible">
      {/* Background ambient gold glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-lg h-full">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: [0, -12, 0],
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.8, delay: img.delay },
              scale: { duration: 0.8, delay: img.delay },
              y: {
                repeat: Infinity,
                duration: img.floatDuration,
                ease: 'easeInOut',
                delay: img.delay,
              },
            }}
            whileHover={{
              scale: 1.06,
              zIndex: 40,
              transition: { duration: 0.3 },
            }}
            className={`absolute rounded-2xl overflow-hidden border-2 border-gold/30 group cursor-pointer ${img.className}`}
          >
            {/* Image element */}
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Dark Transparent Luxury Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

            {/* Subtle Gold Edge Border */}
            <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/60 rounded-2xl transition-colors duration-300 pointer-events-none" />

            {/* Badge overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <span className="text-[10px] uppercase font-mono tracking-widest bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-gold/30 text-gold font-semibold">
                {img.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
