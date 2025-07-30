'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plus, X, Save, Loader2, Share2 } from 'lucide-react';
import { Item } from '@/types';

interface SettingsPanelProps {
    title: string;
    onTitleChange: (newTitle: string) => void;
    items: Item[];
    onItemAdd: () => void;
    onItemRemove: (index: number) => void;
    onItemUpdate: (index: number, field: keyof Item, value: string | number) => void;
    onSave: () => void;
    isSaving: boolean;
    isLoggedIn: boolean;
    saveButtonText?: string;
    showSaveButton?: boolean;
    onShareRoulette?: () => void;
    showShareButton?: boolean;
}

const SettingsPanel = ({
    title,
    onTitleChange,
    items,
    onItemAdd,
    onItemRemove,
    onItemUpdate,
    onSave: handleSave,
    isSaving,
    saveButtonText,
    showSaveButton = true,
    onShareRoulette,
    showShareButton = false,
}: SettingsPanelProps) => {
    const { t } = useTranslation();
    const titleMaxLength = 30;

    const shakeVariants = {
        shake: {
            x: [0, -6, 6, -6, 6, 0],
            transition: { duration: 0.4 }
        },
        initial: { x: 0 }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onTitleChange(e.target.value.slice(0, titleMaxLength));
    };


    return (
        <motion.div
            className="space-y-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">{t('roulette.settings.title')}</h2>
                </div>

                <div className="mb-6">
                    <label className="block text-white/80 text-sm font-medium mb-2">
                        {t('roulette.settings.name')}
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        maxLength={titleMaxLength}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        placeholder={t('roulette.settings.namePlaceholder')}
                    />
                     <motion.div 
                        className={`text-right text-xs mt-1 ${title.length >= titleMaxLength ? 'text-red-400' : 'text-white/60'}`}
                        variants={shakeVariants}
                        animate={title.length >= titleMaxLength ? "shake" : "initial"}
                    >
                        {title.length} / {titleMaxLength}
                    </motion.div>
                </div>

                <div className="space-y-3">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg flex-wrap"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <input
                                type="color"
                                value={item.color}
                                onChange={(e) => onItemUpdate(index, 'color', e.target.value)}
                                className="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer bg-transparent border-none"
                                style={{backgroundColor: item.color}}
                            />
                            <input
                                type="text"
                                value={item.name}
                                onChange={(e) => onItemUpdate(index, 'name', e.target.value)}
                                className="flex-1 min-w-[120px] px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                            />
                            <select
                                value={item.ratio}
                                onChange={(e) => onItemUpdate(index, 'ratio', parseInt(e.target.value))}
                                className="w-20 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                            >
                                {[1, 2, 3, 4, 5].map(num => (
                                    <option key={num} value={num} className="bg-gray-800">{num}</option>
                                ))}
                            </select>
                            {items.length > 2 && (
                                <button
                                    onClick={() => onItemRemove(index)}
                                    className="p-2 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-lg transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </motion.div>
                    ))}
                    
                    <button
                        onClick={onItemAdd}
                        className="w-full p-3 border-2 border-dashed border-white/30 rounded-lg text-white/80 hover:text-white hover:border-white/50 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus size={20} />
                        {t('roulette.settings.items.addItem')}
                    </button>
                </div>

                <div className="flex justify-end items-center mt-6 gap-3">
                    {showShareButton && onShareRoulette && (
                        <motion.button
                            onClick={onShareRoulette}
                            className="px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Share2 size={16} />
                            {t('roulette.settings.share')}
                        </motion.button>
                    )}
                    
                    {showSaveButton && (
                        <motion.button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg disabled:opacity-50"
                            whileHover={!isSaving ? { scale: 1.05 } : {}}
                            whileTap={!isSaving ? { scale: 0.95 } : {}}
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    {t('roulette.settings.saveInProgress')}
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    {saveButtonText || t('roulette.settings.save')}
                                </>
                            )}
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default SettingsPanel;
