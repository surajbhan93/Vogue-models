'use client';

import React, { useEffect, useState } from 'react';

const HIGH_FASHION_IMAGES = [
  {
    url: 'https://res.cloudinary.com/ujpa9sap/image/upload/v1786090219/OG-image_crhanj.png',
    tag: 'OG EDITORIAL muses',
  },
  {
    url: 'https://res.cloudinary.com/ujpa9sap/image/upload/v1786090888/ChatGPT_Image_Aug_7_2026_01_51_03_PM_dvoszh.png',
    tag: 'HAUTE COUTURE MODELS',
  },
  {
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=2400&q=90',
    tag: 'INTERNATIONAL ACTORS & LEADS',
  },
  {
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=2400&q=90',
    tag: 'STAGE SINGERS & PERFORMERS',
  },
  {
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=2400&q=90',
    tag: 'VOGUE COVER FACES',
  },
];

export function BackgroundVideo() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % HIGH_FASHION_IMAGES.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black select-none pointer-events-none">
      {HIGH_FASHION_IMAGES.map((imgObj, index) => (
        <div
          key={imgObj.url}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentBgIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{ transitionProperty: 'opacity, transform', transitionDuration: '1000ms' }}
        >
          <img
            src={imgObj.url}
            alt={imgObj.tag}
            className="w-full h-full object-cover object-top filter brightness-[0.4] contrast-125 saturate-110"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80 pointer-events-none z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] bg-gradient-to-tr from-amber-500/20 via-amber-300/10 to-transparent rounded-full blur-[220px] animate-pulse pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(5,5,5,0.9)_100%)] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none z-10" />
    </div>
  );
}