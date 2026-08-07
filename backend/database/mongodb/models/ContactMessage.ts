import { Schema, model, Document } from 'mongoose';
import { softDeletePlugin, ISoftDelete } from '../plugins/softDeletePlugin';

export interface IContactMessage extends Document, ISoftDelete {
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  replied: boolean;
  createdAt: Date;
}

const contactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, index: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false, index: true },
    replied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

contactMessageSchema.plugin(softDeletePlugin);

export const ContactMessageModel = model<IContactMessage>('ContactMessage', contactMessageSchema);

export interface INewsletterSubscriber extends Document, ISoftDelete {
  email: string;
  isActive: boolean;
  createdAt: Date;
}

const newsletterSubscriberSchema = new Schema<INewsletterSubscriber>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

newsletterSubscriberSchema.plugin(softDeletePlugin);

export const NewsletterSubscriberModel = model<INewsletterSubscriber>(
  'NewsletterSubscriber',
  newsletterSubscriberSchema
);

export interface IHomepageCMS extends Document {
  heroTitle: string;
  heroSubtitle: string;
  heroBannerImages: string[];
  featuredCategories: Schema.Types.ObjectId[];
  statsSection: {
    modelsCount: number;
    clientsCount: number;
    eventsCount: number;
    countriesCount: number;
  };
  updatedAt: Date;
}

const homepageCMSSchema = new Schema<IHomepageCMS>(
  {
    heroTitle: { type: String, required: true },
    heroSubtitle: { type: String, required: true },
    heroBannerImages: [{ type: String }],
    featuredCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    statsSection: {
      modelsCount: { type: Number, default: 500 },
      clientsCount: { type: Number, default: 200 },
      eventsCount: { type: Number, default: 1500 },
      countriesCount: { type: Number, default: 35 },
    },
  },
  { timestamps: true }
);

export const HomepageCMSModel = model<IHomepageCMS>('HomepageCMS', homepageCMSSchema);

export interface ISEO extends Document {
  pageRoute: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

const seoSchema = new Schema<ISEO>(
  {
    pageRoute: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: [{ type: String }],
    ogImage: { type: String },
    canonicalUrl: { type: String },
  },
  { timestamps: true }
);

export const SEOModel = model<ISEO>('SEO', seoSchema);

export interface ISystemSetting extends Document {
  key: string;
  value: string;
  description?: string;
}

const systemSettingSchema = new Schema<ISystemSetting>(
  {
    key: { type: String, required: true, unique: true, index: true },
    value: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const SystemSettingModel = model<ISystemSetting>('SystemSetting', systemSettingSchema);
