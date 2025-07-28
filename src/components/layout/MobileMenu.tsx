'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, LogIn, LogOut, User, PlusCircle, LayoutGrid, Contact } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import LanguageSwitcher from './LanguageSwitcher';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const { t, i18n } = useTranslation();
    const { user, signOut } = useAuth();
    const locale = i18n.language;

    const handleSignOut = async () => {
        await signOut();
        onClose();
    };

    const menuVariants: Variants = {
        hidden: { x: '100%' },
        visible: { x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
        exit: { x: '100%', transition: { duration: 0.3, ease: 'easeInOut' } },
    };

    const linkVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="fixed top-0 right-0 h-full w-full max-w-xs bg-white/10 backdrop-blur-lg shadow-lg z-50 p-6 flex flex-col"
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-end mb-8">
                            <button onClick={onClose} className="text-white p-2 rounded-full hover:bg-white/20 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <nav className="flex flex-col flex-grow justify-between">
                            <div>
                                {/* Service Section */}
                                <motion.ul
                                    className="space-y-4"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                                >
                                     <motion.li variants={linkVariants}>
                                        <Link href={`/${locale}/original-roulette`} onClick={onClose} className="flex items-center gap-3 text-lg text-white hover:text-yellow-300 transition-colors">
                                            <PlusCircle size={20} />
                                            <span>{t('roulette.title')}</span>
                                        </Link>
                                    </motion.li>
                                    <motion.li variants={linkVariants}>
                                        <Link href={`/${locale}/templates`} onClick={onClose} className="flex items-center gap-3 text-lg text-white hover:text-yellow-300 transition-colors">
                                            <LayoutGrid size={20} />
                                            <span>{t('templates.template')}</span>
                                        </Link>
                                    </motion.li>
                                    <motion.li variants={linkVariants}>
                                        <Link href={`/${locale}/contact`} onClick={onClose} className="flex items-center gap-3 text-lg text-white hover:text-yellow-300 transition-colors">
                                            <Contact size={20} />
                                            <span>{t('contact.title')}</span>
                                        </Link>
                                    </motion.li>
                                </motion.ul>

                                <hr className="my-8 border-white/20" />

                                {/* User Section */}
                                <motion.ul
                                    className="space-y-4"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
                                >
                                    {user ? (
                                        <>
                                            <motion.li variants={linkVariants}>
                                                <Link href={`/${locale}/mypage`} onClick={onClose} className="flex items-center gap-3 text-lg text-white hover:text-yellow-300 transition-colors">
                                                    <User size={20} />
                                                    <span>{t('mypage.title')}</span>
                                                </Link>
                                            </motion.li>
                                            <motion.li variants={linkVariants}>
                                                <button onClick={handleSignOut} className="flex items-center gap-3 text-lg text-white cursor-pointer hover:text-yellow-300 transition-colors">
                                                    <LogOut size={20} />
                                                    <span>{t('auth.logout')}</span>
                                                </button>
                                            </motion.li>
                                        </>
                                    ) : (
                                        <motion.li variants={linkVariants}>
                                            <Link href={`/${locale}/auth`} onClick={onClose} className="flex items-center gap-3 text-lg text-white hover:text-yellow-300 transition-colors">
                                                <LogIn size={20} />
                                                <span>{t('auth.login')}</span>
                                            </Link>
                                        </motion.li>
                                    )}
                                </motion.ul>
                            </div>
                            
                            <div className="mt-4 flex flex-col items-center gap-8">
                                <div>
                                    <LanguageSwitcher direction="up" />
                                </div>
                                <div className='flex items-center gap-4'>
                                    <Link href={`/${locale}/privacy-policy`} onClick={onClose} className='text-sm text-white underline hover:text-yellow-300 transition-colors'>
                                        {t('privacyPolicy.title')}
                                    </Link>
                                    <Link href={`/${locale}/terms-of-service`} onClick={onClose} className='text-sm text-white underline hover:text-yellow-300 transition-colors'>
                                        <span>{t('termsOfService.title')}</span>
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
