import React from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}

export function EmptyState({
  title = 'No Items Found',
  description = 'There are currently no items to display matching your criteria.',
  actionText,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="glass-panel border border-gold-500/20 p-12 text-center rounded-lg space-y-4 max-w-md mx-auto my-12">
      <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-400">
        <Camera className="w-6 h-6" />
      </div>
      <h3 className="font-serif text-xl font-bold text-white">{title}</h3>
      <p className="text-zinc-400 text-xs leading-relaxed">{description}</p>
      {actionText && actionHref && (
        <div className="pt-2">
          <Link href={actionHref}>
            <Button variant="primary" size="sm">
              {actionText}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
