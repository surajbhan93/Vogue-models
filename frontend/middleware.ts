// frontend/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // 1. AGAR LOGIN PAGE PAR HAI:
  if (pathname === '/admin/login') {
    // Agar token hai, toh login page par mat aane do, dashboard bhejo
    if (token) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    // Agar token nahi hai, toh login page dikhao (kuch mat karo)
    return NextResponse.next();
  }

  // 2. AGAR ADMIN KISI AUR PAGE PAR HAI (dashboard, profile, etc):
  if (pathname.startsWith('/admin')) {
    // Agar token nahi hai, toh login pe bhejo
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Baaki sab kuch normal chalta rahe
  return NextResponse.next();
}

// Is middleware ko sirf /admin routes par lagao
export const config = {
  matcher: '/admin/:path*',
};