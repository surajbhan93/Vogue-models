import React from 'react';
import { Star } from 'lucide-react';
import { TestimonialItem } from '@/types/home';

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const currentTestimonial = testimonials[0];

  if (!currentTestimonial) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 text-center space-y-8">
      <div className="flex justify-center space-x-1 text-gold-400">
        {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-gold-400" />
        ))}
      </div>

      <blockquote className="font-serif text-2xl md:text-4xl italic text-zinc-200 leading-relaxed max-w-4xl mx-auto">
        &ldquo;{currentTestimonial.quote}&rdquo;
      </blockquote>

      <div>
        <h4 className="text-sm font-bold text-gold-400 uppercase tracking-widest">
          {currentTestimonial.author}
        </h4>
        <p className="text-xs text-zinc-400 uppercase tracking-wider">
          {currentTestimonial.role}, {currentTestimonial.company}
        </p>
      </div>
    </section>
  );
}
