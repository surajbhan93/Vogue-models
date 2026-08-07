// types/home.ts
export interface ModelData {
  id: string;
  name: string;
  slug: string;
  image: string;
  gender?: string;
  location?: string;
  category?: string;
  experience?: string;
  rating?: number;
  isVerified?: boolean;
  isFeatured?: boolean;
  height?: number;
  weight?: number;
  age?: number;
}

export interface CategoryItem {
  id: string;
  title: string;
  count: string;
  image: string;
  href: string;
  description?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  album: string;
  imageUrl: string;
  date?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  highlight?: boolean;
}

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
}

export interface HomePageData {
  featuredModels: ModelData[];
  categories: CategoryItem[];
  stats: StatItem[];
  galleryItems: GalleryItem[];
  latestBlogs: BlogItem[];
  testimonials: TestimonialItem[];
}
