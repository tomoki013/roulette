"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, useParams } from "next/navigation";
import SettingsPanel from "@/components/features/roulette/SettingsPanel";
import RoulettePreview from "@/components/features/roulette/RoulettePreview";
import ResultModal from "@/components/features/roulette/ResultModal";
import { Item } from "@/types";
import LoadingScreen from "@/components/elements/loadingAnimation/LoadingScreen";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  getRouletteById,
  updateRoulette,
} from "@/lib/services/rouletteService";
import { Json } from "@/types/database.types";
import { useRouletteWheel } from "@/lib/hooks/useRouletteWheel";
import { useRouletteSettings } from "@/lib/hooks/useRouletteSettings";
import { ROULETTE_COLORS } from "@/constants/roulette";

const EditRoulettePageClient = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useParams<{ id: string; locale: string }>();
  const { user, loading: authLoading } = useAuth();

  // State management
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Custom hooks
  const { title, setTitle, items, setItems, addItem, removeItem, updateItem } =
    useRouletteSettings();

  // Custom hook for roulette wheel logic
  const {
    rotation,
    isSpinning,
    result,
    showResult,
    spinRoulette,
    closeResult,
  } = useRouletteWheel(items);

  // Auth and data loading effect
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.replace(`/${i18n.language}/auth`);
      return;
    }

    if (!params.id) return;

    const fetchRouletteData = async () => {
      try {
        const roulette = await getRouletteById(params.id as string);
        if (roulette && roulette.user_id === user.id) {
          setTitle(roulette.title);
          setItems(roulette.items as unknown as Item[]);

          // descriptionはJSONオブジェクトの場合もあるため、適切に処理
          const currentDescription = roulette.description;
          if (typeof currentDescription === "string") {
            setDescription(currentDescription);
          } else if (
            currentDescription &&
            typeof currentDescription === "object" &&
            !Array.isArray(currentDescription)
          ) {
            // 単純なオブジェクトの場合はJSON文字列として表示
            setDescription(JSON.stringify(currentDescription));
          }
        } else {
          router.replace(`/${i18n.language}/mypage`);
        }
      } catch (error) {
        console.error("Failed to fetch roulette data:", error);
        router.replace(`/${i18n.language}/mypage`);
      } finally {
        setInitialDataLoaded(true);
      }
    };

    fetchRouletteData();
  }, [params.id, user, authLoading, router, i18n.language, setTitle, setItems]);

  // Save function
  const handleUpdate = async () => {
    if (!user) {
      router.push(`/${i18n.language}/auth`);
      return;
    }

    setIsSaving(true);
    try {
      await updateRoulette(params.id as string, {
        title,
        items: items as unknown as Json,
      });
      router.push(`/${i18n.language}/mypage`);
    } catch (error) {
      console.error("Failed to update roulette:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || !initialDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="mb-8 flex flex-col justify-center gap-2">
        <h1 className="text-4xl font-bold text-white text-center">
          {title || t("components.heroSection.createRoulette.title")}
        </h1>
        <p className="text-center text-white">{description}</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SettingsPanel
          title={title}
          onTitleChange={setTitle}
          items={items}
          onItemAdd={addItem}
          onItemRemove={removeItem}
          onItemUpdate={updateItem}
          onSave={handleUpdate}
          isSaving={isSaving}
          isLoggedIn={!!user}
          saveButtonText={t("components.roulette.settings.saveChanges")}
          showShareButton={false}
        />

        <RoulettePreview
          title={title}
          items={items}
          rotation={rotation}
          isSpinning={isSpinning}
          onSpin={spinRoulette}
          result={result}
        />
      </div>

      <ResultModal isOpen={showResult} result={result} onClose={closeResult} />
    </>
  );
};

export default EditRoulettePageClient;
