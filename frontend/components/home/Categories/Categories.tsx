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

// 🔹 PREMIER TALENT CATEGORIES WITH SUPPLIED UNSPLASH IMAGES
const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'model',
    title: 'Fashion Models',
    subtitle: 'Runway & High Fashion',
    count: 'Loading...',
    href: '/models?category=Model&division=fashion-runway&roster=verified-models',
    image: 'https://images.unsplash.com/photo-1598815000898-7d8cd4dc90f1?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'actor',
    title: 'Actors & Actresses',
    subtitle: 'Cinema, TV & Theatre',
    count: 'Loading...',
    href: '/actors?category=Actor&division=cinema-theatre&casting=active-roster',
    image: 'https://images.unsplash.com/photo-1659095012554-e4cc81fc04c0?w=1000&auto=format&fit=crop&q=80',
  },
  {
    id: 'dancer',
    title: 'Dancers & Performers',
    subtitle: 'Stage & Contemporary',
    count: 'Loading...',
    href: '/dancers?category=Dancer&division=choreo-performance&stage=classical-modern',
    image: 'https://images.unsplash.com/photo-1495791185843-c73f2269f669?w=1000&auto=format&fit=crop&q=80',
  },
  {
    id: 'musician',
    title: 'Musicians & Bands',
    subtitle: 'Instruments & Composition',
    count: 'Loading...',
    href: '/musicians?category=Musician&division=instruments-studio&gigs=live-session',
    image: 'https://images.unsplash.com/photo-1545224144-b38cd309ef69?w=1000&auto=format&fit=crop&q=80',
  },
  {
    id: 'singer',
    title: 'Singers & Vocalists',
    subtitle: 'Playback & Live Artists',
    count: 'Loading...',
    href: '/singers?category=Singer&division=vocalists-playback&type=live-performers',
    image: 'https://images.unsplash.com/photo-1595422656857-ced3a4a0ce25?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'painter',
    title: 'Painters & Artists',
    subtitle: 'Fine Art & Canvas',
    count: 'Loading...',
    href: '/painters?category=Painter&division=visual-fine-art&exhibition=featured-artists',
    image: 'https://images.unsplash.com/photo-1541753866388-0b3c701627d3?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
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
              count: `${countValue > 0 ? `${countValue}+` : 'Active'} Roster`,
            };
          })
        );
      } catch (error) {
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

  return (
    <SectionContainer className="py-12 md:py-16 relative">
      <SectionHeading
        badge="Specialized Scouting Roster"
        title="Agency Divisions"
        subtitle="Tailored representation across premier high-fashion, cinema, vocal arts, visual arts, and performance divisions."
        align="center"
        className="mb-10 md:mb-14"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {categoriesList.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </SectionContainer>
  );
}

export default Categories;