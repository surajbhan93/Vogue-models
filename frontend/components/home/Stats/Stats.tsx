import React from 'react';
import { StatItem } from '@/types/home';

interface StatsProps {
  stats: StatItem[];
}

export function Stats({ stats }: StatsProps) {
  return (
    <section className="border-y border-zinc-800/80 bg-zinc-950/60 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.id} className="space-y-2">
            <p
              className={`font-serif text-4xl md:text-5xl font-bold ${
                stat.highlight ? 'text-gold-400' : 'text-white'
              }`}
            >
              {stat.value}
            </p>
            <p className="text-xs text-zinc-400 uppercase tracking-[0.2em]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
