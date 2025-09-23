import { useCallback } from "react";
import html2canvas from "html2canvas";
import { Item } from "@/types";

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

  const handleShareUrl = useCallback(
    (withResult = false) => {
      const copyLink = () => {
        const config = { title, items };
        const encodedConfig = btoa(encodeURIComponent(JSON.stringify(config)));
        const url = new URL(window.location.href);
        url.search = "";
        url.searchParams.set("config", encodedConfig);

        if (withResult && result) {
          url.searchParams.set("result", result.name);
        }

        navigator.clipboard.writeText(url.toString()).then(() => {
          showModal({
            title: t("roulette.copy.success"),
            message: withResult
              ? t("roulette.copy.successMessageResult")
              : t("roulette.copy.successMessageRoulette"),
            onConfirm: closeModal,
            confirmText: "OK",
            type: "success",
          });
        });
      };

      if (withResult) {
        copyLink();
      } else {
        showModal({
          title: t("roulette.copy.confirmTitle"),
          message: t("roulette.copy.confirmMessage"),
          confirmText: t("roulette.copy.confirmAction"),
          cancelText: t("close"),
          onConfirm: () => {
            closeModal();
            copyLink();
          },
          onCancel: closeModal,
        });
      }
    },
    [title, items, result, showModal, closeModal, t]
  );

  return {
    handleShareImage,
    handleShareUrl,
  };
};
