'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const router = useRouter();
    const pathname = usePathname();

    const changeLanguage = (newLocale: 'ja' | 'en') => {
        const currentLocale = i18n.language;
        let newPath = pathname;
        if (pathname.startsWith(`/${currentLocale}`)) {
            newPath = pathname.substring(`/${currentLocale}`.length) || '/';
        }

        router.push(`/${newLocale}${newPath}`);
    };

    return (
        // この親divに画面右上に固定するためのスタイルを適用します
        <div className="fixed top-6 right-6 z-50">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 shadow-md">
                <Languages
                    size={18}
                    className="text-white/80"
                    aria-label="Language Selector"
                />
                <div className="flex gap-1">
                    <button
                        onClick={() => changeLanguage('ja')}
                        aria-label="Switch to Japanese"
                        className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                            i18n.language === 'ja'
                                ? 'bg-white/30 text-white font-semibold scale-105'
                                : 'text-white/70 hover:bg-white/20'
                        }`}
                    >
                        🇯🇵 <span>JP</span>
                    </button>
                    <button
                        onClick={() => changeLanguage('en')}
                        aria-label="Switch to English"
                        className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                            i18n.language === 'en'
                                ? 'bg-white/30 text-white font-semibold scale-105'
                                : 'text-white/70 hover:bg-white/20'
                        }`}
                    >
                        🇺🇸 <span>EN</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LanguageSwitcher;
