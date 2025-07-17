// app/i18n/client.ts
'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// LanguageDetector は不要になったので削除
// import LanguageDetector from 'i18next-browser-languagedetector'; 
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions } from './settings';

i18next
    .use(initReactI18next)
    // .use(LanguageDetector) // 削除
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init({
        ...getOptions(),
        lng: undefined, // 初期言語は未定義。Providerで設定します。
        // detection: { ... }, // 削除
    });

export default i18next;
