'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 🔹 Check if current page is inside Dashboard or Admin
  const isDashboardRoute =
    pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin');

  return (
    <>
      {/* 🔹 Main Page Content */}
      <main className="flex-1">{children}</main>

      {/* 🔹 Render Footer ONLY on Public Pages */}
      {!isDashboardRoute && <Footer />}
    </>
  );
}

export default LayoutWrapper;