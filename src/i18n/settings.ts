// src/i18n/settings.ts
export function getOptions(locale: string) {
    return {
        // debug: true, // デバッグ時に有効化
        supportedLngs: ['ja', 'en'],
        fallbackLng: 'ja',
        lng: locale, // ここで言語を明示的に設定
        ns: ['common'],
        defaultNS: 'common',
    };
}
