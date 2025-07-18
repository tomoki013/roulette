'use client';

// useTransitionをReactからインポート
import { useState, useEffect, useRef, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, Variants } from 'framer-motion';
// Loader2アイコンをインポート
import { Languages, ChevronDown, Check, Loader2 } from 'lucide-react';
import { i18n as i18nConfig } from '../../../i18n-config';

type Locale = typeof i18nConfig.locales[number];

const languageMap: Record<Locale, { name: string; flag: string }> = {
    ja: { name: '日本語', flag: '🇯🇵' },
    en: { name: 'English', flag: '🇺🇸' },
    es: { name: 'Español', flag: '🇪🇸' },
    fr: { name: 'Français', flag: '🇫🇷' },
    // ここに他の言語を追加
};

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    
    // useTransitionフックを初期化
    // isPendingがローディング状態を示すboolean値
    // startTransitionは状態遷移を開始する関数
    const [isPending, startTransition] = useTransition();

    const getCurrentLocale = (): Locale => {
        const pathSegments = pathname.split('/').filter(Boolean);
        const firstSegment = pathSegments[0];
        if (firstSegment && i18nConfig.locales.includes(firstSegment as Locale)) {
            return firstSegment as Locale;
        }
        return (i18n.language as Locale) || i18nConfig.defaultLocale;
    };

    const currentLocale = getCurrentLocale();

    const changeLanguage = (newLocale: Locale) => {
        // 現在の言語と同じ場合は何もしない
        if (currentLocale === newLocale) {
            setIsOpen(false);
            return;
        }

        // ページの遷移処理をstartTransitionでラップする
        startTransition(() => {
            const pathSegments = pathname.split('/').filter(Boolean);
            const currentPathLocale = pathSegments[0];
            
            let newPath = '/';
            
            if (currentPathLocale && i18nConfig.locales.includes(currentPathLocale as Locale)) {
                const remainingPath = pathSegments.slice(1).join('/');
                newPath = remainingPath ? `/${remainingPath}` : '/';
            } else {
                newPath = pathname === '/' ? '/' : pathname;
            }
            
            let finalPath;
            if (newLocale === i18nConfig.defaultLocale) {
                finalPath = newPath;
            } else {
                finalPath = newPath === '/' ? `/${newLocale}` : `/${newLocale}${newPath}`;
            }
            
            router.push(finalPath);
            i18n.changeLanguage(newLocale); // こちらも遷移の一部として扱う
        });
        
        setIsOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    const menuVariants: Variants = {
        hidden: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2, when: "afterChildren" } },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, when: "beforeChildren", staggerChildren: 0.05 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div ref={wrapperRef} className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
            <div className="relative">
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    // isPending中はボタンを無効化
                    disabled={isPending}
                    className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-lg text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-70 disabled:cursor-not-allowed"
                    aria-label="Language Selector"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* isPendingがtrueの時にローディングスピナーを表示 */}
                    {isPending ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <>
                            <Languages size={18} />
                            <span className="font-semibold text-sm">
                                {languageMap[currentLocale]?.flag} {currentLocale.toUpperCase()}
                            </span>
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown size={16} />
                            </motion.div>
                        </>
                    )}
                </motion.button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="absolute right-0 mt-2 w-48 bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
                            role="menu"
                            aria-orientation="vertical"
                        >
                            <ul className="p-2">
                                {i18nConfig.locales.map((locale) => (
                                    <motion.li
                                        key={locale}
                                        variants={itemVariants}
                                    >
                                        <button
                                            onClick={() => changeLanguage(locale)}
                                            className={`w-full text-left px-3 py-2.5 text-sm flex items-center gap-3 rounded-lg transition-colors duration-200 ${
                                                currentLocale === locale
                                                    ? 'bg-white/20 text-white font-bold'
                                                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                                            }`}
                                            role="menuitem"
                                        >
                                            <span className="text-xl">{languageMap[locale]?.flag}</span>
                                            <span className="flex-grow">{languageMap[locale]?.name}</span>
                                            {currentLocale === locale && <Check size={16} className="text-yellow-300" />}
                                        </button>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default LanguageSwitcher;
