"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";
import SettingsPanel from "@/components/features/roulette/SettingsPanel";
import RoulettePreview from "@/components/features/roulette/RoulettePreview";
import ResultModal from "@/components/features/roulette/ResultModal";
import AuthModal from "@/components/features/auth/AuthModal";
import { Item } from "@/types";
import LoadingScreen from "@/components/elements/loadingAnimation/LoadingScreen";
import { useAuth } from "@/lib/hooks/useAuth";
import { createRoulette } from "@/lib/services/rouletteService";
import { Json } from "@/types/database.types";
import { useModal } from "@/lib/hooks/useModal";
import { useRouletteWheel } from "@/lib/hooks/useRouletteWheel";
import { useRouletteShare } from "@/lib/hooks/useRouletteShare";
import { useRouletteSettings } from "@/lib/hooks/useRouletteSettings";
import { ROULETTE_COLORS } from "@/constants/roulette";

const CreateRoulettePageClient = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const { showModal, closeModal } = useModal();
  const roulettePreviewRef = useRef<HTMLDivElement>(null);

  // Config and result from URL params
  const configParam = searchParams.get("config");
  const resultParam = searchParams.get("result");

  // State management
  const [isSaving, setIsSaving] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [saveActionPending, setSaveActionPending] = useState(false);

  // Custom hooks
  const { title, setTitle, items, setItems, addItem, removeItem, updateItem } =
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

  // Initialize items from URL or default
  useEffect(() => {
    if (!i18n.isInitialized) return;

    if (configParam) {
      try {
        const decodedConfig = JSON.parse(decodeURIComponent(atob(configParam)));
        if (decodedConfig.title && Array.isArray(decodedConfig.items)) {
          setTitle(decodedConfig.title);
          setItems(decodedConfig.items);

          if (resultParam) {
            const foundResult = decodedConfig.items.find(
              (item: Item) => item.name === resultParam
            );
            if (foundResult) {
              setResult(foundResult);
              setShowResult(true);
            }
          }
          return;
        }
      } catch (error) {
        console.error(t("pages.originalRoulette.errors.configRestoreFailed"), error);
      }
    }

    // Initialize with default items
    const initialItems = [
      {
        name: `${t("components.roulette.settings.optionDefault")} 1`,
        ratio: 1,
        color: ROULETTE_COLORS[0],
      },
      {
        name: `${t("components.roulette.settings.optionDefault")} 2`,
        ratio: 1,
        color: ROULETTE_COLORS[1],
      },
      {
        name: `${t("components.roulette.settings.optionDefault")} 3`,
        ratio: 1,
        color: ROULETTE_COLORS[2],
      },
    ];
    setItems(initialItems);
    setTitle(t("components.roulette.preview.title"));
  }, [
    i18n.isInitialized,
    t,
    configParam,
    resultParam,
    setResult,
    setShowResult,
    setTitle,
    setItems,
  ]);

  // Save function
  const handleSave = useCallback(async () => {
    if (!user) {
      setSaveActionPending(true);
      setIsAuthModalOpen(true);
      return;
    }

    setIsSaving(true);
    try {
      await createRoulette({
        user_id: user.id,
        title,
        items: items as unknown as Json,
        supported_languages: [i18n.language],
      });
      router.push(`/${i18n.language}/mypage`);
    } catch (error) {
      console.error(t("pages.originalRoulette.errors.saveFailed"), error);
      showModal({
        title: t("pages.originalRoulette.modals.saveError.title"),
        message: t("pages.originalRoulette.modals.saveError.message"),
        confirmText: t("common.ok"),
        onConfirm: closeModal,
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  }, [user, title, items, i18n.language, router, showModal, closeModal, t]);

  // Handle login success
  useEffect(() => {
    if (user && saveActionPending) {
      setSaveActionPending(false);

      showModal({
        title: t("pages.originalRoulette.modals.loginSuccess.title"),
        message: t("pages.originalRoulette.modals.loginSuccess.message"),
        confirmText: t("common.ok"),
        onConfirm: () => {
          closeModal();
          handleSave();
        },
        onCancel: closeModal,
        type: "success",
      });
    }
  }, [user, saveActionPending, handleSave, showModal, closeModal, t]);

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
    setSaveActionPending(false);
  };

  if (authLoading || !i18n.isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        {t("components.heroSection.createRoulette.title")}
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SettingsPanel
          title={title}
          onTitleChange={setTitle}
          items={items}
          onItemAdd={addItem}
          onItemRemove={removeItem}
          onItemUpdate={updateItem}
          onSave={handleSave}
          isSaving={isSaving}
          isLoggedIn={!!user}
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

      <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModalClose} />
    </>
  );
};

export default CreateRoulettePageClient;
