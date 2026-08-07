'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function HireModelPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-12">
      <div className="text-center space-y-4">
        <Badge variant="gold">Client Hire Desk</Badge>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">Hire Vogue Talent</h1>
        <p className="text-zinc-400 text-sm max-w-lg mx-auto">
          Submit your event dates, campaign requirements, and location to book models for runway or print shoots.
        </p>
      </div>

      {submitted ? (
        <Card className="p-12 text-center space-y-4 border-gold-500/30">
          <CheckCircle2 className="w-16 h-16 text-gold-400 mx-auto" />
          <h2 className="font-serif text-3xl font-bold text-white">Hire Request Submitted!</h2>
          <p className="text-zinc-400 text-sm">
            Our agency booking director will contact you within 24 hours with model availability and deposit details.
          </p>
        </Card>
      ) : (
        <Card className="p-8 rounded-3xl border-zinc-800 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Company / Brand Name</label>
                <input type="text" required placeholder="Gucci / Vogue Studio" className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Contact Person Email</label>
                <input type="email" required placeholder="director@brand.com" className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Campaign Title & Project Description</label>
              <textarea rows={4} required placeholder="High fashion runway shoot for Milan Fashion Week..." className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Start Date</label>
                <input type="date" required className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">End Date</label>
                <input type="date" required className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none" />
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full gap-2">
              <Sparkles className="w-4 h-4 text-black" /> Submit Hire Request
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
