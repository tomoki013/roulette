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
import { getRouletteById, createRoulette } from '@/lib/services/rouletteService';
import { Json } from '@/types/database.types';
import { useModal } from '@/lib/hooks/useModal';
import { useRouletteWheel } from '@/lib/hooks/useRouletteWheel';
import { useRouletteShare } from '@/lib/hooks/useRouletteShare';
import { ROULETTE_COLORS } from '@/constants/roulette';

const TemplateRoulettePage = () => {
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
    const [isSaving, setIsSaving] = useState(false);
    const [allowFork, setAllowFork] = useState(false);

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
                    showSaveButton={allowFork}
                    saveButtonText={t('templates.forkAndSave')}
                    showShareButton={true}
                    onShareRoulette={() => handleShareUrl(false)}
                />
                
                <RoulettePreview
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
                isOpen={showResult} 
                result={result} 
                onClose={closeResult} 
                onShareImage={handleShareImage}
                onShareUrl={() => handleShareUrl(true)}
            />
        </>
    );
};

export default TemplateRoulettePage;
