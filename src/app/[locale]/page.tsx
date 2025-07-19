'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HomePage = () => {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;

    return (
        <div className="flex flex-col items-center justify-center text-center text-white py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
            >
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-200 pb-4">
                    {t('mainTitle')}
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
                        {t('createRouletteNow')}
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-24 max-w-5xl w-full"
            >
                <h2 className="text-3xl font-bold mb-8">{t('futureFeaturesTitle')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-left">
                        <h3 className="text-xl font-semibold mb-2">{t('loginFeature')}</h3>
                        <p className="text-white/70">{t('loginFeatureDescription')}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-left">
                        <h3 className="text-xl font-semibold mb-2">{t('myPageFeature')}</h3>
                        <p className="text-white/70">{t('myPageFeatureDescription')}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-left">
                        <h3 className="text-xl font-semibold mb-2">{t('templatesFeature')}</h3>
                        <p className="text-white/70">{t('templatesFeatureDescription')}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HomePage;
