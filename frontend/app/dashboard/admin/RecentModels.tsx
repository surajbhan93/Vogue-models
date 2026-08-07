// components/admin/RecentModels.tsx
'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Model {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export default function RecentModels({ token }: { token: string }) {
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    async function fetchModels() {
      try {
        const res = await api.get('/admin/models/recent', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setModels(res.data.data);
      } catch (error) {
        console.error("Failed to fetch models", error);
      }
    }
    fetchModels();
  }, [token]);

  return (
    <div className="mt-8 bg-[#111111] border border-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Recently Joined Models</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="text-xs uppercase bg-[#1a1a1a] rounded-lg">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Joined On</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model._id} className="border-b border-gray-800 hover:bg-[#1a1a1a] transition-colors">
                <td className="px-6 py-4 font-medium text-white">{model.name}</td>
                <td className="px-6 py-4">{model.email}</td>
                <td className="px-6 py-4">{model.phone}</td>
                <td className="px-6 py-4">{new Date(model.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {models.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-600">
                  No models found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}