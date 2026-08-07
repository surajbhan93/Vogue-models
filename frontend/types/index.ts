export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MODEL' | 'CLIENT' | 'GUEST';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
}

export interface ModelMeasurement {
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

export interface PortfolioItem {
  url: string;
  publicId: string;
  caption?: string;
  isPrimary?: boolean;
}

export interface ModelProfile {
  _id: string;
  firstName: string;
  lastName: string;
  stageName?: string;
  gender: 'MALE' | 'FEMALE' | 'NON_BINARY' | 'OTHER';
  city: string;
  country: string;
  hourlyRate: number;
  dailyRate: number;
  profileImage?: string;
  coverImage?: string;
  measurements?: ModelMeasurement;
  portfolioImages?: PortfolioItem[];
  languages?: string[];
  skills?: string[];
  isFeatured?: boolean;
  isApproved?: boolean;
  ratingAverage?: number;
}

export interface Booking {
  _id: string;
  bookingNumber: string;
  client: any;
  model: ModelProfile;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  totalAmount: number;
  advanceAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'IN_PROGRESS' | 'REJECTED';
}
