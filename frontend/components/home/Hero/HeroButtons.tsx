'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HeroButtonsProps {
  primaryText: string;
  primaryHref: string;
  secondaryText: string;
  secondaryHref: string;
}

export function HeroButtons({
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
}: HeroButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
      <Link href={primaryHref} className="w-full sm:w-auto">
        <Button variant="primary" size="lg" className="w-full sm:w-auto">
          {primaryText}
        </Button>
      </Link>
      <Link href={secondaryHref} className="w-full sm:w-auto">
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          {secondaryText}
        </Button>
      </Link>
    </div>
  );
}

export default HeroButtons;
