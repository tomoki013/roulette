'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Languages, ChevronDown, Check, Loader2, ChevronUp } from 'lucide-react';
import { i18n as i18nConfig } from '../../../i18n-config';
import Image from 'next/image';

type Locale = typeof i18nConfig.locales[number];

const languageMap: Record<Locale, { name: string; code: string }> = {
    ja: { name: '日本語', code: 'jp' },
    en: { name: 'English', code: 'us' },
    es: { name: 'Español', code: 'es' },
    fr: { name: 'Français', code: 'fr' },
};

interface LanguageSwitcherProps {
    direction?: 'up' | 'down';
}

const LanguageSwitcher = ({
    direction = 'down'
}: LanguageSwitcherProps
) => {
    const { i18n } = useTranslation();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
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
        if (currentLocale === newLocale) {
            setIsOpen(false);
            return;
        }

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
            
            const finalPath = newPath === '/' ? `/${newLocale}` : `/${newLocale}${newPath}`;
            
            router.push(finalPath);
            i18n.changeLanguage(newLocale);
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
        hidden: { opacity: 0, y: direction === 'up' ? 10 : -10, scale: 0.95, transition: { duration: 0.2, when: "afterChildren" } },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, when: "beforeChildren", staggerChildren: 0.05 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 },
    };
    
    const menuDirectionClass = direction === 'up'
        ? "absolute right-0 bottom-full mb-2 w-48 bg-black/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
        : "absolute right-0 top-full mt-2 w-48 bg-black/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl overflow-hidden";

    return (
        <div ref={wrapperRef} className="relative z-50">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isPending}
                className="flex items-center justify-center gap-2 bg-black/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-lg text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-70 disabled:cursor-not-allowed"
                aria-label="Language Selector"
                aria-haspopup="true"
                aria-expanded={isOpen}
                whileTap={{ scale: 0.95 }}
            >
                {isPending ? (
                    <Loader2 size={18} className="animate-spin" />
                ) : (
                    <>
                        <Languages size={18} />
                        <Image
                            src={`https://flagcdn.com/w20/${languageMap[currentLocale]?.code}.png`}
                            width="20"
                            height="15"
                            alt={currentLocale}
                            className="rounded-sm"
                        />
                        <span className="font-semibold text-sm">
                            {currentLocale.toUpperCase()}
                        </span>
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown size={16} className='hidden md:block' />
                            <ChevronUp size={16} className='md:hidden' />
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
                        className={menuDirectionClass}
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
                                        <Image
                                            src={`https://flagcdn.com/w20/${languageMap[locale]?.code}.png`}
                                            width="20"
                                            height="15"
                                            alt={languageMap[locale]?.name}
                                            className="rounded-sm"
                                        />
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
    );
};

export default LanguageSwitcher;
