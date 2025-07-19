'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Header = () => {
    const { t } = useTranslation();

    return (
        <motion.header 
            className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 relative"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                <Sparkles className="text-yellow-300" />
                {t('mainTitle')}
            </h1>
        </motion.header>
    );
};

export default Header;
