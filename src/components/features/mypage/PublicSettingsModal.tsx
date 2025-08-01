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
    onSave: (id: string, updates: {
        title: string;
        description: string | null;
        is_template: boolean;
        allow_fork: boolean;
        is_profile_public: boolean;
    }) => Promise<void>;
}

const PublicSettingsModal = ({ isOpen, onClose, roulette, onSave }: PublicSettingsModalProps) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isTemplate, setIsTemplate] = useState(false);
    const [allowFork, setAllowFork] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isProfilePublic, setIsProfilePublic] = useState(false);

    const titleMaxLength = 30;
    const descriptionMaxLength = 180;

    const shakeVariants = {
        shake: {
            x: [0, -6, 6, -6, 6, 0],
            transition: { duration: 0.4 }
        },
        initial: { x: 0 }
    };

    useEffect(() => {
        if (roulette) {
            setTitle(roulette.title);
            const currentDescription = roulette.description;
            if (typeof currentDescription === 'string') {
                setDescription(currentDescription);
            } else if (currentDescription && typeof currentDescription === 'object' && !Array.isArray(currentDescription)) {
                setDescription(JSON.stringify(currentDescription));
            } else {
                setDescription('');
            }
            setIsTemplate(roulette.is_template);
            setAllowFork(roulette.allow_fork);
            setIsProfilePublic(roulette.is_profile_public);
        }
    }, [roulette]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value.slice(0, titleMaxLength));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value.slice(0, descriptionMaxLength));
    };

    const handleSave = async () => {
        if (!roulette) return;
        setIsSaving(true);
        try {
            await onSave(roulette.id, {
                title,
                description,
                is_template: isTemplate,
                allow_fork: allowFork,
                is_profile_public: isProfilePublic,
            });
            onClose();
        } catch (error) {
            console.error("Failed to save settings:", error);
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
                        
                        <div className="space-y-4 mb-6">
                            <div>
                                <label htmlFor="rouletteTitle" className="block text-sm font-medium text-white/80 mb-1">{t('roulette.settings.name')}</label>
                                <input
                                    id="rouletteTitle"
                                    type="text"
                                    value={title}
                                    onChange={handleTitleChange}
                                    maxLength={titleMaxLength}
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                                <motion.div
                                    className={`text-right text-xs mt-1 ${title.length >= titleMaxLength ? 'text-red-400' : 'text-white/60'}`}
                                    variants={shakeVariants}
                                    animate={title.length >= titleMaxLength ? "shake" : "initial"}
                                >
                                    {title.length} / {titleMaxLength}
                                </motion.div>
                            </div>
                            <div>
                                <label htmlFor="rouletteDescription" className="block text-sm font-medium text-white/80 mb-1">{t('roulette.settings.excerpt')}</label>
                                <textarea
                                    id="rouletteDescription"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    rows={3}
                                    maxLength={descriptionMaxLength}
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                                <motion.div
                                    className={`text-right text-xs mt-1 ${description.length >= descriptionMaxLength ? 'text-red-400' : 'text-white/60'}`}
                                    variants={shakeVariants}
                                    animate={description.length >= descriptionMaxLength ? "shake" : "initial"}
                                >
                                    {description.length} / {descriptionMaxLength}
                                </motion.div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                                <div className='flex-1'>
                                    <label htmlFor="isTemplate" className="font-semibold">{t('mypage.publishAsTemplate')}</label>
                                    <p className="text-xs text-white/60">{t('mypage.publishAsTemplateExcerpt')}</p>
                                </div>
                                <button onClick={() => setIsTemplate(!isTemplate)} className={`w-[48px] h-[24px] rounded-full flex items-center transition-colors ${isTemplate ? 'bg-yellow-400' : 'bg-gray-600'}`}>
                                    <motion.div layout className={`w-[20px] h-[20px] bg-white rounded-full shadow-md transform ${isTemplate ? 'translate-x-[24px]' : 'translate-x-[4px]'}`} />
                                </button>
                            </div>

                            <AnimatePresence>
                                {isTemplate && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center justify-between bg-white/10 p-4 rounded-lg"
                                    >
                                        <div className='flex-1'>
                                            <label htmlFor="allowFork" className="font-semibold">{t('mypage.allowFork')}</label>
                                            <p className="text-xs text-white/60">{t('mypage.allowForkExcerpt')}</p>
                                        </div>
                                        <button onClick={() => setAllowFork(!allowFork)} className={`w-[48px] h-[24px] rounded-full flex items-center transition-colors ${allowFork ? 'bg-yellow-400' : 'bg-gray-600'}`}>
                                            <motion.div layout className={`w-[20px] h-[20px] bg-white rounded-full shadow-md transform ${allowFork ? 'translate-x-[24px]' : 'translate-x-[4px]'}`} />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {isTemplate && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center justify-between bg-white/10 p-4 rounded-lg"
                                    >
                                        <div className='flex-1'>
                                            <label htmlFor="isProfilePublic" className="font-semibold">{t('mypage.publishProfile')}</label>
                                            <p className="text-xs text-white/60">{t('mypage.publishProfileExcerpt')}</p>
                                        </div>
                                        <button onClick={() => setIsProfilePublic(!isProfilePublic)} className={`w-[48px] h-[24px] rounded-full flex items-center transition-colors ${isProfilePublic ? 'bg-yellow-400' : 'bg-gray-600'}`}>
                                            <motion.div layout className={`w-[20px] h-[20px] bg-white rounded-full shadow-md transform ${isProfilePublic ? 'translate-x-[24px]' : 'translate-x-[4px]'}`} />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="mt-6 flex justify-end gap-4">
                            <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 rounded-lg transition-colors">{t('close')}</button>
                            <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 text-sm font-semibold bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50">
                                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                                {t('roulette.settings.save')}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PublicSettingsModal;
