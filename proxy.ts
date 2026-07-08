// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protection des routes admin (toutes les langues)
  if (pathname.match(/^\/(fr|en|ar)\/admin\/(?!login).*$/)) {
    const token = request.cookies.get('admin-token');

    // Si pas de token, rediriger vers la page de login
    if (!token) {
      // Déterminer la langue depuis l'URL
      const locale = pathname.split('/')[1] || 'fr';
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }
  }

  return NextResponse.next();
}

// On définit quelles routes sont surveillées
export const config = {
  matcher: ['/(fr|en|ar)/admin/:path*'],
};