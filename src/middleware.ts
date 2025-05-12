import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validLocales, isLocale } from '@/lib/i18n';

const PUBLIC_FILE = /\.(.*)$/;

function getPreferredLocale(request: NextRequest): string {
  // 1. Check for locale in cookie (if you implement storing it there)
  // const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  // if (cookieLocale && isLocale(cookieLocale)) {
  //   return cookieLocale;
  // }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const browserLocales = acceptLanguage.split(',').map((lang) => lang.split(';')[0].toLowerCase().trim());
    for (const browserLocale of browserLocales) {
      if (isLocale(browserLocale)) {
        return browserLocale;
      }
      // Check for base language match (e.g., "en-US" -> "en")
      const baseLocale = browserLocale.split('-')[0];
      if (isLocale(baseLocale)) {
        return baseLocale;
      }
    }
  }

  // 3. Default locale
  return 'en';
}


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/')
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = validLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect if there is no locale
  const preferredLocale = getPreferredLocale(request);
  
  // Construct the new URL with the locale prefix
  const newUrl = new URL(`/${preferredLocale}${pathname === '/' ? '' : pathname}`, request.url);
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  // Matcher excluding /api/, /_next/static, /_next/image, and files with extensions.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
  ],
};
