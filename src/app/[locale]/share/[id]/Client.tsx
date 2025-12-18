"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import SettingsPanel from "@/components/features/roulette/SettingsPanel";
import RoulettePreview from "@/components/features/roulette/RoulettePreview";
import ResultModal from "@/components/features/roulette/ResultModal";
import { Item } from "@/types";
import LoadingScreen from "@/components/elements/loadingAnimation/LoadingScreen";
import { getRouletteById } from "@/lib/services/rouletteService";
import { useModal } from "@/lib/hooks/useModal";
import { useRouletteWheel } from "@/lib/hooks/useRouletteWheel";
import { useRouletteShare } from "@/lib/hooks/useRouletteShare";
import { useRouletteSettings } from "@/lib/hooks/useRouletteSettings";

const SharePageClient = () => {
  const { t } = useTranslation();
  const params = useParams();
  const { showModal, closeModal } = useModal();
  const roulettePreviewRef = useRef<HTMLDivElement>(null);

  const [initialLoaded, setInitialLoaded] = useState(false);

  // Custom hooks
  const { title, setTitle, items, setItems, addItem, removeItem, updateItem, replaceItems } =
    useRouletteSettings();

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

  const { handleShareUrl, handleShareImage } = useRouletteShare({
    title,
    items,
    result,
    showModal,
    closeModal,
    previewRef: roulettePreviewRef,
    t,
  });

  useEffect(() => {
    if (initialLoaded || !params?.id) return;

    const loadData = async () => {
      try {
        const data = await getRouletteById(params.id as string);
        if (data) {
           setTitle(data.title);
           if (Array.isArray(data.items)) {
             const loadedItems = data.items as unknown as Item[];
             setItems(loadedItems);

             // Check if result is saved in description
             if (data.description && typeof data.description === 'object' && !Array.isArray(data.description)) {
                 const desc = data.description as any;
                 if (desc.result) {
                     const foundResult = loadedItems.find(i => i.name === desc.result);
                     if (foundResult) {
                         setResult(foundResult);
                         setShowResult(true);
                     }
                 }
             }
           }
        }
      } catch (e) {
        console.error("Failed to load roulette", e);
      } finally {
        setInitialLoaded(true);
      }
    };
    loadData();
  }, [params?.id, initialLoaded, setTitle, setItems]);

  if (!initialLoaded) return <LoadingScreen />;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white text-center">
            {title}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SettingsPanel
          title={title}
          onTitleChange={setTitle}
          items={items}
          onItemAdd={addItem}
          onItemRemove={removeItem}
          onItemUpdate={updateItem}
          onItemsReplace={replaceItems}
          onSave={() => {}}
          isSaving={false}
          isLoggedIn={false}
          showSaveButton={false}
          onShareRoulette={() => handleShareUrl(false)}
          showShareButton={true}
        />

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

export default SharePageClient;
