import { Schema, model, Document } from 'mongoose';
import { softDeletePlugin, ISoftDelete } from '../plugins/softDeletePlugin';

export interface IClientProfile extends Document, ISoftDelete {
  user: Schema.Types.ObjectId;
  companyName: string;
  contactName: string;
  website?: string;
  companyType?: string;
  address?: string;
  city?: string;
  country?: string;
  avatar?: string;
  taxId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const clientProfileSchema = new Schema<IClientProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    companyName: { type: String, required: true, trim: true },
    contactName: { type: String, required: true, trim: true },
    website: { type: String },
    companyType: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    avatar: { type: String },
    taxId: { type: String },
  },
  { timestamps: true }
);

clientProfileSchema.plugin(softDeletePlugin);

export const ClientProfileModel = model<IClientProfile>('ClientProfile', clientProfileSchema);

export interface ICategory extends Document, ISoftDelete {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

categorySchema.plugin(softDeletePlugin);

export const CategoryModel = model<ICategory>('Category', categorySchema);
