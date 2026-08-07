export interface Model {
  _id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  category?: 'Model' | 'Actor' | 'Singer' | 'Painter' | 'Dancer' | 'Musician' | 'Other';
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
  languages: [];

  availability: string;
  willingToTravel: boolean;

  role: string;
  status: string;
  isVerified: boolean;

  subscription: string;

  views: number;
  likes: number;
  rating: number;

  createdAt: string;
  updatedAt: string;
}