import React from 'react';
import Link from 'next/link';
import { JsonLd } from './JsonLd';
import { masterSchemaGenerators } from '@/lib/seo/schema-builder';

export interface CrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbSeoProps {
  items: CrumbItem[];
}

export function BreadcrumbSeo({ items }: BreadcrumbSeoProps) {
  const fullItems: CrumbItem[] = [{ name: 'Home', item: '/' }, ...items];
  const schema = masterSchemaGenerators.breadcrumbs(fullItems);

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="py-3 text-xs md:text-sm text-slate-400">
        <ol className="flex flex-wrap items-center space-x-2">
          {fullItems.map((crumb, idx) => {
            const isLast = idx === fullItems.length - 1;
            return (
              <li key={crumb.item} className="inline-flex items-center">
                {idx > 0 && <span className="mx-2 text-slate-600">/</span>}
                {isLast ? (
                  <span className="font-semibold text-amber-400" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.item} className="hover:text-white transition-colors">
                    {crumb.name}
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
