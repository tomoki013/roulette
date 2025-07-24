'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// FIX: useRouterに加えてuseParamsをインポートします
import { useRouter, useParams } from 'next/navigation';
import SettingsPanel from '@/components/features/roulette/SettingsPanel';
import RoulettePreview from '@/components/features/roulette/RoulettePreview';
import ResultModal from '@/components/features/roulette/ResultModal';
import { Item } from '@/types';
import LoadingScreen from '@/components/elements/loadingAnimation/LoadingScreen';
import { useAuth } from '@/lib/hooks/useAuth';
import { getRouletteById, updateRoulette } from '@/lib/services/rouletteService';
import { Json } from '@/types/database.types';

// ページコンポーネント
// FIX: propsからparamsを削除します
const EditRoulettePage = () => {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    // FIX: useParamsフックを使ってパラメータを取得します
    const params = useParams<{ id: string; locale: string }>();
    const { user, loading: authLoading } = useAuth();
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    const [items, setItems] = useState<Item[]>([]);
    const [title, setTitle] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<Item | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [colors] = useState(['#f6e05e', '#f97316', '#ec4899', '#d946ef', '#8b5cf6', '#6366f1']);
    const [isSaving, setIsSaving] = useState(false);

    // URLから取得したIDでルーレットデータを取得し、stateを初期化
    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.replace(`/${i18n.language}/auth`);
            return;
        }

        // params.idが取得できてから処理を開始
        if (!params.id) return;

        const fetchRouletteData = async () => {
            try {
                const roulette = await getRouletteById(params.id as string);
                if (roulette && roulette.user_id === user.id) {
                    setTitle(roulette.title);
                    setItems(roulette.items as unknown as Item[]);
                } else {
                    router.replace(`/${i18n.language}/mypage`);
                }
            } catch (error) {
                console.error("Failed to fetch roulette data:", error);
                router.replace(`/${i18n.language}/mypage`);
            } finally {
                setInitialDataLoaded(true);
            }
        };
        fetchRouletteData();
    }, [params.id, user, authLoading, router, i18n.language]);


    const addItem = () => {
        const newItemColor = colors[items.length % colors.length];
        setItems([...items, { name: `${t('roulette.settings.optionDefault')} ${items.length + 1}`, ratio: 1, color: newItemColor }]);
    };

    const removeItem = (index: number) => {
        if (items.length > 2) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const updateItem = (index: number, field: keyof Item, value: string | number) => {
        const newItems = [...items];
        const updatedValue = field === 'color' ? String(value) : value;
        newItems[index] = { ...newItems[index], [field]: updatedValue };
        setItems(newItems);
    };

    const spinRoulette = () => {
        if (isSpinning || items.length === 0) return;
        setIsSpinning(true);
        setShowResult(false);
        const totalRatio = items.reduce((sum, item) => sum + item.ratio, 0);
        const random = Math.random() * totalRatio;
        let currentWeight = 0;
        let selectedIndex = 0;
        for (let i = 0; i < items.length; i++) {
            currentWeight += items[i].ratio;
            if (random <= currentWeight) {
                selectedIndex = i;
                break;
            }
        }
        const totalAngle = 360;
        let angleAccumulator = 0;
        let targetAngle = 0;
        for (let i = 0; i < items.length; i++) {
            const sectionAngle = (items[i].ratio / totalRatio) * totalAngle;
            if (i === selectedIndex) {
                targetAngle = angleAccumulator + sectionAngle / 2;
                break;
            }
            angleAccumulator += sectionAngle;
        }
        const spins = 8;
        const degreesPerSpin = 360;
        const landingAngleCorrection = 270 - targetAngle;
        const newRotation = rotation - (rotation % degreesPerSpin) + (spins * degreesPerSpin) + landingAngleCorrection;
        setRotation(newRotation);
        setResult(items[selectedIndex]);
        setTimeout(() => {
            setIsSpinning(false);
            setShowResult(true);
        }, 3000);
    };

    // 更新処理
    const handleUpdate = async () => {
        if (!user) {
            router.push(`/${i18n.language}/auth`);
            return;
        }
        setIsSaving(true);
        try {
            await updateRoulette(params.id as string, {
                title,
                items: items as unknown as Json,
            });
            router.push(`/${i18n.language}/mypage`);
        } catch (error) {
            console.error("Failed to update roulette:", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (authLoading || !initialDataLoaded) {
        return <LoadingScreen />;
    }

    return (
        <>
            <h1 className="text-4xl font-bold text-white text-center mb-8">
                {title || t('heroSection.createRoulette.title')}
            </h1>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SettingsPanel
                    title={title}
                    onTitleChange={setTitle}
                    items={items}
                    onItemAdd={addItem}
                    onItemRemove={removeItem}
                    onItemUpdate={updateItem}
                    onSave={handleUpdate}
                    isSaving={isSaving}
                    isLoggedIn={!!user}
                    saveButtonText={t('roulette.settings.save')}
                    showShareButton={false}
                />
                <RoulettePreview
                    title={title}
                    items={items}
                    rotation={rotation}
                    isSpinning={isSpinning}
                    onSpin={spinRoulette}
                    result={result}
                />
            </div>
            
            <ResultModal 
                isOpen={showResult} 
                result={result} 
                onClose={() => setShowResult(false)} 
            />
        </>
    );
};

export default EditRoulettePage;
