'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ThemeToggleCircle = dynamic(
  () => import('./ThemeToggleCircle'),
  { ssr: false }
);

export function ClientThemeWrapper() {
  return <ThemeToggleCircle />;
}

export default ClientThemeWrapper;
