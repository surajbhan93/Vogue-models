import React from 'react';
import { JsonLd } from './JsonLd';
import { buildAeoSpeakableSchema, VoiceQueryAnswer } from '@/lib/seo/aeo-engine';

interface AeoAnswerBlockProps {
  data: VoiceQueryAnswer;
  pageUrl: string;
}

export function AeoAnswerBlock({ data, pageUrl }: AeoAnswerBlockProps) {
  const speakableSchema = buildAeoSpeakableSchema(pageUrl);

  return (
    <section className="my-6 p-6 bg-slate-900/90 border border-amber-500/30 rounded-2xl shadow-xl space-y-4">
      <JsonLd data={speakableSchema} />

      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span>Direct Answer / Voice Search Summary ({data.targetRegion || 'Global'})</span>
      </div>

      <h3 className="aeo-question text-lg md:text-xl font-bold text-white tracking-tight">
        {data.question}
      </h3>

      <p className="aeo-direct-answer text-slate-200 text-sm md:text-base leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        {data.directAnswer}
      </p>

      {data.bulletPoints && data.bulletPoints.length > 0 && (
        <ul className="space-y-1.5 text-xs md:text-sm text-slate-300 pl-4 list-disc">
          {data.bulletPoints.map((pt, idx) => (
            <li key={idx}>{pt}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
