'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Languages, LogIn, User } from 'lucide-react'; // LogIn, User アイコンをインポート
import { useAuth } from '@/lib/hooks/useAuth'; // useAuthをインポート

const HomePage = () => {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;
    const { user } = useAuth(); // ユーザー情報を取得

    return (
        <div className="flex flex-col items-center justify-center text-center text-white py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
            >
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-200 pb-4">
                    {t('title')}
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white/80">
                    {t('description')}
                </p>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        href={`/${locale}/original-roulette`}
                        className="mt-8 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        {t('heroSection.createRoulette.title')}
                    </Link>
                </motion.div>
            </motion.div>

            {/* Login/MyPage Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-24 max-w-5xl w-full bg-white/10 backdrop-blur-sm p-8 rounded-2xl"
            >
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
                            {user ? <User className="text-yellow-300" /> : <LogIn className="text-yellow-300" />}
                            {t('heroSection.login.title')}
                        </h2>
                        <p className="text-white/80 mb-6">
                            {t('heroSection.login.excerpt')}
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href={user ? `/${locale}/mypage` : `/${locale}/auth`}
                                className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                {user ? t('heroSection.login.goToMypage') : t('heroSection.login.goToLogin')}
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Templates Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8 max-w-5xl w-full bg-white/10 backdrop-blur-sm p-8 rounded-2xl"
            >
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
                            <Mail className="text-yellow-300" />
                            {t('heroSection.templates.title')}
                        </h2>
                        <p className="text-white/80 mb-6">
                            {t('heroSection.templates.excerpt')}
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href={`/${locale}/templates`}
                                className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                {t('templates.template')}
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Contact Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8 max-w-5xl w-full bg-white/10 backdrop-blur-sm p-8 rounded-2xl"
            >
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
                            <Mail className="text-yellow-300" />
                            {t('heroSection.contact.title')}
                        </h2>
                        <p className="text-white/80 mb-6">
                            {t('heroSection.contact.excerpt')}
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href={`/${locale}/contact`}
                                className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                {t('heroSection.contact.title')}
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
            
            {/* Language Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 max-w-5xl w-full bg-white/10 backdrop-blur-sm p-8 rounded-2xl"
            >
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
                            <Languages className="text-yellow-300" />
                            {t('heroSection.language.title')}
                        </h2>
                        <p className="text-white/80">
                            {t('heroSection.language.excerpt')}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-24 max-w-5xl w-full"
            >
                <h2 className="text-3xl font-bold mb-8">{t('futureFeaturesTitle')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-left md:col-start-2">
                        <h3 className="text-xl font-semibold mb-2">{t('templatesFeature')}</h3>
                        <p className="text-white/70">{t('templatesFeatureDescription')}</p>
                    </div>
                </div>
            </motion.div> */}
        </div>
    );
};

export default HomePage;
