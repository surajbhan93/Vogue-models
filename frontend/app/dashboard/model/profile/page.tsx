'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Eye,
  Heart,
  Star,
  Crown,
  Edit3,
  Camera,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Globe,
  User,
  Ruler,
  Weight,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface Measurements {
  bust?: number;
  waist?: number;
  hips?: number;
}

interface SocialMedia {
  instagram?: string;
  twitter?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
}

interface Model {
  _id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  category?: string;
  profileImage: string | null;
  coverImage: string | null;
  bio?: string;
  dateOfBirth: string;
  height?: number;
  weight?: number;
  measurements?: Measurements;
  hairColor?: string;
  eyeColor?: string;
  experience: string;
  specialties: string[];
  languages: string[];
  socialMedia?: SocialMedia;
  availability: string;
  preferredLocation?: {
    city?: string;
    state?: string;
    country?: string;
  };
  willingToTravel: boolean;
  role: string;
  status: string;
  isVerified: boolean;
  subscription: string;
  views: number;
  likes: number;
  rating: number;
  lastLogin?: string;
  createdAt: string;
}

export default function ModelProfileDashboard() {
  const [model, setModel] = useState<Model | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError('');

      let response;
      try {
        response = await api.get('/models/profile/me');
      } catch (err: any) {
        if (err.response?.status === 404) {
          response = await api.get('/api/models/profile/me');
        } else {
          throw err;
        }
      }

      if (response.data?.success || response.data?.model) {
        setModel(response.data.model || response.data.data);
      } else {
        setError('Failed to load profile');
      }
    } catch (err: any) {
      console.error('Profile error:', err);
      setError(err.response?.data?.message || 'Failed to load profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const formatDate = (date: string) => {
    if (!date) return 'N/A';
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'N/A';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center p-6 text-center">
        <div className="space-y-3">
          <Sparkles className="w-10 h-10 text-amber-400 animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-400">Loading profile details...</p>
        </div>
      </div>
    );
  }

  if (error || !model) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center p-4 text-center">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">Profile Error</h2>
          <p className="text-xs text-slate-400">{error || 'No profile data found.'}</p>
          <button
            onClick={loadProfile}
            className="w-full py-3 bg-amber-500 text-black font-bold text-xs rounded-xl shadow-lg hover:bg-amber-400 transition"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-7xl mx-auto selection:bg-amber-500 selection:text-black">
      {/* 🔹 Responsive Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-tight">
            {model.category || 'Talent'} Profile
          </h1>
          <p className="text-xs text-slate-400 mt-1">Welcome back, {model.name}!</p>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
          <Link
            href="/dashboard/model/edit-profile"
            className="flex-1 sm:flex-none text-center px-4 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-bold text-slate-200 transition"
          >
            ✏️ Edit Profile
          </Link>
          <Link
            href="/dashboard/model/PortfolioPage"
            className="flex-1 sm:flex-none text-center px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-bold transition shadow-lg shadow-amber-500/20"
          >
            📸 Portfolio
          </Link>
        </div>
      </div>

      {/* 🔹 Stats Cards (2 cols on Mobile, 4 on Desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Views</span>
            <Eye className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif font-extrabold text-white">{model.views || 0}</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Likes</span>
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400/20" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif font-extrabold text-white">{model.likes || 0}</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Rating</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif font-extrabold text-white">{model.rating || 5}/5</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Subscription</span>
            <Crown className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xl sm:text-2xl font-serif font-extrabold text-amber-400 capitalize truncate">
            {model.subscription || 'Free'}
          </p>
        </div>
      </div>

      {/* 🔹 Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 text-center space-y-4 shadow-xl">
            {/* Profile Avatar */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto">
              {model.profileImage ? (
                <img
                  src={model.profileImage}
                  alt={model.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-amber-500/40 shadow-xl"
                />
              ) : (
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 flex items-center justify-center text-black font-extrabold text-3xl border-4 border-amber-500/40 shadow-xl">
                  {model.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-1.5">
                <span>{model.name}</span>
                {model.isVerified && <ShieldCheck className="w-4 h-4 text-blue-400" />}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">{model.email}</p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {model.category || 'Talent'}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 capitalize">
                {model.status || 'Active'}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 font-mono">
              Joined {formatDate(model.createdAt)}
            </p>

            {model.bio && (
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
                <p className="text-xs text-slate-300 leading-relaxed font-light">{model.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Detailed Attribute Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center justify-between border-b border-slate-800 pb-3">
              <span>📋 Personal Contact Details</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">Private</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">Full Name</span>
                <span className="font-semibold text-white">{model.name}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">Email</span>
                <span className="font-semibold text-amber-300 truncate max-w-[150px]">{model.email}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">Phone</span>
                <span className="font-semibold text-white">{model.phone}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">Gender</span>
                <span className="font-semibold text-white">{model.gender}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">Date of Birth</span>
                <span className="font-semibold text-white">{formatDate(model.dateOfBirth)}</span>
              </div>
            </div>
          </div>

          {/* Physical Attributes */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              📏 Physical Statistics
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <p className="text-[11px] text-slate-400">Height</p>
                <p className="text-base font-bold text-white mt-1">{model.height ? `${model.height} cm` : 'N/A'}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <p className="text-[11px] text-slate-400">Weight</p>
                <p className="text-base font-bold text-white mt-1">{model.weight ? `${model.weight} kg` : 'N/A'}</p>
              </div>
              {model.measurements?.bust && (
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <p className="text-[11px] text-slate-400">Bust</p>
                  <p className="text-base font-bold text-white mt-1">{model.measurements.bust} cm</p>
                </div>
              )}
              {model.measurements?.waist && (
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <p className="text-[11px] text-slate-400">Waist</p>
                  <p className="text-base font-bold text-white mt-1">{model.measurements.waist} cm</p>
                </div>
              )}
              {model.measurements?.hips && (
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <p className="text-[11px] text-slate-400">Hips</p>
                  <p className="text-base font-bold text-white mt-1">{model.measurements.hips} cm</p>
                </div>
              )}
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              💼 Professional &amp; Experience Details
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Experience Level</span>
                <span className="font-semibold text-amber-300">{model.experience || 'Beginner'}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Willing to Travel</span>
                <span className={`font-semibold ${model.willingToTravel ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {model.willingToTravel ? 'Yes' : 'No'}
                </span>
              </div>

              {/* Specialties */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-slate-400 block">Specialties</span>
                <div className="flex flex-wrap gap-1.5">
                  {model.specialties && model.specialties.length > 0 ? (
                    model.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px] font-semibold"
                      >
                        {spec}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500">No specialties added.</span>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}