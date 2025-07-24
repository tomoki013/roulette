'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter, useSearchParams } from 'next/navigation';
import SettingsPanel from '@/components/features/roulette/SettingsPanel';
import RoulettePreview from '@/components/features/roulette/RoulettePreview';
import ResultModal from '@/components/features/roulette/ResultModal';
import { Item } from '@/types';
import LoadingScreen from '@/components/elements/loadingAnimation/LoadingScreen';
import { useAuth } from '@/lib/hooks/useAuth';
import { createRoulette } from '@/lib/services/rouletteService';
import { Json } from '@/types/database.types';
import { useModal } from '@/lib/hooks/useModal';
import html2canvas from 'html2canvas';
import AuthModal from '@/components/features/auth/AuthModal';

const CreateRoulettePage = () => {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, loading: authLoading } = useAuth();
    const { showModal, closeModal } = useModal();
    const roulettePreviewRef = useRef<HTMLDivElement>(null);

    const configParam = searchParams.get('config');
    const resultParam = searchParams.get('result');

    const [items, setItems] = useState<Item[]>([]);
    const [title, setTitle] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<Item | null>(null);
    const [showResultModal, setShowResultModal] = useState(false);
    const [colors] = useState(['#f6e05e', '#f97316', '#ec4899', '#d946ef', '#8b5cf6', '#6366f1']);
    const [isSaving, setIsSaving] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [saveActionPending, setSaveActionPending] = useState(false);

    useEffect(() => {
        if (!i18n.isInitialized) return;

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
                            setShowResultModal(true);
                        }
                    }
                    return;
                }
            } catch (error) {
                console.error("URLからの設定復元に失敗しました:", error);
            }
        }

        const initialItems = [
            { name: `${t('roulette.settings.optionDefault')} 1`, ratio: 1, color: colors[0] },
            { name: `${t('roulette.settings.optionDefault')} 2`, ratio: 1, color: colors[1] },
            { name: `${t('roulette.settings.optionDefault')} 3`, ratio: 1, color: colors[2] },
        ];
        setItems(initialItems);
        setTitle(t('roulette.preview.title'));

    }, [i18n.isInitialized, t, colors, configParam, resultParam]);

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
        setResult(null);
        setIsSpinning(true);
        setShowResultModal(false);
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
        
        setTimeout(() => {
            setIsSpinning(false);
            setResult(items[selectedIndex]);
            setShowResultModal(true);
        }, 3000);
    };

    const handleShareImage = async () => {
        if (roulettePreviewRef.current) {
            const canvas = await html2canvas(roulettePreviewRef.current, { background: '#1a202c' });
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = `roulette-result-${Date.now()}.png`;
            link.click();
        }
    };

    const handleShareUrl = (withResult = false) => {
        const copyLink = () => {
            const config = { title, items };
            const encodedConfig = btoa(encodeURIComponent(JSON.stringify(config)));
            const url = new URL(window.location.href);
            url.search = '';
            url.searchParams.set('config', encodedConfig);
            
            if (withResult && result) {
                url.searchParams.set('result', result.name);
            }
    
            navigator.clipboard.writeText(url.toString())
                .then(() => {
                    showModal({
                        title: t('roulette.copy.success'),
                        message: withResult 
                            ? t('roulette.copy.successMessageResult') 
                            : t('roulette.copy.successMessageRoulette'),
                        onConfirm: closeModal,
                        confirmText: 'OK',
                        type: 'success',
                    });
                });
        };

        if (withResult) {
            copyLink();
        } else {
            showModal({
                title: t('roulette.copy.confirmTitle'),
                message: t('roulette.copy.confirmMessage'),
                confirmText: t('roulette.copy.confirmAction'),
                cancelText: t('close'),
                onConfirm: () => {
                    closeModal();
                    copyLink();
                },
                onCancel: closeModal,
            });
        }
    };
    
    // ★ 修正点: 保存処理の本体。役割を「保存とリダイレクト」に集中させる。
    const handleSave = useCallback(async () => {
        // ユーザーがいない場合は、認証モーダルを開くための準備をする
        if (!user) {
            setSaveActionPending(true);
            setIsAuthModalOpen(true);
            return;
        }

        // ユーザーがいる場合は、保存処理を実行
        setIsSaving(true);
        try {
            await createRoulette({
                user_id: user.id,
                title,
                items: items as unknown as Json,
                supported_languages: [i18n.language],
            });
            // 保存成功後、そのままマイページへリダイレクト
            router.push(`/${i18n.language}/mypage`);
        } catch (error) {
            console.error("Failed to save roulette:", error);
            // エラー時のみモーダルを表示
            showModal({
                title: t('roulette.save.errorTitle', '保存エラー'),
                message: t('roulette.save.errorMessage', '保存中にエラーが発生しました。'),
                confirmText: t('common.ok', 'OK'),
                onConfirm: closeModal,
                type: 'error',
            });
        } finally {
            setIsSaving(false);
        }
    }, [user, title, items, i18n.language, router, showModal, closeModal, t]);

    // ★ 修正点: ログイン状態を監視し、ログイン成功後にモーダルで通知してから保存処理を実行する
    useEffect(() => {
        if (user && saveActionPending) {
            // 再実行を防ぐために、ペンディング状態をすぐに解除
            setSaveActionPending(false); 
            
            showModal({
                title: t('auth.loginSuccessTitle', 'ログインしました'),
                message: t('auth.loginSuccessMessage', 'ルーレットを保存してマイページへ移動します。'),
                confirmText: t('common.ok', 'OK'),
                onConfirm: () => {
                    closeModal();
                    // モーダルを閉じた後に保存処理を実行
                    handleSave(); 
                },
                onCancel: () => {
                    // モーダルがキャンセルされた場合（外側クリックなど）は閉じるだけ
                    closeModal();
                },
                type: 'success',
            });
        }
    }, [user, saveActionPending, handleSave, showModal, closeModal, t]);


    if (authLoading || !i18n.isInitialized) {
        return <LoadingScreen />;
    }

    return (
        <>
            <h1 className="text-4xl font-bold text-white text-center mb-8">
                {t('heroSection.createRoulette.title')}
            </h1>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SettingsPanel
                    title={title}
                    onTitleChange={setTitle}
                    items={items}
                    onItemAdd={addItem}
                    onItemRemove={removeItem}
                    onItemUpdate={updateItem}
                    onSave={handleSave}
                    isSaving={isSaving}
                    isLoggedIn={!!user}
                    onShareRoulette={() => handleShareUrl(false)}
                    showShareButton={true}
                />
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
            </div>
            
            <ResultModal 
                isOpen={showResultModal} 
                result={result} 
                onClose={() => setShowResultModal(false)}
                onShareImage={handleShareImage}
                onShareUrl={() => handleShareUrl(true)}
            />

            <AuthModal
                isOpen={isAuthModalOpen} 
                onClose={() => {
                    setIsAuthModalOpen(false);
                    setSaveActionPending(false);
                }} 
            />
        </>
    );
};

export default CreateRoulettePage;
