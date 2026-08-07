// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { api } from "@/lib/api";
// import {
//   User,
//   MapPin,
//   ShieldCheck,
//   ChevronLeft,
//   ChevronRight,
//   Ruler,
//   Instagram,
//   Twitter,
//   Facebook,
//   Youtube,
//   Music2,
//   Sparkles,
//   Eye,
//   Heart,
//   Plane,
//   X,
//   Play,
// } from "lucide-react";

// type PortfolioItem = {
//   _id: string;
//   type: "image" | "video";
//   url: string;
//   category?: string;
//   caption?: string;
//   isCover?: boolean;
// };

// const isYoutubeUrl = (url = "") => url.includes("youtube.com") || url.includes("youtu.be");

// const getYoutubeEmbedUrl = (url: string) => {
//   try {
//     if (url.includes("youtu.be")) {
//       const id = url.split("/").pop()?.split("?")[0];
//       return `https://www.youtube.com/embed/${id}`;
//     }
//     const id = new URL(url).searchParams.get("v");
//     return `https://www.youtube.com/embed/${id}`;
//   } catch {
//     return "";
//   }
// };

// export default function PublicModelDetailPage() {
//   const params = useParams();
//   // 🔹 FIX: folder is app/models/[id]/page.tsx, so the param key is "id", not "slug"
//   const slug = params?.id as string;

//   const [model, setModel] = useState<any | null>(null);
//   const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

//   useEffect(() => {
//     if (!slug) return;

//     const fetchModelDetail = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await api.get(`/models/${slug}`);
//         const payload = res.data;

//         // 🔹 FIX: real response shape is { success, model: {...}, portfolio: [...] }
//         const modelObj = payload?.model || payload?.data || payload;
//         const portfolioList: PortfolioItem[] = payload?.portfolio || [];

//         if (modelObj && (modelObj.name || modelObj._id)) {
//           setModel(modelObj);
//           setPortfolio(portfolioList);
//         } else {
//           setError("Model profile not found.");
//         }
//       } catch (err: any) {
//         setError(err.response?.data?.message || err.message || "Failed to load model profile.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchModelDetail();
//   }, [slug]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#07090e] flex flex-col items-center justify-center text-slate-400 space-y-4 relative overflow-hidden">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.08),transparent_60%)]" />
//         <div className="relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl flex flex-col items-center gap-3 shadow-2xl">
//           <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
//           <p className="text-xs font-medium text-slate-300 tracking-wide">Loading model portfolio...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !model) {
//     return (
//       <div className="min-h-screen bg-[#07090e] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(225,29,72,0.05),transparent_70%)]" />
//         <div className="relative max-w-md w-full p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl shadow-2xl flex flex-col items-center">
//           <div className="w-16 h-16 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-center mb-4 text-slate-500 shadow-inner">
//             <User className="w-8 h-8" />
//           </div>
//           <h2 className="text-2xl font-serif font-bold text-white tracking-wide">Model Profile Not Found</h2>
//           <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed">{error || "The model profile you are looking for does not exist."}</p>
//           <Link
//             href="/models"
//             className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
//           >
//             <ChevronLeft className="w-4 h-4" /> Back to Model Roster
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const social = model.socialMedia || {};
//   const loc = model.preferredLocation || {};

//   return (
//     <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-amber-500 selection:text-black pb-24 relative overflow-x-hidden">
//       {/* Background Ambient Studio Lighting */}
//       <div className="pointer-events-none fixed inset-0 z-0">
//         <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-[120px] rounded-full" />
//         <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-blue-600/5 blur-[140px] rounded-full" />
//         <div className="absolute top-2/3 -right-40 w-[600px] h-[600px] bg-purple-600/5 blur-[140px] rounded-full" />
//       </div>

//       {/* Cover / Banner Image Section */}
//       <div className="relative h-80 sm:h-[450px] w-full bg-slate-950 overflow-hidden">
//         <img
//           src={
//             model.coverImage ||
//             model.profileImage ||
//             "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80"
//           }
//           alt={model.name || "Model"}
//           className="w-full h-full object-cover object-center filter brightness-90 saturate-[1.05] transition-transform duration-1000 ease-out"
//         />

//         {/* Seamless Multi-Layer Background Blend Overlays */}
//         <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/80 via-transparent to-transparent h-32" />
//         <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/75 via-40% to-transparent" />

//         {/* Back Button Container */}
//         <div className="absolute top-6 left-6 right-6 flex items-center justify-between max-w-6xl mx-auto z-10">
//           <Link
//             href="/models"
//             className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/70 hover:bg-slate-900/90 border border-slate-700/50 text-xs font-semibold text-slate-200 backdrop-blur-md transition-all duration-300 shadow-xl hover:border-amber-500/40"
//           >
//             <ChevronLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
//             <span>Model Roster</span>
//           </Link>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-10 space-y-8">
        
//         {/* Header Profile Card */}
//         <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center md:items-end justify-between gap-6 transition-all duration-300 hover:border-slate-700/60">
//           <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            
//             {/* Avatar Profile */}
//             <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-2 border-amber-500/20 bg-slate-950 shadow-2xl shrink-0 ring-8 ring-slate-950/80 group">
//               <img
//                 src={
//                   model.profileImage ||
//                   (model.gender === "Female"
//                     ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
//                     : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80")
//                 }
//                 alt={model.name || "Model"}
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//             </div>

//             {/* Title & Info */}
//             <div className="space-y-3">
//               <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
//                 <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-white tracking-wide">{model.name}</h1>
//                 {model.isVerified && (
//                   <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
//                     <ShieldCheck className="w-3.5 h-3.5" /> Verified Model
//                   </span>
//                 )}
//               </div>

//               {loc.city && (
//                 <p className="text-xs sm:text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1.5 font-medium">
//                   <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
//                   {loc.city}, {loc.state || loc.country || "India"}
//                 </p>
//               )}

//               {/* Stat Badges */}
//               <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
//                 <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold shadow-sm">
//                   {model.experience || "Model"}
//                 </span>
//                 {model.gender && (
//                   <span className="px-3.5 py-1.5 rounded-xl bg-slate-950/80 text-slate-300 border border-slate-800 text-xs font-semibold">
//                     {model.gender}
//                   </span>
//                 )}
//                 {model.height && (
//                   <span className="px-3.5 py-1.5 rounded-xl bg-slate-950/80 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5">
//                     <Ruler className="w-3.5 h-3.5 text-amber-400" /> {model.height} cm
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Views & Quick Engagement Stats */}
//           <div className="flex items-center gap-5 text-slate-400 text-xs font-medium bg-slate-950/50 px-4 py-2.5 rounded-2xl border border-slate-800/60 backdrop-blur-md">
//             {typeof model.views === "number" && (
//               <span className="flex items-center gap-1.5 hover:text-slate-200 transition"><Eye className="w-4 h-4 text-slate-400" /> {model.views}</span>
//             )}
//             {typeof model.likes === "number" && (
//               <span className="flex items-center gap-1.5 hover:text-rose-400 transition"><Heart className="w-4 h-4 text-rose-400/80" /> {model.likes}</span>
//             )}
//             {model.willingToTravel && (
//               <span className="flex items-center gap-1.5 text-emerald-400 font-semibold"><Plane className="w-4 h-4 animate-pulse" /> Travels for work</span>
//             )}
//           </div>
//         </div>

//         {/* Content Details Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
//           {/* Left Column (Bio, Physical Stats, Specialties, Portfolio) */}
//           <div className="lg:col-span-2 space-y-8">
            
//             {/* Biography */}
//             {model.bio && (
//               <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl space-y-3 shadow-xl hover:border-slate-700/60 transition">
//                 <h3 className="text-base font-bold text-white flex items-center gap-2">
//                   <Sparkles className="w-4.5 h-4.5 text-amber-400" /> Biography & Portfolio Overview
//                 </h3>
//                 <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-normal">
//                   {model.bio}
//                 </p>
//               </div>
//             )}

//             {/* Physical Stats Grid */}
//             <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl space-y-5 shadow-xl hover:border-slate-700/60 transition">
//               <h3 className="text-base font-bold text-white flex items-center gap-2">
//                 <Ruler className="w-4.5 h-4.5 text-amber-400" /> Physical Statistics & Measurements
//               </h3>

//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
//                 <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1 hover:border-amber-500/30 transition">
//                   <span className="text-slate-400 font-medium block">Height</span>
//                   <p className="text-base font-bold text-white">{model.height ? `${model.height} cm` : "N/A"}</p>
//                 </div>
//                 <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1 hover:border-amber-500/30 transition">
//                   <span className="text-slate-400 font-medium block">Weight</span>
//                   <p className="text-base font-bold text-white">{model.weight ? `${model.weight} kg` : "N/A"}</p>
//                 </div>
//                 <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1 hover:border-amber-500/30 transition">
//                   <span className="text-slate-400 font-medium block">Hair Color</span>
//                   <p className="text-base font-bold text-white capitalize">{model.hairColor || "N/A"}</p>
//                 </div>
//                 <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1 hover:border-amber-500/30 transition">
//                   <span className="text-slate-400 font-medium block">Eye Color</span>
//                   <p className="text-base font-bold text-white capitalize">{model.eyeColor || "N/A"}</p>
//                 </div>
//               </div>

//               {model.measurements && (model.measurements.bust || model.measurements.waist || model.measurements.hips) && (
//                 <div className="pt-2">
//                   <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">Bust / Waist / Hips</span>
//                   <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 font-mono text-sm text-amber-300 font-bold text-center tracking-widest shadow-inner">
//                     {model.measurements.bust || "--"} - {model.measurements.waist || "--"} - {model.measurements.hips || "--"} inches
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Specialties */}
//             {model.specialties?.length > 0 && (
//               <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl space-y-4 shadow-xl">
//                 <h3 className="text-base font-bold text-white">Modeling Specialties</h3>
//                 <div className="flex flex-wrap gap-2.5">
//                   {model.specialties.map((spec: string, idx: number) => (
//                     <span key={idx} className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-semibold hover:border-amber-500/40 transition">
//                       {spec}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Languages */}
//             {model.languages?.length > 0 && (
//               <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl space-y-4 shadow-xl">
//                 <h3 className="text-base font-bold text-white">Languages</h3>
//                 <div className="flex flex-wrap gap-2.5">
//                   {model.languages.map((lang: string, idx: number) => (
//                     <span key={idx} className="px-4 py-2 rounded-xl bg-slate-950/80 text-slate-300 border border-slate-800 text-xs font-semibold">
//                       {lang}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Portfolio Gallery */}
//             {portfolio.length > 0 && (
//               <div className="space-y-4 pt-2">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-lg font-serif font-bold text-white tracking-wide">Portfolio Gallery</h3>
//                   <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
//                     {portfolio.length} {portfolio.length === 1 ? "Item" : "Items"}
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                   {portfolio.map((item, i) => {
//                     const isYt = item.type === "video" && isYoutubeUrl(item.url);
//                     return (
//                       <button
//                         key={item._id}
//                         onClick={() => setLightboxIndex(i)}
//                         className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 group focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300 hover:border-amber-500/40 hover:shadow-2xl"
//                       >
//                         {item.type === "image" ? (
//                           <img
//                             src={item.url}
//                             alt={item.caption || model.name}
//                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                           />
//                         ) : isYt ? (
//                           <div className="w-full h-full relative">
//                             <img
//                               src={`https://img.youtube.com/vi/${item.url.split(/[?&]v=|youtu\.be\//).pop()?.split("&")[0]}/hqdefault.jpg`}
//                               alt={item.caption || "Video"}
//                               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                             />
//                             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//                               <div className="w-10 h-10 rounded-full bg-amber-400/90 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
//                                 <Play className="w-5 h-5 fill-current ml-0.5" />
//                               </div>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="w-full h-full relative">
//                             <video src={item.url} className="w-full h-full object-cover" muted />
//                             <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
//                               <div className="w-10 h-10 rounded-full bg-amber-400/90 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
//                                 <Play className="w-5 h-5 fill-current ml-0.5" />
//                               </div>
//                             </div>
//                           </div>
//                         )}

//                         {item.isCover && (
//                           <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md shadow-md">
//                             Cover
//                           </span>
//                         )}

//                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
//                           {item.category && (
//                             <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wide">
//                               {item.category}
//                             </span>
//                           )}
//                           {item.caption && (
//                             <p className="text-xs text-slate-200 line-clamp-1 mt-0.5 font-normal">
//                               {item.caption}
//                             </p>
//                           )}
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column (Social Links & Status) */}
//           <div className="space-y-6">
//             <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl space-y-6 shadow-2xl sticky top-8 hover:border-slate-700/60 transition">
//               <h3 className="text-base font-bold text-white flex items-center justify-between border-b border-slate-800/80 pb-3">
//                 <span>Social Connections</span>
//                 <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
//               </h3>

//               {social.instagram || social.facebook || social.twitter || social.youtube || social.tiktok ? (
//                 <div className="space-y-3 text-xs">
//                   {social.instagram && (
//                     <a
//                       href={social.instagram}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-pink-950/30 to-purple-950/30 border border-pink-900/40 text-pink-300 hover:border-pink-500/50 hover:bg-pink-950/50 transition duration-300 font-semibold shadow-sm group"
//                     >
//                       <div className="p-2 rounded-xl bg-pink-500/10 group-hover:scale-110 transition-transform">
//                         <Instagram className="w-4 h-4 text-pink-400" />
//                       </div>
//                       <span>Instagram Profile</span>
//                     </a>
//                   )}
//                   {social.facebook && (
//                     <a
//                       href={social.facebook}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/30 to-slate-950/30 border border-blue-900/40 text-blue-300 hover:border-blue-500/50 hover:bg-blue-950/50 transition duration-300 font-semibold shadow-sm group"
//                     >
//                       <div className="p-2 rounded-xl bg-blue-500/10 group-hover:scale-110 transition-transform">
//                         <Facebook className="w-4 h-4 text-blue-400" />
//                       </div>
//                       <span>Facebook Profile</span>
//                     </a>
//                   )}
//                   {social.twitter && (
//                     <a
//                       href={social.twitter}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-slate-300 hover:border-sky-500/50 hover:bg-slate-900 transition duration-300 font-semibold shadow-sm group"
//                     >
//                       <div className="p-2 rounded-xl bg-sky-500/10 group-hover:scale-110 transition-transform">
//                         <Twitter className="w-4 h-4 text-sky-400" />
//                       </div>
//                       <span>Twitter Profile</span>
//                     </a>
//                   )}
//                   {social.youtube && (
//                     <a
//                       href={social.youtube}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-red-950/30 to-slate-950/30 border border-red-900/40 text-red-300 hover:border-red-500/50 hover:bg-red-950/50 transition duration-300 font-semibold shadow-sm group"
//                     >
//                       <div className="p-2 rounded-xl bg-red-500/10 group-hover:scale-110 transition-transform">
//                         <Youtube className="w-4 h-4 text-red-400" />
//                       </div>
//                       <span>YouTube Channel</span>
//                     </a>
//                   )}
//                   {social.tiktok && (
//                     <a
//                       href={social.tiktok}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-slate-300 hover:border-slate-400 hover:bg-slate-900 transition duration-300 font-semibold shadow-sm group"
//                     >
//                       <div className="p-2 rounded-xl bg-slate-800 group-hover:scale-110 transition-transform">
//                         <Music2 className="w-4 h-4 text-slate-300" />
//                       </div>
//                       <span>TikTok Profile</span>
//                     </a>
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-xs text-slate-500 italic text-center py-2">No social profiles attached.</p>
//               )}

//               {/* Status Details */}
//               <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400 space-y-3">
//                 <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800/60">
//                   <span className="text-slate-400 font-medium">Status</span>
//                   <span className="text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
//                     {model.status || "Active"}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800/60">
//                   <span className="text-slate-400 font-medium">Availability</span>
//                   <span className="text-amber-300 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
//                     {model.availability || "Available"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Lightbox Modal */}
//       {lightboxIndex !== null && portfolio[lightboxIndex] && (
//         <div
//           className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
//           onClick={() => setLightboxIndex(null)}
//         >
//           <button
//             onClick={() => setLightboxIndex(null)}
//             className="absolute top-5 right-5 p-3 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800 hover:border-amber-500/40 transition-all z-10"
//           >
//             <X className="w-5 h-5" />
//           </button>

//           {lightboxIndex > 0 && (
//             <button
//               onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
//               className="absolute left-3 sm:left-6 p-3 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800 hover:border-amber-500/40 transition-all z-10"
//             >
//               <ChevronLeft className="w-6 h-6" />
//             </button>
//           )}
//           {lightboxIndex < portfolio.length - 1 && (
//             <button
//               onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
//               className="absolute right-3 sm:right-6 p-3 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800 hover:border-amber-500/40 transition-all z-10"
//             >
//               <ChevronRight className="w-6 h-6" />
//             </button>
//           )}

//           <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
//             {portfolio[lightboxIndex].type === "image" ? (
//               <img
//                 src={portfolio[lightboxIndex].url}
//                 alt={portfolio[lightboxIndex].caption || model.name}
//                 className="w-full h-full max-h-[80vh] object-contain mx-auto rounded-2xl shadow-2xl border border-slate-800"
//               />
//             ) : isYoutubeUrl(portfolio[lightboxIndex].url) ? (
//               <iframe
//                 src={getYoutubeEmbedUrl(portfolio[lightboxIndex].url)}
//                 className="w-full aspect-video rounded-2xl border border-slate-800 shadow-2xl"
//                 allow="autoplay; encrypted-media; picture-in-picture"
//                 allowFullScreen
//               />
//             ) : (
//               <video src={portfolio[lightboxIndex].url} controls autoPlay className="w-full max-h-[80vh] rounded-2xl border border-slate-800 shadow-2xl" />
//             )}
//             {portfolio[lightboxIndex].caption && (
//               <p className="mt-4 text-center text-sm text-slate-200 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 backdrop-blur-md">
//                 {portfolio[lightboxIndex].caption}
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );


// }

import PublicModelDetailPage from "@/components/PublicModelDetailPage";

export default function ModelDetailPage() {
  return <PublicModelDetailPage />;
}