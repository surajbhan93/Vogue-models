
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";

// ============================================
// 🔹 TYPES
// ============================================

interface Measurements {
  bust?: number | null;
  waist?: number | null;
  hips?: number | null;
}

interface SocialMedia {
  instagram?: string;
  twitter?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  portfolioWebsite?: string;
}

interface Model {
  _id: string;
  category?: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  profileImage?: string | null;
  coverImage?: string | null;
  dateOfBirth: string;
  height?: number | null;
  weight?: number | null;
  measurements?: Measurements;
  experience?: string;
  specialties?: string[];
  languages?: string[];
  availability?: string;
  willingToTravel?: boolean;
  role: string;
  status: string;
  isVerified: boolean;
  subscription?: string;
  views?: number;
  likes?: number;
  rating?: number;
  bio?: string;
  socialMedia?: SocialMedia;
  createdAt: string;
  updatedAt?: string;
}

// ============================================
// 🔹 COMPONENT
// ============================================

export default function ModelDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [model, setModel] = useState<Model | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);

  // ============================================
  // 🔹 FETCH MODEL DETAILS
  // ============================================

  const fetchModel = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/admin/models/${id}`);
      console.log("Talent Data:", response.data);

      if (response.data.success) {
        setModel(response.data.model);
      } else {
        setError("Failed to load talent details");
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      if (err.response?.status === 404) {
        setError("Profile not found");
      } else if (err.response?.status === 403) {
        setError("You don't have permission to view this profile");
      } else {
        setError(err.response?.data?.message || "Failed to load profile details");
      }
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // 🔹 VERIFY MODEL
  // ============================================

  const verifyModel = async () => {
    if (!model) return;

    try {
      setUpdating(true);
      const response = await api.patch(`/admin/models/${model._id}/verify`);

      if (response.data.success) {
        setModel(response.data.model);
        alert("✅ Profile verified successfully!");
      } else {
        alert("Failed to verify profile");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to verify profile");
    } finally {
      setUpdating(false);
    }
  };

  // ============================================
  // 🔹 UPDATE STATUS
  // ============================================

  const updateStatus = async (newStatus: string) => {
    if (!model) return;

    try {
      setUpdating(true);
      const response = await api.patch(`/admin/models/${model._id}/status`, {
        status: newStatus,
      });

      if (response.data.success) {
        setModel(response.data.model);
        alert(`✅ Status updated to ${newStatus}!`);
      } else {
        alert("Failed to update status");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  // ============================================
  // 🔹 DELETE MODEL
  // ============================================

  const deleteModel = async () => {
    if (!model) return;

    if (!confirm(`⚠️ Are you sure you want to delete "${model.name}"?`)) return;

    try {
      setUpdating(true);
      const response = await api.delete(`/admin/models/${model._id}`);

      if (response.data.success) {
        alert("🗑️ Profile deleted successfully!");
        router.push("/admin/models");
      } else {
        alert("Failed to delete profile");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete profile");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "#f39c12",
      active: "#2ecc71",
      suspended: "#e74c3c",
      inactive: "#95a5a6",
    };
    return colors[status] || "#95a5a6";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "⏳ Pending",
      active: "✅ Active",
      suspended: "🚫 Suspended",
      inactive: "💤 Inactive",
    };
    return labels[status] || status;
  };

  const formatDate = (date: string) => {
    if (!date) return "N/A";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const getAvailabilityColor = (availability?: string) => {
    if (!availability) return "#95a5a6";
    const colors: Record<string, string> = {
      Available: "#2ecc71",
      Limited: "#f39c12",
      Busy: "#e74c3c",
      "On Vacation": "#3498db",
    };
    return colors[availability] || "#95a5a6";
  };

  useEffect(() => {
    fetchModel();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <span className="text-6xl block mb-4">⚠️</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={fetchModel}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔄 Retry
            </button>
            <Link
              href="dashboard/admin/talent"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              ← Back to Talents
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <span className="text-6xl block mb-4">📭</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">The profile you're looking for doesn't exist.</p>
          <Link
            href="dashboard/admin/talent"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Talents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <Link
              href="/dashboard/admin/talent/"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1"
            >
              ← Back to Talents Roster
            </Link>
            <div className="flex items-center gap-3 mt-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{model.name}</h1>
              {/* Category Badge */}
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold uppercase tracking-wider">
                {model.category || 'Model'}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: getStatusColor(model.status) }}
              >
                {getStatusLabel(model.status)}
              </span>
              {model.isVerified && (
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-500 text-white">
                  ✓ Verified
                </span>
              )}
              {model.availability && (
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: getAvailabilityColor(model.availability) }}
                >
                  {model.availability}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={verifyModel}
              disabled={model.isVerified || updating}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                model.isVerified
                  ? 'bg-green-100 text-green-700 cursor-default'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {model.isVerified ? "✅ Verified" : "🔓 Verify Profile"}
            </button>
            <select
              onChange={(e) => updateStatus(e.target.value)}
              value={model.status}
              disabled={updating}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
            >
              <option value="pending">⏳ Pending</option>
              <option value="active">✅ Active</option>
              <option value="suspended">🚫 Suspended</option>
              <option value="inactive">💤 Inactive</option>
            </select>
            <button
              onClick={deleteModel}
              disabled={updating}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-all disabled:opacity-50 cursor-pointer"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
          <span className="text-3xl">👁️</span>
          <div>
            <p className="text-xl font-bold text-gray-800">{model.views || 0}</p>
            <p className="text-xs text-gray-500">Profile Views</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
          <span className="text-3xl">❤️</span>
          <div>
            <p className="text-xl font-bold text-gray-800">{model.likes || 0}</p>
            <p className="text-xs text-gray-500">Likes</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
          <span className="text-3xl">⭐</span>
          <div>
            <p className="text-xl font-bold text-gray-800">{model.rating || 0}</p>
            <p className="text-xs text-gray-500">Rating</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
          <span className="text-3xl">📅</span>
          <div>
            <p className="text-sm font-bold text-gray-800">{formatDate(model.createdAt)}</p>
            <p className="text-xs text-gray-500">Joined</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Profile Image */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {model.profileImage ? (
              <img
                src={model.profileImage}
                alt={model.name}
                className="w-full h-64 md:h-80 object-cover"
              />
            ) : (
              <div className="w-full h-64 md:h-80 bg-gradient-to-br from-purple-600 to-blue-600 flex flex-col items-center justify-center text-white">
                <span className="text-7xl mb-2">👤</span>
                <span className="text-lg font-medium opacity-80">No Profile Photo</span>
              </div>
            )}
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
              📋 Personal Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Category</span>
                <span className="text-gray-800 font-bold text-purple-600">{model.category || 'Model'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Name</span>
                <span className="text-gray-800 font-medium">{model.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Email</span>
                <a href={`mailto:${model.email}`} className="text-blue-600 hover:text-blue-800 font-medium">
                  {model.email}
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Phone</span>
                <a href={`tel:${model.phone}`} className="text-blue-600 hover:text-blue-800 font-medium">
                  {model.phone}
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Gender</span>
                <span className="text-gray-800 font-medium">{model.gender}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Date of Birth</span>
                <span className="text-gray-800 font-medium">{formatDate(model.dateOfBirth)}</span>
              </div>
            </div>
          </div>

          {/* Physical Attributes (Clean optional display for non-models) */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
              📏 Physical Attributes
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Height</span>
                <span className="text-gray-800 font-medium">
                  {model.height ? `${model.height} cm` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Weight</span>
                <span className="text-gray-800 font-medium">
                  {model.weight ? `${model.weight} kg` : 'N/A'}
                </span>
              </div>
              {model.measurements && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Bust</span>
                    <span className="text-gray-800 font-medium">
                      {model.measurements.bust ? `${model.measurements.bust} cm` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Waist</span>
                    <span className="text-gray-800 font-medium">
                      {model.measurements.waist ? `${model.measurements.waist} cm` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Hips</span>
                    <span className="text-gray-800 font-medium">
                      {model.measurements.hips ? `${model.measurements.hips} cm` : 'N/A'}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Professional Details */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
              💼 Professional Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Experience</span>
                <span className="text-gray-800 font-medium">{model.experience || "Not specified"}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-500 text-sm">Specialties</span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {model.specialties && model.specialties.length > 0 ? (
                    model.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {specialty}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">No specialties</span>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-500 text-sm">Languages</span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {model.languages && model.languages.length > 0 ? (
                    model.languages.map((language, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        {language}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">No languages</span>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Willing to Travel</span>
                <span className="text-gray-800 font-medium">
                  {model.willingToTravel ? "✅ Yes" : "❌ No"}
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {model.bio && (
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-3 pb-3 border-b border-gray-100">
                📝 Bio / Introduction
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{model.bio}</p>
            </div>
          )}

          {/* Subscription */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
              💰 Subscription
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Plan</span>
              <span className="text-lg font-bold">
                {model.subscription === "free" && "🆓 Free"}
                {model.subscription === "premium" && "💎 Premium"}
                {model.subscription === "vip" && "👑 VIP"}
                {!model.subscription && "🆓 Free"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}