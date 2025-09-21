'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const HowToUseTemplatesPageClient = () => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-white"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12"
            >
                <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                    <BookOpen className="text-yellow-300" />
                    {t('howToUse.loggedIn.templates')}
                </h1>
                <div className="text-lg text-white/80 space-y-4">
                   <p>
                        {t('howToUse.loggedIn.templates_detail')}
                   </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default HowToUseTemplatesPageClient;
