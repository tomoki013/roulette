"use client";

import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Play, Loader2, Share2 } from "lucide-react";
import { Item } from "@/types";
import RouletteWheel from "./RouletteWheel";

interface RoulettePreviewProps {
  title: string;
  items: Item[];
  rotation: number;
  isSpinning: boolean;
  onSpin: () => void;
  result: Item | null;
  onShareImage?: () => void;
  onShareUrl?: () => void;
}

const RoulettePreview = forwardRef<HTMLDivElement, RoulettePreviewProps>(
  (
    {
      title,
      items,
      rotation,
      isSpinning,
      onSpin,
      result,
      onShareImage,
      onShareUrl,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const totalRatio = items.reduce((sum, item) => sum + item.ratio, 0);

    const renderProbabilityList = () => (
      <div className="w-full mt-6 space-y-2">
        {items.map((item, index) => {
          const probability =
            totalRatio > 0
              ? ((item.ratio / totalRatio) * 100).toFixed(1)
              : "0.0";
          return (
            <div
              key={index}
              className="flex items-center justify-between text-white bg-black/20 p-2 rounded-lg"
            >
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
    );

    const renderSpinButton = () => (
      <motion.button
        onClick={onSpin}
        disabled={isSpinning}
        className={`mt-8 px-8 py-4 rounded-full font-bold text-xl transition-all duration-300 flex items-center gap-3 ${
          isSpinning
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
        }`}
        whileHover={!isSpinning ? { scale: 1.05 } : {}}
        whileTap={!isSpinning ? { scale: 0.95 } : {}}
      >
        {isSpinning ? (
          <>
            <Loader2 size={24} className="animate-spin" />
            {t("components.roulette.preview.spinning")}
          </>
        ) : (
          <>
            <Play size={24} />
            {t("components.roulette.preview.spin")}
          </>
        )}
      </motion.button>
    );

    const renderResult = () => {
      if (!result || isSpinning) return null;

      return (
        <motion.div
          className="mt-6 text-center w-full bg-black/20 p-4 rounded-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p
            className="text-white/80"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
          >
            {t("components.roulette.result.title")}
          </p>
          <p
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 my-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
          >
            {result.name}
          </p>
          {onShareImage && onShareUrl && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={onShareUrl}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white"
              >
                <Share2 size={16} />
                {t("components.roulette.share.url")}
              </button>
            </div>
          )}
        </motion.div>
      );
    };

    return (
      <motion.div
        className="flex flex-col items-center space-y-8"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div
          ref={ref}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center"
        >
          <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>

          <RouletteWheel
            items={items}
            rotation={rotation}
            isSpinning={isSpinning}
          />

          {renderSpinButton()}
          {renderResult()}
          {renderProbabilityList()}
        </div>
      </motion.div>
    );
  }
);

RoulettePreview.displayName = "RoulettePreview";
export default RoulettePreview;
