import React from 'react';
import { Metadata } from 'next';
import { generateHomeMetadata, generateHomeJsonLd } from '@/lib/metadata';
import { getHomePageData } from '@/services/home.service';
import { IntroWrapper } from '@/components/intro/IntroWrapper';
import {Hero} from '@/components/home/Hero/Hero';
import { FeaturedModels } from '@/components/home/FeaturedModels/FeaturedModels';
import { Categories } from '@/components/home/Categories/Categories';
import { WhyChooseUs } from '@/components/home/WhyChooseUs/WhyChooseUs';
import { Stats } from '@/components/home/Stats/Stats';
import { Gallery } from '@/components/home/Gallery/Gallery';
import { Testimonials } from '@/components/home/Testimonials/Testimonials';
import { CTA } from '@/components/home/CTA/CTA';

export const metadata: Metadata = generateHomeMetadata();

export default async function HomePage() {
  const homeData = await getHomePageData();
  const jsonLd = generateHomeJsonLd();

  return (
    <IntroWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#07090e] text-slate-100 selection:bg-amber-500 selection:text-black space-y-8 pb-20 overflow-hidden">
        <Hero />
        <FeaturedModels />
        {/* <Categories categories={homeData.categories} /> */}
        <Categories />
        <WhyChooseUs />
        <Stats stats={homeData.stats} />
        <Gallery items={homeData.galleryItems} />
        <Testimonials testimonials={homeData.testimonials} />
        <CTA />
      </div>
    </IntroWrapper>
  );
}