'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Database } from '@/types/database.types';
import { motion } from 'framer-motion';
import { Trash2, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { deleteRoulette } from '@/lib/services/rouletteService';
import { useModal } from '@/lib/hooks/useModal'; // useModalをインポート

type Roulette = Database['public']['Tables']['roulettes']['Row'];

interface MyRouletteListProps {
    initialRoulettes: Roulette[];
}

const MyRouletteList = ({ initialRoulettes }: MyRouletteListProps) => {
    const { t, i18n } = useTranslation();
    const [roulettes, setRoulettes] = useState(initialRoulettes);
    const { showModal, closeModal } = useModal(); // モーダル用のフックを利用

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // リンクの遷移を防ぐ
        e.preventDefault(); // デフォルトのリンク挙動も防ぐ
        
        showModal({
            title: t('mypage.deleteConfirm'),
            message: '',
            confirmText: t('delete'),
            cancelText: t('close'),
            onConfirm: async () => {
                try {
                    await deleteRoulette(id);
                    setRoulettes(roulettes.filter(r => r.id !== id));
                } catch (error) {
                    console.error("Failed to delete roulette:", error);
                } finally {
                    closeModal();
                }
            },
            onCancel: closeModal,
        });
    };

    if (roulettes.length === 0) {
        return (
            <div className="text-center text-white/80 bg-white/10 p-12 rounded-2xl">
                <p className="mb-4">{t('mypage.noRoulettes')}</p>
                <Link href={`/${i18n.language}/original-roulette`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-colors font-semibold">
                    <PlusCircle size={20} />
                    {t('createRoulette')}
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {roulettes.map((roulette, index) => (
                // FIX: リンク先を /mypage/roulette/[id] に変更
                <Link key={roulette.id} href={`/${i18n.language}/mypage/roulette/${roulette.id}`} passHref>
                    <motion.div
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-white/20 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div>
                            <h3 className="text-xl font-semibold text-white">{roulette.title}</h3>
                            <p className="text-sm text-white/70">
                                {t('mypage.createdAt')}: {new Date(roulette.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={(e) => handleDelete(e, roulette.id)} className="p-2 hover:bg-red-500/30 rounded-lg transition-colors" title={t('mypage.delete')}>
                                <Trash2 size={20} className="text-red-300" />
                            </button>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
};

export default MyRouletteList;
