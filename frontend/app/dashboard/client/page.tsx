'use client';

import React from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Heart, FileText, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ClientDashboardPage() {
  return (
    <div className="flex min-h-screen bg-onyx-900 text-zinc-100">
      <DashboardSidebar role="CLIENT" />

      <main className="flex-1 p-8 space-y-8 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-white">Client Portal</h1>
            <p className="text-xs text-zinc-400">Manage hire requests, bookings, and model shortlists</p>
          </div>
          <Link href="/hire-model">
            <Button variant="primary" size="sm" className="gap-2">
              <Plus className="w-4 h-4" /> New Hire Request
            </Button>
          </Link>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-2">
            <p className="text-xs text-zinc-400 flex items-center justify-between">Active Hire Requests <Calendar className="w-4 h-4 text-gold-500" /></p>
            <p className="font-serif text-3xl font-bold text-white">2</p>
          </Card>
          <Card className="space-y-2">
            <p className="text-xs text-zinc-400 flex items-center justify-between">Saved Favorites <Heart className="w-4 h-4 text-rose-500" /></p>
            <p className="font-serif text-3xl font-bold text-white">12</p>
          </Card>
          <Card className="space-y-2">
            <p className="text-xs text-zinc-400 flex items-center justify-between">Invoices Issued <FileText className="w-4 h-4 text-blue-500" /></p>
            <p className="font-serif text-3xl font-bold text-white">5</p>
          </Card>
        </div>

        {/* Hire Requests List */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-white">Recent Hire Requests</h2>
          <Card className="p-0 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400">
                <tr>
                  <th className="p-4 font-semibold">Model</th>
                  <th className="p-4 font-semibold">Booking ID</th>
                  <th className="p-4 font-semibold">Campaign</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                <tr>
                  <td className="p-4 font-medium text-white">Elena Rostova</td>
                  <td className="p-4 font-mono text-zinc-400">BK-9821</td>
                  <td className="p-4 text-zinc-300">Runway Fashion Week 2026</td>
                  <td className="p-4"><Badge variant="warning">PENDING APPROVAL</Badge></td>
                  <td className="p-4 font-semibold text-gold-400">₹2,55,000</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      </main>
    </div>
  );
}
