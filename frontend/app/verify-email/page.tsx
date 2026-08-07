'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [otp, setOtp] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Email verified successfully!');
    router.push('/dashboard/client');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <Card className="max-w-md w-full p-8 rounded-3xl space-y-6 border-zinc-800 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-400 mx-auto flex items-center justify-center">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-2xl font-bold text-white">Verify Your Email</h1>
          <p className="text-xs text-zinc-400">Enter the 6-digit OTP code sent to your registered inbox.</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="1 2 3 4 5 6"
            className="w-full text-center tracking-[0.5em] text-2xl font-mono px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-gold-400 focus:outline-none focus:border-gold-500"
          />

          <Button type="submit" variant="primary" className="w-full gap-2">
            Verify & Activate Account <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <p className="text-xs text-zinc-400">
          Didn't receive code?{' '}
          <button onClick={() => alert('Resent OTP')} className="text-gold-400 hover:underline font-semibold">
            Resend OTP
          </button>
        </p>
      </Card>
    </div>
  );
}
