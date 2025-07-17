'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
    Plus,
    X,
    // Settings,
    // Save,
    // Share2
} from 'lucide-react';
import { Item } from '@/types';

interface SettingsPanelProps {
    title: string;
    onTitleChange: (newTitle: string) => void;
    items: Item[];
    onItemAdd: () => void;
    onItemRemove: (index: number) => void;
    onItemUpdate: (index: number, field: keyof Item, value: string | number) => void;
    colors: string[];
}

const SettingsPanel = ({
    title,
    onTitleChange,
    items,
    onItemAdd,
    onItemRemove,
    onItemUpdate,
    colors,
}: SettingsPanelProps
) => {
    const { t } = useTranslation();
    // const [showSettings, setShowSettings] = React.useState(false);

    return (
        <motion.div 
            className="space-y-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">{t('settingsTitle')}</h2>

                {/* Title Input */}
                <div className="mb-6">
                    <label className="block text-white/80 text-sm font-medium mb-2">
                        {t('rouletteTitleLabel')}
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        placeholder={t('rouletteTitlePlaceholder')}
                    />
                </div>

                {/* Item Settings */}
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <div
                                className="w-4 h-4 rounded-full flex-shrink-0"
                                style={{ backgroundColor: colors[index % colors.length] }}
                            />
                            <input
                                type="text"
                                value={item.name}
                                onChange={(e) => onItemUpdate(index, 'name', e.target.value)}
                                className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                            />
                            <select
                                value={item.ratio}
                                onChange={(e) => onItemUpdate(index, 'ratio', parseInt(e.target.value))}
                                className="px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
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
                        {t('addItem')}
                    </button>
                </div>
                
                {/* Action Buttons */}
                {/* <div className="flex gap-3 mt-6">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Settings size={16} />
                        {t('settings')}
                    </button>
                    <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-2">
                        <Save size={16} />
                        {t('save')}
                    </button>
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2">
                        <Share2 size={16} />
                        {t('share')}
                    </button>
                </div> */}
            </div>
        </motion.div>
    );
};

export default SettingsPanel;
