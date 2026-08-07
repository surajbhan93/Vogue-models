import { Schema, model, Document } from 'mongoose';
import { softDeletePlugin, ISoftDelete } from '../plugins/softDeletePlugin';

export interface ITestimonial extends Document, ISoftDelete {
  clientName: string;
  company?: string;
  content: string;
  avatar?: string;
  rating: number;
  isApproved: boolean;
  createdAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true },
    company: { type: String },
    content: { type: String, required: true },
    avatar: { type: String },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    isApproved: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

testimonialSchema.plugin(softDeletePlugin);

export const TestimonialModel = model<ITestimonial>('Testimonial', testimonialSchema);

export interface IGallery extends Document, ISoftDelete {
  title: string;
  imageUrl: string;
  publicId: string;
  tag?: string;
  createdAt: Date;
}

const gallerySchema = new Schema<IGallery>(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    tag: { type: String, index: true },
  },
  { timestamps: true }
);

gallerySchema.plugin(softDeletePlugin);

export const GalleryModel = model<IGallery>('Gallery', gallerySchema);

export interface IFAQ extends Document, ISoftDelete {
  question: string;
  answer: string;
  category?: string;
  sortOrder: number;
}

const faqSchema = new Schema<IFAQ>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: 'General' },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

faqSchema.plugin(softDeletePlugin);

export const FAQModel = model<IFAQ>('FAQ', faqSchema);

export interface IService extends Document, ISoftDelete {
  title: string;
  slug: string;
  description: string;
  icon?: string;
  image?: string;
  isActive: boolean;
}

const serviceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    icon: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

serviceSchema.plugin(softDeletePlugin);

export const ServiceModel = model<IService>('Service', serviceSchema);

export interface IBrand extends Document, ISoftDelete {
  name: string;
  logoUrl: string;
  website?: string;
}

const brandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
    website: { type: String },
  },
  { timestamps: true }
);

brandSchema.plugin(softDeletePlugin);

export const BrandModel = model<IBrand>('Brand', brandSchema);

export interface IReview extends Document, ISoftDelete {
  model: Schema.Types.ObjectId;
  client: Schema.Types.ObjectId;
  booking: Schema.Types.ObjectId;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    model: { type: Schema.Types.ObjectId, ref: 'ModelProfile', required: true, index: true },
    client: { type: Schema.Types.ObjectId, ref: 'ClientProfile', required: true, index: true },
    booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, unique: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

reviewSchema.plugin(softDeletePlugin);

export const ReviewModel = model<IReview>('Review', reviewSchema);
