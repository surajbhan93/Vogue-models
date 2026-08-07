import { SEO_CONFIG } from '../config/seo-config';
import { ModelProfile, BlogPost, ServiceItem } from '../data/mock-db';

/**
 * Enterprise JSON-LD Schema Engine for Modeling Agency Platform
 * Compatible with Schema.org & Google Rich Results 2026 specifications.
 */

export const schemaGenerators = {
  /**
   * Organization Schema
   */
  organization() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SEO_CONFIG.domain}/#organization`,
      name: SEO_CONFIG.companyName,
      alternateName: SEO_CONFIG.siteName,
      url: SEO_CONFIG.domain,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.domain}/logo.png`,
        width: '600',
        height: '60',
      },
      image: SEO_CONFIG.defaultOgImage,
      description: SEO_CONFIG.defaultDescription,
      email: SEO_CONFIG.contact.email,
      telephone: SEO_CONFIG.contact.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SEO_CONFIG.contact.address,
        addressLocality: SEO_CONFIG.contact.city,
        addressRegion: SEO_CONFIG.contact.state,
        postalCode: SEO_CONFIG.contact.postalCode,
        addressCountry: SEO_CONFIG.contact.country,
      },
      sameAs: [
        SEO_CONFIG.social.instagram,
        SEO_CONFIG.social.linkedin,
        SEO_CONFIG.social.twitter,
        SEO_CONFIG.social.facebook,
        SEO_CONFIG.social.youtube,
      ],
    };
  },

  /**
   * WebSite Schema with SearchAction
   */
  webSite() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SEO_CONFIG.domain}/#website`,
      url: SEO_CONFIG.domain,
      name: SEO_CONFIG.siteName,
      description: SEO_CONFIG.defaultDescription,
      publisher: {
        '@id': `${SEO_CONFIG.domain}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SEO_CONFIG.domain}/models?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };
  },

  /**
   * Person / Model Profile Schema
   */
  modelProfile(model: ModelProfile) {
    const profileUrl = `${SEO_CONFIG.domain}/models/${model.slug}`;

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${profileUrl}#person`,
          name: model.name,
          gender: model.gender === 'female' ? 'Female' : 'Male',
          jobTitle: model.categoryName,
          description: model.bio,
          url: profileUrl,
          image: model.heroImage,
          height: model.height,
          workLocation: {
            '@type': 'Place',
            name: `${model.cityName}, ${model.countryName}`,
          },
          worksFor: {
            '@id': `${SEO_CONFIG.domain}/#organization`,
          },
          knowsAbout: [
            model.categoryName,
            'Fashion Runway',
            'Commercial Acting',
            'Brand Endorsements',
          ],
          hasCredential: model.isVerified
            ? {
                '@type': 'EducationalOccupationalCredential',
                credentialCategory: 'Verified Professional Model',
              }
            : undefined,
        },
        {
          '@type': 'ProfilePage',
          '@id': profileUrl,
          url: profileUrl,
          name: `${model.name} - ${model.categoryName} in ${model.cityName}`,
          mainEntity: { '@id': `${profileUrl}#person` },
          isPartOf: { '@id': `${SEO_CONFIG.domain}/#website` },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: model.heroImage,
            caption: `${model.name} ${model.categoryName} Portfolio`,
          },
        },
        // Review & Rating Schema for EEAT and Star Snippets
        {
          '@type': 'ProfessionalService',
          '@id': `${profileUrl}#service`,
          name: `${model.name} Booking & Talent Services`,
          image: model.heroImage,
          url: profileUrl,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: model.rating,
            reviewCount: model.reviewCount,
            bestRating: '5',
            worstRating: '1',
          },
          review: [
            {
              '@type': 'Review',
              author: { '@type': 'Organization', name: model.featuredForBrands[0] || 'Vogue Fashion Director' },
              datePublished: model.updatedAt,
              reviewBody: `Exceptional professionalism on set. ${model.name} delivered outstanding runway presence and camera performance.`,
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '5',
              },
            },
          ],
        },
      ],
    };
  },

  /**
   * BreadcrumbList Schema
   */
  breadcrumbs(items: { name: string; item: string }[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.item.startsWith('http') ? crumb.item : `${SEO_CONFIG.domain}${crumb.item}`,
      })),
    };
  },

  /**
   * Article Schema for Blog SEO
   */
  article(blog: BlogPost) {
    const blogUrl = `${SEO_CONFIG.domain}/blog/${blog.slug}`;
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${blogUrl}#article`,
      headline: blog.title,
      description: blog.description,
      image: [blog.heroImage],
      datePublished: blog.publishedAt,
      dateModified: blog.updatedAt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': blogUrl,
      },
      author: {
        '@type': 'Person',
        name: blog.authorName,
        jobTitle: blog.authorRole,
        image: blog.authorAvatar,
        worksFor: {
          '@id': `${SEO_CONFIG.domain}/#organization`,
        },
      },
      publisher: {
        '@id': `${SEO_CONFIG.domain}/#organization`,
      },
      keywords: blog.tags.join(', '),
      wordCount: blog.content.split(/\s+/).length,
    };
  },

  /**
   * FAQPage Schema
   */
  faqPage(faqs: { question: string; answer: string }[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  },

  /**
   * ItemList Schema (For Models listing, City Hubs, Categories)
   */
  itemList(title: string, description: string, items: { name: string; url: string; image?: string }[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: title,
      description,
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url.startsWith('http') ? item.url : `${SEO_CONFIG.domain}${item.url}`,
        image: item.image,
      })),
    };
  },

  /**
   * Service Schema
   */
  service(service: ServiceItem) {
    const serviceUrl = `${SEO_CONFIG.domain}/services/${service.slug}`;
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${serviceUrl}#service`,
      name: service.title,
      description: service.shortDesc,
      provider: {
        '@id': `${SEO_CONFIG.domain}/#organization`,
      },
      areaServed: Object.values(SEO_CONFIG.contact.country),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Modeling & Casting Services',
        itemListElement: service.features.map((feat) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: feat,
          },
        })),
      },
    };
  },
};
