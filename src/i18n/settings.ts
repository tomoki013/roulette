export function getOptions(locale: string = 'ja') {
    return {
        // debug: true, // デバッグ時に有効化
        supportedLngs: ['ja', 'en'],
        fallbackLng: 'ja',
        lng: locale, // ここで言語を明示的に設定
        ns: ['common'],
        defaultNS: 'common',
    };
}
