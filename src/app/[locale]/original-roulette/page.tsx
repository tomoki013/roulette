'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SettingsPanel from '@/components/features/roulette/SettingsPanel';
import RoulettePreview from '@/components/features/roulette/RoulettePreview';
import ResultModal from '@/components/features/roulette/ResultModal';
import { Item } from '@/types';
import LoadingScreen from '@/components/elements/loadingAnimation/LoadingScreen';

const RouletteApp = () => {
    const { t, i18n } = useTranslation();

    const [items, setItems] = useState<Item[]>([]);
    const [title, setTitle] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<Item | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [colors] = useState(['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']);

    useEffect(() => {
        if (i18n.isInitialized) {
            setItems([
                { name: `${t('optionDefault')} 1`, ratio: 1, color: colors[0] },
                { name: `${t('optionDefault')} 2`, ratio: 1, color: colors[1] },
                { name: `${t('optionDefault')} 3`, ratio: 1, color: colors[2] },
            ]);
            setTitle(t('previewTitle'));
        }
    }, [i18n.isInitialized, t, colors]);

    const addItem = () => {
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

    if (!i18n.isInitialized) {
        return <LoadingScreen />;
    }

    return (
        <>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SettingsPanel
                    title={title}
                    onTitleChange={setTitle}
                    items={items}
                    onItemAdd={addItem}
                    onItemRemove={removeItem}
                    onItemUpdate={updateItem}
                />
                <RoulettePreview
                    title={title}
                    items={items}
                    rotation={rotation}
                    isSpinning={isSpinning}
                    onSpin={spinRoulette}
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

export default RouletteApp;
