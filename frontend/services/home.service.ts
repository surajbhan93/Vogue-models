import { api } from "@/lib/api";
import { ModelData } from "@/types/home";
import { ModelProfile } from "@/types/model";
import { CATEGORIES_DATA, STATS_DATA, TESTIMONIALS_DATA } from "@/constants/home";

const FALLBACK_MODELS: ModelData[] = [
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

// Convert backend ModelProfile to frontend ModelData
function mapModelProfileToModelData(model: ModelProfile): ModelData {
  return {
    id: model._id || model.id || 'model-id',
    name: model.name || 'Featured Talent',
    slug: model.slug || 'talent',
    image: model.profileImage || model.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    location: model.preferredLocation?.city || model.city || "Paris / Milan",
    rating: model.rating || 5,
    isVerified: model.isVerified ?? true,
    isFeatured: true,
  };
}

export async function getHomePageData() {
  let featuredModels: ModelData[] = FALLBACK_MODELS;

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

      if (list.length > 0) {
        featuredModels = list.map(mapModelProfileToModelData);
      }
    }
  } catch (err) {
    console.warn("Failed to load live featured models, using fallback data.");
  }

  return {
    featuredModels,
    categories: CATEGORIES_DATA || [],
    stats: STATS_DATA || [],
    galleryItems: [],
    testimonials: TESTIMONIALS_DATA || [],
  };
}