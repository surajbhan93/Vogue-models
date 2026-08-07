'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GalleryCard } from './GalleryCard';
import { api } from '@/lib/api';

export interface GalleryItem {
  id: string;
  title: string;
  album: string;
  imageUrl: string;
  issueDate?: string;
}

const FALLBACK_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Vogue September Haute Couture Issue',
    album: 'Magazine Cover',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Milan Fashion Week Showcase',
    album: 'Runway Showcase',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Gucci High Jewelry Campaign',
    album: 'Brand Campaign',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Elle International Beauty Editorial',
    album: 'Editorial Shoot',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
];

interface GalleryProps {
  items?: GalleryItem[];
}

export function Gallery({ items: propItems }: GalleryProps) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(
    propItems && propItems.length > 0 ? propItems : FALLBACK_ITEMS
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEditorials = async () => {
      try {
        const response = await api.get('/editorials');
        if (response.data?.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
          const formatted = response.data.data.map((item: any) => ({
            id: item._id,
            title: item.title,
            album: item.category || item.magazineName || 'Editorial',
            imageUrl: item.image,
            issueDate: item.issueDate,
          }));
          setGalleryItems(formatted);
        }
      } catch (error) {
        console.error('Failed to fetch editorials for gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEditorials();
  }, []);

  return (
    <SectionContainer className="py-2">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
        <SectionHeading
          badge="Visual Archives & Press"
          title="Recent Editorials & Runways"
          subtitle="Explore our latest magazine covers, fashion week showcases, and global brand campaigns."
        />
        <Link
          href="/gallery"
          className="mt-4 md:mt-0 text-xs uppercase tracking-widest font-bold text-amber-400 hover:text-amber-200 flex items-center space-x-1.5 transition-colors group cursor-pointer"
        >
          <span>Explore Full Gallery</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {galleryItems.slice(0, 8).map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
    </SectionContainer>
  );
}