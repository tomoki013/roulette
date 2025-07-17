// i18n-config.ts
export const i18n = {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
