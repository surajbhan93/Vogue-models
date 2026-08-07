'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, UserCheck, Calendar, DollarSign, Image, FileText, Heart, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export const DashboardSidebar = ({ role = 'MODEL' }: { role: 'ADMIN' | 'MODEL' | 'CLIENT' }) => {
  const pathname = usePathname();

  const links = {
    ADMIN: [
      { name: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
      { name: 'Model Directory', href: '/models', icon: UserCheck },
      { name: 'Services', href: '/services', icon: FileText },
    ],
    MODEL: [
      { name: 'Overview', href: '/dashboard/model', icon: LayoutDashboard },
      { name: 'Portfolio Upload', href: '/portfolio', icon: Image },
    ],
    CLIENT: [
      { name: 'Overview', href: '/dashboard/client', icon: LayoutDashboard },
      { name: 'Hire Requests', href: '/hire-model', icon: Calendar },
    ],
  }[role];

  return (
    <aside className="w-64 glass-panel min-h-screen p-6 border-r border-zinc-800 flex flex-col justify-between">
      <div className="space-y-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center font-serif text-black font-bold">V</div>
          <span className="font-serif text-lg tracking-wider text-white font-bold">{role} PORTAL</span>
        </Link>

        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gold-500/10 text-gold-400 border border-gold-500/30'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                )}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-zinc-800 space-y-2">
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </Link>
      </div>
    </aside>
  );
};
