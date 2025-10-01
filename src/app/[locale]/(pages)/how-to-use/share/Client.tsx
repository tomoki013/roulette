"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  ArrowLeft,
  Share2,
  Link as LinkIcon,
  Twitter,
  Facebook,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Item } from "@/types";
import RouletteWheel from "@/components/features/roulette/RouletteWheel";
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

interface HowToUseSharePageClientProps {
  locale: string;
}

const HowToUseSharePageClient = ({ locale }: HowToUseSharePageClientProps) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<Item[]>([
    { name: t("howToUse.demo.item1"), color: ROULETTE_COLORS[0], ratio: 1 },
    { name: t("howToUse.demo.item2"), color: ROULETTE_COLORS[1], ratio: 1 },
    { name: t("howToUse.demo.item3"), color: ROULETTE_COLORS[2], ratio: 1 },
    { name: t("howToUse.demo.item4"), color: ROULETTE_COLORS[3], ratio: 1 },
    { name: t("howToUse.demo.item5"), color: ROULETTE_COLORS[4], ratio: 1 },
  ]);
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const handleCopy = () => {
    setShowCopyMessage(true);
    setTimeout(() => setShowCopyMessage(false), 2000);
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
          {t("howToUse.basic.share")}
        </h1>
        <p className="text-center text-lg text-white/80 mb-8">
          {t("howToUse.basic.share_description")}
        </p>

        <div className="p-4 border border-yellow-300/30 rounded-lg bg-yellow-500/10 mb-8">
          <p className="text-center text-yellow-200">
            {t("howToUse.demo.notice")}
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <RouletteWheel items={items} rotation={0} isSpinning={false} />
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white"
            >
              <LinkIcon size={16} />
              {t("roulette.copyUrl")}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white">
              <Twitter size={16} />
              {t("roulette.shareOnX")}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white">
              <Facebook size={16} />
              {t("roulette.shareOnFacebook")}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white">
              <Share2 size={16} />
              {t("other")}
            </button>
          </div>
          {showCopyMessage && (
            <p className="text-green-400 mt-2">{t("roulette.urlCopied")}</p>
          )}
        </div>

        <div className="space-y-6 mt-12">
          <Step
            title={t("howToUse.basic.share_detail_structured.step1_title")}
            content={t("howToUse.basic.share_detail_structured.step1_content")}
          />
          <Step
            title={t("howToUse.basic.share_detail_structured.step2_title")}
            content={t("howToUse.basic.share_detail_structured.step2_content")}
          />
          <Step
            title={t("howToUse.basic.share_detail_structured.step3_title")}
            content={t("howToUse.basic.share_detail_structured.step3_content")}
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

export default HowToUseSharePageClient;
