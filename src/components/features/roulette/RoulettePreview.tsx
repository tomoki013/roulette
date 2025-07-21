'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Play, Loader2 } from 'lucide-react';
import { Item } from '@/types';
import RouletteWheel from './RouletteWheel';

interface RoulettePreviewProps {
    title: string;
    items: Item[];
    rotation: number;
    isSpinning: boolean;
    onSpin: () => void;
}

const RoulettePreview = ({
    title,
    items,
    rotation,
    isSpinning,
    onSpin,
}: RoulettePreviewProps) => {
    const { t } = useTranslation();
    const totalRatio = items.reduce((sum, item) => sum + item.ratio, 0);

    return (
        <motion.div 
            className="flex flex-col items-center space-y-8"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center">
                <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>

                <RouletteWheel items={items} rotation={rotation} isSpinning={isSpinning} />
                  
                <motion.button
                    onClick={onSpin}
                    disabled={isSpinning}
                    className={`mt-8 px-8 py-4 rounded-full font-bold text-xl transition-all duration-300 flex items-center gap-3 ${
                        isSpinning 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    }`}
                    whileHover={!isSpinning ? { scale: 1.05 } : {}}
                    whileTap={!isSpinning ? { scale: 0.95 } : {}}
                >
                    {isSpinning ? (
                        <>
                            <Loader2 size={24} className="animate-spin" />
                            {t('spinning')}
                        </>
                    ) : (
                        <>
                            <Play size={24} />
                            {t('spin')}
                        </>
                    )}
                </motion.button>

                <div className="w-full mt-6 space-y-2">
                    {items.map((item, index) => {
                        const probability = totalRatio > 0 ? ((item.ratio / totalRatio) * 100).toFixed(1) : '0.0';
                        return (
                            <div key={index} className="flex items-center justify-between text-white bg-black/20 p-2 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span>{item.name}</span>
                                </div>
                                <span>{probability}%</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default RoulettePreview;
