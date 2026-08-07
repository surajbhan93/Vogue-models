'use client';

import React, { useEffect, useState } from 'react';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CategoryCard } from './CategoryCard';
import { api } from '@/lib/api';

export interface CategoryItem {
  id: string;
  title: string;
  subtitle?: string;
  count: string;
  href: string;
  image: string;
}

// 🔹 Enterprise Corporate Query-Param Links
const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'model',
    title: 'Fashion Models',
    subtitle: 'Runway & High Fashion',
    count: 'Loading...',
    href: '/models?category=Model&division=fashion-runway&roster=verified-models',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'actor',
    title: 'Actors & Actresses',
    subtitle: 'Cinema, TV & Theatre',
    count: 'Loading...',
    href: '/actors?category=Actor&division=cinema-theatre&casting=active-roster',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'singer',
    title: 'Singers & Vocalists',
    subtitle: 'Playback & Live Performers',
    count: 'Loading...',
    href: '/singers?category=Singer&division=vocalists-playback&type=live-performers',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painter',
    title: 'Painters & Artists',
    subtitle: 'Fine Art & Canvas',
    count: 'Loading...',
    href: '/painters?category=Painter&division=visual-fine-art&exhibition=featured-artists',
    image: 'https://images.unsplash.com/photo-1541753866388-0b3c701627d3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'dancer',
    title: 'Dancers & Performers',
    subtitle: 'Classical & Modern',
    count: 'Loading...',
    href: '/dancers?category=Dancer&division=choreo-performance&stage=classical-modern',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'musician',
    title: 'Musicians & Bands',
    subtitle: 'Instruments & Studio',
    count: 'Loading...',
    href: '/musicians?category=Musician&division=instruments-studio&gigs=live-session',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  },
];

interface CategoriesProps {
  categories?: CategoryItem[];
}

export function Categories({ categories: propCategories }: CategoriesProps) {
  const [categoriesList, setCategoriesList] = useState<CategoryItem[]>(
    propCategories && propCategories.length > 0 ? propCategories : INITIAL_CATEGORIES
  );

  // 🔹 API Call to fetch real category stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/models/stats');
        const stats = response.data?.stats?.categories || {};

        setCategoriesList((prev) =>
          prev.map((cat) => {
            const countValue = stats[cat.id.toLowerCase()] || 0;
            return {
              ...cat,
              count: `${countValue > 0 ? `${countValue}+` : 'Active'} Roster Talents`,
            };
          })
        );
      } catch (error) {
        console.error('Failed to fetch category stats:', error);
        setCategoriesList((prev) =>
          prev.map((cat) => ({
            ...cat,
            count: 'Verified Roster',
          }))
        );
      }
    };

    fetchStats();
  }, []);
console.log("propCategories", propCategories);
console.log("INITIAL_CATEGORIES", INITIAL_CATEGORIES.length);
  return (
    <SectionContainer className="py-16 relative">
      <SectionHeading
        badge="Specialized Scouting Roster"
        title="Agency Divisions"
        subtitle="Tailored representation across premier high-fashion, cinema, vocal arts, visual arts, and performance divisions."
        align="center"
        className="mb-16"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoriesList.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      <p>Total Categories: {categoriesList.length}</p>
    </SectionContainer>
  );
}