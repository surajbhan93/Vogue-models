'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Globe } from 'lucide-react';

export const Stats: React.FC = () => {
  const statsData = [
    {
      number: '3000+',
      label: 'Models Represented',
      subtext: 'Global high fashion talent roster',
      icon: Users,
    },
    {
      number: '120+',
      label: 'Luxury Brands',
      subtext: 'Campaigns with Vogue, Chanel, Gucci',
      icon: Award,
    },
    {
      number: '20+',
      label: 'Countries',
      subtext: 'Paris, Milan, NYC, Tokyo & London',
      icon: Globe,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
      {statsData.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
            className="flex flex-col space-y-1 group"
          >
            <div className="flex items-center gap-1.5 text-gold mb-0.5">
              <IconComponent className="w-4 h-4 opacity-80 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-serif-luxury text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-gold transition-colors">
                {stat.number}
              </span>
            </div>
            <p className="text-xs font-semibold text-gray-200 uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="text-[11px] text-gray-400 leading-tight hidden md:block">
              {stat.subtext}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Stats;
