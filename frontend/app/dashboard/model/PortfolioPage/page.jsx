'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Images,
  Plus,
  Trash2,
  Star,
  X,
  UploadCloud,
  Link2,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';

const CATEGORIES = [
  'Fashion',
  'Commercial',
  'Runway',
  'Fitness',
  'Plus Size',
  'Petite',
  'Editorial',
  'Catalog',
  'Other',
];

const isYoutubeUrl = (url = '') => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

const getYoutubeEmbedUrl = (url) => {
  try {
    if (url.includes('youtu.be')) {
      const id = url.split('/').pop()?.split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    const id = new URL(url).searchParams.get('v');
    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return '';
  }
};

const EMPTY_FORM = { type: 'image', url: '', category: 'Other', caption: '' };

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showUpload, setShowUpload] = useState(false);
  const [uploadForm, setUploadForm] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);

  const [mode, setMode] = useState('file');
  const [filePreview, setFilePreview] = useState('');
  const [fileUploading, setFileUploading] = useState(false);
  const fileInputRef = useRef(null);

  const loadPortfolio = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/portfolio');
      if (data?.data && Array.isArray(data.data)) {
        setItems(data.data);
      }
    } catch (err) {
      console.error('Failed to load portfolio items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  const filtered = items.filter((i) => filter === 'all' || i.type === filter);

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setUploadForm((prev) => ({
      ...prev,
      url,
      type: isYoutubeUrl(url) ? 'video' : prev.type,
    }));
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFilePreview(URL.createObjectURL(file));
    setFileUploading(true);

    const toastId = toast.loading('Uploading media file...');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedUrl =
        data?.url || data?.data?.url || data?.secure_url || data?.data?.secure_url || data?.file?.url;

      if (!uploadedUrl) throw new Error('No URL in response');

      setUploadForm((prev) => ({
        ...prev,
        url: uploadedUrl,
        type: file.type.startsWith('video') ? 'video' : 'image',
      }));

      toast.success('Media uploaded successfully!', { id: toastId });
    } catch (err) {
      console.error('File upload failed:', err);
      toast.error('Upload failed, please try again.', { id: toastId });
      setFilePreview('');
    } finally {
      setFileUploading(false);
    }
  };

  const clearSelectedFile = () => {
    setFilePreview('');
    setUploadForm((prev) => ({ ...prev, url: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const switchMode = (next) => {
    setMode(next);
    setFilePreview('');
    setUploadForm((prev) => ({ ...prev, url: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const closeModal = () => {
    setShowUpload(false);
    setUploadForm(EMPTY_FORM);
    setFilePreview('');
    setMode('file');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadForm.url || fileUploading) return;
    setUploading(true);

    const toastId = toast.loading('Saving to portfolio...');

    try {
      await api.post('/portfolio', uploadForm);
      toast.success('Added to portfolio!', { id: toastId });
      closeModal();
      loadPortfolio();
    } catch (err) {
      toast.error('Failed to add portfolio item.', { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;
    const toastId = toast.loading('Deleting...');
    try {
      await api.delete(`/portfolio/${id}`);
      toast.success('Deleted successfully!', { id: toastId });
      loadPortfolio();
    } catch (err) {
      toast.error('Failed to delete.', { id: toastId });
    }
  };

  const handleSetCover = async (id) => {
    const toastId = toast.loading('Setting cover photo...');
    try {
      await api.patch(`/portfolio/${id}/cover`);
      toast.success('Set as cover photo!', { id: toastId });
      loadPortfolio();
    } catch (err) {
      toast.error('Failed to set cover.', { id: toastId });
    }
  };

  const urlIsYoutube = isYoutubeUrl(uploadForm.url);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-7xl mx-auto selection:bg-amber-500 selection:text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-tight">
              Media Portfolio &amp; Gallery
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage your high-resolution photos, composite cards, and video reels.
          </p>
        </div>

        <button
          onClick={() => setShowUpload(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider hover:from-amber-200 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Media</span>
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {['all', 'image', 'video'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all cursor-pointer border ${
              filter === f
                ? 'bg-amber-500 text-black border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
            }`}
          >
            {f === 'all' ? 'All Media' : `${f}s`}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3 text-slate-400">
          <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
          <p className="text-xs">Loading media portfolio...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-800 rounded-3xl space-y-4">
          <Images className="w-12 h-12 text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">No media uploaded yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Upload high-resolution headshots, fashion tests, and video reels to showcase to bookers.
            </p>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="inline-flex items-center gap-2 bg-amber-500 text-black px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Upload First Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((item) => {
            const isVideo = item.type === 'video';
            const isYt = isVideo && isYoutubeUrl(item.url);

            return (
              <div
                key={item._id}
                className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-1"
              >
                <div className="aspect-[3/4] bg-slate-950 relative overflow-hidden">
                  {!isVideo ? (
                    <img
                      src={item.url}
                      alt={item.caption || 'Portfolio media'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : isYt ? (
                    <iframe
                      src={getYoutubeEmbedUrl(item.url)}
                      title={item.caption || 'YouTube video'}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video src={item.url} controls className="w-full h-full object-cover" />
                  )}

                  {item.isCover && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-black text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md z-10">
                      Cover
                    </span>
                  )}

                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3 gap-2 z-10">
                    {item.type === 'image' && !item.isCover && (
                      <button
                        onClick={() => handleSetCover(item._id)}
                        className="p-2.5 rounded-full bg-slate-900 border border-slate-700 text-amber-400 hover:bg-amber-500 hover:text-black transition cursor-pointer"
                        title="Set as Cover Photo"
                      >
                        <Star className="w-4 h-4 fill-amber-400" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2.5 rounded-full bg-slate-900 border border-slate-700 text-rose-400 hover:bg-rose-600 hover:text-white transition cursor-pointer"
                      title="Delete Media"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 flex items-center justify-between border-t border-slate-800 text-xs">
                  <span className="text-amber-400 font-mono font-bold uppercase text-[10px]">
                    {item.category || 'Portfolio'}
                  </span>
                  <span className="text-slate-500 text-[10px] capitalize">{item.type}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-slate-900 border border-amber-500/20 rounded-3xl p-6 relative shadow-2xl space-y-5">
            <button
              onClick={closeModal}
              className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" /> Upload Portfolio Media
              </h2>
              <p className="text-xs text-slate-400">Choose a file from your device or paste a URL link.</p>
            </div>

            {/* Mode Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-950 border border-slate-800">
              <button
                type="button"
                onClick={() => switchMode('file')}
                className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                  mode === 'file'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UploadCloud className="w-4 h-4" /> Upload File
              </button>
              <button
                type="button"
                onClick={() => switchMode('link')}
                className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                  mode === 'link'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Link2 className="w-4 h-4" /> Paste Link
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4 text-xs">
              {mode === 'file' ? (
                <div>
                  <label className="block text-slate-300 font-mono uppercase tracking-wider mb-1">
                    Media File
                  </label>
                  {!filePreview ? (
                    <label className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950 p-6 text-center cursor-pointer hover:border-amber-500 transition-colors">
                      <UploadCloud className="w-8 h-8 text-amber-400" />
                      <span className="text-xs font-bold text-slate-200">Choose photo or video</span>
                      <span className="text-[10px] text-slate-500">JPG, PNG, MP4, WEBP supported</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </label>
                  ) : (
                    <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
                      {uploadForm.type === 'video' ? (
                        <video src={filePreview} className="h-44 w-full object-cover" muted />
                      ) : (
                        <img src={filePreview} alt="Preview" className="h-44 w-full object-cover" />
                      )}

                      {fileUploading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-950/70">
                          <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
                          <span className="text-xs font-bold text-amber-300">Uploading...</span>
                        </div>
                      )}

                      {!fileUploading && (
                        <button
                          type="button"
                          onClick={clearSelectedFile}
                          className="absolute right-2 top-2 rounded-full bg-slate-950/90 p-1.5 text-slate-300 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-slate-300 font-mono uppercase tracking-wider mb-1">
                    Media URL
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                    placeholder="https://..."
                    value={uploadForm.url}
                    onChange={handleUrlChange}
                    required
                  />
                  {urlIsYoutube && (
                    <p className="text-[10px] text-amber-400 mt-1">
                      YouTube link detected — type automatically set to Video.
                    </p>
                  )}
                </div>
              )}

              {/* Type Select */}
              <div>
                <label className="block text-slate-300 font-mono uppercase tracking-wider mb-1">
                  Media Type
                </label>
                <select
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white focus:border-amber-500 focus:outline-none disabled:opacity-50"
                  value={uploadForm.type}
                  onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })}
                  disabled={urlIsYoutube || mode === 'file'}
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-slate-300 font-mono uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-slate-300 font-mono uppercase tracking-wider mb-1">
                  Caption (Optional)
                </label>
                <input
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  placeholder="e.g. Vogue Editorial Shoot"
                  value={uploadForm.caption}
                  onChange={(e) => setUploadForm({ ...uploadForm, caption: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={uploading || fileUploading || !uploadForm.url}
                className="w-full rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 py-3.5 font-bold text-xs uppercase tracking-wider text-black transition hover:from-amber-200 hover:to-amber-400 disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                {uploading ? 'Saving to Portfolio...' : fileUploading ? 'Uploading File...' : 'Add to Portfolio'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}