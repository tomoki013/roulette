'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sparkles, Target, Users } from 'lucide-react';

const AboutPageClient = () => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white"
        >
            <h1 className="text-4xl font-bold mb-6 text-center flex items-center justify-center gap-3">
                <Sparkles className="text-yellow-300" />
                {t('about.title2')}
            </h1>
            
            <div className="space-y-8 text-white/90">
                <section>
                    <h2 className="text-2xl font-semibold pt-4 pb-2 flex items-center gap-2">
                        <Target className="text-yellow-300" />
                        {t('about.section1Title')}
                    </h2>
                    <p>
                        {t('about.section1Content')}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold pt-4 pb-2 flex items-center gap-2">
                        <Users className="text-yellow-300" />
                        {t('about.section2Title')}
                    </h2>
                    <p>
                        {t('about.section2Content')}
                    </p>
                </section>
                
                <section>
                     <p>
                        {t('about.section3Content')}
                    </p>
                </section>
            </div>
        </motion.div>
    );
};

export default AboutPageClient;
