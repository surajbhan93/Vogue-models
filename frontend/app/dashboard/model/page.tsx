'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import {
  Eye,
  Heart,
  Star,
  Trophy,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowUpRight,
  User,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Briefcase,
} from 'lucide-react';

interface TalentProfile {
  _id: string;
  name: string;
  email: string;
  category?: string;
  profileImage?: string;
  status: string;
  isVerified?: boolean;
  views: number;
  likes: number;
  rating: number;
  subscription: string;
  availability: string;
  specialties?: string[];
  createdAt: string;
}

export default function ModelDashboardPage() {
  const [profile, setProfile] = useState<TalentProfile | null>(null);
  const [participations, setParticipations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Fetch Profile Data
        let profileRes;
        try {
          profileRes = await api.get('/models/profile/me');
        } catch (err: any) {
          if (err.response?.status === 404) {
            profileRes = await api.get('/api/models/profile/me');
          } else {
            throw err;
          }
        }

        if (profileRes.data?.success || profileRes.data?.model) {
          setProfile(profileRes.data.model || profileRes.data.data);
        }

        // 2. Fetch Contests & Applications Data
        try {
          const contestRes = await api.get('/contests/my-dashboard');
          const contestData = contestRes.data?.data || contestRes.data;
          if (contestData?.myParticipations) {
            setParticipations(contestData.myParticipations);
          }
        } catch (cErr) {
          // Non-blocking contest fetch failure
        }
      } catch (err: any) {
        console.error('Failed to load talent dashboard:', err);
        setError(err.response?.data?.message || 'Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center p-6 text-center">
        <div className="space-y-3">
          <Sparkles className="w-10 h-10 text-amber-400 animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-400">Loading your talent portal...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center p-4 text-center">
        <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">Error Loading Portal</h2>
          <p className="text-xs text-slate-400">{error || 'Please sign in to access your dashboard.'}</p>
          <Link
            href="/login"
            className="inline-block w-full py-3 rounded-xl bg-amber-500 text-black font-bold text-xs shadow-lg"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-7xl mx-auto selection:bg-amber-500 selection:text-black">
      {/* 🔹 Responsive Dynamic Welcome Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-3.5">
          {profile.profileImage ? (
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-amber-500/40 shadow-lg shadow-amber-500/10 shrink-0"
            />
          ) : (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-300 via-amber-400 to-amber-500 flex items-center justify-center font-bold text-black text-xl sm:text-2xl shadow-lg shrink-0">
              {profile.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight truncate">
                Welcome back, {profile.name}
              </h1>
              {profile.isVerified && (
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1 truncate">
              {profile.category || 'Creative Talent'} Portal • Joined {formatDate(profile.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto justify-between sm:justify-end w-full sm:w-auto">
          <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold">
            {profile.category || 'Talent Roster'}
          </Badge>
          <Link
            href="/dashboard/model/edit-profile"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-200 transition"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* 🔹 Responsive Real Metrics Grid (1 col on Mobile, 2 on Tablet, 4 on Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Profile Views */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase tracking-wider">
            <span>Profile Views</span>
            <Eye className="w-4 h-4 text-blue-400" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-extrabold text-white">{profile.views || 0}</p>
          <p className="text-[10px] text-slate-500">Live booking director views</p>
        </div>

        {/* Profile Likes */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase tracking-wider">
            <span>Profile Likes</span>
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400/20" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-extrabold text-white">{profile.likes || 0}</p>
          <p className="text-[10px] text-slate-500">Agency scout appreciations</p>
        </div>

        {/* Client Rating */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase tracking-wider">
            <span>Rating</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
            {profile.rating ? `${profile.rating} / 5.0` : '5.0 / 5.0'}
          </p>
          <p className="text-[10px] text-slate-500">Verified Client Reviews</p>
        </div>

        {/* Status */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase tracking-wider">
            <span>Status</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-serif text-xl sm:text-2xl font-extrabold text-emerald-400 capitalize">
            {profile.status || 'Active'}
          </p>
          <p className="text-[10px] text-slate-500">Availability: {profile.availability || 'Available'}</p>
        </div>
      </div>

      {/* 🔹 Middle Section: Contest Entries & Specialties */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left 2 Cols: Recent Contest & Audition Entries */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400 shrink-0" /> Active Contests &amp; Auditions
            </h2>
            <Link
              href="/dashboard/model/contests"
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold shrink-0"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl">
            {participations.length === 0 ? (
              <div className="p-6 sm:p-8 text-center space-y-3">
                <Trophy className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs font-semibold text-slate-300">No active contest entries yet</p>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Participate in live scouting competitions to showcase your talent to global casting directors.
                </p>
                <Link
                  href="/contests"
                  className="inline-block px-4 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs shadow-lg"
                >
                  Browse Live Contests
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-800">
                {participations.slice(0, 4).map((part: any) => (
                  <div key={part._id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/40 transition">
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                        {part.contest?.title || 'Scouting Competition'}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>Stage: {part.currentStage || 'Round 1'}</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-semibold">
                          {part.isEliminated ? 'Eliminated' : 'Active Candidate'}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/contests/${part.contest?.slug || ''}`}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition text-center self-start sm:self-auto"
                    >
                      Details
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Specialties & Quick Links */}
        <div className="space-y-4">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" /> Talent Specialties
          </h2>

          <div className="p-5 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-4 shadow-xl">
            <div className="flex flex-wrap gap-2">
              {profile.specialties && profile.specialties.length > 0 ? (
                profile.specialties.map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-semibold"
                  >
                    {spec}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-500">No specialties added yet.</span>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2.5">
              <Link
                href="/dashboard/model/profile"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-bold text-slate-200 transition"
              >
                <span>View Full Public Profile</span>
                <ArrowUpRight className="w-4 h-4 text-amber-400" />
              </Link>
              <Link
                href="/dashboard/model/PortfolioPage"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-bold text-slate-200 transition"
              >
                <span>Manage Portfolio Photos</span>
                <ArrowUpRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}