'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { JsonLd } from './JsonLd';
import { schemaGenerators } from '@/lib/seo/schema';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  title?: string;
  items: FAQItem[];
}

export function FAQAccordion({ title = 'Frequently Asked Questions', items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqSchema = schemaGenerators.faqPage(items);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="my-10 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
      <JsonLd data={faqSchema} />
      <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">{title}</h2>
      <div className="space-y-4">
        {items.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/50 transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-medium text-white hover:text-gold-400 transition-colors focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="pr-4 text-base md:text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gold-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-slate-300 text-sm md:text-base leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
