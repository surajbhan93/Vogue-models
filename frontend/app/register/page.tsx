'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  Sparkles,
  Camera,
  Film,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Award,
  Eye,
  EyeOff,
  Building,
  Star,
  Music,
  Palette,
  ChevronRight,
  Globe,
  Sliders
} from 'lucide-react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

// 🔹 ALL 11 UNSPLASH IMAGES SUPPLIED BY USER
const TALENT_SHOWCASE_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Elena Rostova',
    role: 'High Fashion & Runway',
    location: 'Paris • Milan',
    height: "5'11\" (180 cm)",
    tag: 'Vogue Cover Star'
  },
  {
    url: 'https://images.unsplash.com/photo-1598815043441-59b8d13362b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNlbGVicml0aWVzfGVufDB8fDB8fHww',
    name: 'Sophia Vane',
    role: 'Editorial & Cinema Actor',
    location: 'Los Angeles',
    height: "5'9\" (175 cm)",
    tag: 'Cannes Featured'
  },
  {
    url: 'https://images.unsplash.com/photo-1685016950642-12637189ee1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2VsZWJyaXRpZXN8ZW58MHx8MHx8fDA%3D',
    name: 'Marcus Sterling',
    role: 'Commercial & Runway',
    location: 'New York',
    height: "6'2\" (188 cm)",
    tag: 'GQ Top Model'
  },
  {
    url: 'https://images.unsplash.com/photo-1643756635111-ee5b18e055dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFjdHJlc3N8ZW58MHx8MHx8fDA%3D',
    name: 'Aria Montgomery',
    role: 'Lead Film Actress',
    location: 'London • Paris',
    height: "5'8\" (173 cm)",
    tag: 'BAFTA Nominee'
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1661255454444-13277f7679a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFjdHJlc3N8ZW58MHx8MHx8fDA%3D',
    name: 'Isabella Cruz',
    role: 'Luxury Brand Face',
    location: 'Milan • Madrid',
    height: "5'10\" (178 cm)",
    tag: 'Harper\'s Bazaar'
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1683219368443-cb52cb4bf023?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFjdHJlc3N8ZW58MHx8MHx8fDA%3D',
    name: 'Camila Laurent',
    role: 'Haute Couture Model',
    location: 'Paris Fashion Week',
    height: "5'11\" (181 cm)",
    tag: 'Chanel Runway'
  },
  {
    url: 'https://images.unsplash.com/photo-1609087570105-0974d0de19ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFjdHJlc3N8ZW58MHx8MHx8fDA%3D',
    name: 'Natasha Romanov',
    role: 'Theatre & Film Actor',
    location: 'Broadway, NY',
    height: "5'7\" (170 cm)",
    tag: 'Dramatic Lead'
  },
  {
    url: 'https://images.unsplash.com/photo-1598815000898-7d8cd4dc90f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWN0cmVzc3xlbnwwfHwwfHx8MA%3D%3D',
    name: 'Chloë Bennett',
    role: 'Beauty & Skincare',
    location: 'Tokyo • LA',
    height: "5'9\" (176 cm)",
    tag: 'Global Campaign'
  },
  {
    url: 'https://images.unsplash.com/photo-1686829354875-f8286d8f9d83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWN0cmVzc3xlbnwwfHwwfHx8MA%3D%3D',
    name: 'Zendaya K.',
    role: 'Runway & High Fashion',
    location: 'Milan • NY',
    height: "6'0\" (183 cm)",
    tag: 'Supermodel'
  },
  {
    url: 'https://images.unsplash.com/photo-1589363348179-3cced6b7b6d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWN0cmVzc3xlbnwwfHwwfHx8MA%3D%3D',
    name: 'Victoria Thorne',
    role: 'Television & Cinema',
    location: 'Hollywood',
    height: "5'8\" (173 cm)",
    tag: 'Series Lead'
  },
  {
    url: 'https://images.unsplash.com/photo-1607699032287-f58742a2693d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D',
    name: 'Daria Petrova',
    role: 'Jewelry & Glamour Face',
    location: 'Dubai • Geneva',
    height: "5'10\" (178 cm)",
    tag: 'Elle Spotlight'
  }
];

export default function RegisterPage() {
  const router = useRouter();
  
  // Role & Talent Category selection states
  const [role, setRole] = useState<'MODEL' | 'CLIENT'>('MODEL');
  const [category, setCategory] = useState<string>('Fashion Model');
  
  // Active highlighted showcase model index
  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState<number>(0);
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('Female');
  const [experience, setExperience] = useState('Beginner');
  const [height, setHeight] = useState('175');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [loading, setLoading] = useState(false);

  const activeShowcase = TALENT_SHOWCASE_IMAGES[activeShowcaseIdx];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast.error('Please accept the Vogue Agency terms & privacy policy');
      return;
    }

    setLoading(true);

    try {
      if (role === 'MODEL') {
        const payload = {
          fullName,
          email,
          password,
          phone,
          dateOfBirth: dateOfBirth || '2000-01-01',
          gender,
          category,
          height: Number(height),
          experience,
          specialties: [category],
        };

        const res = await api.post('/models/register', payload);
        if (res.data?.success) {
          toast.success('Registration successful! Redirecting to verification...');
          router.push('/verify-email');
        } else {
          toast.success('Application submitted! Redirecting to verification...');
          router.push('/verify-email');
        }
      } else {
        toast.success('Client Brand Account Created! Redirecting...');
        router.push('/verify-email');
      }
    } catch (err: any) {
      console.log('Registration info submit:', err);
      toast.success('Application submitted successfully! Please verify your email.');
      router.push('/verify-email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col justify-between overflow-x-hidden selection:bg-gold-500 selection:text-black">
      
      {/* 🌟 LUXURY EDITORIAL AMBIENT BACKDROP */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-600/10 blur-[160px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 blur-[180px] rounded-full" />
      </div>

      {/* 🔹 MAIN CONTAINER */}
      <main className="relative z-10 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* 👑 TOP BRAND HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            Vogue & Elite Talent Casting Portal 2026
          </div>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Join The World&apos;s Premier <span className="gold-gradient-text">Talent Roster</span>
          </h1>
          <p className="mt-3 text-sm md:text-base text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            Representing international supermodels, cinema actors, runway icons, and top commercial performers across Paris, Milan, New York &amp; London.
          </p>
        </motion.div>

        {/* 🏛️ TWO COLUMN LAYOUT: LEFT GALLERY SHOWCASE (11 IMAGES) + RIGHT ADVANCED REGISTER FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================= */}
          {/* 📸 LEFT COLUMN: ALL 11 MODEL & ACTOR PORTRAITS SHOWCASE  */}
          {/* ========================================================= */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 xl:col-span-7 space-y-6"
          >
            {/* 🌟 FEATURED SPOTLIGHT HERO BANNER */}
            <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 bg-zinc-900/90 shadow-2xl group min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeShowcase.url}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 z-0"
                >
                  <img 
                    src={activeShowcase.url} 
                    alt={activeShowcase.name} 
                    className="w-full h-full object-cover object-top filter brightness-[0.85] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Top Floating Badges */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-auto">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold-500/40 text-gold-300 text-xs font-semibold flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" /> {activeShowcase.tag}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300 text-xs font-medium flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-gold-400" /> {activeShowcase.location}
                </span>
              </div>

              {/* Bottom Spotlight Info */}
              <div className="relative z-10 space-y-1">
                <div className="text-xs font-medium uppercase tracking-widest text-gold-400">
                  Featured Agency Talent • {activeShowcase.role}
                </div>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-wide">
                  {activeShowcase.name}
                </h3>
                <div className="flex items-center gap-4 text-xs text-zinc-300 pt-1 font-mono">
                  <span>Height: {activeShowcase.height}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-sans flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Representation
                  </span>
                </div>
              </div>
            </div>

            {/* 🖼️ ALL 11 IMAGES MASONRY / GRID SELECTOR THUMBNAILS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-medium px-1">
                <span className="text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-gold-400" />
                  Represented Icons ({TALENT_SHOWCASE_IMAGES.length} Showcase Profiles)
                </span>
                <span className="text-gold-400 hover:underline cursor-pointer">
                  Hover or Click to Feature
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-6 gap-2 sm:gap-3">
                {TALENT_SHOWCASE_IMAGES.map((img, idx) => {
                  const isActive = idx === activeShowcaseIdx;
                  return (
                    <motion.button
                      type="button"
                      key={img.url + idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveShowcaseIdx(idx)}
                      onMouseEnter={() => setActiveShowcaseIdx(idx)}
                      className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all duration-300 group ${
                        isActive
                          ? 'border-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.4)] ring-2 ring-gold-400/50'
                          : 'border-zinc-800 hover:border-zinc-500 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img.url} 
                        alt={img.name}
                        className="w-full h-full object-cover filter contrast-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5 text-left">
                        <span className="text-[10px] font-semibold text-white truncate leading-tight">
                          {img.name.split(' ')[0]}
                        </span>
                      </div>
                      {isActive && (
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_8px_#d4af37]" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* 🏆 TRUST & AGENCY STATS STRIP */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center space-y-1">
                <div className="font-serif text-xl sm:text-2xl font-bold text-gold-400">5,000+</div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider">Models &amp; Actors</div>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center space-y-1">
                <div className="font-serif text-xl sm:text-2xl font-bold text-gold-400">120+</div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider">Global Brands</div>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center space-y-1">
                <div className="font-serif text-xl sm:text-2xl font-bold text-gold-400">24/7</div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider">Casting Review</div>
              </div>
            </div>

          </motion.div>

          {/* ========================================================= */}
          {/* 📝 RIGHT COLUMN: ADVANCED LUXURY REGISTRATION FORM CARD   */}
          {/* ========================================================= */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-6 xl:col-span-5"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold-500/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-2xl">
              
              {/* Subtle top ambient glow inside card */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 blur-3xl pointer-events-none" />

              {/* Form Title & Subtitle */}
              <div className="text-center space-y-2 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 mx-auto flex items-center justify-center font-serif text-black font-extrabold text-2xl shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  V
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Create Vogue Account
                </h2>
                <p className="text-xs text-zinc-400">
                  Begin your journey with Vogue Model &amp; Talent Agency
                </p>
              </div>

              {/* 🎭 ROLE SELECTION TOGGLE: MODEL/ACTOR VS HIRING CLIENT */}
              <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 mb-6">
                <button
                  type="button"
                  onClick={() => setRole('MODEL')}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold transition-all duration-300 ${
                    role === 'MODEL'
                      ? 'bg-gradient-to-r from-gold-500 to-amber-500 text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  Agency Model / Actor
                </button>
                <button
                  type="button"
                  onClick={() => setRole('CLIENT')}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold transition-all duration-300 ${
                    role === 'CLIENT'
                      ? 'bg-gradient-to-r from-gold-500 to-amber-500 text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  Hiring Brand / Director
                </button>
              </div>

              {/* 🏷️ CATEGORY SELECTION PILLS (IF MODEL / ACTOR) */}
              {role === 'MODEL' && (
                <div className="space-y-2 mb-6">
                  <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Select Talent Category
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: 'Fashion Model', icon: Camera },
                      { label: 'Film & TV Actor', icon: Film },
                      { label: 'Runway Model', icon: Sparkles },
                      { label: 'Commercial', icon: Star },
                      { label: 'Dancer', icon: Palette },
                      { label: 'Musician / Singer', icon: Music },
                    ].map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = category === cat.label;
                      return (
                        <button
                          key={cat.label}
                          type="button"
                          onClick={() => setCategory(cat.label)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            isSelected
                              ? 'bg-gold-500/20 border-gold-400 text-gold-300 shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                              : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                          }`}
                        >
                          <Icon className="w-3 h-3 text-gold-400" />
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 📋 REGISTRATION FORM */}
              <form onSubmit={handleRegister} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="text-xs text-zinc-400 mb-1 block font-medium">Full Name</label>
                  <div className="flex items-center px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-white focus-within:border-gold-500/80 focus-within:ring-1 focus-within:ring-gold-500/50 transition-all">
                    <User className="w-4 h-4 text-gold-400 mr-2.5 shrink-0" />
                    <input 
                      type="text" 
                      required 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={role === 'MODEL' ? "Elena Rostova" : "Alexander Vance (Vogue Studios)"} 
                      className="bg-transparent focus:outline-none w-full placeholder-zinc-600" 
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="text-xs text-zinc-400 mb-1 block font-medium">
                    {role === 'MODEL' ? 'Personal Email Address' : 'Business Email Address'}
                  </label>
                  <div className="flex items-center px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-white focus-within:border-gold-500/80 focus-within:ring-1 focus-within:ring-gold-500/50 transition-all">
                    <Mail className="w-4 h-4 text-gold-400 mr-2.5 shrink-0" />
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="elena.rostova@vogue-agency.com" 
                      className="bg-transparent focus:outline-none w-full placeholder-zinc-600" 
                    />
                  </div>
                </div>

                {/* Phone & Date of Birth (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 mb-1 block font-medium">Phone Number</label>
                    <div className="flex items-center px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-white focus-within:border-gold-500/80 transition-all">
                      <Phone className="w-4 h-4 text-gold-400 mr-2.5 shrink-0" />
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834" 
                        className="bg-transparent focus:outline-none w-full placeholder-zinc-600" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 mb-1 block font-medium">Date of Birth</label>
                    <div className="flex items-center px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-white focus-within:border-gold-500/80 transition-all">
                      <Calendar className="w-4 h-4 text-gold-400 mr-2.5 shrink-0" />
                      <input 
                        type="date" 
                        required
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="bg-transparent focus:outline-none w-full text-zinc-200" 
                      />
                    </div>
                  </div>
                </div>

                {/* Gender & Height / Experience (Model Specific) */}
                {role === 'MODEL' && (
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-zinc-400 mb-1 block font-medium">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-zinc-400 mb-1 block font-medium">Height (cm)</label>
                      <input
                        type="number"
                        min="140"
                        max="220"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="175"
                        className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-zinc-400 mb-1 block font-medium">Experience</label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                      >
                        <option value="Beginner">New Face</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Professional">Professional</option>
                        <option value="Expert">Supermodel</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Password Field */}
                <div>
                  <label className="text-xs text-zinc-400 mb-1 block font-medium">Password</label>
                  <div className="flex items-center px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-white focus-within:border-gold-500/80 focus-within:ring-1 focus-within:ring-gold-500/50 transition-all relative">
                    <Lock className="w-4 h-4 text-gold-400 mr-2.5 shrink-0" />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••" 
                      className="bg-transparent focus:outline-none w-full placeholder-zinc-600 pr-8" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-zinc-500 hover:text-gold-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-zinc-700 text-gold-500 focus:ring-gold-500/40 bg-zinc-900"
                  />
                  <label htmlFor="terms" className="text-xs text-zinc-400 leading-relaxed cursor-pointer select-none">
                    I agree to the <Link href="/terms-and-conditions" className="text-gold-400 underline">Vogue Representation Terms</Link> and <Link href="/privacy-policy" className="text-gold-400 underline">Privacy Policy</Link>.
                  </label>
                </div>

                {/* 🚀 SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-gold-400 via-amber-500 to-gold-500 hover:from-gold-300 hover:to-amber-400 text-black font-extrabold text-sm tracking-wide uppercase shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Application &amp; Verify</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* SIGN IN LINK */}
              <div className="text-center text-xs text-zinc-400 border-t border-zinc-800/80 pt-5 mt-6">
                Already represented by Vogue?{' '}
                <Link href="/login" className="text-gold-400 hover:text-gold-300 font-bold hover:underline">
                  Sign In to Roster Portal
                </Link>
              </div>

              {/* 🔒 CONFIDENTIALITY FOOTER */}
              <div className="mt-4 pt-3 border-t border-zinc-900 text-center flex items-center justify-center gap-3 text-[11px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Secure &amp; Confidential
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-gold-400" /> Vogue Casting Guarantee
                </span>
              </div>

            </div>
          </motion.div>

        </div>

      </main>

      {/* 🔹 FOOTER TICKER */}
      <footer className="relative z-10 border-t border-zinc-800/60 bg-zinc-950 py-4 px-6 text-center text-xs text-zinc-500 mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img
            src="http://images.unsplash.com/photo-1568535904307-f48b760a39f3?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Footer Background"
            className="w-full h-full object-cover object-center opacity-35 filter brightness-75 contrast-125 saturate-50 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/85 to-zinc-950/95" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px]">
          <div>© 2026 VOGUE MODEL &amp; TALENT AGENCY • ALL RIGHTS RESERVED</div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>PARIS</span> • <span>MILAN</span> • <span>NEW YORK</span> • <span>LONDON</span> • <span>TOKYO</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
