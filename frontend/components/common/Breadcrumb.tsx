import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-xs text-zinc-400 ${className}`}>
      <Link href="/" className="hover:text-gold-400 transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5 text-gold-400" />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-gold-400 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gold-400 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
