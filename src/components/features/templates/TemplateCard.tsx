'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Layers, User, Heart, ChevronsRight } from 'lucide-react';
import { Database } from '@/types/database.types';
import Link from 'next/link';

type Roulette = Database['public']['Tables']['roulettes']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

type Template = Roulette & {
    profiles: Pick<Profile, 'username'> | null;
};

interface TemplateCardProps {
    template: Template;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;

    const getDescription = () => {
        if (
            typeof template.description === 'object' &&
            template.description &&
            locale in template.description
        ) {
            return (template.description as Record<string, string>)[locale];
        }
        if (typeof template.description === 'string') {
            return template.description;
        }
        return t('templates.noDescription');
    };

    return (
        <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between"
            whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
        >
            <div>
                <div className="flex items-center gap-2 text-yellow-300 mb-2">
                    <Layers size={16} />
                    <span className="text-sm font-semibold">{t('templates.template')}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 truncate">{template.title}</h3>
                <p className="text-sm text-white/70 h-10 overflow-hidden text-ellipsis">
                    {getDescription()}
                </p>
            </div>
            <div className="mt-4">
                <div className="flex justify-between items-center text-sm text-white/60 mb-4">
                    <div className="flex items-center gap-2">
                        <User size={14} />
                        <span>{template.profiles?.username || t('templates.anonymous')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Heart size={14} />
                        <span>{template.like_count}</span>
                    </div>
                </div>
                {/* FIX: リンク先を新しいテンプレート実行ページに変更 */}
                <Link href={`/${locale}/templates/roulette/${template.id}`} passHref>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold transition-colors">
                        {t('templates.useTemplate')}
                        <ChevronsRight size={18} />
                    </button>
                </Link>
            </div>
        </motion.div>
    );
};

export default TemplateCard;
