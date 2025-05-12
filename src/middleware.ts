
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validLocales, isLocale } from '@/lib/i18n-config';

const PUBLIC_FILE = /\.(.*)$/;

function getPreferredLocale(request: NextRequest): string {
  // 1. Check Accept-Language header
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

  // 2. Default locale
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
    // Check if the locale in path is valid, if not, redirect to preferred.
    // This is a safeguard, normally Next.js would 404 for invalid [lang] segments based on generateStaticParams
    const pathLocale = pathname.split('/')[1];
    if (isLocale(pathLocale)) {
      return NextResponse.next();
    }
    // If path starts with something like /xx/ where xx is not a valid locale.
  }

  // Redirect if there is no locale or if the locale in path is invalid
  const preferredLocale = getPreferredLocale(request);
  
  // Construct the new URL with the locale prefix
  // Ensure pathname starts with a slash if it's not just a locale segment
  const newPath = pathname === '/' || !pathname.startsWith('/') ? `/${preferredLocale}` : `/${preferredLocale}${pathname}`;
  const newUrl = new URL(newPath, request.url);
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  // Matcher excluding /api/, /_next/static, /_next/image, and files with extensions.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
  ],
};
