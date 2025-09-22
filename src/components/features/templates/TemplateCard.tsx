'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Layers, User, Heart, ChevronsRight, Star } from 'lucide-react';
import { Database } from '@/types/database.types';
import Link from 'next/link';
import { OFFICIAL_USER_ID } from '@/constants/common';
import { useEffect, useState } from 'react';
import { incrementLikeCount, decrementLikeCount } from '@/lib/services/rouletteService';

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
    const [likeCount, setLikeCount] = useState(template.like_count);
    const [isLiked, setIsLiked] = useState(false);
    const [isLiking, setIsLiking] = useState(false);

    useEffect(() => {
        const likedTemplates = JSON.parse(localStorage.getItem('likedTemplates') || '[]');
        if (likedTemplates.includes(template.id)) {
            setIsLiked(true);
        }
    }, [template.id]);

        const handleLike = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (isLiking) return; // 処理中の多重クリックを防止
        setIsLiking(true);

        const likedTemplates = JSON.parse(localStorage.getItem('likedTemplates') || '[]');

        try {
            let updatedData;
            if (isLiked) {
                // いいね取り消し処理
                updatedData = await decrementLikeCount(template.id);
                const index = likedTemplates.indexOf(template.id);
                if (index > -1) {
                    likedTemplates.splice(index, 1);
                }
            } else {
                // いいね処理
                updatedData = await incrementLikeCount(template.id);
                if (!likedTemplates.includes(template.id)) {
                    likedTemplates.push(template.id);
                }
            }
            // データベースからの戻り値でUIを更新
            setLikeCount(updatedData.like_count);
            setIsLiked(!isLiked);
            localStorage.setItem('likedTemplates', JSON.stringify(likedTemplates));
        } catch (error) {
            console.error("Failed to update like status:", error);
            // エラーが発生した場合はUIの変更は行わない
        } finally {
            setIsLiking(false); // 処理完了
        }
    };

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
        return t('templates.noExcerpt');
    };
    
    const truncatedTitle = template.title.length > 15 ? `${template.title.substring(0, 15)}...` : template.title;
    const truncatedDescription = getDescription().length > 70 ? `${getDescription().substring(0, 70)}...` : getDescription();

    const getAuthorInfo = () => {
        if (template.user_id === OFFICIAL_USER_ID) {
            return {
                text: t('templates.official', 'Official'), // 'Official' is a fallback
                Icon: Star,
                isOfficial: true,
            };
        }
        if (template.user_id === null) {
            return null;
        }
        if (template.is_profile_public) {
            return {
                text: template.profiles?.username || t('templates.anonymous'),
                Icon: User,
                isOfficial: false,
            };
        }
        return null;
    };

    const authorInfo = getAuthorInfo();

    return (
        <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between"
            whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
        >
            <Link
                href={`/${locale}/templates/roulette/${template.id}`}
                passHref
                className="cursor-pointer"
            >
                <div>
                    <div className="flex items-center gap-2 text-yellow-300 mb-2">
                        <Layers size={16} />
                        <span className="text-sm font-semibold">{t('templates.title')}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                        {truncatedTitle}
                    </h3>
                    <p className="text-sm text-white/70">
                        {truncatedDescription}
                    </p>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between items-center text-sm text-white/60 mb-4">
                        {authorInfo ? (
                            <p className={`flex items-center gap-2 transition-colors ${authorInfo.isOfficial ? 'text-yellow-400' : 'hover:text-yellow-300'}`}>
                                <authorInfo.Icon size={14} className={authorInfo.isOfficial ? 'fill-yellow-400' : ''} />
                                <span>{authorInfo.text}</span>
                            </p>
                        ) : (
                            <div /> // Keep the space
                        )}
                        {/* disabled属性にisLikingをセット */}
                        <button onClick={handleLike} disabled={isLiking} className="flex items-center gap-2 hover:text-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <Heart size={14} className={isLiked ? 'fill-red-500 text-red-500' : ''} />
                            <span>{likeCount}</span>
                        </button>
                    </div>
                    <p className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold transition-colors">
                        {t('templates.useTemplate')}
                        <ChevronsRight size={18} />
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

export default TemplateCard;
