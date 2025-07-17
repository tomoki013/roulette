'use client';

import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Item } from '@/types';

interface ResultModalProps {
    isOpen: boolean;
    result: Item | null;
    onClose: () => void;
}

const ResultModal = ({
    isOpen,
    result,
    onClose
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
                            <button
                                onClick={onClose}
                                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors font-semibold"
                            >
                                {t('close')}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ResultModal;
