'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  CheckCircle2,
  AlertCircle,
  Camera,
  Image as ImageIcon,
  Loader2,
  X,
  User,
  Palette,
  Mic,
  Drama,
  Music,
  Activity,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Star,
  Sparkles,
  ShieldCheck,
  Award,
  Globe
} from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { GlassCard } from './GlassCard';
import { registerModel } from '@/api/model';
import { api } from '@/lib/api';

// 🔹 ALL 11 UNSPLASH IMAGES FOR SHOWCASE IN REGISTRATION FORM
const SHOWCASE_TALENTS = [
  {
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Elena Rostova',
    role: 'High Fashion Model',
    location: 'Paris • Milan'
  },
  {
    url: 'https://images.unsplash.com/photo-1598815043441-59b8d13362b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNlbGVicml0aWVzfGVufDB8fDB8fHww',
    name: 'Sophia Vane',
    role: 'Editorial & Cinema Actor',
    location: 'Los Angeles'
  },
  {
    url: 'https://images.unsplash.com/photo-1685016950642-12637189ee1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2VsZWJyaXRpZXN8ZW58MHx8MHx8fDA%3D',
    name: 'Marcus Sterling',
    role: 'Commercial & Male Model',
    location: 'New York'
  },
  {
    url: 'https://images.unsplash.com/photo-1643756635111-ee5b18e055dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFjdHJlc3N8ZW58MHx8MHx8fDA%3D',
    name: 'Aria Montgomery',
    role: 'Lead Cinema Actress',
    location: 'London • Cannes'
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1661255454444-13277f7679a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFjdHJlc3N8ZW58MHx8MHx8fDA%3D',
    name: 'Isabella Cruz',
    role: 'Luxury Brand Ambassador',
    location: 'Milan • Madrid'
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1683219368443-cb52cb4bf023?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFjdHJlc3N8ZW58MHx8MHx8fDA%3D',
    name: 'Camila Laurent',
    role: 'Haute Couture Model',
    location: 'Paris'
  },
  {
    url: 'https://images.unsplash.com/photo-1609087570105-0974d0de19ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFjdHJlc3N8ZW58MHx8MHx8fDA%3D',
    name: 'Natasha Romanov',
    role: 'Theatre & Film Actor',
    location: 'Broadway, NY'
  },
  {
    url: 'https://images.unsplash.com/photo-1598815000898-7d8cd4dc90f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWN0cmVzc3xlbnwwfHwwfHx8MA%3D%3D',
    name: 'Chloë Bennett',
    role: 'Beauty & Skincare Face',
    location: 'Tokyo • LA'
  },
  {
    url: 'https://images.unsplash.com/photo-1686829354875-f8286d8f9d83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWN0cmVzc3xlbnwwfHwwfHx8MA%3D%3D',
    name: 'Zendaya K.',
    role: 'Runway Star',
    location: 'Milan'
  },
  {
    url: 'https://images.unsplash.com/photo-1589363348179-3cced6b7b6d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWN0cmVzc3xlbnwwfHwwfHx8MA%3D%3D',
    name: 'Victoria Thorne',
    role: 'TV & Film Star',
    location: 'Hollywood'
  },
  {
    url: 'https://images.unsplash.com/photo-1607699032287-f58742a2693d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D',
    name: 'Daria Petrova',
    role: 'Glamour Cover Face',
    location: 'Dubai • Geneva'
  }
];

export type TalentCategory =
  | 'Model'
  | 'Actor'
  | 'Singer'
  | 'Painter'
  | 'Dancer'
  | 'Musician'
  | 'Other';

interface CategoryOption {
  id: TalentCategory;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  bgImage: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { 
    id: 'Model', 
    title: 'Fashion Model', 
    subtitle: 'Runway, Editorial & Commercial', 
    icon: User,
    bgImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'Actor', 
    title: 'Actor / Actress', 
    subtitle: 'Film, TV Series & Theatre', 
    icon: Drama,
    bgImage: 'https://images.unsplash.com/photo-1598815043441-59b8d13362b9?w=600&auto=format&fit=crop'
  },
  { 
    id: 'Singer', 
    title: 'Singer / Vocalist', 
    subtitle: 'Playback, Bands & Live Performers', 
    icon: Mic,
    bgImage: 'https://images.unsplash.com/photo-1643756635111-ee5b18e055dc?w=600&auto=format&fit=crop'
  },
  { 
    id: 'Painter', 
    title: 'Painter / Visual Artist', 
    subtitle: 'Fine Art, Canvas & Digital Art', 
    icon: Palette,
    bgImage: 'https://plus.unsplash.com/premium_photo-1661255454444-13277f7679a9?w=600&auto=format&fit=crop'
  },
  { 
    id: 'Dancer', 
    title: 'Dancer / Choreographer', 
    subtitle: 'Classical, Modern & Commercial', 
    icon: Activity,
    bgImage: 'https://images.unsplash.com/photo-1686829354875-f8286d8f9d83?w=600&auto=format&fit=crop'
  },
  { 
    id: 'Musician', 
    title: 'Musician / Composer', 
    subtitle: 'Instruments, Music Production', 
    icon: Music,
    bgImage: 'https://images.unsplash.com/photo-1685016950642-12637189ee1a?w=600&auto=format&fit=crop'
  },
  { 
    id: 'Other', 
    title: 'Other Creative Talent', 
    subtitle: 'Voice Artist, Creator, Performers', 
    icon: Briefcase,
    bgImage: 'https://images.unsplash.com/photo-1607699032287-f58742a2693d?w=600&auto=format&fit=crop'
  },
];

const SPECIALTIES_BY_CATEGORY: Record<TalentCategory, string[]> = {
  Model: ['Fashion', 'Commercial', 'Editorial', 'Runway', 'Fitness', 'Catalog', 'Plus Size', 'Petite'],
  Actor: ['Film / Cinema', 'TV Series', 'Theatre', 'Commercials', 'Voiceover', 'Short Films'],
  Singer: ['Classical', 'Pop / Rock', 'Playback Singer', 'Western', 'Folk', 'Jazz / Blues'],
  Painter: ['Oil Painting', 'Digital Art', 'Abstract Art', 'Sketching', 'Murals', 'Watercolor'],
  Dancer: ['Classical Dance', 'Contemporary', 'Hip Hop', 'Bollywood', 'Ballet', 'Salsa'],
  Musician: ['Guitarist', 'Pianist', 'Drummer', 'Violinist', 'Music Producer', 'Composer'],
  Other: ['Performing Arts', 'Voice Artist', 'Content Creator', 'Stunt Artist', 'Creative Arts'],
};

const modelSchema = z.object({
  category: z.enum(['Model', 'Actor', 'Singer', 'Painter', 'Dancer', 'Musician', 'Other'], {
    message: 'Please select a talent category',
  }),
  fullName: z.string().min(2, 'Full Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  gender: z.enum(['Female', 'Male', 'Non-Binary', 'Other'], {
    message: 'Please select a gender',
  }),
  bio: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  bust: z.string().optional(),
  waist: z.string().optional(),
  hips: z.string().optional(),
  specialties: z.array(z.string()).min(1, 'Select at least one specialty'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ModelFormData = z.infer<typeof modelSchema>;

const extractUploadedUrl = (data: any): string | undefined =>
  data?.url || data?.data?.url || data?.secure_url || data?.data?.secure_url || data?.file?.url;

export const RegistrationForm: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState<number>(0);

  // Profile image upload state
  const [profileImageName, setProfileImageName] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [profileUploading, setProfileUploading] = useState(false);

  // Portfolio upload state
  const [portfolioCount, setPortfolioCount] = useState<number>(0);
  const [portfolioUrls, setPortfolioUrls] = useState<string[]>([]);
  const [portfolioUploading, setPortfolioUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ModelFormData>({
    resolver: zodResolver(modelSchema),
    defaultValues: {
      category: 'Model',
      specialties: ['Fashion'],
      gender: 'Female',
    },
  });

  const selectedCategory = watch('category') || 'Model';
  const selectedSpecialties = watch('specialties') || [];

  const handleCategorySelect = (cat: TalentCategory) => {
    setValue('category', cat, { shouldValidate: true });
    const categoryDefaults = SPECIALTIES_BY_CATEGORY[cat] || [];
    if (categoryDefaults.length > 0) {
      setValue('specialties', [categoryDefaults[0]], { shouldValidate: true });
    }
    // Update active showcase image to match selected category
    const catOpt = CATEGORY_OPTIONS.find((c) => c.id === cat);
    if (catOpt) {
      const idx = SHOWCASE_TALENTS.findIndex((t) => t.url === catOpt.bgImage);
      if (idx !== -1) setActiveShowcaseIdx(idx);
    }

    toast.success(`Category selected: ${cat}`);
    setStep(2);
  };

  const handleSpecialtyChange = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setValue(
        'specialties',
        selectedSpecialties.filter((s) => s !== specialty),
        { shouldValidate: true }
      );
    } else {
      setValue('specialties', [...selectedSpecialties, specialty], {
        shouldValidate: true,
      });
    }
  };

  const goToNextStep = async () => {
    setApiError(null);
    if (step === 1) {
      const isValid = await trigger('category');
      if (isValid) setStep(2);
      else toast.error(errors.category?.message || 'Please select a category');
    } else if (step === 2) {
      const isValid = await trigger([
        'fullName',
        'email',
        'password',
        'confirmPassword',
        'phone',
        'dateOfBirth',
        'gender',
      ]);
      if (isValid) {
        setStep(3);
      } else {
        const errorFields = ['fullName', 'email', 'password', 'confirmPassword', 'phone', 'dateOfBirth', 'gender'] as const;
        for (const field of errorFields) {
          if (errors[field]?.message) {
            toast.error(errors[field]?.message as string);
            break;
          }
        }
      }
    }
  };

  const goToPrevStep = () => {
    setApiError(null);
    if (step > 1) setStep((prev) => (prev - 1) as 1 | 2 | 3);
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImageName(file.name);
    setProfileImagePreview(URL.createObjectURL(file));
    setProfileUploading(true);
    setApiError(null);

    const toastId = toast.loading('Uploading headshot...');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedUrl = extractUploadedUrl(data);
      if (!uploadedUrl) throw new Error('No URL returned from upload');
      setProfileImageUrl(uploadedUrl);
      toast.success('Headshot uploaded successfully!', { id: toastId });
    } catch (err) {
      console.error('Profile image upload failed:', err);
      toast.error('Headshot upload failed. Please try again.', { id: toastId });
      setProfileImageName(null);
      setProfileImagePreview(null);
    } finally {
      setProfileUploading(false);
    }
  };

  const handlePortfolioChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setPortfolioCount(files.length);
    setPortfolioUploading(true);
    setApiError(null);

    const toastId = toast.loading(`Uploading ${files.length} portfolio photos...`);

    try {
      const uploads = await Promise.all(
        Array.from(files).map(async (file) => {
          const formData = new FormData();
          formData.append('image', file);
          const { data } = await api.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          const uploadedUrl = extractUploadedUrl(data);
          if (!uploadedUrl) throw new Error('No URL returned from upload');
          return uploadedUrl;
        })
      );
      setPortfolioUrls(uploads);
      toast.success(`${uploads.length} portfolio photos uploaded!`, { id: toastId });
    } catch (err) {
      console.error('Portfolio images upload failed:', err);
      toast.error('Portfolio upload failed. Please try again.', { id: toastId });
      setPortfolioCount(0);
      setPortfolioUrls([]);
    } finally {
      setPortfolioUploading(false);
    }
  };

  const onSubmit = async (data: ModelFormData) => {
    setApiError(null);

    if (profileUploading || portfolioUploading) {
      toast.error('Please wait for photos to finish uploading.');
      return;
    }

    const payload = {
      ...data,
      profileImage: profileImageUrl,
      portfolioImages: portfolioUrls,
    };

    const submitToast = toast.loading('Submitting Vogue Talent Scouting Application...');

    try {
      const res = await registerModel(payload as any);
      if (res.data?.success || res.status === 201) {
        toast.success('Application submitted successfully!', { id: submitToast });
        setIsSubmitted(true);
      } else {
        toast.success('Application submitted for review!', { id: submitToast });
        setIsSubmitted(true);
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      const msg = err.response?.data?.message || err.message || 'Registration failed';
      setApiError(msg);
      toast.error(msg, { id: submitToast });
    }
  };

  const onError = (formErrors: any) => {
    const errorKeys = Object.keys(formErrors);
    if (errorKeys.length > 0) {
      const firstError = formErrors[errorKeys[0]]?.message;
      toast.error(firstError || 'Please fill in all required fields correctly.');
    }
  };

  const currentBgImage = SHOWCASE_TALENTS[activeShowcaseIdx].url;

  return (
    <GlassCard glow bgImage={currentBgImage} className="w-full max-w-4xl mx-auto my-6 p-6 sm:p-10 border-amber-500/40">
      
      {/* 📌 OFFICIAL REGISTRATION & FEE POLICY NOTICE (PLACED AT VERY TOP) */}
      <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-zinc-950/90 border border-amber-500/40 text-left space-y-3 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold tracking-wider">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Official Registration &amp; Fee Policy</span>
        </div>

        <h3 className="font-serif text-base sm:text-lg font-bold text-white">
          Registration &amp; Fee Guidelines
        </h3>

        <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-bold text-base leading-none mt-0.5">•</span>
            <span>
              <strong>Registration is Free in starting:</strong> Step 1 registration is <strong>100% FREE</strong>.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-bold text-base leading-none mt-0.5">•</span>
            <span>
              <strong>Step 2 Evaluation Fee (₹ 999):</strong> After 1st step, you have to pay <strong>₹ 999</strong> evaluation fee. This fee is <strong>strictly non-refundable and non-transferable</strong> under any circumstances, including disqualification or voluntary withdrawal.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-bold text-base leading-none mt-0.5">•</span>
            <span>
              <strong>Step 3 USA Training Workshop (₹ 1,499):</strong> On 2nd step, you have to pay <strong>₹ 1,499</strong>. In this step, you will receive a <strong>Free Training Workshop from America</strong> where you will get training in your specialized field.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-bold text-base leading-none mt-0.5">•</span>
            <span>
              <strong>Accurate Details Mandatory:</strong> Participants must ensure all details filled in the registration form are accurate. Any false information will lead to immediate disqualification without a refund.
            </span>
          </li>
        </ul>
      </div>

      {/* 🌟 TOP VISUAL SHOWCASE STRIP (ALL 11 IMAGES) */}
      <div className="mb-8 p-4 rounded-2xl bg-zinc-950/80 border border-amber-500/30 space-y-3 shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-amber-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Represented Talent Roster (11 Featured Icons)
          </span>
          <span className="text-zinc-400 font-sans">Click Avatar to Change Background Image</span>
        </div>
        <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-1">
          {SHOWCASE_TALENTS.map((t, i) => (
            <button
              key={t.url + i}
              type="button"
              onClick={() => setActiveShowcaseIdx(i)}
              className={`shrink-0 w-12 h-16 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                activeShowcaseIdx === i ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105 shadow-[0_0_12px_rgba(212,175,55,0.5)]' : 'border-zinc-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={t.url} alt={t.name} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Step Progress Bar */}
      {!isSubmitted && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
            <span className={step === 1 ? 'text-amber-400 font-bold' : ''}>1. Select Field</span>
            <span className={step === 2 ? 'text-amber-400 font-bold' : ''}>2. Contact Info</span>
            <span className={step === 3 ? 'text-amber-400 font-bold' : ''}>3. Portfolio &amp; Stats</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500"
              initial={{ width: '33.3%' }}
              animate={{ width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%' }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-12 px-4 space-y-6"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 animate-pulse">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif-luxury text-3xl md:text-4xl font-bold text-white">
                Talent Application Submitted
              </h2>
              <p className="text-amber-400 text-sm tracking-widest uppercase font-mono">
                {selectedCategory} Roster Scouting 2026
              </p>
            </div>

            <p className="text-zinc-300 text-sm md:text-base max-w-md mx-auto font-light leading-relaxed">
              Our scouting bookers evaluate your profile. You will receive an official response via email within 24-48 hours.
            </p>

            <div className="pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                  setProfileImageName(null);
                  setProfileImageUrl(null);
                  setProfileImagePreview(null);
                  setPortfolioCount(0);
                  setPortfolioUrls([]);
                }}
              >
                Submit Another Application
              </Button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
            {apiError && (
              <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{apiError}</span>
              </div>
            )}

            {/* 🔹 STEP 1: CATEGORY SELECTION WITH IMAGE BACKGROUNDS */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif-luxury text-2xl md:text-3xl font-bold text-white">
                      What is your Creative Discipline?
                    </h2>
                    <span className="text-xs uppercase text-amber-400 tracking-widest font-mono">
                      Step 1 of 3
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Select your primary field to customize your scouting card.
                  </p>
                </div>

                {/* 🌟 CATEGORY CARDS WITH PHOTO BACKGROUNDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {CATEGORY_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = selectedCategory === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleCategorySelect(opt.id)}
                        className={`relative rounded-2xl p-5 text-left overflow-hidden border transition-all duration-300 flex items-start gap-4 cursor-pointer group ${
                          isSelected
                            ? 'border-amber-400 ring-2 ring-amber-400/60 shadow-[0_0_30px_rgba(212,175,55,0.4)] scale-[1.02]'
                            : 'border-zinc-800/80 hover:border-amber-500/60 hover:scale-[1.01]'
                        }`}
                      >
                        {/* 🖼️ HIGH-FASHION BACKGROUND PHOTO FOR EVERY CATEGORY */}
                        <div className="absolute inset-0 z-0 overflow-hidden">
                          <img
                            src={opt.bgImage}
                            alt={opt.title}
                            className={`w-full h-full object-cover object-center filter brightness-[0.7] contrast-125 transition-transform duration-700 group-hover:scale-110 ${
                              isSelected ? 'opacity-55' : 'opacity-35 group-hover:opacity-50'
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/80 to-zinc-950/85" />
                        </div>

                        {/* Icon Box */}
                        <div
                          className={`relative z-10 p-3.5 rounded-xl border transition-colors ${
                            isSelected
                              ? 'bg-amber-400 text-black border-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.6)]'
                              : 'bg-zinc-950/80 border-white/20 text-amber-400 group-hover:border-amber-400'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        {/* Text Details */}
                        <div className="relative z-10 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-white tracking-wide">{opt.title}</h3>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 shadow-[0_0_10px_#d4af37]" />}
                          </div>
                          <p className="text-xs text-zinc-300 font-light mt-1 leading-snug">{opt.subtitle}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-mono">
                    Selected: <strong className="text-amber-400">{selectedCategory}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-black px-6 py-3.5 rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
                  >
                    <span>Continue to Step 2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* 🔹 STEP 2: PERSONAL IDENTIFICATION */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif-luxury text-2xl md:text-3xl font-bold text-white">
                      Personal Details
                    </h2>
                    <span className="text-xs uppercase text-amber-400 tracking-widest font-mono">
                      Step 2 of 3 ({selectedCategory})
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Provide your contact details for bookers to reach you.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="e.g. Elena Rostova"
                    {...register('fullName')}
                    error={errors.fullName?.message}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="elena@vogue-agency.com"
                    {...register('email')}
                    error={errors.email?.message}
                    required
                  />
                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    {...register('password')}
                    error={errors.password?.message}
                    required
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    {...register('phone')}
                    error={errors.phone?.message}
                    required
                  />
                  <Input
                    label="Date of Birth"
                    type="date"
                    {...register('dateOfBirth')}
                    error={errors.dateOfBirth?.message}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-zinc-300 mb-1.5">
                    Gender <span className="text-amber-400">*</span>
                  </label>
                  <select
                    {...register('gender')}
                    className="w-full bg-zinc-950/90 text-white text-sm rounded-xl border border-zinc-800 px-4 py-3.5 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-Binary">Non-Binary</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <span className="text-xs text-red-400 mt-1 block">{errors.gender.message}</span>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium px-4 py-2.5 rounded-lg border border-white/10 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-black px-6 py-3.5 rounded-xl font-bold text-sm hover:brightness-110 transition-all cursor-pointer"
                  >
                    <span>Next: Portfolio &amp; Stats</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* 🔹 STEP 3: SPECIALTIES & UPLOAD */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif-luxury text-2xl md:text-3xl font-bold text-white">
                      Specialties &amp; Portfolio Media
                    </h2>
                    <span className="text-xs uppercase text-amber-400 tracking-widest font-mono">
                      Step 3 of 3
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Select your skills and upload headshots/portfolio photos.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                    {selectedCategory} Specialties <span className="text-amber-400">*</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {(SPECIALTIES_BY_CATEGORY[selectedCategory] || SPECIALTIES_BY_CATEGORY.Model).map(
                      (specialty) => {
                        const isChecked = selectedSpecialties.includes(specialty);
                        return (
                          <button
                            key={specialty}
                            type="button"
                            onClick={() => handleSpecialtyChange(specialty)}
                            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer ${
                              isChecked
                                ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-sm backdrop-blur-md'
                                : 'bg-zinc-950/70 border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200 backdrop-blur-sm'
                            }`}
                          >
                            <div
                              className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                                isChecked ? 'bg-amber-400 border-amber-400 text-black' : 'border-zinc-500'
                              }`}
                            >
                              {isChecked && <CheckCircle2 className="w-3 h-3" />}
                            </div>
                            <span className="truncate">{specialty}</span>
                          </button>
                        );
                      }
                    )}
                  </div>
                  {errors.specialties && (
                    <span className="text-xs text-red-400 block">{errors.specialties.message}</span>
                  )}
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                      Physical Measurements
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <Input label="Height" placeholder='5"11" / 180cm' {...register('height')} />
                    <Input label="Weight" placeholder="125 lbs / 57kg" {...register('weight')} />
                    <Input label="Bust" placeholder='34"' {...register('bust')} />
                    <Input label="Waist" placeholder='24"' {...register('waist')} />
                    <Input label="Hips" placeholder='35"' {...register('hips')} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-zinc-300 mb-1.5">
                    Bio / Experience Highlights
                  </label>
                  <textarea
                    {...register('bio')}
                    rows={3}
                    placeholder={`Describe your achievements as a ${selectedCategory}...`}
                    className="w-full bg-zinc-950/90 text-white text-sm rounded-xl border border-zinc-800 p-3.5 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-4 pt-2">
                  <h3 className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                    Media &amp; Headshots Upload
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Headshot Upload */}
                    <div className="p-4 rounded-xl border border-dashed border-white/20 hover:border-amber-400 bg-zinc-950/60 text-center relative group transition-colors overflow-hidden backdrop-blur-md">
                      {!profileImagePreview ? (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="flex flex-col items-center gap-2">
                            <div className="p-2.5 rounded-full bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                              <Camera className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-medium text-zinc-200">Upload Headshot Photo</span>
                            <span className="text-[10px] text-zinc-400">Clear frontal lighting</span>
                          </div>
                        </>
                      ) : (
                        <div className="relative">
                          <img
                            src={profileImagePreview}
                            alt="Profile preview"
                            className="w-20 h-20 rounded-lg object-cover mx-auto"
                          />
                          {profileUploading ? (
                            <div className="flex items-center justify-center gap-1.5 mt-2 text-[11px] text-amber-400">
                              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...
                            </div>
                          ) : (
                            <p className="text-[11px] text-zinc-300 mt-2 truncate">{profileImageName}</p>
                          )}
                          {!profileUploading && (
                            <button
                              type="button"
                              onClick={() => {
                                setProfileImageName(null);
                                setProfileImageUrl(null);
                                setProfileImagePreview(null);
                              }}
                              className="absolute -top-2 -right-2 bg-black border border-white/20 rounded-full p-1 text-zinc-300 hover:text-white z-20"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Portfolio Upload */}
                    <div className="p-4 rounded-xl border border-dashed border-white/20 hover:border-amber-400 bg-zinc-950/60 text-center relative group transition-colors backdrop-blur-md">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePortfolioChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-2.5 rounded-full bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        {portfolioUploading ? (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading {portfolioCount} images...
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-zinc-200">
                            {portfolioUrls.length > 0
                              ? `${portfolioUrls.length} Photos Uploaded`
                              : 'Upload Portfolio / Scouting Cards'}
                          </span>
                        )}
                        <span className="text-[10px] text-zinc-400">Multiple files allowed</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium px-4 py-3 rounded-lg border border-white/10 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || profileUploading || portfolioUploading}
                    className="flex-1 bg-gradient-to-r from-amber-400 via-amber-500 to-gold text-black py-4 rounded-xl font-bold text-base hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.3)]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Submitting Application...
                      </>
                    ) : (
                      'Submit Talent Application'
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        )}
      </AnimatePresence>
    </GlassCard>
  );
};