'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LogIn, LogOut, User, Menu, Layers } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from './LanguageSwitcher';

const StickyControls = () => {
    const { t, i18n } = useTranslation();
    const { user, signOut } = useAuth();
    const locale = i18n.language;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <>
            <div className="fixed top-6 right-6 z-40">
                <div className="flex items-center gap-4">
                    {/* Desktop Controls: Changed to a capsule shape with a darker background */}
                    <div className="hidden md:flex items-center gap-4 p-3 bg-black/20 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                    {/* テンプレートページへのリンクを追加 */}
                        <Link href={`/${locale}/templates`} className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors">
                            <Layers size={20} />
                            <span className="hidden sm:inline">{t('templates.template')}</span>
                        </Link>
                        {user ? (
                            <>
                                <Link href={`/${locale}/mypage`} className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors px-2">
                                    <User size={20} />
                                    <span>{t('mypage.title')}</span>
                                </Link>
                                <button onClick={handleSignOut} className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors px-2">
                                    <LogOut size={20} />
                                    <span>{t('auth.logout')}</span>
                                </button>
                            </>
                        ) : (
                            <Link href={`/${locale}/auth`} className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors px-2">
                                <LogIn size={20} />
                                <span>{t('auth.login')}</span>
                            </Link>
                        )}
                        <LanguageSwitcher />
                    </div>
                    
                    {/* Mobile Hamburger Icon: Refined circular button style */}
                    <div className="md:hidden flex items-center justify-center w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
                        <button onClick={() => setIsMenuOpen(true)} className="text-white">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>
            
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default StickyControls;
