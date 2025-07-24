'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const CookieBanner = () => {
    const { t, i18n } = useTranslation();
    const [showBanner, setShowBanner] = useState(false);
    const [declined, setDeclined] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        const dismissed = sessionStorage.getItem('cookie_banner_dismissed');

        if (!consent && !dismissed) {
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
        }, 3000);
        setTimeout(() => {
            window.location.reload();
        }, 3500);
    };

    const handleDismiss = () => {
        sessionStorage.setItem('cookie_banner_dismissed', 'true');
        setShowBanner(false);
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
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 text-white">
                        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto_auto] gap-4 items-center">
                            {/* Icon (visible on all screens) */}
                            <div className="flex-shrink-0 hidden sm:block">
                                {declined ? (
                                    <CheckCircle className="w-8 h-8 text-green-400" />
                                ) : (
                                    <Cookie className="w-8 h-8 text-yellow-300" />
                                )}
                            </div>

                            {/* Main Content (Text) */}
                            <div className="flex-grow">
                                <p className="text-sm">
                                    {declined ? t('cookie.declineConfirmation') : t('cookie.bannerText')}
                                </p>
                            </div>
                            
                            {/* Action Buttons */}
                            {!declined && (
                                <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
                                    <Link href={`/${locale}/privacy-policy#cookie-info-${locale}`}>
                                        <button className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors">
                                            {t('cookie.seeDetails')}
                                        </button>
                                    </Link>
                                    <button
                                        onClick={handleDecline}
                                        className="px-4 py-2 bg-red-500/50 text-white rounded-lg text-sm font-semibold hover:bg-red-500/70 transition-colors"
                                    >
                                        {t('cookie.decline')}
                                    </button>
                                    <button
                                        onClick={handleAccept}
                                        className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg text-sm font-semibold hover:from-yellow-500 hover:to-orange-600 transition-colors"
                                    >
                                        {t('cookie.accept')}
                                    </button>
                                </div>
                            )}

                            {/* Close Button */}
                            <div className="absolute top-2 right-0 sm:static sm:flex-shrink-0">
                                {!declined && (
                                    <button
                                        onClick={handleDismiss}
                                        className="p-1 text-white/70 hover:text-white transition-colors"
                                        aria-label="Dismiss cookie banner"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
