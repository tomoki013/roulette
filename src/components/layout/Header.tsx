'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sparkles, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

const Header = () => {
    const { t, i18n } = useTranslation();
    const { user, signOut } = useAuth();
    const locale = i18n.language;

    const handleSignOut = async () => {
        await signOut();
    }

    return (
        <motion.header 
            className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 relative"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <Link href={`/${locale}`} className="text-3xl font-bold text-white flex items-center gap-2">
                <Sparkles className="text-yellow-300" />
                {t('mainTitle')}
            </Link>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <Link href={`/${locale}/mypage`} className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors">
                            <User size={20} />
                            <span className="hidden sm:inline">{t('myPage')}</span>
                        </Link>
                        <button onClick={handleSignOut} className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors">
                            <LogOut size={20} />
                            <span className="hidden sm:inline">{t('auth.logout')}</span>
                        </button>
                    </>
                ) : (
                    <Link href={`/${locale}/auth`} className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors">
                        <LogIn size={20} />
                        <span className="hidden sm:inline">{t('login')}</span>
                    </Link>
                )}
            </div>
        </motion.header>
    );
};

export default Header;
