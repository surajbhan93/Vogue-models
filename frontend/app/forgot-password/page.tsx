'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <Card className="max-w-md w-full p-8 rounded-3xl space-y-6 border-zinc-800 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-400 mx-auto flex items-center justify-center">
          <KeyRound className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-2xl font-bold text-white">Reset Password</h1>
          <p className="text-xs text-zinc-400">Enter your email to receive password reset instructions.</p>
        </div>

        {submitted ? (
          <div className="space-y-4">
            <p className="text-xs text-emerald-400 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/30">
              Reset link and OTP sent to your email address!
            </p>
            <Link href="/login">
              <Button variant="outline" className="w-full">Return to Sign In</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Account Email</label>
              <div className="flex items-center px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white">
                <Mail className="w-4 h-4 text-zinc-500 mr-2" />
                <input type="email" required placeholder="admin@vogueagency.com" className="bg-transparent focus:outline-none w-full" />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full gap-2">
              Send Reset Instructions <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
