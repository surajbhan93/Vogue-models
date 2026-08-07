"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { ModelData } from "@/types/home";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FeaturedModelCard } from "./FeaturedModelCard";

interface ModelProfile {
  _id: string;
  name: string;
  slug: string;
  gender?: string;
  profileImage?: string;
  preferredLocation?: {
    city?: string;
    state?: string;
    country?: string;
  };
  experience?: string;
  specialties?: string[];
  rating?: number;
  isVerified?: boolean;
  isFeatured?: boolean;
  height?: number;
  weight?: number;
  dateOfBirth?: string;
}

const FALLBACK_FEATURED_MODELS: ModelData[] = [
  {
    id: "fallback-1",
    name: "Elena Rostova",
    slug: "elena-rostova",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    gender: "Female",
    location: "Paris / Milan",
    category: "Haute Couture",
    experience: "International Runway",
    rating: 5,
    isVerified: true,
    isFeatured: true,
    height: 178,
  },
  {
    id: "fallback-2",
    name: "Marcus Vance",
    slug: "marcus-vance",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    gender: "Male",
    location: "New York / London",
    category: "Editorial Menswear",
    experience: "Commercial & Vogue Covers",
    rating: 5,
    isVerified: true,
    isFeatured: true,
    height: 188,
  },
  {
    id: "fallback-3",
    name: "Sophia Chen",
    slug: "sophia-chen",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    gender: "Female",
    location: "Tokyo / Mumbai",
    category: "Beauty & High Fashion",
    experience: "Global Luxury Campaigns",
    rating: 5,
    isVerified: true,
    isFeatured: true,
    height: 175,
  },
];

const getAge = (dob?: string) => {
  if (!dob) return undefined;
  const birth = new Date(dob);
  if (isNaN(birth.getTime())) return undefined;
  const diff = Date.now() - birth.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

function mapModelProfileToModelData(model: ModelProfile): ModelData {
  return {
    id: model._id,
    name: model.name,
    slug: model.slug,
    image: model.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    gender: model.gender,
    location: model.preferredLocation?.city
      ? `${model.preferredLocation.city}${
          model.preferredLocation.state ? ` / ${model.preferredLocation.state}` : ""
        }`
      : "Paris / Milan",
    category: model.specialties?.[0] || model.experience || "High Fashion",
    experience: model.experience,
    rating: model.rating || 5,
    isVerified: model.isVerified ?? true,
    isFeatured: model.isFeatured ?? true,
    height: model.height,
    weight: model.weight,
    age: getAge(model.dateOfBirth),
  };
}

export function FeaturedModels() {
  const [models, setModels] = useState<ModelData[]>(FALLBACK_FEATURED_MODELS);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeaturedModels = async () => {
      setLoading(true);
      try {
        let res;
        try {
          res = await api.get("/models?featured=true");
        } catch (err: any) {
          if (err.response?.status === 404) {
            try {
              res = await api.get("/api/models?featured=true");
            } catch (innerErr) {
              res = null;
            }
          } else {
            res = null;
          }
        }

        if (res && res.data) {
          const payload = res.data;
          let list: ModelProfile[] = [];

          if (Array.isArray(payload)) {
            list = payload;
          } else if (Array.isArray(payload?.data)) {
            list = payload.data;
          } else if (Array.isArray(payload?.models)) {
            list = payload.models;
          } else if (payload?.data && typeof payload.data === "object") {
            const d = payload.data;
            if (Array.isArray(d.models)) list = d.models;
            else if (Array.isArray(d.data)) list = d.data;
          }

          const featuredOnly = list.filter((m) => m.isFeatured);
          const finalList = featuredOnly.length > 0 ? featuredOnly : list;

          if (finalList.length > 0) {
            setModels(finalList.map(mapModelProfileToModelData));
          }
        }
      } catch (err) {
        console.warn("Using fallback featured models due to API rate limit / error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedModels();
  }, []);

  return (
    <SectionContainer>
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 space-y-4 md:space-y-0">
        <SectionHeading
          badge="Curated Talent Roster"
          title="Featured Icons"
          subtitle="Top international runway, editorial, and commercial models represented by AURA Couture."
        />
        <Link
          href="/models"
          className="group inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-gold-400 hover:text-white transition-colors"
        >
          <span>View All Talent ({models.length})</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-16 text-slate-400 space-y-3">
          <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
          <p className="text-xs font-medium">Loading featured models...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model) => (
            <FeaturedModelCard key={model.id} model={model} />
          ))}
        </div>
      )}
    </SectionContainer>
  );
}