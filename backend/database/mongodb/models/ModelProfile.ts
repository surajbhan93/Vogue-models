import { Schema, model, Document, Model } from 'mongoose';
import { softDeletePlugin, ISoftDelete } from '../plugins/softDeletePlugin';

export interface IMeasurement {
  heightCm: number;
  weightKg?: number;
  bustCm?: number;
  waistCm?: number;
  hipsCm?: number;
  shoeSize?: number;
  eyeColor?: string;
  hairColor?: string;
  skinTone?: string;
}

export interface IPortfolioMedia {
  url: string;
  publicId: string;
  caption?: string;
  isPrimary?: boolean;
  sortOrder?: number;
}

export interface IAvailabilityDate {
  date: Date;
  isBooked: boolean;
  notes?: string;
}

export interface IExperience {
  title: string;
  clientName?: string;
  year?: number;
  description?: string;
}

export interface IAward {
  title: string;
  year?: number;
  organization?: string;
}

export interface IModelProfile extends Document, ISoftDelete {
  user: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  stageName?: string;
  gender: 'MALE' | 'FEMALE' | 'NON_BINARY' | 'OTHER';
  dateOfBirth: Date;
  bio?: string;
  profileImage?: string;
  coverImage?: string;
  hourlyRate: number;
  dailyRate: number;
  experienceYears: number;
  city: string;
  country: string;
  instagramUrl?: string;
  portfolioUrl?: string;
  categories: Schema.Types.ObjectId[];
  measurements?: IMeasurement;
  portfolioImages: IPortfolioMedia[];
  portfolioVideos: IPortfolioMedia[];
  languages: string[];
  skills: string[];
  availability: IAvailabilityDate[];
  experiences: IExperience[];
  awards: IAward[];
  isFeatured: boolean;
  isApproved: boolean;
  ratingAverage: number;
  ratingCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const modelProfileSchema = new Schema<IModelProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    stageName: { type: String, trim: true },
    gender: {
      type: String,
      required: true,
      enum: ['MALE', 'FEMALE', 'NON_BINARY', 'OTHER'],
    },
    dateOfBirth: { type: Date, required: true },
    bio: { type: String },
    profileImage: { type: String },
    coverImage: { type: String },
    hourlyRate: { type: Number, required: true, min: 0 },
    dailyRate: { type: Number, required: true, min: 0 },
    experienceYears: { type: Number, default: 0, min: 0 },
    city: { type: String, required: true, index: true },
    country: { type: String, required: true, index: true },
    instagramUrl: { type: String },
    portfolioUrl: { type: String },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],

    measurements: {
      heightCm: { type: Number, required: true },
      weightKg: { type: Number },
      bustCm: { type: Number },
      waistCm: { type: Number },
      hipsCm: { type: Number },
      shoeSize: { type: Number },
      eyeColor: { type: String },
      hairColor: { type: String },
      skinTone: { type: String },
    },

    portfolioImages: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        caption: { type: String },
        isPrimary: { type: Boolean, default: false },
        sortOrder: { type: Number, default: 0 },
      },
    ],

    portfolioVideos: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        caption: { type: String },
      },
    ],

    languages: [{ type: String }],
    skills: [{ type: String }],

    availability: [
      {
        date: { type: Date, required: true },
        isBooked: { type: Boolean, default: false },
        notes: { type: String },
      },
    ],

    experiences: [
      {
        title: { type: String, required: true },
        clientName: { type: String },
        year: { type: Number },
        description: { type: String },
      },
    ],

    awards: [
      {
        title: { type: String, required: true },
        year: { type: Number },
        organization: { type: String },
      },
    ],

    isFeatured: { type: Boolean, default: false, index: true },
    isApproved: { type: Boolean, default: false, index: true },
    ratingAverage: { type: Number, default: 5.0, min: 1, max: 5 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

modelProfileSchema.plugin(softDeletePlugin);

modelProfileSchema.index({ gender: 1, isApproved: 1, isFeatured: 1 });
modelProfileSchema.index({ city: 1, country: 1 });
modelProfileSchema.index(
  {
    firstName: 'text',
    lastName: 'text',
    stageName: 'text',
    bio: 'text',
    city: 'text',
  },
  { weights: { stageName: 10, firstName: 5, lastName: 5, bio: 1, city: 2 } }
);

modelProfileSchema.virtual('fullName').get(function (this: IModelProfile) {
  return `${this.firstName} ${this.lastName}`;
});

export const ModelProfileModel = model<IModelProfile>('ModelProfile', modelProfileSchema);
