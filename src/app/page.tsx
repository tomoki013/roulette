'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Settings, Save, Share2, Sparkles, Trophy, Play } from 'lucide-react';

interface Item {
	name: string;
	ratio: number;
}

const RouletteApp = () => {
    const [items, setItems] = useState<Item[]>([
        { name: 'オプション1', ratio: 1 },
        { name: 'オプション2', ratio: 1 },
        { name: 'オプション3', ratio: 1 },
    ]);

    const [title, setTitle] = useState('私のルーレット');
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<Item | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [colors, setColors] = useState(['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']);
    const [showSettings, setShowSettings] = useState(false);

    const spinRef = useRef(null);

    const addItem = () => {
        setItems([...items, { name: `オプション${items.length + 1}`, ratio: 1 }]);
    };

    const removeItem = (index: number) => {
        if (items.length > 2) {
          setItems(items.filter((_, i) => i !== index));
        }
    };

    const updateItem = (index: number, field: keyof Item, value: number | string) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const spinRoulette = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setShowResult(false);

        // 重み付き抽選
        const totalRatio = items.reduce((sum, item) => sum + item.ratio, 0);
        const random = Math.random() * totalRatio;
        let current = 0;
        let selectedIndex = 0;

        for (let i = 0; i < items.length; i++) {
            current += items[i].ratio;
            if (random <= current) {
                selectedIndex = i;
                break;
            }
        }

        // 回転角度を計算（頂点に来るように調整）
        const totalAngle = 360;
        let currentAngle = 0;
        let targetAngle = 0;

        // 選択されたセクションの中央角度を計算
        for (let i = 0; i < items.length; i++) {
            const sectionAngle = (items[i].ratio / totalRatio) * totalAngle;
            if (i === selectedIndex) {
                targetAngle = currentAngle + (sectionAngle / 2);
                break;
            }
            currentAngle += sectionAngle;
        }

        // 頂点（12時方向）に来るように角度を調整
        const adjustedTargetAngle = 90 - targetAngle; // 90度は12時方向
        const spins = 5; // 5回転
        const finalRotation = rotation + (spins * 360) + adjustedTargetAngle;

        setRotation(finalRotation);
        setResult(items[selectedIndex]);

        // アニメーション完了後に結果を表示
        setTimeout(() => {
            setIsSpinning(false);
            setShowResult(true);
        }, 3000);
    };

    const closeResult = () => {
        setShowResult(false);
    };

    const generateWheelSections = () => {
      	const totalRatio = items.reduce((sum, item) => sum + item.ratio, 0);
      	let currentAngle = 0;

      	return items.map((item, index) => {
      	  	const sectionAngle = (item.ratio / totalRatio) * 360;
      	  	const startAngle = currentAngle;
      	  	currentAngle += sectionAngle;
			
      	  	const x1 = Math.cos((startAngle * Math.PI) / 180) * 150;
      	  	const y1 = Math.sin((startAngle * Math.PI) / 180) * 150;
      	  	const x2 = Math.cos((currentAngle * Math.PI) / 180) * 150;
      	  	const y2 = Math.sin((currentAngle * Math.PI) / 180) * 150;
			
      	  	const largeArcFlag = sectionAngle > 180 ? 1 : 0;
			
      	  	const pathData = [
      	  	  	'M', 0, 0,
      	  	  	'L', x1, y1,
      	  	  	'A', 150, 150, 0, largeArcFlag, 1, x2, y2,
      	  	  	'Z'
      	  	].join(' ');
		  
      	  	const textAngle = startAngle + sectionAngle / 2;
      	  	const textX = Math.cos((textAngle * Math.PI) / 180) * 100;
      	  	const textY = Math.sin((textAngle * Math.PI) / 180) * 100;
		  
      	  	return (
      	  	  	<g key={index}>
      	  	  	  	<path
      	  	  	  	  	d={pathData}
      	  	  	  	  	fill={colors[index % colors.length]}
      	  	  	  	  	stroke="#fff"
      	  	  	  	  	strokeWidth="3"
      	  	  	  	  	className="drop-shadow-lg"
      	  	  	  	/>
      	  	  	  	<text
      	  	  	  	  	x={textX}
      	  	  	  	  	y={textY}
      	  	  	  	  	textAnchor="middle"
      	  	  	  	  	dominantBaseline="middle"
      	  	  	  	  	className="fill-white font-bold text-sm"
      	  	  	  	  	style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
      	  	  	  	>
      	  	  	  	  	{item.name}
      	  	  	  	</text>
      	  	  	</g>
      	  	);
      	});
    };

    return (
      	<div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-4">
      	  	{/* ヘッダー */}
      	  	<motion.header 
      	  	  	className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-sm rounded-2xl mb-8"
      	  	  	initial={{ y: -50, opacity: 0 }}
      	  	  	animate={{ y: 0, opacity: 1 }}
      	  	  	transition={{ duration: 0.6 }}
      	  	>
      	  	  	<h1 className="text-3xl font-bold text-white flex items-center gap-2">
      	  	  	  	<Sparkles className="text-yellow-300" />
      	  	  	  	ワクワクルーレット
      	  	  	</h1>
      	  	  	<div className="flex gap-4">
      	  	  	  	<button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors">
      	  	  	  	  	テンプレート
      	  	  	  	</button>
      	  	  	  	<button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors">
      	  	  	  	  	ログイン
      	  	  	  	</button>
      	  	  	</div>
      	  	</motion.header>

      	  	<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      	  	  	{/* 左ペイン：設定エリア */}
      	  	  	<motion.div 
      	  	  	  	className="space-y-6"
      	  	  	  	initial={{ x: -50, opacity: 0 }}
      	  	  	  	animate={{ x: 0, opacity: 1 }}
      	  	  	  	transition={{ duration: 0.6, delay: 0.2 }}
      	  	  	>
      	  	  	  	<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
      	  	  	  	  	<h2 className="text-xl font-semibold text-white mb-4">ルーレット設定</h2>

      	  	  	  	  	{/* タイトル入力 */}
      	  	  	  	  	<div className="mb-6">
      	  	  	  	  	  	<label className="block text-white/80 text-sm font-medium mb-2">
      	  	  	  	  	  	  	タイトル
      	  	  	  	  	  	</label>
      	  	  	  	  	  	<input
      	  	  	  	  	  	  	type="text"
      	  	  	  	  	  	  	value={title}
      	  	  	  	  	  	  	onChange={(e) => setTitle(e.target.value)}
      	  	  	  	  	  	  	className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
      	  	  	  	  	  	  	placeholder="ルーレットのタイトルを入力"
      	  	  	  	  	  	/>
      	  	  	  	  	</div>

      	  	  	  	  	{/* アイテム設定 */}
      	  	  	  	  	<div className="space-y-3">
      	  	  	  	  	  	{items.map((item, index) => (
      	  	  	  	  	  	  	<motion.div
      	  	  	  	  	  	  	  	key={index}
      	  	  	  	  	  	  	  	className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
      	  	  	  	  	  	  	  	initial={{ opacity: 0, y: 10 }}
      	  	  	  	  	  	  	  	animate={{ opacity: 1, y: 0 }}
      	  	  	  	  	  	  	  	transition={{ duration: 0.3, delay: index * 0.1 }}
      	  	  	  	  	  	  	>
      	  	  	  	  	  	  	  	<div
      	  	  	  	  	  	  	  	  	className="w-4 h-4 rounded-full flex-shrink-0"
      	  	  	  	  	  	  	  	  	style={{ backgroundColor: colors[index % colors.length] }}
      	  	  	  	  	  	  	  	/>
      	  	  	  	  	  	  	  	<input
      	  	  	  	  	  	  	  	  	type="text"
      	  	  	  	  	  	  	  	  	value={item.name}
      	  	  	  	  	  	  	  	  	onChange={(e) => updateItem(index, 'name', e.target.value)}
      	  	  	  	  	  	  	  	  	className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
      	  	  	  	  	  	  	  	/>
      	  	  	  	  	  	  	  	<select
      	  	  	  	  	  	  	  	  	value={item.ratio}
      	  	  	  	  	  	  	  	  	onChange={(e) => updateItem(index, 'ratio', parseInt(e.target.value))}
      	  	  	  	  	  	  	  	  	className="px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
      	  	  	  	  	  	  	  	>
      	  	  	  	  	  	  	  	  	{[1, 2, 3, 4, 5].map(num => (
      	  	  	  	  	  	  	  	  	  	<option key={num} value={num} className="bg-gray-800">
      	  	  	  	  	  	  	  	  	  	  	{num}
      	  	  	  	  	  	  	  	  	  	</option>
      	  	  	  	  	  	  	  	  	))}
      	  	  	  	  	  	  	  	</select>
      	  	  	  	  	  	  	  	{items.length > 2 && (
      	  	  	  	  	  	  	  	  	<button
      	  	  	  	  	  	  	  	  	  	onClick={() => removeItem(index)}
      	  	  	  	  	  	  	  	  	  	className="p-2 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-lg transition-colors"
      	  	  	  	  	  	  	  	  	>
      	  	  	  	  	  	  	  	  	  	<X size={16} />
      	  	  	  	  	  	  	  	  	</button>
      	  	  	  	  	  	  	  	)}
      	  	  	  	  	  	  	</motion.div>
      	  	  	  	  	  	))}

      	  	  	  	  	  	<button
      	  	  	  	  	  	  	onClick={addItem}
      	  	  	  	  	  	  	className="w-full p-3 border-2 border-dashed border-white/30 rounded-lg text-white/80 hover:text-white hover:border-white/50 transition-colors flex items-center justify-center gap-2"
      	  	  	  	  	  	>
      	  	  	  	  	  	  	<Plus size={20} />
      	  	  	  	  	  	  	項目を追加
      	  	  	  	  	  	</button>
      	  	  	  	  	</div>
						
      	  	  	  	  	{/* アクションボタン */}
      	  	  	  	  	<div className="flex gap-3 mt-6">
      	  	  	  	  	  	<button
      	  	  	  	  	  	  	onClick={() => setShowSettings(!showSettings)}
      	  	  	  	  	  	  	className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors flex items-center gap-2"
      	  	  	  	  	  	>
      	  	  	  	  	  	  	<Settings size={16} />
      	  	  	  	  	  	  	設定
      	  	  	  	  	  	</button>
      	  	  	  	  	  	<button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-2">
      	  	  	  	  	  	  	<Save size={16} />
      	  	  	  	  	  	  	保存
      	  	  	  	  	  	</button>
      	  	  	  	  	  	<button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2">
      	  	  	  	  	  	  	<Share2 size={16} />
      	  	  	  	  	  	  	共有
      	  	  	  	  	  	</button>
      	  	  	  	  	</div>
      	  	  	  	</div>
      	  	  	</motion.div>
					
      	  	  	{/* 右ペイン：プレビューエリア */}
      	  	  	<motion.div 
      	  	  	  	className="flex flex-col items-center space-y-8"
      	  	  	  	initial={{ x: 50, opacity: 0 }}
      	  	  	  	animate={{ x: 0, opacity: 1 }}
      	  	  	  	transition={{ duration: 0.6, delay: 0.4 }}
      	  	  	>
      	  	  	  	<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center">
      	  	  	  	  	<h3 className="text-xl font-semibold text-white mb-6">{title}</h3>

      	  	  	  	  	{/* ルーレット */}
      	  	  	  	  	<div className="relative">
      	  	  	  	  	  	<motion.div
      	  	  	  	  	  	  	ref={spinRef}
      	  	  	  	  	  	  	className="relative"
      	  	  	  	  	  	  	animate={{ rotate: rotation }}
      	  	  	  	  	  	  	transition={{ 
      	  	  	  	  	  	  	  	duration: isSpinning ? 3 : 0, 
      	  	  	  	  	  	  	  	ease: [0.23, 1, 0.320, 1] 
      	  	  	  	  	  	  	}}
      	  	  	  	  	  	>
      	  	  	  	  	  	  	<svg width="320" height="320" viewBox="-160 -160 320 320">
      	  	  	  	  	  	  	  	{generateWheelSections()}
      	  	  	  	  	  	  	</svg>
      	  	  	  	  	  	</motion.div>
							
      	  	  	  	  	  	{/* 中央の円 */}
      	  	  	  	  	  	<div className="absolute inset-0 flex items-center justify-center">
      	  	  	  	  	  	  	<div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
      	  	  	  	  	  	  	  	<div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
      	  	  	  	  	  	  	</div>
      	  	  	  	  	  	</div>
							
      	  	  	  	  	  	{/* 矢印 */}
      	  	  	  	  	  	<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
      	  	  	  	  	  	  	<div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-yellow-400 drop-shadow-lg" />
      	  	  	  	  	  	</div>
      	  	  	  	  	</div>
						  
      	  	  	  	  	{/* スピンボタン */}
      	  	  	  	  	<motion.button
      	  	  	  	  	  	onClick={spinRoulette}
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
      	  	  	  	  	  	  	  	<div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      	  	  	  	  	  	  	  	回転中...
      	  	  	  	  	  	  	</>
      	  	  	  	  	  	) : (
      	  	  	  	  	  	  	<>
      	  	  	  	  	  	  	  	<Play size={24} />
      	  	  	  	  	  	  	  	回す！
      	  	  	  	  	  	  	</>
      	  	  	  	  	  	)}
      	  	  	  	  	</motion.button>
      	  	  	  	</div>
      	  	  	</motion.div>
      	  	</div>
				  
      	  	{/* 結果モーダル */}
      	  	<AnimatePresence>
      	  	  	{showResult && (
      	  	  	  	<motion.div
      	  	  	  	  	className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      	  	  	  	  	initial={{ opacity: 0 }}
      	  	  	  	  	animate={{ opacity: 1 }}
      	  	  	  	  	exit={{ opacity: 0 }}
      	  	  	  	  	onClick={closeResult}
      	  	  	  	>
      	  	  	  	  	<motion.div
      	  	  	  	  	  	className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
      	  	  	  	  	  	initial={{ scale: 0.8, opacity: 0 }}
      	  	  	  	  	  	animate={{ scale: 1, opacity: 1 }}
      	  	  	  	  	  	exit={{ scale: 0.8, opacity: 0 }}
      	  	  	  	  	  	transition={{ type: "spring", duration: 0.5 }}
      	  	  	  	  	  	onClick={(e) => e.stopPropagation()}
      	  	  	  	  	>
      	  	  	  	  	  	{/* 紙吹雪エフェクト */}
      	  	  	  	  	  	<div className="absolute inset-0 pointer-events-none">
      	  	  	  	  	  	  	{[...Array(20)].map((_, i) => (
      	  	  	  	  	  	  	  	<motion.div
      	  	  	  	  	  	  	  	  	key={i}
      	  	  	  	  	  	  	  	  	className="absolute w-2 h-2 bg-yellow-400 rounded-full"
      	  	  	  	  	  	  	  	  	initial={{ 
      	  	  	  	  	  	  	  	  	  	x: Math.random() * 400,
      	  	  	  	  	  	  	  	  	  	y: -10,
      	  	  	  	  	  	  	  	  	  	rotate: 0,
      	  	  	  	  	  	  	  	  	  	opacity: 1
      	  	  	  	  	  	  	  	  	}}
      	  	  	  	  	  	  	  	  	animate={{ 
      	  	  	  	  	  	  	  	  	  	y: 500,
      	  	  	  	  	  	  	  	  	  	rotate: 360,
      	  	  	  	  	  	  	  	  	  	opacity: 0
      	  	  	  	  	  	  	  	  	}}
      	  	  	  	  	  	  	  	  	transition={{ 
      	  	  	  	  	  	  	  	  	  	duration: 2,
      	  	  	  	  	  	  	  	  	  	delay: i * 0.1,
      	  	  	  	  	  	  	  	  	  	repeat: Infinity,
      	  	  	  	  	  	  	  	  	  	repeatDelay: 3
      	  	  	  	  	  	  	  	  	}}
      	  	  	  	  	  	  	  	/>
      	  	  	  	  	  	  	))}
      	  	  	  	  	  	</div>
							
      	  	  	  	  	  	<div className="relative z-10">
      	  	  	  	  	  	  	<Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
      	  	  	  	  	  	  	<h2 className="text-2xl font-bold text-gray-800 mb-4">結果発表！</h2>
      	  	  	  	  	  	  	<div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
      	  	  	  	  	  	  	  	{result?.name}
      	  	  	  	  	  	  	</div>
      	  	  	  	  	  	  	<button
      	  	  	  	  	  	  	  	onClick={closeResult}
      	  	  	  	  	  	  	  	className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors font-semibold"
      	  	  	  	  	  	  	>
      	  	  	  	  	  	  	  	閉じる
      	  	  	  	  	  	  	</button>
      	  	  	  	  	  	</div>
      	  	  	  	  	</motion.div>
      	  	  	  	</motion.div>
      	  	  	)}
      	  	</AnimatePresence>
      	</div>
    );
};

export default RouletteApp;
