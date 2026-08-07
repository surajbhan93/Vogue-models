'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast'; // 👈 React Hot Toast Import
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
  Briefcase
} from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { GlassCard } from './GlassCard';
import { registerModel } from '@/api/model';
import { api } from '@/lib/api';

// 🔹 Available Talent Categories
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
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: 'Model', title: 'Fashion Model', subtitle: 'Runway, Editorial & Commercial', icon: User },
  { id: 'Actor', title: 'Actor / Actress', subtitle: 'Film, TV Series & Theatre', icon: Drama },
  { id: 'Singer', title: 'Singer / Vocalist', subtitle: 'Playback, Bands & Live Performers', icon: Mic },
  { id: 'Painter', title: 'Painter / Visual Artist', subtitle: 'Fine Art, Canvas & Digital Art', icon: Palette },
  { id: 'Dancer', title: 'Dancer / Choreographer', subtitle: 'Classical, Modern & Commercial', icon: Activity },
  { id: 'Musician', title: 'Musician / Composer', subtitle: 'Instruments, Music Production', icon: Music },
  { id: 'Other', title: 'Other Creative Talent', subtitle: 'Voice Artist, Creator, Performers', icon: Briefcase },
];

// 🔹 Dynamic Specialties based on selected Category
const SPECIALTIES_BY_CATEGORY: Record<TalentCategory, string[]> = {
  Model: ['Fashion', 'Commercial', 'Editorial', 'Runway', 'Fitness', 'Catalog', 'Plus Size', 'Petite'],
  Actor: ['Film / Cinema', 'TV Series', 'Theatre', 'Commercials', 'Voiceover', 'Short Films'],
  Singer: ['Classical', 'Pop / Rock', 'Playback Singer', 'Western', 'Folk', 'Jazz / Blues'],
  Painter: ['Oil Painting', 'Digital Art', 'Abstract Art', 'Sketching', 'Murals', 'Watercolor'],
  Dancer: ['Classical Dance', 'Contemporary', 'Hip Hop', 'Bollywood', 'Ballet', 'Salsa'],
  Musician: ['Guitarist', 'Pianist', 'Drummer', 'Violinist', 'Music Producer', 'Composer'],
  Other: ['Performing Arts', 'Voice Artist', 'Content Creator', 'Stunt Artist', 'Creative Arts'],
};

// 🔹 Dynamic Validation Schema
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

  const handleCategorySelect = (category: TalentCategory) => {
    setValue('category', category, { shouldValidate: true });
    const categoryDefaults = SPECIALTIES_BY_CATEGORY[category] || [];
    if (categoryDefaults.length > 0) {
      setValue('specialties', [categoryDefaults[0]], { shouldValidate: true });
    }
    toast.success(`Role selected: ${category}`);
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

  // 🔹 Step Navigation Validation with Toast Alerts
  const goToNextStep = async () => {
    setApiError(null);
    if (step === 1) {
      const isValid = await trigger('category');
      if (isValid) {
        setStep(2);
      } else {
        toast.error(errors.category?.message || 'Please select a valid category');
      }
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
        // Find first error and show Toast alert
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

  // Profile Image Upload Handler
  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImageName(file.name);
    setProfileImagePreview(URL.createObjectURL(file));
    setProfileUploading(true);
    setApiError(null);

    const toastId = toast.loading('Uploading profile image...');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedUrl = extractUploadedUrl(data);
      if (!uploadedUrl) throw new Error('No URL returned from upload');
      setProfileImageUrl(uploadedUrl);
      toast.success('Profile image uploaded successfully!', { id: toastId });
    } catch (err) {
      console.error('Profile image upload failed:', err);
      toast.error('Profile image upload failed. Please try again.', { id: toastId });
      setProfileImageName(null);
      setProfileImagePreview(null);
    } finally { // 👈 Fixed: 'font-mono' replaced with 'finally'
      setProfileUploading(false);
    }
  };

  // Portfolio Images Upload Handler
  const handlePortfolioChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setPortfolioCount(files.length);
    setPortfolioUploading(true);
    setApiError(null);

    const toastId = toast.loading(`Uploading ${files.length} portfolio images...`);

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
      toast.error('Portfolio images failed to upload. Please try again.', { id: toastId });
      setPortfolioCount(0);
      setPortfolioUrls([]);
    } finally {
      setPortfolioUploading(false);
    }
  };

  // 🔹 Form Submission Handler
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

    const submitToast = toast.loading('Submitting talent application...');

    try {
      const res = await registerModel(payload as any);
      if (res.data?.success || res.status === 201) {
        toast.success('Application submitted successfully!', { id: submitToast });
        setIsSubmitted(true);
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      const msg = err.response?.data?.message || err.message || 'Registration failed';
      setApiError(msg);
      toast.error(msg, { id: submitToast });
    }
  };

  // 🔹 Triggered when Zod validation fails on form submit
  const onError = (formErrors: any) => {
    const errorKeys = Object.keys(formErrors);
    if (errorKeys.length > 0) {
      const firstError = formErrors[errorKeys[0]]?.message;
      toast.error(firstError || 'Please fill in all required fields correctly.');
    }
  };

  return (
    <GlassCard glow className="w-full max-w-3xl mx-auto my-6 p-6 sm:p-8">
      {/* Step Progress Bar */}
      {!isSubmitted && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
            <span className={step === 1 ? 'text-yellow-500 font-bold' : ''}>1. Select Role</span>
            <span className={step === 2 ? 'text-yellow-500 font-bold' : ''}>2. Basic Info</span>
            <span className={step === 3 ? 'text-yellow-500 font-bold' : ''}>3. Portfolio & Details</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-yellow-500"
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
            <div className="w-20 h-20 mx-auto rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center text-yellow-500 animate-pulse">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif-luxury text-3xl md:text-4xl font-bold text-white">
                Application Submitted Successfully
              </h2>
              <p className="text-yellow-500 text-sm tracking-widest uppercase font-mono">
                {selectedCategory} Roster Scouting 2026
              </p>
            </div>

            <p className="text-gray-300 text-sm md:text-base max-w-md mx-auto font-light leading-relaxed">
              Our casting team will review your digital profile within 24-48 hours. Please monitor your email for next steps.
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

            {/* 🔹 STEP 1: CATEGORY SELECTION WINDOW */}
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
                      What is your Creative Field?
                    </h2>
                    <span className="text-xs uppercase text-yellow-500 tracking-widest font-mono">
                      Step 1 of 3
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Click any option below to continue to registration.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {CATEGORY_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = selectedCategory === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleCategorySelect(opt.id)}
                        className={`p-4 rounded-xl text-left border transition-all duration-200 flex items-start gap-4 cursor-pointer hover:border-yellow-500 ${
                          isSelected
                            ? 'bg-yellow-500/20 border-yellow-500 text-white shadow-lg'
                            : 'bg-dark-bg/60 border-white/10 text-gray-400 hover:text-gray-200'
                        }`}
                      >
                        <div
                          className={`p-3 rounded-lg border ${
                            isSelected ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-white/5 border-white/10 text-yellow-500'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-white">{opt.title}</h3>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0" />}
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">{opt.subtitle}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Prominent Continue Button at Bottom */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-mono">
                    Selected: <strong className="text-yellow-500">{selectedCategory}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-yellow-400 transition-all shadow-md cursor-pointer"
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
                    <span className="text-xs uppercase text-yellow-500 tracking-widest font-mono">
                      Step 2 of 3 ({selectedCategory})
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Enter your contact & login details for your talent account.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="e.g. Alex Morgan"
                    {...register('fullName')}
                    error={errors.fullName?.message}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="alex@talent.com"
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
                  <label className="block text-xs uppercase tracking-widest font-semibold text-gray-300 mb-1.5">
                    Gender <span className="text-yellow-500">*</span>
                  </label>
                  <select
                    {...register('gender')}
                    className="w-full bg-dark-bg/80 text-white text-sm rounded-lg border border-white/10 px-3 py-3 focus:outline-none focus:border-yellow-500"
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
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium px-4 py-2.5 rounded-lg border border-white/10 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-yellow-400 transition-all cursor-pointer"
                  >
                    <span>Next: Portfolio & Skills</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* 🔹 STEP 3: SPECIALTIES, PHYSICALS & MEDIA UPLOAD */}
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
                      Specialties & Media Upload
                    </h2>
                    <span className="text-xs uppercase text-yellow-500 tracking-widest font-mono">
                      Step 3 of 3
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Select your skills and upload headshots/work samples.
                  </p>
                </div>

                {/* Dynamic Specialties */}
                <div className="space-y-3">
                  <h3 className="text-xs uppercase tracking-widest text-yellow-500 font-semibold">
                    {selectedCategory} Specialties <span className="text-yellow-500">*</span>
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
                                ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400 shadow-sm'
                                : 'bg-dark-bg/60 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200'
                            }`}
                          >
                            <div
                              className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                                isChecked ? 'bg-yellow-500 border-yellow-500 text-black' : 'border-gray-500'
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

                {/* Physical Statistics (Optional for non-models) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs uppercase tracking-widest text-yellow-500 font-semibold">
                      Physical Statistics
                    </h3>
                    {selectedCategory !== 'Model' && (
                      <span className="text-[10px] text-gray-400 italic">Optional for {selectedCategory}s</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <Input label="Height" placeholder='5"11" / 180cm' {...register('height')} />
                    <Input label="Weight" placeholder="125 lbs / 57kg" {...register('weight')} />
                    <Input label="Bust" placeholder='34"' {...register('bust')} />
                    <Input label="Waist" placeholder='24"' {...register('waist')} />
                    <Input label="Hips" placeholder='35"' {...register('hips')} />
                  </div>
                </div>

                {/* Bio / Description */}
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-gray-300 mb-1.5">
                    Short Bio / Experience Summary
                  </label>
                  <textarea
                    {...register('bio')}
                    rows={3}
                    placeholder={`Tell bookers about your experience as a ${selectedCategory}...`}
                    className="w-full bg-dark-bg/80 text-white text-sm rounded-lg border border-white/10 p-3 focus:outline-none focus:border-yellow-500"
                  />
                </div>

                {/* Media Upload Section */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs uppercase tracking-widest text-yellow-500 font-semibold">
                    Media & Portfolio Upload
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Profile Image Upload */}
                    <div className="p-4 rounded-xl border border-dashed border-white/20 hover:border-yellow-500 bg-dark-bg/40 text-center relative group transition-colors overflow-hidden">
                      {!profileImagePreview ? (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="flex flex-col items-center gap-2">
                            <div className="p-2.5 rounded-full bg-yellow-500/10 text-yellow-500 group-hover:scale-110 transition-transform">
                              <Camera className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-medium text-gray-200">Upload Profile Headshot</span>
                            <span className="text-[10px] text-gray-400">Clear frontal photo</span>
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
                            <div className="flex items-center justify-center gap-1.5 mt-2 text-[11px] text-yellow-500">
                              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...
                            </div>
                          ) : (
                            <p className="text-[11px] text-gray-300 mt-2 truncate">{profileImageName}</p>
                          )}
                          {!profileUploading && (
                            <button
                              type="button"
                              onClick={() => {
                                setProfileImageName(null);
                                setProfileImageUrl(null);
                                setProfileImagePreview(null);
                              }}
                              className="absolute -top-2 -right-2 bg-dark-bg border border-white/20 rounded-full p-1 text-gray-300 hover:text-white z-20"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Portfolio Images Upload */}
                    <div className="p-4 rounded-xl border border-dashed border-white/20 hover:border-yellow-500 bg-dark-bg/40 text-center relative group transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePortfolioChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-2.5 rounded-full bg-yellow-500/10 text-yellow-500 group-hover:scale-110 transition-transform">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        {portfolioUploading ? (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-yellow-500">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading {portfolioCount} images...
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-gray-200">
                            {portfolioUrls.length > 0
                              ? `${portfolioUrls.length} Images Uploaded`
                              : 'Upload Portfolio Photos / Artwork'}
                          </span>
                        )}
                        <span className="text-[10px] text-gray-400">Multiple images allowed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit & Back Buttons */}
                <div className="pt-4 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium px-4 py-3 rounded-lg border border-white/10 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || profileUploading || portfolioUploading}
                    className="flex-1 bg-yellow-500 text-black py-4 rounded-xl font-bold text-base hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
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