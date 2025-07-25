import { useState, useCallback } from 'react';
import { Item } from '@/types';

export const useRouletteWheel = (items: Item[]) => {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<Item | null>(null);
    const [showResult, setShowResult] = useState(false);

    const spinRoulette = useCallback(() => {
        if (isSpinning || items.length === 0) return;
        
        setResult(null);
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

        // Calculate target angle
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

        // Calculate rotation
        const spins = 8;
        const degreesPerSpin = 360;
        const landingAngleCorrection = 270 - targetAngle;
        const newRotation = rotation - (rotation % degreesPerSpin) + (spins * degreesPerSpin) + landingAngleCorrection;
        
        setRotation(newRotation);
        
        setTimeout(() => {
            setIsSpinning(false);
            setResult(items[selectedIndex]);
            setShowResult(true);
        }, 3000);
    }, [isSpinning, items, rotation]);

    const closeResult = useCallback(() => {
        setShowResult(false);
    }, []);

    return {
        rotation,
        isSpinning,
        result,
        showResult,
        spinRoulette,
        closeResult,
        setResult,
        setShowResult
    };
};
