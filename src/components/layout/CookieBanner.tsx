'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const CookieBanner = () => {
    const { t, i18n } = useTranslation();
    const [showBanner, setShowBanner] = useState(false);
    const [declined, setDeclined] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setShowBanner(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'false');
        setDeclined(true);
        setTimeout(() => {
            setShowBanner(false);
        }, 3000); // 3秒後にバナーを非表示
        setTimeout(() => {
            window.location.reload();
        }, 3500); // 3.5秒後にページをリロード
    };

    const locale = i18n.language;

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed bottom-4 left-4 right-4 z-50"
                >
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            {declined ? (
                                <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
                            ) : (
                                <Cookie className="w-8 h-8 text-yellow-300 flex-shrink-0" />
                            )}
                            <p className="text-sm">
                                {declined ? t('declineConfirmation') : t('cookieBannerText')}
                            </p>
                        </div>
                        {!declined && (
                            <div className="flex gap-2 flex-shrink-0">
                                <Link href={`/${locale}/privacy-policy#cookie-info-${locale}`}>
                                    <button className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors">
                                        {t('seeDetails')}
                                    </button>
                                </Link>
                                <button
                                    onClick={handleDecline}
                                    className="px-4 py-2 bg-red-500/50 text-white rounded-lg text-sm font-semibold hover:bg-red-500/70 transition-colors"
                                >
                                    {t('decline')}
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg text-sm font-semibold hover:from-yellow-500 hover:to-orange-600 transition-colors"
                                >
                                    {t('accept')}
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
