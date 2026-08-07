// app/dashboard/model/selection/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PageHeader } from './components/PageHeader';
import { ProgressCard } from './components/ProgressCard';
import { Timeline } from './components/Timeline';
import { AdminRemarksCard } from './components/AdminRemarksCard';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorState } from './components/ErrorState';
import { EmptyState } from './components/EmptyState';
import { SelectionData } from './components/Types';

export default function ModelSelectionPage() {
  const [selection, setSelection] = useState<SelectionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSelection = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
      
      const response = await axios.get('/api/selection', {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (response.data && response.data.success) {
        setSelection(response.data.selection);
      } else {
        setSelection(null);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Failed to fetch selection status.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSelection();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-4 md:p-8 space-y-6">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-4 md:p-8">
        <ErrorState message={error} onRetry={fetchSelection} />
      </div>
    );
  }

  if (!selection) {
    return (
      <div className="min-h-screen bg-black text-white p-4 md:p-8">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 space-y-6">
      <PageHeader
        currentRound={selection.currentRound}
        overallStatus={selection.overallStatus}
        updatedAt={selection.updatedAt}
      />
      <ProgressCard selection={selection} />
      <Timeline rounds={selection.rounds} currentRound={selection.currentRound} />
      <AdminRemarksCard remarks={selection.adminRemarks} />
    </div>
  );
}