'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import GitHubIcon from '../elements/icons/GithubIcon';
import { motion } from 'framer-motion';

const Footer = () => {
    const { t, i18n } = useTranslation();
    // const currentYear = new Date().getFullYear();
    const locale = i18n.language;

    return (
        <motion.footer
            className="w-full mt-16 bg-black/20 backdrop-blur-sm border-t border-white/20 text-white"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
        >
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* ブランドセクション */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
                            <Sparkles className="text-yellow-300" size={28} />
                            <span className="text-2xl font-bold">{t('mainTitleShort')}</span>
                        </Link>
                        <p className="text-white/70 max-w-sm">
                            {t('footerTagline')}
                        </p>
                    </div>

                    {/* 法務リンク */}
                    <div>
                        <h3 className="font-semibold mb-4 tracking-widest uppercase">{t('legal')}</h3>
                        <nav className="flex flex-col space-y-3">
                            <Link href={`/${locale}/terms-of-service`} className="text-sm hover:text-yellow-300 transition-colors">
                                {t('termsOfService')}
                            </Link>
                            <Link href={`/${locale}/privacy-policy`} className="text-sm hover:text-yellow-300 transition-colors">
                                {t('privacyPolicy')}
                            </Link>
                        </nav>
                    </div>

                    {/* ソーシャルリンク */}
                    <div>
                        <h3 className="font-semibold mb-4 tracking-widest uppercase">{t('social')}</h3>
                        <div className="flex space-x-4">
                            <GitHubIcon />
                        </div>
                    </div>
                </div>

                {/* コピーライト */}
                <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60">
                    <p>&copy; 2025 {/* -{currentYear} */}{t('copyright')}</p>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
