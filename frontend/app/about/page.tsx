import React from 'react';
import Link from 'next/link';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { CTASection } from '@/components/common/CTASection';
import {
  Globe,
  Award,
  ShieldCheck,
  Sparkles,
  User,
  Drama,
  Mic,
  Palette,
  Activity,
  Music,
  Trophy,
  Search,
  FileCheck,
  Handshake,
  Rocket,
  MapPin,
  Star,
} from 'lucide-react';

// -----------------------------------------------------------------------
// SEO METADATA
// -----------------------------------------------------------------------
export const metadata = generatePageMetadata({
  title: 'About Vogue Vibe Models | Global Talent Management Agency Since 2012',
  description:
    'Vogue Vibe Models is a full-spectrum talent management agency founded in 2012, representing fashion models, actors, singers, dancers, painters and musicians across Paris, Milan, London and New York. Discover our story, our scouting process and how to join our roster.',
  path: '/about',
  keywords: [
    'talent management agency',
    'modeling agency',
    'fashion model representation',
    'acting talent agency',
    'singer management',
    'dancer representation',
    'artist management agency',
    'musician booking agency',
    'Vogue Vibe Models',
    'model scouting',
    'talent contests',
    'become a model',
    'become an actor',
    'creative talent agency Paris Milan London New York',
  ],
});

// -----------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------

// Every discipline the agency represents — kept in one place so this page
// and the sidebar/nav category list never drift out of sync.
const categories = [
  {
    icon: User,
    title: 'Fashion Models',
    tagline: 'Runway, Editorial & Commercial',
    copy: `Our fashion division represents faces built for the front row and the
    lightbox alike. From haute couture runway bookings during Paris and Milan
    fashion weeks to editorial covers for the world's leading glossies and
    commercial campaigns for global apparel brands, our model agents manage
    every stage of a career: portfolio development, digital comp cards,
    market strategy across Europe and North America, and direct
    relationships with casting directors at the houses that matter. We
    represent runway specialists, editorial faces, plus-size and
    petite categories, and commercial-print talent, each guided by an agent
    who understands that segment of the market rather than a single
    generalist handling every booking.`,
  },
  {
    icon: Drama,
    title: 'Actors & Actresses',
    tagline: 'Film, TV & Cinema Casting',
    copy: `Vogue Vibe's acting division places dramatic and commercial talent
    into feature films, streaming series, television campaigns and
    theatrical productions. We work directly with casting directors across
    the film industry to secure auditions, negotiate contracts and manage
    the on-set logistics that let a performer focus purely on the work. Our
    roster spans leading and supporting roles, background and featured
    background work for those building a reel, and voice talent for
    animation, dubbing and commercial narration. Every actor we sign
    receives coaching support, self-tape review and a submission strategy
    tailored to the type of roles they're best positioned to book.`,
  },
  {
    icon: Mic,
    title: 'Singers & Vocalists',
    tagline: 'Playback, Bands & Live Performers',
    copy: `Our vocal talent division represents singers across genres — from
    playback and session vocalists working with recording studios, to
    frontline performers touring with live bands, to solo artists building
    an independent catalogue. We negotiate label showcases, festival slots,
    corporate and private event bookings, and sync placements for
    advertising and film. Vocal coaching partnerships, rehearsal space
    access and tour logistics support are part of every contract, because a
    voice is only as strong as the infrastructure behind it.`,
  },
  {
    icon: Palette,
    title: 'Painters & Artists',
    tagline: 'Fine Art, Canvas & Murals',
    copy: `Vogue Vibe's fine art division places painters, muralists and
    mixed-media artists with galleries, private collectors and brand
    commission projects. We manage exhibition calendars, negotiate
    commission and licensing terms, and connect artists with hospitality
    and retail clients seeking bespoke murals and installations. Our art
    agents come from curatorial and gallery backgrounds, which means every
    placement is judged on artistic merit first, commercial fit second —
    never the other way around.`,
  },
  {
    icon: Activity,
    title: 'Dancers & Choreographers',
    tagline: 'Classical & Contemporary',
    copy: `Our movement division represents classical, contemporary and
    commercial dancers as well as choreographers building original works
    for stage, screen and campaign. We book ensemble and principal roles
    with dance companies, choreography credits for music videos and
    advertising, and touring contracts with production houses. Physical
    conditioning support, injury-prevention resources and rehearsal
    scheduling are built into how we manage every dancer's calendar, so a
    packed booking sheet never comes at the cost of a performer's body.`,
  },
  {
    icon: Music,
    title: 'Musicians & Composers',
    tagline: 'Instrumentalists & Producers',
    copy: `Vogue Vibe represents instrumentalists, producers and composers
    scoring work for film, advertising and independent labels. We manage
    sync licensing, session bookings, live performance contracts and
    co-writing introductions, giving musicians a direct line into projects
    that need original scores or session-quality playing without the
    guesswork of cold outreach. Our composers have scored short films,
    branded content and independent features, with agents who understand
    the difference between a sync fee and a performance royalty — and
    negotiate accordingly.`,
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: 'Ethical Representation',
    copy: 'Transparent contracts, no hidden fees, and strict legal protection for every minor on our roster, chaperoned on every booking.',
  },
  {
    icon: Handshake,
    title: 'Agent-Led, Not Algorithm-Led',
    copy: 'Every booking is negotiated by a human agent who specializes in that discipline — never an automated matching system.',
  },
  {
    icon: Star,
    title: 'Craft Before Commerce',
    copy: "We turn down bookings that compromise a talent's long-term positioning, even when the short-term fee is attractive.",
  },
  {
    icon: Rocket,
    title: 'Career Development',
    copy: 'Portfolio reviews, coaching partnerships and market strategy sessions are included in representation, not sold as add-ons.',
  },
];

const offices = [
  {
    city: 'Paris',
    copy: 'Our founding office and European headquarters, coordinating haute couture runway placements and fashion week logistics.',
  },
  {
    city: 'Milan',
    copy: 'The home of our fine art and commercial print division, with direct relationships across Italian ready-to-wear houses.',
  },
  {
    city: 'London',
    copy: "Our acting and vocal talent hub, close to the UK's film, television and West End production ecosystem.",
  },
  {
    city: 'New York',
    copy: 'Our North American base for editorial bookings, commercial campaigns and sync licensing for musicians and composers.',
  },
];

const process = [
  {
    icon: Search,
    step: '01',
    title: 'Scout or Apply',
    copy: 'Talent reaches us through open contests, direct applications, or scouting at events and on social platforms.',
  },
  {
    icon: FileCheck,
    step: '02',
    title: 'Review & Portfolio Build',
    copy: 'Our agents assess market fit by discipline, then build or refine a portfolio, reel or demo suited to that category.',
  },
  {
    icon: Handshake,
    step: '03',
    title: 'Representation Agreement',
    copy: 'A transparent, discipline-specific contract is signed, with no hidden fees and clear terms on commission and exclusivity.',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Active Booking',
    copy: 'Agents submit talent for castings, auditions, exhibitions or sessions, and manage every stage through to the final booking.',
  },
];

const faqs = [
  {
    q: 'What kinds of talent does Vogue Vibe Models represent?',
    a: 'We represent six core disciplines: fashion models, actors and actresses, singers and vocalists, painters and artists, dancers and choreographers, and musicians and composers. Each discipline is managed by agents who specialize in that specific category rather than generalists covering every field.',
  },
  {
    q: 'How do I apply to become a talent with Vogue Vibe?',
    a: 'You can apply directly through our Become a Talent page, or enter one of our open contests, which run across all six categories throughout the year. Finalists are reviewed by our agents, and top placements are often offered representation on the spot.',
  },
  {
    q: 'Which cities does Vogue Vibe Models operate in?',
    a: 'We have permanent booking offices in Paris, Milan, London and New York, giving our talent direct access to European fashion weeks, Italian ready-to-wear houses, UK film and television production, and North American editorial and commercial markets.',
  },
  {
    q: 'Does Vogue Vibe represent talent under 18?',
    a: 'Yes, with strict legal protection in place. All bookings involving minors include chaperone requirements, capped working hours in line with local labor law, and contracts reviewed with a parent or guardian before signing.',
  },
  {
    q: 'How does Vogue Vibe make money from representation?',
    a: 'We work on a standard commission basis taken from booking fees once a talent is paid — there are no upfront fees, portfolio fees, or pay-to-play contest entries. If a talent is not booking work, we are not earning either.',
  },
  {
    q: 'What happens after I win or place in a Vogue Vibe contest?',
    a: "Finalists across every category are reviewed by the relevant discipline's agents. Top placements are typically offered a representation meeting within two weeks of the contest closing, with an option to sign a full management agreement.",
  },
];

// -----------------------------------------------------------------------
// SCHEMA
// -----------------------------------------------------------------------
function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

export default function AboutPage() {
  const pageSchema = generateWebPageSchema(
    'About Vogue Vibe Models',
    "Learn about Vogue Vibe Models talent management heritage across six creative disciplines, our global offices, our scouting process and how to join our roster.",
    '/about'
  );
  const faqSchema = buildFaqSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        title="REDEFINING LUXURY, BEYOND THE RUNWAY"
        subtitle="One roster, six disciplines — connecting world-class models, actors, singers, dancers, painters and musicians with the brands and productions that need them."
        badge="REPRESENTING GLOBAL ELEGANCE SINCE 2012"
        breadcrumbs={[{ label: 'About Us' }]}
      />

      <PageContainer>
        {/* ---------------------------------------------------------- */}
        {/* ORIGIN STORY                                                */}
        {/* ---------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <SectionTitle
              badge="THE VOGUE VIBE STANDARD"
              title="One Agency, Every Stage"
              subtitle="We bridge the gap between world-renowned brands, productions and extraordinary talent across every creative discipline."
            />
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              Vogue Vibe Models began in 2012 as a single booking desk in Paris,
              built on a simple observation: the most interesting creative
              projects rarely need just one kind of talent. A single campaign
              might call for a model, a composer for its score, and a dancer
              for its launch event — yet most agencies at the time forced
              brands to coordinate three separate bookers across three
              separate contracts. We set out to fix that by building one
              agency that could represent every discipline a creative brief
              might require, without diluting the specialist expertise each
              one demands.
            </p>
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
              Fourteen years later, that founding idea has grown into a
              full-spectrum talent house with permanent offices in Paris,
              Milan, London and New York. Where most agencies stop at the
              runway, our roster spans fashion, film, music, dance and fine
              art, each division led by agents who have spent their careers
              inside that specific industry rather than generalists rotating
              across categories. A model is booked by someone who has spent a
              decade inside fashion week logistics. An actor is submitted by
              someone who has read casting briefs for a living. That
              specialization, held together under one roof, is what our
              clients and our talent both rely on.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
              <Globe className="w-8 h-8 text-gold-400" />
              <h3 className="font-serif text-2xl font-bold text-white">4 Capitals</h3>
              <p className="text-xs text-zinc-400">Paris, Milan, London & New York offices.</p>
            </div>
            <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
              <Sparkles className="w-8 h-8 text-gold-400" />
              <h3 className="font-serif text-2xl font-bold text-white">6 Disciplines</h3>
              <p className="text-xs text-zinc-400">One roster spanning every creative category.</p>
            </div>
            <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
              <Award className="w-8 h-8 text-gold-400" />
              <h3 className="font-serif text-2xl font-bold text-white">120+ Covers</h3>
              <p className="text-xs text-zinc-400">Vogue, Elle & Bazaar covers worldwide.</p>
            </div>
            <div className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3">
              <ShieldCheck className="w-8 h-8 text-gold-400" />
              <h3 className="font-serif text-2xl font-bold text-white">Ethical Standards</h3>
              <p className="text-xs text-zinc-400">Strict legal protection for young talent.</p>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* VALUES                                                      */}
        {/* ---------------------------------------------------------- */}
        <div className="mt-24">
          <SectionTitle
            badge="WHAT WE STAND FOR"
            title="Our Values"
            subtitle="Four principles that shape every contract we write and every booking we accept, regardless of discipline."
          
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {values.map(({ icon: Icon, title, copy }) => (
              <div
                key={title}
                className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3"
              >
                <Icon className="w-7 h-7 text-gold-400" />
                <h3 className="font-serif text-lg font-bold text-white">{title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* CATEGORY GRID — mirrors the Explore Categories nav          */}
        {/* ---------------------------------------------------------- */}
        <div className="mt-24">
          <SectionTitle
            badge="EXPLORE CATEGORIES"
            title="Talent We Represent"
            subtitle="Every category on our roster is scouted, trained and booked by agents who specialize in that craft."
            
          />
          <div className="grid grid-cols-1 gap-8 mt-10">
            {categories.map(({ icon: Icon, title, tagline, copy }) => (
              <div
                key={title}
                className="glass-panel border border-gold-500/20 rounded-md p-8 md:p-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start"
              >
                <div className="w-14 h-14 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
                  <Icon className="w-7 h-7 text-gold-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                    {tagline}
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-white">{title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-3xl">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* GLOBAL OFFICES                                              */}
        {/* ---------------------------------------------------------- */}
        <div className="mt-24">
          <SectionTitle
            badge="WHERE WE OPERATE"
            title="Four Cities, One Roster"
            subtitle="Permanent booking offices mean our talent is never negotiating a market from the outside."
           
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {offices.map(({ city, copy }) => (
              <div
                key={city}
                className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3"
              >
                <MapPin className="w-7 h-7 text-gold-400" />
                <h3 className="font-serif text-lg font-bold text-white">{city}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* HOW WE WORK / PROCESS                                       */}
        {/* ---------------------------------------------------------- */}
        <div className="mt-24">
          <SectionTitle
            badge="HOW REPRESENTATION WORKS"
            title="From Discovery to Booking"
            subtitle="The same four-step process applies whether you're a model, a painter, or a composer."
            
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {process.map(({ icon: Icon, step, title, copy }) => (
              <div
                key={step}
                className="glass-panel p-6 border border-gold-500/20 rounded-md space-y-3"
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-7 h-7 text-gold-400" />
                  <span className="font-serif text-2xl text-gold-500/40 font-bold">{step}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white">{title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* CONTESTS — called out separately, it's a live program       */}
        {/* ---------------------------------------------------------- */}
        <div className="mt-24 glass-panel border border-gold-500/20 rounded-md p-10 md:p-14 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-start">
          <div className="w-14 h-14 rounded-full border border-gold-500/40 flex items-center justify-center shrink-0">
            <Trophy className="w-7 h-7 text-gold-400" />
          </div>
          <div className="space-y-4">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">
              Contests — Our Scouting Front Door
            </h3>
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base max-w-2xl">
              Alongside direct scouting, Vogue Vibe runs open contests across all
              six categories — model search, vocal auditions, dance battles,
              screen tests, art showcases and composer challenges. Entry is
              free, judging panels are drawn from our own discipline-specific
              agents, and finalists are reviewed within two weeks of a
              contest closing. Top placements are routinely offered
              representation contracts on the spot, which makes contests the
              fastest, most direct route onto our roster for new talent who
              don't yet have an industry contact.
            </p>
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base max-w-2xl">
              Past contest winners have gone on to walk in Paris and Milan
              fashion weeks, book supporting film roles, release singles
              under our vocal division, exhibit in gallery group shows, and
              score independent short films — proof that a contest placement
              is a genuine career entry point, not a marketing exercise.
            </p>
            <Link
              href="/contests"
              className="inline-block text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
            >
              View Open Contests →
            </Link>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* FAQ — strong for SEO + featured snippets                    */}
        {/* ---------------------------------------------------------- */}
        <div className="mt-24">
          <SectionTitle
            badge="COMMON QUESTIONS"
            title="Frequently Asked Questions"
            subtitle="Everything talent and clients most often ask before reaching out."
          
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-4">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="glass-panel border border-gold-500/20 rounded-md p-6 group"
              >
                <summary className="font-serif text-base md:text-lg font-bold text-white cursor-pointer list-none flex items-center justify-between gap-4">
                  {q}
                  <span className="text-gold-400 text-xl leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-zinc-400 text-sm leading-relaxed mt-3">{a}</p>
              </details>
            ))}
          </div>
        </div>

        <CTASection
          title="Work With Vogue Vibe"
          description="Whether you're a casting director booking across disciplines or an aspiring talent ready to be discovered, partner with an agency built for every stage."
          primaryButtonText="Explore Roster"
          primaryButtonHref="/hire-a-talent"
          secondaryButtonText="Apply for Scouting"
          secondaryButtonHref="/become-a-talent"
        />
      </PageContainer>
    </>
  );
}