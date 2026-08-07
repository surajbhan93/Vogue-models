"use client";

import React, { useState } from "react";
import { Contest, Round, Prize } from "../types";
import { DEFAULT_CONTEST_FORM } from "../constants";
import { ContestRounds } from "./ContestRounds";
import { ContestPrizes } from "./ContestPrizes";
import { ContestPreview } from "./ContestPreview";
import { slugify } from "@/lib/utils";
import {
  FileText,
  Calendar,
  ShieldCheck,
  MapPin,
  Layers,
  Trophy,
  Eye,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface ContestFormProps {
  initialData?: Partial<Contest>;
  onSubmit: (data: Partial<Contest>) => Promise<boolean>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const ContestForm: React.FC<ContestFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<Partial<Contest>>({
    ...DEFAULT_CONTEST_FORM,
    ...initialData,
  });

  const steps = [
    { number: 1, title: "Basic Info", icon: FileText },
    { number: 2, title: "Registration", icon: Calendar },
    { number: 3, title: "Eligibility", icon: ShieldCheck },
    { number: 4, title: "Location", icon: MapPin },
    { number: 5, title: "Rounds", icon: Layers },
    { number: 6, title: "Prizes", icon: Trophy },
    { number: 7, title: "Preview", icon: Eye },
  ];

  const updateField = (field: string, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "title") {
        updated.slug = slugify(value);
      }
      return updated;
    });
  };

  const updateNestedField = (parent: string, child: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] || {}),
        [child]: value,
      },
    }));
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmitForm} className="space-y-6">
      {/* Multi-Step Indicator Header */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center justify-between min-w-[640px] px-2">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <div
                key={step.number}
                onClick={() => setCurrentStep(step.number)}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs border transition-all ${
                    isCompleted
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                      : isActive
                      ? "bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/40 scale-110"
                      : "bg-slate-900 text-slate-500 border-slate-800 group-hover:border-slate-700"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.number}
                </div>
                <span
                  className={`text-xs font-semibold whitespace-nowrap transition ${
                    isActive
                      ? "text-blue-400 font-bold"
                      : isCompleted
                      ? "text-slate-300"
                      : "text-slate-500 group-hover:text-slate-400"
                  }`}
                >
                  {step.title}
                </span>
                {step.number < 7 && <ChevronRight className="w-4 h-4 text-slate-700 mx-1" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 backdrop-blur-md min-h-[380px]">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
              <FileText className="w-4 h-4 text-blue-400" /> Basic Contest Details
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Contest Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ""}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="e.g. Mr. India Fashion Hunt 2026"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">URL Slug</label>
                <input
                  type="text"
                  value={formData.slug || ""}
                  onChange={(e) => updateField("slug", e.target.value)}
                  placeholder="mr-india-fashion-hunt-2026"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-2 text-slate-400 font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Banner Image URL</label>
                <input
                  type="url"
                  value={formData.bannerImage || ""}
                  onChange={(e) => updateField("bannerImage", e.target.value)}
                  placeholder="https://cdn.example.com/banners/mr-india-fashion-hunt-2026.jpg"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Description</label>
                <textarea
                  rows={4}
                  value={formData.description || ""}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Provide complete competition details, rules, and overview..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured || false}
                  onChange={(e) => updateField("isFeatured", e.target.checked)}
                  className="w-4 h-4 rounded border-slate-800 text-blue-600 focus:ring-blue-500 bg-slate-950"
                />
                <label htmlFor="isFeatured" className="text-xs font-semibold text-slate-200 cursor-pointer">
                  Feature this contest on home hero banner & highlighted section
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Registration */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Calendar className="w-4 h-4 text-emerald-400" /> Registration & Pricing
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Registration Start Date</label>
                <input
                  type="datetime-local"
                  value={formData.registrationStart ? formData.registrationStart.substring(0, 16) : ""}
                  onChange={(e) => updateField("registrationStart", new Date(e.target.value).toISOString())}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Registration End Date</label>
                <input
                  type="datetime-local"
                  value={formData.registrationEnd ? formData.registrationEnd.substring(0, 16) : ""}
                  onChange={(e) => updateField("registrationEnd", new Date(e.target.value).toISOString())}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Registration Fee (₹)</label>
                <input
                  type="number"
                  value={formData.registrationFee ?? 0}
                  onChange={(e) => updateField("registrationFee", Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">Set to 0 for free initial registration</span>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Participation Fee (₹)</label>
                <input
                  type="number"
                  value={formData.participationFee ?? 999}
                  onChange={(e) => updateField("participationFee", Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">Required for shortlisted candidates</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Eligibility */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="w-4 h-4 text-purple-400" /> Participant Eligibility
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Minimum Age</label>
                <input
                  type="number"
                  value={formData.eligibility?.minAge ?? 18}
                  onChange={(e) => updateNestedField("eligibility", "minAge", Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Maximum Age</label>
                <input
                  type="number"
                  value={formData.eligibility?.maxAge ?? 30}
                  onChange={(e) => updateNestedField("eligibility", "maxAge", Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Gender Restriction</label>
                <select
                  value={formData.eligibility?.gender ?? "Male"}
                  onChange={(e) => updateNestedField("eligibility", "gender", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="Male">Male Only</option>
                  <option value="Female">Female Only</option>
                  <option value="All">All Genders / Open</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Location */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
              <MapPin className="w-4 h-4 text-rose-400" /> Event Location & Venue
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">City</label>
                <input
                  type="text"
                  value={formData.location?.city ?? "Mumbai"}
                  onChange={(e) => updateNestedField("location", "city", e.target.value)}
                  placeholder="e.g. Mumbai"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">State</label>
                <input
                  type="text"
                  value={formData.location?.state ?? "Maharashtra"}
                  onChange={(e) => updateNestedField("location", "state", e.target.value)}
                  placeholder="e.g. Maharashtra"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Country</label>
                <input
                  type="text"
                  value={formData.location?.country ?? "India"}
                  onChange={(e) => updateNestedField("location", "country", e.target.value)}
                  placeholder="e.g. India"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Venue / Auditorium</label>
                <input
                  type="text"
                  value={formData.location?.venue ?? "Phoenix Convention Centre"}
                  onChange={(e) => updateNestedField("location", "venue", e.target.value)}
                  placeholder="e.g. Phoenix Convention Centre"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Rounds */}
        {currentStep === 5 && (
          <ContestRounds
            rounds={formData.rounds || []}
            onChange={(rounds) => updateField("rounds", rounds)}
          />
        )}

        {/* Step 6: Prizes */}
        {currentStep === 6 && (
          <ContestPrizes
            prizes={formData.prizes || []}
            onChange={(prizes) => updateField("prizes", prizes)}
          />
        )}

        {/* Step 7: Preview */}
        {currentStep === 7 && <ContestPreview formData={formData} />}
      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg transition"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            Cancel
          </button>

          {currentStep < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5"
            >
              Next Step <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg shadow-xl shadow-emerald-600/30 transition transform hover:scale-[1.02] disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              {isSubmitting ? "Saving..." : initialData?.id ? "Update Contest" : "Save & Create Contest"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
