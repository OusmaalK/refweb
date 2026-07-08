// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Protection des routes admin (statiques)
  if (pathname.startsWith('/admin/') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin-token');

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // ✅ Protection des routes admin dynamiques (fr/en/ar)
  if (pathname.match(/^\/(fr|en|ar)\/admin\/(?!login).*$/)) {
    const token = request.cookies.get('admin-token');

    if (!token) {
      const locale = pathname.split('/')[1] || 'fr';
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/(fr|en|ar)/admin/:path*'],
};