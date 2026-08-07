'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefitsList = [
    { title: 'International Exposure', desc: 'Direct placement in Paris, Milan, NYC, Tokyo & London' },
    { title: 'Fashion Shows', desc: 'Walk for premier Haute Couture and Fashion Week runways' },
    { title: 'Brand Campaigns', desc: 'Cover shoots and global advertisements for luxury brands' },
    { title: 'Photoshoots', desc: 'Work with world-renowned fashion photographers & stylists' },
    { title: 'Talent Development', desc: 'Personalized runway coaching, portfolio building & management' },
  ];

  return (
    <div className="space-y-4 my-6">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-gold" />
        <h3 className="text-xs uppercase tracking-widest text-gold font-semibold">
          Representation Benefits
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {benefitsList.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.02, x: 4 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-gold/30 hover:bg-gold/[0.03] transition-all duration-300 group"
          >
            <div className="p-1 rounded-full bg-gold/10 text-gold shrink-0 mt-0.5 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white group-hover:text-gold transition-colors">
                {benefit.title}
              </h4>
              <p className="text-xs text-gray-400 mt-0.5 leading-snug">
                {benefit.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
