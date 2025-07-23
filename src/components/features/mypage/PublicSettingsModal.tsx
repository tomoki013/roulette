'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Database } from '@/types/database.types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2 } from 'lucide-react';

type Roulette = Database['public']['Tables']['roulettes']['Row'];

interface PublicSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    roulette: Roulette | null;
    onSave: (id: string, updates: { is_template: boolean; allow_fork: boolean }) => Promise<void>;
}

const PublicSettingsModal = ({ isOpen, onClose, roulette, onSave }: PublicSettingsModalProps) => {
    const { t } = useTranslation();
    const [isTemplate, setIsTemplate] = useState(false);
    const [allowFork, setAllowFork] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (roulette) {
            setIsTemplate(roulette.is_template);
            setAllowFork(roulette.allow_fork);
        }
    }, [roulette]);

    const handleSave = async () => {
        if (!roulette) return;
        setIsSaving(true);
        try {
            await onSave(roulette.id, { is_template: isTemplate, allow_fork: allowFork });
            onClose();
        } catch (error) {
            console.error("Failed to save settings:", error);
            // TODO: エラー通知
        } finally {
            setIsSaving(false);
        }
    };

    if (!roulette) return null;

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
                        className="bg-gray-800 rounded-2xl p-6 max-w-md w-full text-white border border-white/20"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{t('mypage.publicSettings')}</h2>
                            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <p className="text-lg text-white mb-6">「{roulette.title}」</p>

                        <div className="space-y-4">
                            {/* テンプレートとして公開 */}
                            <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                                <div>
                                    <label htmlFor="isTemplate" className="font-semibold">{t('mypage.publishAsTemplate')}</label>
                                    <p className="text-xs text-white/60">{t('mypage.publishAsTemplateDesc')}</p>
                                </div>
                                <button onClick={() => setIsTemplate(!isTemplate)} className={`w-12 h-6 rounded-full flex items-center transition-colors ${isTemplate ? 'bg-yellow-400' : 'bg-gray-600'}`}>
                                    <motion.div layout className={`w-5 h-5 bg-white rounded-full shadow-md transform ${isTemplate ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            {/* 複製を許可 */}
                            <AnimatePresence>
                            {isTemplate && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center justify-between bg-white/10 p-4 rounded-lg"
                                >
                                    <div>
                                        <label htmlFor="allowFork" className="font-semibold">{t('mypage.allowFork')}</label>
                                        <p className="text-xs text-white/60">{t('mypage.allowForkDesc')}</p>
                                    </div>
                                    <button onClick={() => setAllowFork(!allowFork)} className={`w-12 h-6 rounded-full flex items-center transition-colors ${allowFork ? 'bg-yellow-400' : 'bg-gray-600'}`}>
                                        <motion.div layout className={`w-5 h-5 bg-white rounded-full shadow-md transform ${allowFork ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </motion.div>
                            )}
                            </AnimatePresence>
                        </div>

                        <div className="mt-6 flex justify-end gap-4">
                            <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 rounded-lg transition-colors">{t('close')}</button>
                            <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 text-sm font-semibold bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50">
                                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                                {t('save')}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PublicSettingsModal;
