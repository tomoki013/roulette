import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const locales: string[] = [...i18n.locales];
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const sessionCookie = request.cookies.get('admin-session');

    // --- 1. Authentication Logic ---
    const isLoginPage = pathname.endsWith('/admin/login');
    const isAdminPage = pathname.includes('/admin') && !isLoginPage;

    // CASE A: Logged-in user tries to access the login page -> redirect to dashboard
    if (sessionCookie && isLoginPage) {
        const locale = i18n.locales.find(l => pathname.startsWith(`/${l}/`)) || getLocale(request);
        return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
    }

    // CASE B: Not logged-in user tries to access a protected admin page -> redirect to login
    if (!sessionCookie && isAdminPage) {
        const locale = i18n.locales.find(l => pathname.startsWith(`/${l}/`)) || getLocale(request);
        return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }

    // --- 2. i18n Redirection Logic ---
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        if (pathname.startsWith('/api/')) {
            return NextResponse.next();
        }

        const locale = getLocale(request);
        return NextResponse.redirect(
            new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
        );
    }

    // --- 3. Default: Allow request ---
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
