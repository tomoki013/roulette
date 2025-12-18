import React, { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import html2canvas from "html2canvas";
import { Item } from "@/types";
import { createSharedRoulette } from "@/lib/services/rouletteService";
import { FaXTwitter, FaLine } from "react-icons/fa6";
import { Copy } from "lucide-react";

interface ModalOptions {
  title: string;
  message: string | React.ReactNode;
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
  const params = useParams();
  const [isSharing, setIsSharing] = useState(false);

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

  const getShareUrl = useCallback(
    (withResult = false) => {
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
      setIsSharing(true);
      try {
        const description = withResult && result ? { result: result.name } : null;

        const id = await createSharedRoulette({
            title: title || t("components.roulette.preview.title"),
            items: items as any,
            description: description
        });

        // Determine locale safely
        const locale = params?.locale ? (Array.isArray(params.locale) ? params.locale[0] : params.locale) : "en";
        const url = `${window.location.origin}/${locale}/share/${id}`;

        const shareTitle = withResult && result
            ? `${t("components.roulette.result.title")} ${result.name}`
            : (title || t("components.roulette.preview.title"));

        // Encode for social media
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(shareTitle);

        const messageContent = (
            <div className="flex flex-col gap-4 w-full">
                <p className="text-sm text-gray-500 text-left">
                    {t("components.roulette.share.shareDescription")}
                </p>
                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg border border-gray-200">
                    <input
                        readOnly
                        value={url}
                        className="bg-transparent flex-1 outline-none text-sm text-gray-700 w-full min-w-0"
                        onClick={(e) => e.currentTarget.select()}
                    />
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(url);
                        }}
                        className="p-2 hover:bg-gray-200 rounded-md transition-colors shrink-0"
                        title={t("components.roulette.share.copy")}
                    >
                        <Copy size={16} className="text-gray-500" />
                    </button>
                </div>
                 <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-black text-white py-2.5 rounded-lg hover:opacity-80 transition-opacity font-medium text-sm no-underline"
                    >
                      <FaXTwitter size={18} />
                      X
                    </a>
                    <a
                      href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#06C755] text-white py-2.5 rounded-lg hover:opacity-80 transition-opacity font-medium text-sm no-underline"
                    >
                      <FaLine size={20} />
                      LINE
                    </a>
                 </div>
            </div>
        );

        showModal({
            title: t("components.roulette.share.shareTitle"),
            message: messageContent,
            confirmText: t("common.close"),
            onConfirm: closeModal,
        });

      } catch (error) {
        console.error("Share error:", error);
         showModal({
          title: t("common.error"),
          message: t("components.roulette.share.error") || "Failed to create share link",
          confirmText: t("common.close"),
          onConfirm: closeModal,
          type: "error",
        });
      } finally {
        setIsSharing(false);
      }
    },
    [title, items, params, t, showModal, closeModal]
  );

  return {
    handleShareImage,
    handleShareUrl,
    getShareUrl,
    isSharing
  };
};
