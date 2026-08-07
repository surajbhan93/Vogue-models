import { Schema, model, Document } from 'mongoose';
import { softDeletePlugin, ISoftDelete } from '../plugins/softDeletePlugin';

export interface IBlogCategory extends Document, ISoftDelete {
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogCategorySchema = new Schema<IBlogCategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String },
  },
  { timestamps: true }
);

blogCategorySchema.plugin(softDeletePlugin);

export const BlogCategoryModel = model<IBlogCategory>('BlogCategory', blogCategorySchema);

export interface IBlog extends Document, ISoftDelete {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  category: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  isPublished: boolean;
  seoTitle?: string;
  seoDesc?: string;
  tags: string[];
  viewsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    coverImage: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'BlogCategory', required: true, index: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    isPublished: { type: Boolean, default: false, index: true },
    seoTitle: { type: String },
    seoDesc: { type: String },
    tags: [{ type: String }],
    viewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

blogSchema.plugin(softDeletePlugin);

blogSchema.index({ title: 'text', content: 'text', tags: 'text' });

export const BlogModel = model<IBlog>('Blog', blogSchema);
