"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Item } from "@/types";
import RouletteWheel from "@/components/features/roulette/RouletteWheel";
import ResultModal from "@/components/features/roulette/ResultModal";
import { ROULETTE_COLORS } from "@/constants/roulette";

const Step = ({ title, content }: { title: string; content: string }) => (
  <div className="flex items-start gap-4">
    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" />
    <div>
      <h3 className="text-xl font-semibold text-yellow-300">{title}</h3>
      <p className="text-white/80 mt-1">{content}</p>
    </div>
  </div>
);

interface HowToUseSpinPageClientProps {
  locale: string;
}

const HowToUseSpinPageClient = ({ locale }: HowToUseSpinPageClientProps) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<Item[]>([
    { name: t("howToUse.demo.item1"), color: ROULETTE_COLORS[0], ratio: 1 },
    { name: t("howToUse.demo.item2"), color: ROULETTE_COLORS[1], ratio: 1 },
    { name: t("howToUse.demo.item3"), color: ROULETTE_COLORS[2], ratio: 1 },
    { name: t("howToUse.demo.item4"), color: ROULETTE_COLORS[3], ratio: 1 },
    { name: t("howToUse.demo.item5"), color: ROULETTE_COLORS[4], ratio: 1 },
  ]);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<Item | null>(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const newRotation = rotation + 360 * 5 + Math.random() * 360;
    setRotation(newRotation);

    setTimeout(() => {
      const totalRatio = items.reduce((sum, item) => sum + item.ratio, 0);
      const finalAngle = newRotation % 360;
      let currentAngle = 0;

      for (const item of items) {
        const sectionAngle = (item.ratio / totalRatio) * 360;
        currentAngle += sectionAngle;
        if (finalAngle < currentAngle) {
          setResult(item);
          break;
        }
      }
      setIsResultModalOpen(true);
      setIsSpinning(false);
    }, 3000);
  };

  const handleCloseModal = () => {
    setIsResultModalOpen(false);
    setResult(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
      >
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <BookOpen className="text-yellow-300" />
          {t("howToUse.basic.spin")}
        </h1>
        <p className="text-center text-lg text-white/80 mb-8">
          {t("howToUse.basic.spin_description")}
        </p>

        <div className="p-4 border border-yellow-300/30 rounded-lg bg-yellow-500/10 mb-8">
          <p className="text-center text-yellow-200">
            {t("howToUse.demo.notice")}
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <RouletteWheel
            items={items}
            rotation={rotation}
            isSpinning={isSpinning}
          />
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-full shadow-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play />
            {isSpinning ? t("roulette.spinning") : t("roulette.spin")}
          </button>
        </div>

        <ResultModal
          isOpen={isResultModalOpen}
          result={result}
          onClose={handleCloseModal}
        />

        <div className="space-y-6 mt-12">
          <Step
            title={t("howToUse.basic.spin_detail_structured.step1_title")}
            content={t("howToUse.basic.spin_detail_structured.step1_content")}
          />
          <Step
            title={t("howToUse.basic.spin_detail_structured.step2_title")}
            content={t("howToUse.basic.spin_detail_structured.step2_content")}
          />
          <Step
            title={t("howToUse.basic.spin_detail_structured.step3_title")}
            content={t("howToUse.basic.spin_detail_structured.step3_content")}
          />
        </div>
      </motion.div>
      <div className="mt-8 text-center">
        <Link
          href={`/${locale}/how-to-use`}
          className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{t("howToUse.back_to_list")}</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default HowToUseSpinPageClient;
