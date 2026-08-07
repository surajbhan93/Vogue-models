export type Specialty = 'Fashion' | 'Commercial' | 'Editorial' | 'Runway' | 'Fitness' | 'Catalog';

export interface ModelRegistrationInput {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Female' | 'Male' | 'Non-Binary' | 'Other';
  height: string; // e.g. "5'11\"" or "180 cm"
  weight: string; // e.g. "125 lbs" or "57 kg"
  bust: string;   // e.g. "34\""
  waist: string;  // e.g. "24\""
  hips: string;   // e.g. "35\""
  specialties: Specialty[];
  profileImage?: FileList | string;
  portfolioImages?: FileList | string[];
}

export interface AdminLoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AdminRegisterInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  profileImage?: FileList | string;
  role: 'Super Admin' | 'Senior Booker' | 'Talent Director' | 'Scout' | 'Admin';
}

export interface ModelProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  height: string;
  weight: string;
  bust: string;
  waist: string;
  hips: string;
  specialties: Specialty[];
  profileImage?: string;
  portfolioImages?: string[];
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

export interface AdminProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  profileImage?: string;
  createdAt: string;
}

export interface Model {
  _id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  profileImage: string | null;
  coverImage: string | null;
  dateOfBirth: string;
  height: number;
  weight: number;

  measurements: {
    bust: number;
    waist: number;
    hips: number;
  };

  experience: string;
  specialties: string[];
  languages: string[];

  availability: string;
  willingToTravel: boolean;

  role: string;
  isVerified: boolean;
  status: string;

  subscription: string;

  views: number;
  likes: number;
  rating: number;

  createdAt: string;
  updatedAt: string;
}