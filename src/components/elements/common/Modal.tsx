'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';
import { useModal } from '@/lib/hooks/useModal';

const Modal = () => {
    const { isOpen, modalContent, closeModal } = useModal();

    if (!modalContent) return null;

    const { title, message, onConfirm, onCancel, confirmText, cancelText, type } = modalContent;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-12 h-12 text-green-500" />;
            case 'error':
                return <AlertTriangle className="w-12 h-12 text-red-500" />;
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onCancel ? onCancel : closeModal}
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
                            {getIcon()}
                            <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">{title}</h2>
                            <p className="text-gray-600 mb-6">{message}</p>
                            <div className="flex justify-center gap-4">
                                {onCancel && (
                                    <button
                                        onClick={onCancel}
                                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                                    >
                                        {cancelText || 'Cancel'}
                                    </button>
                                )}
                                <button
                                    onClick={onConfirm}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors font-semibold"
                                >
                                    {confirmText || 'OK'}
                                </button>
                            </div>
                        </div>
                        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
