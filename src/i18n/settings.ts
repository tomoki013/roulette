import { i18n } from '../../i18n-config';

export function getOptions(locale: string = 'ja') {
    return {
        // debug: true, // デバッグ時に有効化
        supportedLngs: i18n.locales,
        fallbackLng: 'ja',
        lng: locale, // ここで言語を明示的に設定
        ns: ['common'],
        defaultNS: 'common',
    };
}
