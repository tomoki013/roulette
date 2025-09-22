// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // i18n.localesはreadonlyな配列なので、新しい配列を作成して渡します
    const locales: string[] = [...i18n.locales];

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    const locale = matchLocale(languages, locales, i18n.defaultLocale);

    return locale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // NOTE: This auth logic runs after the i18n redirect logic,
    // so we can expect a locale in the path for page routes.
    const isAdminPage = i18n.locales.some(locale =>
        pathname.startsWith(`/${locale}/admin`) && !pathname.startsWith(`/${locale}/admin/login`)
    );

    if (isAdminPage) {
        const sessionCookie = request.cookies.get('admin-session');
        if (!sessionCookie) {
            // Redirect to the login page for the current locale.
            const locale = pathname.split('/')[1];
            return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
        }
    }

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(
            new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    // マッチャーを更新し、内部パスを除外します
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
