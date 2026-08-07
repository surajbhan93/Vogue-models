'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserCircle,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  FileText,
  CreditCard,
  Mail,
  Award,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { api } from '@/lib/api';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuGroups = [
    {
      label: 'Overview',
      items: [
        { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
        { name: 'Talent Roster', href: '/dashboard/admin/talent', icon: Users },
        { name: 'Contest Panel', href: '/dashboard/admin/contests', icon: Award },
        { name: 'Blogs', href: '/dashboard/admin/blogs', icon: FileText },
        { name: 'Add Editorials', href: '/dashboard/admin/editorials', icon: FileText },
        { name: 'Payments', href: '/dashboard/admin/payments', icon: CreditCard },
      ],
    },
    {
      label: 'Account',
      items: [
        { name: 'My Profile', href: '/dashboard/admin/profile', icon: UserCircle },
        { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
        { name: 'Contact Us', href: '/dashboard/admin/contact', icon: Mail },
      ],
    },
  ];

  // 🔹 LOGOUT (Redirects to /login)
  const handleLogout = async () => {
    const toastId = toast.loading('Logging out...');
    try {
      await api.post('/admin/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all tokens & cookies
      localStorage.removeItem('accessToken');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('admin');
      localStorage.removeItem('modelToken');
      localStorage.removeItem('model');
      document.cookie = 'accessToken=; Max-Age=0; path=/';
      document.cookie = 'adminToken=; Max-Age=0; path=/';

      toast.success('Logged out successfully!', { id: toastId });
      router.replace('/login'); // 👈 Redirects cleanly to /login
    }
  };

  const isItemActive = (href: string) =>
    pathname === href || (href !== '/dashboard/admin' && pathname.startsWith(href));

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-amber-500" />
          Admin Console
        </h1>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden text-gray-400 hover:text-white cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {menuGroups.map((group) => (
          <div key={group.label}>
            <p className="px-4 mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500 font-mono">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = isItemActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-400 font-semibold'
                        : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        isActive
                          ? 'text-amber-400'
                          : 'text-gray-500 group-hover:text-white'
                      }`}
                    />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400/90 hover:bg-red-500/10 hover:text-red-400 transition-all font-semibold text-sm cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 bg-[#111111] border border-gray-800 rounded-lg text-gray-400 hover:text-white cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <aside className="hidden md:flex h-screen w-64 bg-[#111111] border-r border-gray-800 flex-col fixed left-0 top-0 z-40">
        <SidebarContent />
      </aside>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative w-64 h-full bg-[#111111] border-r border-gray-800 flex flex-col animate-in slide-in-from-left duration-300">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}