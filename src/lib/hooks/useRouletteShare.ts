import { useCallback } from "react";
import html2canvas from "html2canvas";
import { Item } from "@/types";
import { createRoulette } from "@/lib/services/rouletteService";
import { Json } from "@/types/database.types";

interface ModalOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  type?: "success" | "error" | "confirm";
}

interface UseRouletteShareProps {
  title: string;
  items: Item[];
  result: Item | null;
  showModal: (options: ModalOptions) => void;
  closeModal: () => void;
  previewRef: React.RefObject<HTMLDivElement | null>;
  t: (key: string) => string;
}

export const useRouletteShare = ({
  title,
  items,
  result,
  showModal,
  closeModal,
  previewRef,
  t,
}: UseRouletteShareProps) => {
  const handleShareImage = useCallback(async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current, {
        background: "#1a202c",
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `roulette-result-${Date.now()}.png`;
      link.click();
    }
  }, [previewRef]);

  // Generate a short share URL by saving the roulette to the database
  const getShortShareUrl = useCallback(async () => {
    try {
      const newRoulette = await createRoulette({
        title,
        items: items as unknown as Json,
        supported_languages: [], // Default or passed from props if needed
        user_id: null, // Anonymous share
      });
      // Construct the URL manually to avoid hook dependencies issues with router
      // Assuming structure is /[locale]/share/[id]
      const locale = window.location.pathname.split("/")[1] || "en";
      return `${window.location.origin}/${locale}/share/${newRoulette.id}`;
    } catch (error) {
      console.error("Failed to generate short share URL", error);
      throw error;
    }
  }, [title, items]);

  const getShareUrl = useCallback(
    (withResult = false) => {
      // Legacy sync URL generator (state in URL)
      const config = { title, items };
      const encodedConfig = btoa(encodeURIComponent(JSON.stringify(config)));
      const url = new URL(window.location.href);
      url.search = "";
      url.searchParams.set("config", encodedConfig);

      if (withResult && result) {
        url.searchParams.set("result", result.name);
      }
      return url.toString();
    },
    [title, items, result]
  );

  const handleShareUrl = useCallback(
    async (withResult = false) => {
      const copyLink = async () => {
        try {
            // Use short URL preference
            const url = await getShortShareUrl();
            const urlObj = new URL(url);
            if (withResult && result) {
                urlObj.searchParams.set("result", result.name);
            }

            navigator.clipboard.writeText(urlObj.toString()).then(() => {
              showModal({
                title: t("components.roulette.share.copySuccess"),
                message: withResult
                  ? t("components.roulette.share.copySuccessMessageResult")
                  : t("components.roulette.share.copySuccessMessageRoulette"),
                onConfirm: closeModal,
                confirmText: "OK",
                type: "success",
              });
            });
        } catch (e) {
             showModal({
                title: "Error",
                message: "Failed to generate share link.",
                confirmText: "OK",
                type: "error"
             });
        }
      };

      if (withResult) {
        await copyLink();
      } else {
        showModal({
          title: t("components.roulette.share.confirmTitle"),
          message: t("components.roulette.share.confirmMessage"),
          confirmText: t("components.roulette.share.confirmAction"),
          cancelText: t("common.close"),
          onConfirm: () => {
            closeModal();
            copyLink();
          },
          onCancel: closeModal,
        });
      }
    },
    [getShortShareUrl, showModal, closeModal, t, result]
  );

  return {
    handleShareImage,
    handleShareUrl,
    getShareUrl,
    getShortShareUrl
  };
};
