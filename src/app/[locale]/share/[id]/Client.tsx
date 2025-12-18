"use client";

import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Item } from "@/types";
import { Database } from "@/types/database.types";
import RoulettePreview from "@/components/features/roulette/RoulettePreview";
import ResultModal from "@/components/features/roulette/ResultModal";
import Link from "next/link";
import { useRouletteWheel } from "@/lib/hooks/useRouletteWheel";
import { useRouletteShare } from "@/lib/hooks/useRouletteShare";
import { useModal } from "@/lib/hooks/useModal";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

type Roulette = Database["public"]["Tables"]["roulettes"]["Row"];

interface SharePageClientProps {
  roulette: Roulette;
}

const SharePageClient = ({ roulette }: SharePageClientProps) => {
  const { t, i18n } = useTranslation();
  const roulettePreviewRef = useRef<HTMLDivElement>(null);
  const { showModal, closeModal } = useModal();
  const searchParams = useSearchParams();
  const resultParam = searchParams.get("result");

  const items: Item[] = roulette.items as unknown as Item[];
  const title = roulette.title;

  const {
    rotation,
    isSpinning,
    result,
    showResult,
    spinRoulette,
    closeResult,
    setResult,
    setShowResult,
  } = useRouletteWheel(items);

  const { handleShareUrl, handleShareImage, getShareUrl, getShortShareUrl } = useRouletteShare({
    title,
    items,
    result,
    showModal,
    closeModal,
    previewRef: roulettePreviewRef,
    t,
  });

  // Handle result param
  useEffect(() => {
    if (resultParam && items.length > 0) {
        const found = items.find(i => i.name === resultParam);
        if (found) {
            setResult(found);
            setShowResult(true);
        }
    }
  }, [resultParam, items, setResult, setShowResult]);

  // Ensure language is initialized
  if (!i18n.isInitialized) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href={`/${i18n.language}/`}
        className="inline-flex items-center text-white/60 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2" size={20} />
        {t("common.backToHome")}
      </Link>

      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          {title}
        </h1>

        <div className="w-full max-w-2xl">
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
      </div>

      <ResultModal
        isOpen={showResult}
        result={result}
        onClose={closeResult}
        onShareImage={handleShareImage}
        onShareUrl={() => handleShareUrl(true)}
        shareUrl={getShareUrl(true)}
        getShareUrl={() => getShortShareUrl()}
      />
    </div>
  );
};

export default SharePageClient;
