'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'CLIENT' | 'MODEL'>('CLIENT');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/verify-email');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <Card className="max-w-md w-full p-8 rounded-3xl space-y-6 border-zinc-800">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gold-500 mx-auto flex items-center justify-center font-serif text-black font-bold text-2xl">
            V
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">Create Vogue Account</h1>
          <p className="text-xs text-zinc-400">Join as a Brand Client or Professional Model</p>
        </div>

        <div className="flex rounded-xl bg-zinc-900 p-1 border border-zinc-800">
          <button
            type="button"
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${role === 'CLIENT' ? 'bg-gold-500 text-black' : 'text-zinc-400'}`}
            onClick={() => setRole('CLIENT')}
          >
            Hiring Client
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${role === 'MODEL' ? 'bg-gold-500 text-black' : 'text-zinc-400'}`}
            onClick={() => setRole('MODEL')}
          >
            Agency Model
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Full Name</label>
            <div className="flex items-center px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white">
              <User className="w-4 h-4 text-zinc-500 mr-2" />
              <input type="text" required placeholder="Elena Rostova" className="bg-transparent focus:outline-none w-full" />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Email Address</label>
            <div className="flex items-center px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white">
              <Mail className="w-4 h-4 text-zinc-500 mr-2" />
              <input type="email" required placeholder="elena@example.com" className="bg-transparent focus:outline-none w-full" />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Password</label>
            <div className="flex items-center px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white">
              <Lock className="w-4 h-4 text-zinc-500 mr-2" />
              <input type="password" required placeholder="••••••••" className="bg-transparent focus:outline-none w-full" />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full gap-2">
            Create Account & Verify <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="text-center text-xs text-zinc-400 border-t border-zinc-800 pt-4">
          Already registered?{' '}
          <Link href="/login" className="text-gold-400 hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
}
