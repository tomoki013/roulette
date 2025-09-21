'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HelpCircle, BookOpen, UserPlus, LogIn } from 'lucide-react';

const HowToUsePageClient = () => {
    const { t } = useTranslation();

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-white"
        >
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12"
            >
                <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                    <HelpCircle className="text-yellow-300" />
                    {t('howToUse.title')}
                </h1>
                <p className="text-lg text-white/80">
                    {t('howToUse.description')}
                </p>
            </motion.div>

            <div className="space-y-8">
                {/* Basic Usage Section */}
                <motion.section variants={cardVariants} initial="hidden" animate="visible" className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold pb-2 flex items-center gap-2 mb-4 border-b border-white/20">
                        <BookOpen className="text-yellow-300" />
                        {t('howToUse.basic.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-white/90">
                        <li>{t('howToUse.basic.create')}</li>
                        <li>{t('howToUse.basic.spin')}</li>
                        <li>{t('howToUse.basic.share')}</li>
                    </ul>
                </motion.section>

                {/* Account Features Section */}
                <motion.section variants={cardVariants} initial="hidden" animate="visible" className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold pb-2 flex items-center gap-2 mb-4 border-b border-white/20">
                        <UserPlus className="text-yellow-300" />
                        {t('howToUse.account.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-white/90">
                        <li>{t('howToUse.account.merit')}</li>
                        <li>{t('howToUse.account.auth')}</li>
                    </ul>
                </motion.section>

                {/* Logged-in Features Section */}
                <motion.section variants={cardVariants} initial="hidden" animate="visible" className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold pb-2 flex items-center gap-2 mb-4 border-b border-white/20">
                        <LogIn className="text-yellow-300" />
                        {t('howToUse.loggedIn.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-white/90">
                        <li>{t('howToUse.loggedIn.mypage')}</li>
                        <li>{t('howToUse.loggedIn.templates')}</li>
                    </ul>
                </motion.section>
            </div>
        </motion.div>
    );
};

export default HowToUsePageClient;
