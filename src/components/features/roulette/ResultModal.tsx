// src/components/features/roulette/ResultModal.tsx

'use client';

import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Share2 } from 'lucide-react';
import { Item } from '@/types';

interface ResultModalProps {
    isOpen: boolean;
    result: Item | null;
    onClose: () => void;
    onShareImage?: () => void;
    onShareUrl?: () => void;
}

const ResultModal = ({
    isOpen,
    result,
    onClose,
    onShareImage,
    onShareUrl,
}: ResultModalProps
) => {
    const { t } = useTranslation();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative z-10">
                            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('resultModalTitle')}</h2>
                            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
                                {result?.name}
                            </div>
                            <div className="flex flex-col sm:flex-row justify-center gap-3">
                                {onShareImage && onShareUrl && (
                                    <>
                                    {/* <button
                                        onClick={onShareImage}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors font-semibold flex items-center justify-center gap-2"
                                    >
                                        <ImageIcon size={20} /> {t('roulette.shareImage')}
                                    </button> */}
                                    <button
                                        onClick={onShareUrl}
                                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-colors font-semibold flex items-center justify-center gap-2"
                                    >
                                        <Share2 size={20} /> {t('roulette.shareUrl')}
                                    </button>
                                    </>
                                )}
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                                >
                                    {t('close')}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ResultModal;
