'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import SettingsPanel from '@/components/features/roulette/SettingsPanel';
import RoulettePreview from '@/components/features/roulette/RoulettePreview';
import ResultModal from '@/components/features/roulette/ResultModal';
import { Item } from '@/types';
import LoadingScreen from '@/components/elements/loadingAnimation/LoadingScreen';
import { useAuth } from '@/lib/hooks/useAuth';
import { getRouletteById, createRoulette, incrementLikeCount, decrementLikeCount } from '@/lib/services/rouletteService';
import { getProfileByUserId } from '@/lib/services/profileService';
import { Database, Json } from '@/types/database.types';
import { useModal } from '@/lib/hooks/useModal';
import { useRouletteWheel } from '@/lib/hooks/useRouletteWheel';
import { useRouletteShare } from '@/lib/hooks/useRouletteShare';
import { ROULETTE_COLORS } from '@/constants/roulette';
import { motion } from 'framer-motion';
import { User, Heart } from 'lucide-react'; // Heartアイコンをインポート
import Link from 'next/link';

type Profile = Database['public']['Tables']['profiles']['Row'];

const TemplateRoulettePageClient = () => {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const params = useParams<{ id: string; locale: string }>();
    const searchParams = useSearchParams();
    const { user, loading: authLoading } = useAuth();
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);
    const { showModal, closeModal } = useModal();
    const roulettePreviewRef = useRef<HTMLDivElement>(null);

    // State management
    const [items, setItems] = useState<Item[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [allowFork, setAllowFork] = useState(false);
    const [creatorProfile, setCreatorProfile] = useState<Profile | null>(null);
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isLiking, setIsLiking] = useState(false); // いいね処理中の状態を追加
    const [templateId, setTemplateId] = useState<string | null>(null);
    const [isProfilePublic, setIsProfilePublic] = useState(false);


    // Custom hooks
    const {
        rotation,
        isSpinning,
        result,
        showResult,
        spinRoulette,
        closeResult,
        setResult,
        setShowResult
    } = useRouletteWheel(items);

    const { handleShareUrl, handleShareImage } = useRouletteShare({
        title,
        items,
        result,
        showModal,
        closeModal,
        previewRef: roulettePreviewRef,
        t
    });

    // Load template data
    useEffect(() => {
        const configParam = searchParams.get('config');
        const resultParam = searchParams.get('result');

        // Handle URL config parameter
        if (configParam) {
            try {
                const decodedConfig = JSON.parse(decodeURIComponent(atob(configParam)));
                if (decodedConfig.title && Array.isArray(decodedConfig.items)) {
                    setTitle(decodedConfig.title);
                    setItems(decodedConfig.items);
                    if (resultParam) {
                        const foundResult = decodedConfig.items.find((item: Item) => item.name === resultParam);
                        if (foundResult) {
                            setResult(foundResult);
                            setShowResult(true);
                        }
                    }
                }
            } catch (error) {
                console.error("URLからの設定復元に失敗しました:", error);
            }
            setInitialDataLoaded(true);
            return;
        }

        // Fetch template from database
        if (params.id) {
            const fetchTemplateData = async () => {
                try {
                    const template = await getRouletteById(params.id as string);
                    if (template && template.is_template) {
                        setTitle(template.title);
                        setItems(template.items as unknown as Item[]);
                        setAllowFork(template.allow_fork);
                        setLikeCount(template.like_count);
                        setTemplateId(template.id);

                        const likedTemplates = JSON.parse(localStorage.getItem('likedTemplates') || '[]');
                        if (likedTemplates.includes(template.id)) {
                            setIsLiked(true);
                        }

                        // descriptionはJSONオブジェクトの場合もあるため、適切に処理
                        const currentDescription = template.description;
                        if (typeof currentDescription === 'string') {
                            setDescription(currentDescription);
                        } else if (currentDescription && typeof currentDescription === 'object' && !Array.isArray(currentDescription)) {
                            // 単純なオブジェクトの場合はJSON文字列として表示
                            setDescription(JSON.stringify(currentDescription));
                        }

                        // テンプレート取得後、作成者のプロフィールを取得
                        if (template.user_id && template.is_profile_public) { // ★ is_profile_publicがtrueの場合のみ取得
                            const profile = await getProfileByUserId(template.user_id);
                            setCreatorProfile(profile);
                            setIsProfilePublic(true);
                        }

                    } else {
                        router.replace(`/${i18n.language}/templates`);
                    }
                } catch (error) {
                    console.error("Failed to fetch template data:", error);
                    router.replace(`/${i18n.language}/templates`);
                } finally {
                    setInitialDataLoaded(true);
                }
            };
            fetchTemplateData();
        }
    }, [params.id, searchParams, router, i18n.language, setResult, setShowResult]);

    // Item management functions
    const addItem = () => {
        const newItemColor = ROULETTE_COLORS[items.length % ROULETTE_COLORS.length];
        setItems(prev => [
            ...prev,
            {
                name: `${t('roulette.settings.optionDefault')} ${prev.length + 1}`,
                ratio: 1,
                color: newItemColor
            }
        ]);
    };

    const removeItem = (index: number) => {
        if (items.length > 2) {
            setItems(prev => prev.filter((_, i) => i !== index));
        }
    };

    const updateItem = (index: number, field: keyof Item, value: string | number) => {
        setItems(prev => {
            const newItems = [...prev];
            const updatedValue = field === 'color' ? String(value) : value;
            newItems[index] = { ...newItems[index], [field]: updatedValue };
            return newItems;
        });
    };

    // Fork and save function
    const handleForkAndSave = async () => {
        if (!allowFork) return;

        if (!user) {
            router.push(`/${i18n.language}/auth`);
            return;
        }

        setIsSaving(true);
        try {
            await createRoulette({
                user_id: user.id,
                title: `${title} - ${t('templates.copySuffix')}`,
                items: items as unknown as Json,
                supported_languages: [i18n.language],
            });
            router.push(`/${i18n.language}/mypage`);
        } catch (error) {
            console.error("Failed to fork roulette:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleLike = async () => {
        if (!templateId || isLiking) return;
        setIsLiking(true);

        const likedTemplates = JSON.parse(localStorage.getItem('likedTemplates') || '[]');

        try {
            let updatedData;
            if (isLiked) {
                // いいね取り消し処理
                updatedData = await decrementLikeCount(templateId);
                const index = likedTemplates.indexOf(templateId);
                if (index > -1) {
                    likedTemplates.splice(index, 1);
                }
            } else {
                // いいね処理
                updatedData = await incrementLikeCount(templateId);
                if (!likedTemplates.includes(templateId)) {
                    likedTemplates.push(templateId);
                }
            }
            // データベースからの戻り値でUIを更新
            setLikeCount(updatedData.like_count);
            setIsLiked(!isLiked);
            localStorage.setItem('likedTemplates', JSON.stringify(likedTemplates));
        } catch (error) {
            console.error("Failed to update like status:", error);
        } finally {
            setIsLiking(false);
        }
    };

    if (authLoading || !initialDataLoaded) {
        return <LoadingScreen />;
    }

    return (
        <>
            <div className='mb-8 flex flex-col justify-center gap-2'>
                <h1 className="text-4xl font-bold text-white text-center">
                    {title}
                </h1>
                <p className='text-center text-white'>
                    {description}
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SettingsPanel
                    title={title}
                    onTitleChange={setTitle}
                    items={items}
                    onItemAdd={addItem}
                    onItemRemove={removeItem}
                    onItemUpdate={updateItem}
                    onSave={handleForkAndSave}
                    isSaving={isSaving}
                    isLoggedIn={!!user}
                    showSaveButton={allowFork}
                    saveButtonText={t('templates.forkAndSave')}
                    showShareButton={true}
                    onShareRoulette={() => handleShareUrl(false)}
                />

                <div>
                    <RoulettePreview
                        ref={roulettePreviewRef}
                        title={title}
                        items={items}
                        rotation={rotation}
                        isSpinning={isSpinning}
                        onSpin={spinRoulette}
                        result={result}
                        onShareImage={handleShareImage}
                        onShareUrl={() => handleShareUrl(true)}
                    />
                    <div className="mt-4 flex justify-center">
                        <button onClick={handleLike} disabled={isLiking} className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <Heart size={18} className={isLiked ? 'fill-red-500 text-red-500' : ''} />
                            <span>{t('templates.like', 'いいね')} ({likeCount})</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 作成者プロフィールカード */}
            {creatorProfile && isProfilePublic && (
                <motion.div
                    className="max-w-7xl mx-auto mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold text-white mb-4">
                        {t('templates.creatorProfileTitle')}
                        <span className="text-sm text-white/70"> ({creatorProfile.username})</span>
                    </h2>
                    <Link href={`/${i18n.language}/profiles/${creatorProfile.id}`} className="block bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <User className="text-yellow-300" />
                            <h2 className="text-xl font-bold text-white">{creatorProfile.username}</h2>
                        </div>
                        <p className="text-white/80 whitespace-pre-wrap">
                            {creatorProfile.description || 'プロフィールが設定されていません。'}
                        </p>
                    </Link>
                </motion.div>
            )}

            <ResultModal
                isOpen={showResult}
                result={result}
                onClose={closeResult}
                onShareImage={handleShareImage}
                onShareUrl={() => handleShareUrl(true)}
            />
        </>
    );
};

export default TemplateRoulettePageClient;
