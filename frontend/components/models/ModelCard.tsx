'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface ModelData {
  id: string;
  name: string;
  gender: string;
  category: string;
  location: string;
  height: string;
  weight: string;
  age: number;
  portfolioImages: string[];
  isFeatured?: boolean;
}

export function ModelCard({ model }: { model: ModelData }) {
  const coverImage = model.portfolioImages?.[0] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative glass-panel glass-panel-hover overflow-hidden flex flex-col justify-between"
    >
      {/* Photo Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-obsidian-900">
        <img
          src={coverImage}
          alt={model.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Featured Tag */}
        {model.isFeatured && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="gold">Featured</Badge>
          </div>
        )}

        {/* Category Tag */}
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="dark">{model.category}</Badge>
        </div>

        {/* Quick specs overlay on hover */}
        <div className="absolute bottom-4 left-4 right-4 text-xs space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-obsidian-950/80 p-3 backdrop-blur-md border border-gold-500/20">
          <div className="flex justify-between text-zinc-300">
            <span>Height: <strong className="text-white">{model.height}</strong></span>
            <span>Weight: <strong className="text-white">{model.weight}</strong></span>
          </div>
          <div className="flex justify-between text-zinc-300">
            <span>Gender: <strong className="text-white">{model.gender}</strong></span>
            <span>Age: <strong className="text-white">{model.age} yrs</strong></span>
          </div>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
        <div>
          <div className="flex items-center space-x-1.5 text-gold-400 text-xs tracking-wider mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{model.location}</span>
          </div>
          <h3 className="font-serif text-2xl text-white font-bold group-hover:text-gold-300 transition-colors">
            {model.name}
          </h3>
        </div>

        <Link
          href={`/models/${model.id}`}
          className="w-full inline-flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-gold-400 border-t border-gold-500/15 pt-4 group-hover:text-white transition-colors"
        >
          <span>View Comp Card</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}