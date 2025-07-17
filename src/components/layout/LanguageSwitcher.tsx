// src/components/layout/LanguageSwitcher.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const router = useRouter();
    const pathname = usePathname();

    const changeLanguage = (newLocale: 'ja' | 'en') => {
        // 現在のパスからロケール部分を削除
        const currentLocale = i18n.language;
        let newPath = pathname;
        if (pathname.startsWith(`/${currentLocale}`)) {
            newPath = pathname.substring(`/${currentLocale}`.length) || '/';
        }

        router.push(`/${newLocale}${newPath}`);
    };

    return (
        <div className="flex items-center gap-2">
            <Languages size={20} className="text-white/80" />
            <button
                onClick={() => changeLanguage('ja')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    i18n.language === 'ja' ? 'bg-white/30 text-white font-semibold' : 'text-white/70 hover:bg-white/20'
                }`}
            >
                JP
            </button>
            <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    i18n.language === 'en' ? 'bg-white/30 text-white font-semibold' : 'text-white/70 hover:bg-white/20'
                }`}
            >
                EN
            </button>
        </div>
    );
}