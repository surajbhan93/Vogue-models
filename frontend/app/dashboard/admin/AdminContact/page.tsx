// app/admin/AdminContact/page.tsx
'use client';

import React from 'react';
import { AdminProvider } from '@/context/AdminContext';
import AdminContactContent from './AdminContactContent';

export default function AdminContactPage() {
  return (
    <AdminProvider>
      <AdminContactContent />
    </AdminProvider>
  );
}