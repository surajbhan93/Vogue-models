'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { api } from '@/lib/api';
import {
  LayoutDashboard,
  User,
  Settings,
  Lock,
  LogOut,
  Calendar,
  MessageSquare,
  Bell,
  CreditCard,
  Briefcase,
  Clock,
  Star,
  Users,
  FileText,
  ChevronRight,
  Menu,
  X,
  Trophy,
  Sparkles,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: number;
}

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    bookings: true,
    communication: true,
    applications: true,
    payments: false,
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  // 🔹 Real Logged-in User State & Badges
  const [currentUser, setCurrentUser] = useState<{
    name?: string;
    profileImage?: string;
    category?: string;
  } | null>(null);

  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
  const [pendingBookings, setPendingBookings] = useState<number>(0);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Fetch Profile & Live Badge Data from Backend API
  useEffect(() => {
    try {
      const stored = localStorage.getItem('model');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse user from localStorage');
    }

    const fetchSidebarData = async () => {
      try {
        // 1. Fetch Profile Data
        let profileRes;
        try {
          profileRes = await api.get('/models/profile/me');
        } catch (err: any) {
          if (err.response?.status === 404) {
            profileRes = await api.get('/api/models/profile/me');
          } else {
            throw err;
          }
        }

        if (profileRes.data?.success && profileRes.data?.model) {
          setCurrentUser(profileRes.data.model);
          localStorage.setItem('model', JSON.stringify(profileRes.data.model));
        }

        // 2. Fetch Live Unread Notifications / Messages Counter
        try {
          const statsRes = await api.get('/contests/my-dashboard');
          if (statsRes.data?.data?.myParticipations) {
            setPendingBookings(statsRes.data.data.myParticipations.length);
          }
        } catch (sErr) {
          // Silently ignore if counter endpoint is not available
        }
      } catch (err) {
        console.error('Sidebar API fetch error:', err);
      }
    };

    fetchSidebarData();
  }, []);

  // Logout Handler
  const handleLogout = async () => {
    const toastId = toast.loading('Logging out...');
    try {
      await api.post('/models/logout');
    } catch (error) {
      console.error('Logout Error:', error);
    } finally {
      localStorage.removeItem('model');
      localStorage.removeItem('modelToken');
      localStorage.removeItem('accessToken');
      document.cookie = 'accessToken=; Max-Age=0; path=/';
      toast.success('Logged out successfully!', { id: toastId });
      router.replace('/login');
    }
  };

  const toggleMenu = (key: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isActive = (href: string) => {
    if (href === '/dashboard/model') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const mainNavItems: NavItem[] = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', href: '/dashboard/model' },
    { icon: <User size={18} />, label: 'My Profile', href: '/dashboard/model/profile' },
    { icon: <Settings size={18} />, label: 'Edit Profile', href: '/dashboard/model/edit-profile' },
    { icon: <Settings size={18} />, label: 'Upload Media', href: '/dashboard/model/PortfolioPage' },
  ];

  const applicationsNavItems: NavItem[] = [
    { icon: <Trophy size={17} />, label: 'Contests & Auditions', href: '/dashboard/model/contests' },
    { icon: <Briefcase size={17} />, label: 'My Applications', href: '/dashboard/model/applications' },
    { icon: <FileText size={17} />, label: 'Apply Now', href: '/dashboard/model/apply' },
    { icon: <Users size={17} />, label: 'Casting Calls', href: '/dashboard/model/casting' },
  ];

  const bookingNavItems: NavItem[] = [
    { icon: <Calendar size={17} />, label: 'My Bookings', href: '/dashboard/model/bookings', badge: pendingBookings },
    { icon: <Clock size={17} />, label: 'Availability', href: '/dashboard/model/availability' },
    { icon: <Star size={17} />, label: 'Reviews', href: '/dashboard/model/reviews' },
  ];

  const communicationNavItems: NavItem[] = [
    { icon: <MessageSquare size={17} />, label: 'Messages', href: '/dashboard/model/messages', badge: unreadMessages },
    { icon: <Bell size={17} />, label: 'Notifications', href: '/dashboard/model/notifications', badge: unreadNotifications },
  ];

  

  const paymentNavItems: NavItem[] = [
    { icon: <CreditCard size={17} />, label: 'Payments', href: '/dashboard/model/payments' },
    { icon: <CreditCard size={17} />, label: 'Subscription', href: '/dashboard/model/subscription' },
  ];

  const renderNavItems = (items: NavItem[], isSub: boolean = false) => {
    return items.map((item) => {
      const active = isActive(item.href);
      return (
        <Link
          key={item.href}
          href={item.href}
          className={`
            group relative flex items-center justify-between gap-3 px-3.5 py-3 rounded-2xl
            transition-all duration-200 min-h-[44px] cursor-pointer
            ${isSub ? 'ml-5 pl-3.5 text-xs' : 'text-xs font-semibold'}
            ${active
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-md shadow-amber-500/10'
              : 'text-slate-300 hover:bg-white/10 hover:text-white'
            }
          `}
        >
          {active && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r bg-amber-400" />
          )}
          <div className="flex items-center gap-3 min-w-0">
            <span className={`shrink-0 ${active ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-300'}`}>
              {item.icon}
            </span>
            <span className="truncate">{item.label}</span>
          </div>
          {typeof item.badge === 'number' && item.badge > 0 && (
            <span className="shrink-0 bg-amber-500 text-black text-[10px] leading-none px-2 py-1 rounded-full font-bold min-w-[18px] text-center">
              {item.badge}
            </span>
          )}
        </Link>
      );
    });
  };

  const renderCollapsibleSection = (
    title: string,
    key: string,
    items: NavItem[],
    icon: React.ReactNode
  ) => {
    const isExpanded = expandedMenus[key];
    const hasActiveSub = items.some((item) => isActive(item.href));

    return (
      <div className="pt-1">
        <button
          onClick={() => toggleMenu(key)}
          className={`
            w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer min-h-[40px]
            ${hasActiveSub ? 'text-amber-300 font-bold' : 'text-slate-400 hover:text-slate-200'}
          `}
        >
          <div className="flex items-center gap-2">
            <span className={hasActiveSub ? 'text-amber-400' : 'text-slate-400'}>{icon}</span>
            <span className="text-[10px] uppercase tracking-widest font-bold font-mono">{title}</span>
          </div>
          <ChevronRight
            size={14}
            className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
          />
        </button>
        <div
          className={`grid transition-all duration-200 ease-in-out ${
            isExpanded ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden space-y-1">{renderNavItems(items, true)}</div>
        </div>
      </div>
    );
  };

  const sidebarBody = (
    <aside className="w-72 h-full bg-slate-900/95 border-r border-amber-500/20 backdrop-blur-2xl text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Brand Header */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-amber-500/20 shrink-0">
        <Link href="/dashboard/model" className="group">
          <h1 className="text-xl font-serif font-extrabold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent tracking-wider">
            VOGUE VIBE
          </h1>
          <p className="text-[9px] text-amber-400/90 tracking-[0.25em] font-mono uppercase font-bold">TALENT AGENCY</p>
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden text-slate-400 hover:text-white p-2 cursor-pointer rounded-full bg-white/5 hover:bg-white/10"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      {/* Dynamic Real User Card */}
      <div className="mx-4 mt-4 mb-2 p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3.5 shrink-0 shadow-lg">
        {currentUser?.profileImage ? (
          <img
            src={currentUser.profileImage}
            alt={currentUser.name || 'Talent'}
            className="w-10 h-10 rounded-full object-cover border border-amber-400/50 shrink-0 shadow-md"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 flex items-center justify-center text-black font-extrabold text-sm shrink-0 shadow-md">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'V'}
          </div>
        )}

        <div className="min-w-0">
          <p className="text-xs font-extrabold text-white truncate">{currentUser?.name || 'Talent Member'}</p>
          <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md text-[9px] bg-amber-500/20 text-amber-300 border border-amber-400/30 uppercase tracking-widest font-mono font-bold">
            {currentUser?.category || 'Active Roster'}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-thin">
        <div className="space-y-1">{renderNavItems(mainNavItems)}</div>

        <div className="border-t border-amber-500/15 -mx-4 px-4 pt-3 space-y-3">
          {renderCollapsibleSection('Bookings', 'bookings', bookingNavItems, <Calendar size={15} />)}
          {renderCollapsibleSection('Communication', 'communication', communicationNavItems, <MessageSquare size={15} />)}
          {renderCollapsibleSection('Applications', 'applications', applicationsNavItems, <Briefcase size={15} />)}
          {renderCollapsibleSection('Payments', 'payments', paymentNavItems, <CreditCard size={15} />)}
        </div>

        <div className="border-t border-amber-500/15 -mx-4 px-4 pt-3 space-y-1">
          <Link
            href="/dashboard/model/change-password"
            className={`
              flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all duration-200 text-xs font-semibold min-h-[44px]
              ${isActive('/dashboard/model/change-password')
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold'
                : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            <span className={isActive('/dashboard/model/change-password') ? 'text-amber-400' : 'text-slate-400'}>
              <Lock size={17} />
            </span>
            <span>Change Password</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-rose-400 hover:bg-rose-500/15 transition-all duration-200 text-xs font-bold mt-1 min-h-[44px] cursor-pointer"
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-amber-500/15 shrink-0 text-center">
        <p className="text-[10px] text-slate-400 tracking-wider font-mono">VOGUE VIBE · Talent Portal v2.0</p>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile Top App Bar Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900/90 border-b border-amber-500/20 backdrop-blur-xl z-40 flex items-center justify-between px-5 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2.5 rounded-xl bg-white/10 text-amber-400 hover:text-white hover:bg-white/15 cursor-pointer transition"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
          <span className="text-base font-serif font-extrabold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
            VOGUE VIBE
          </span>
        </div>

        {currentUser && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-200 truncate max-w-[100px]">
              {currentUser.name?.split(' ')[0]}
            </span>
            {currentUser.profileImage ? (
              <img
                src={currentUser.profileImage}
                alt={currentUser.name || 'Talent'}
                className="w-8 h-8 rounded-full object-cover border border-amber-400/40"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-extrabold text-xs flex items-center justify-center">
                {currentUser.name?.charAt(0) || 'V'}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen z-50">{sidebarBody}</div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 w-72 h-full animate-in slide-in-from-left duration-300">
            {sidebarBody}
          </div>
        </div>
      )}
    </>
  );
}