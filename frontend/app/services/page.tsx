import React from 'react';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { CTASection } from '@/components/common/CTASection';
import { Sparkles, Globe, Shield, Star, Camera, Award } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Agency Services & Global Talent Representation',
  description: 'Full-spectrum talent management services including haute couture runway booking, global brand ambassadorships, editorial placement, and legal representation.',
  path: '/services',
});

const SERVICES_LIST = [
  {
    icon: Sparkles,
    title: 'Haute Couture & Runway Booking',
    description: 'Securing prime positions for Paris, Milan, London, and New York fashion week runways.',
  },
  {
    icon: Camera,
    title: 'Editorial & Cover Representation',
    description: 'Strategic placement on cover stories for Vogue, Harper’s Bazaar, Elle, and GQ.',
  },
  {
    icon: Globe,
    title: 'Global Commercial Campaigns',
    description: 'Connecting top talent with luxury cosmetics, fragrance, and jewelry endorsements.',
  },
  {
    icon: Shield,
    title: 'Career & Legal Development',
    description: 'Transparent contract negotiations, intellectual property usage protection, and health welfare standards.',
  },
  {
    icon: Star,
    title: 'New Face Development',
    description: 'Polishing raw talent with international test shoots, runway walking coaching, and comp card design.',
  },
  {
    icon: Award,
    title: 'Concierge Travel & Logistics',
    description: 'Full-scale travel planning, visa facilitation, chaperones, and luxury lodging coordination.',
  },
];

export default function ServicesPage() {
  const schema = generateWebPageSchema('Agency Services', 'AURA Couture management services.', '/services');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        title="REPRESENTATION & BRAND SERVICES"
        subtitle="End-to-end talent placement and campaign management for haute couture houses and global luxury labels."
        badge="AGENCY DIVISIONS"
        breadcrumbs={[{ label: 'Services' }]}
      />

      <PageContainer>
        <SectionTitle
          badge="OUR EXPERTISE"
          title="Bespoke Management & Booking Solutions"
          subtitle="Discover how AURA Couture elevates talent and powers world-class fashion campaigns."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div key={idx} className="glass-panel border border-gold-500/20 p-8 rounded-lg space-y-4 hover:border-gold-500/50 transition-all">
                <div className="w-12 h-12 rounded bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">{srv.title}</h3>
                <p className="text-xs text-zinc-300 font-light leading-relaxed">{srv.description}</p>
              </div>
            );
          })}
        </div>

        <CTASection
          title="Partner With AURA Couture"
          description="Inquire about custom casting calls or book model options for your upcoming fashion show."
          primaryButtonText="Hire a Model"
          primaryButtonHref="/hire-a-model"
          secondaryButtonText="Contact Booking Desk"
          secondaryButtonHref="/contact"
        />
      </PageContainer>
    </>
  );
}
