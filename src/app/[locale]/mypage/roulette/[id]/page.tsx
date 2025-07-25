'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter, useParams } from 'next/navigation';
import SettingsPanel from '@/components/features/roulette/SettingsPanel';
import RoulettePreview from '@/components/features/roulette/RoulettePreview';
import ResultModal from '@/components/features/roulette/ResultModal';
import { Item } from '@/types';
import LoadingScreen from '@/components/elements/loadingAnimation/LoadingScreen';
import { useAuth } from '@/lib/hooks/useAuth';
import { getRouletteById, updateRoulette } from '@/lib/services/rouletteService';
import { Json } from '@/types/database.types';
import { useRouletteWheel } from '@/lib/hooks/useRouletteWheel';
import { ROULETTE_COLORS } from '@/constants/roulette';

const EditRoulettePage = () => {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const params = useParams<{ id: string; locale: string }>();
    const { user, loading: authLoading } = useAuth();
    
    // State management
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);
    const [title, setTitle] = useState('');
    const [items, setItems] = useState<Item[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    
    // Custom hook for roulette wheel logic
    const {
        rotation,
        isSpinning,
        result,
        showResult,
        spinRoulette,
        closeResult
    } = useRouletteWheel(items);

    // Auth and data loading effect
    useEffect(() => {
        if (authLoading) return;
        
        if (!user) {
            router.replace(`/${i18n.language}/auth`);
            return;
        }

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

    // Save function
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
                onClose={closeResult} 
            />
        </>
    );
};

export default EditRoulettePage;
