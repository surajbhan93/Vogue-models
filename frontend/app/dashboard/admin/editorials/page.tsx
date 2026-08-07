'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Camera, Plus, Trash2, Loader2, Sparkles } from 'lucide-react';

export default function AdminEditorialsPage() {
  const [editorials, setEditorials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Magazine Cover');
  const [magazineName, setMagazineName] = useState('Vogue');
  const [issueDate, setIssueDate] = useState('2026');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchEditorials();
  }, []);

  const fetchEditorials = async () => {
    setLoading(true);
    try {
      const res = await api.get('/editorials');
      if (res.data?.success) {
        setEditorials(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const url = data?.url || data?.data?.url || data?.secure_url;
      setImageUrl(url);
    } catch (err) {
      alert('Failed to upload image.');
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      alert('Please enter title and upload an image.');
      return;
    }

    try {
      await api.post('/editorials', {
        title,
        category,
        magazineName,
        issueDate,
        image: imageUrl,
      });

      alert('Editorial showcase added successfully!');
      setTitle('');
      setImageUrl('');
      setImagePreview(null);
      fetchEditorials();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create editorial.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this editorial?')) return;
    try {
      await api.delete(`/editorials/${id}`);
      fetchEditorials();
    } catch (err) {
      alert('Failed to delete editorial.');
    }
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Editorials & Runway Upload Manager</h1>
        <p className="text-sm text-gray-400 mt-1">
          Upload and manage latest magazine covers, fashion week showcases, and campaign photos.
        </p>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 max-w-2xl">
        <h2 className="text-lg font-bold text-yellow-500 flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add New Showcase Item
        </h2>

        <div>
          <label className="block text-xs text-gray-300 font-mono mb-1">TITLE</label>
          <input
            type="text"
            placeholder="e.g. Vogue Paris September Cover"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black text-white p-3 rounded-lg border border-white/10 text-sm focus:border-yellow-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-300 font-mono mb-1">CATEGORY</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black text-white p-3 rounded-lg border border-white/10 text-sm"
            >
              <option value="Magazine Cover">Magazine Cover</option>
              <option value="Runway Showcase">Runway Showcase</option>
              <option value="Brand Campaign">Brand Campaign</option>
              <option value="Editorial Shoot">Editorial Shoot</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-300 font-mono mb-1">MAGAZINE / BRAND</label>
            <input
              type="text"
              placeholder="e.g. Vogue / Gucci"
              value={magazineName}
              onChange={(e) => setMagazineName(e.target.value)}
              className="w-full bg-black text-white p-3 rounded-lg border border-white/10 text-sm"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-xs text-gray-300 font-mono mb-1">COVER / SHOWCASE IMAGE</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="text-xs text-gray-400" />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="w-24 h-32 object-cover rounded-lg mt-2 border border-yellow-500" />
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-yellow-400 disabled:opacity-50"
        >
          {uploading ? 'Uploading Image...' : 'Publish Showcase'}
        </button>
      </form>

      {/* Editorials List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Published Showcase List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {editorials.map((item) => (
            <div key={item._id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 relative">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-lg" />
              <h3 className="font-bold text-sm text-white">{item.title}</h3>
              <p className="text-xs text-yellow-500">{item.category} • {item.magazineName}</p>
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-6 right-6 p-2 bg-red-600/80 text-white rounded-full hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}