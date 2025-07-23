'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Save, Loader2, LogIn } from 'lucide-react';
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
    saveButtonText?: string; // 保存ボタンのテキストを外部から指定できるようにする
    showSaveButton?: boolean; // 保存ボタンの表示制御
}

const SettingsPanel = ({
    title,
    onTitleChange,
    items,
    onItemAdd,
    onItemRemove,
    onItemUpdate,
    onSave,
    isSaving,
    isLoggedIn,
    saveButtonText, // propsを受け取る
    showSaveButton = true,
}: SettingsPanelProps) => {

    const { t } = useTranslation();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const totalRatio = items.reduce((sum, item) => sum + item.ratio, 0);

    // ログインしていない場合の保存ボタン挙動
    const handleSave = () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }
        onSave();
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
                    <h2 className="text-xl font-semibold text-white">{t('settingsTitle')}</h2>
                </div>

                {/* (以降のコードは変更なし) */}
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
                            <div className="text-white/80 text-sm w-20 text-center">
                                {((item.ratio / totalRatio) * 100 || 0).toFixed(1)}%
                            </div>
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
                {showSaveButton && (
                    <div className="flex justify-end mt-6">
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
                                    {t('saveInProgress')}
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    {saveButtonText || t('save')}
                                </>
                            )}
                        </motion.button>
                    </div>
                )}
                {/* ログインモーダル（ResultModal風） */}
                <AnimatePresence>
                    {showLoginModal && (
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowLoginModal(false)}
                        >
                            <motion.div
                                className="bg-white rounded-2xl p-8 max-w-xs w-full text-center relative overflow-hidden"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: 'spring', duration: 0.5 }}
                                onClick={e => e.stopPropagation()}
                            >
                                <button
                                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowLoginModal(false)}
                                    aria-label="Close"
                                >
                                    <X size={20} />
                                </button>
                                <div className="mb-4">
                                    <LogIn className="w-12 h-12 text-purple-500 mx-auto" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{t('loginRequired', 'ログインが必要です')}</h3>
                                <p className="text-gray-700 mb-6">{t('pleaseLoginToSave', '保存するにはログインしてください。')}</p>
                                <div className="flex flex-col sm:flex-row justify-center gap-3">
                                    <Link
                                        href="/ja/auth" // 必要に応じてロケールを動的に
                                        className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center justify-center gap-2"
                                        onClick={() => setShowLoginModal(false)}
                                    >
                                        <LogIn size={18} /> {t('goToLogin', 'ログインページへ')}
                                    </Link>
                                    <button
                                        onClick={() => setShowLoginModal(false)}
                                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors"
                                    >
                                        {t('close', '閉じる')}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default SettingsPanel;
