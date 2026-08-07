import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { JsonLd } from './JsonLd';
import { schemaGenerators } from '@/lib/seo/schema';

export interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const fullItems: BreadcrumbItem[] = [{ name: 'Home', item: '/' }, ...items];
  const breadcrumbSchema = schemaGenerators.breadcrumbs(fullItems);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className="py-3 text-sm text-gray-400">
        <ol className="flex flex-wrap items-center space-x-2">
          {fullItems.map((crumb, idx) => {
            const isLast = idx === fullItems.length - 1;
            return (
              <li key={crumb.item} className="inline-flex items-center">
                {idx > 0 && <ChevronRight className="w-4 h-4 mx-1.5 text-gray-500" />}
                {isLast ? (
                  <span className="font-medium text-gold-400" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.item}
                    className="inline-flex items-center hover:text-white transition-colors"
                  >
                    {idx === 0 && <Home className="w-3.5 h-3.5 mr-1" />}
                    <span>{crumb.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
