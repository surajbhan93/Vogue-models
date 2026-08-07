// app/admin/layout.tsx
import AdminSidebar from '@/components/admin/AdminSidebar';
import { AdminProvider } from '@/context/AdminContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-[#0b0d17] text-white flex">
        {/* Render Sidebar ONLY ONCE here */}
        <AdminSidebar />

        {/* Main Content Offset BY 64 ONCE */}
        <main className="flex-1 md:ml-64 min-h-screen p-4 sm:p-6 md:p-8 w-full">
          {children}
        </main>
      </div>
    </AdminProvider>
  );
}