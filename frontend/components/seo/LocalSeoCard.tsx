import React from 'react';
import { JsonLd } from './JsonLd';
import { buildLocalBusinessSchema, getCityBySlug } from '@/lib/seo/local-seo';

interface LocalSeoCardProps {
  citySlug: string;
  country?: 'India' | 'USA';
}

export function LocalSeoCard({ citySlug, country = 'India' }: LocalSeoCardProps) {
  const city = getCityBySlug(citySlug);
  const schema = buildLocalBusinessSchema({ citySlug, country });

  if (!city) return null;

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
      <JsonLd data={schema} />

      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-lg font-bold text-white">
          Casting Office & Local Agency Hub: {city.name} ({city.countryCode})
        </h3>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          Geotargeted Local SEO
        </span>
      </div>

      <p className="text-xs md:text-sm text-slate-300">
        Local booking office serving {city.name}, {city.state}. Verified talent pool for {city.popularFor.join(', ')}.
      </p>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-2 border-t border-slate-850">
        <div>
          <span className="block text-slate-500 uppercase font-semibold">Coordinates</span>
          <span className="text-slate-200">{city.latitude}, {city.longitude}</span>
        </div>
        <div>
          <span className="block text-slate-500 uppercase font-semibold">Specialization</span>
          <span className="text-slate-200">{city.popularFor[0]}</span>
        </div>
      </div>
    </div>
  );
}
