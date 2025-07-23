'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter, useParams } from 'next/navigation';
import SettingsPanel from '@/components/features/roulette/SettingsPanel';
import RoulettePreview from '@/components/features/roulette/RoulettePreview';
import ResultModal from '@/components/features/roulette/ResultModal';
import { Item } from '@/types';
import LoadingScreen from '@/components/elements/loadingAnimation/LoadingScreen';
import { useAuth } from '@/lib/hooks/useAuth';
import { getRouletteById, createRoulette } from '@/lib/services/rouletteService';
import { Json } from '@/types/database.types';
import { useModal } from '@/lib/hooks/useModal';

const TemplateRoulettePage = () => {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const params = useParams<{ id: string; locale: string }>();
    const { user, loading: authLoading } = useAuth();
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);
    const { showModal, closeModal } = useModal();
    const roulettePreviewRef = useRef<HTMLDivElement>(null);

    const [items, setItems] = useState<Item[]>([]);
    const [title, setTitle] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<Item | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [allowFork, setAllowFork] = useState(false);

    // テンプレートデータを取得
    useEffect(() => {
        if (!params.id) return;

        const fetchTemplateData = async () => {
            try {
                const template = await getRouletteById(params.id as string);
                // テンプレートとして公開されているか確認
                if (template && template.is_template) {
                    setTitle(template.title);
                    setItems(template.items as unknown as Item[]);
                    setAllowFork(template.allow_fork);
                } else {
                    // 存在しないか、テンプレートでない場合は一覧へ
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
    }, [params.id, router, i18n.language]);

    const addItem = () => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
        const newItemColor = colors[items.length % colors.length];
        setItems([...items, { name: `${t('optionDefault')} ${items.length + 1}`, ratio: 1, color: newItemColor }]);
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

    const handleShareImage = async () => {
        if (roulettePreviewRef.current) {
            const canvas = await html2canvas(roulettePreviewRef.current, { background: undefined });
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = `roulette-result-${Date.now()}.png`;
            link.click();
        }
    };

    const handleShareUrl = () => {
        const config = { title, items };
        const encodedConfig = btoa(encodeURIComponent(JSON.stringify(config)));
        const url = new URL(window.location.href);
        url.search = '';
        url.searchParams.set('config', encodedConfig);
        if (result) {
            url.searchParams.set('result', result.name);
        }
        navigator.clipboard.writeText(url.toString())
            .then(() => {
                showModal({
                    title: t('copySuccessTitle'),
                    message: t('copySuccessMessageResult'),
                    onConfirm: closeModal,
                    confirmText: 'OK',
                    type: 'success',
                });
            });
    };

    // 「複製して保存」処理
    const handleForkAndSave = async () => {
        if (!allowFork) return; // 複製が許可されていなければ何もしない

        if (!user) {
            // ログインしていない場合はログインページへ誘導
            router.push(`/${i18n.language}/auth`);
            return;
        }
        setIsSaving(true);
        try {
            // 現在のルーレット設定を自分のルーレットとして新規作成
            await createRoulette({
                user_id: user.id,
                title: `${title} - ${t('templates.copySuffix')}`, // タイトルに「のコピー」を追加
                items: items as unknown as Json,
                supported_languages: [i18n.language],
                // is_template と allow_fork はデフォルト(false)で作成
            });
            router.push(`/${i18n.language}/mypage`);
        } catch (error) {
            console.error("Failed to fork roulette:", error);
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
                {title}
            </h1>
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
                    // 複製が許可されている場合のみ保存ボタンを表示
                    showSaveButton={allowFork}
                    saveButtonText={t('templates.forkAndSave')}
                />
                <RoulettePreview
                    title={title}
                    items={items}
                    rotation={rotation}
                    isSpinning={isSpinning}
                    onSpin={spinRoulette}
                    result={result}
                    onShareImage={handleShareImage}
                    onShareUrl={handleShareUrl}
                />
            </div>
            
            <ResultModal 
                isOpen={showResult} 
                result={result} 
                onClose={() => setShowResult(false)} 
                onShareImage={handleShareImage}
                onShareUrl={handleShareUrl}
            />
        </>
    );
};

export default TemplateRoulettePage;
