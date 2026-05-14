"use client";

import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { Item } from "@/types";
import ShareButtons from "./ShareButtons";

interface ResultModalProps {
  isOpen: boolean;
  result: Item | null;
  onClose: () => void;
  onShareImage?: () => void;
  onShareUrl?: () => void;
  shareUrl?: string; // Legacy sync URL
  getShareUrl?: (withResult?: boolean) => Promise<string | null>; // New async URL getter
}

const ResultModal = ({
  isOpen,
  result,
  onClose,
  onShareImage,
  onShareUrl,
  shareUrl: initialShareUrl, // Rename to avoid confusion
  getShareUrl, // Passed from hook
}: ResultModalProps) => {
  const { t } = useTranslation();

  const renderActionButtons = () => (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center gap-4">
        {onShareUrl && getShareUrl && (
            <ShareButtons
                onCopyUrl={async () => { await onShareUrl(); }}
                getShareUrl={async () => {
                    // Always include result
                    const url = await getShareUrl(true);
                    if (!url) return null;
                    const urlObj = new URL(url);
                    if (result && !urlObj.searchParams.has("result")) {
                         urlObj.searchParams.set("result", result.name);
                    }
                    return urlObj.toString();
                }}
                shareText={`${t("components.roulette.result.title")}: ${result?.name}`}
            />
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button
          onClick={onClose}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
        >
          {t("common.close")}
        </button>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative z-10">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {t("components.roulette.result.title")}
              </h2>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
                {result?.name}
              </div>
              {renderActionButtons()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultModal;
