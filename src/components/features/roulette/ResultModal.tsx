"use client";

import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Share2 } from "lucide-react";
import { Item } from "@/types";
import { FaXTwitter, FaLine, FaFacebook } from "react-icons/fa6";

interface ResultModalProps {
  isOpen: boolean;
  result: Item | null;
  onClose: () => void;
  onShareImage?: () => void;
  onShareUrl?: () => void;
  shareUrl?: string;
}

const ResultModal = ({
  isOpen,
  result,
  onClose,
  onShareImage,
  onShareUrl,
  shareUrl,
}: ResultModalProps) => {
  const { t } = useTranslation();

  const handleSocialShare = (platform: "twitter" | "line" | "facebook") => {
    if (!shareUrl) return;

    const text = `${t("components.roulette.result.title")}: ${result?.name}\n`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(shareUrl);

    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case "line":
        url = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
    }

    window.open(url, "_blank", "width=600,height=400");
  };

  const renderActionButtons = () => (
    <div className="flex flex-col gap-4">
      {shareUrl && (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleSocialShare("twitter")}
            className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            title="Share on X"
          >
            <FaXTwitter size={20} />
          </button>
          <button
            onClick={() => handleSocialShare("line")}
            className="p-3 bg-[#06C755] text-white rounded-full hover:bg-[#05b34c] transition-colors"
            title="Share on LINE"
          >
            <FaLine size={20} />
          </button>
          <button
            onClick={() => handleSocialShare("facebook")}
            className="p-3 bg-[#1877F2] text-white rounded-full hover:bg-[#166fe5] transition-colors"
            title="Share on Facebook"
          >
            <FaFacebook size={20} />
          </button>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        {onShareImage && onShareUrl && (
          <button
            onClick={onShareUrl}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <Share2 size={20} /> {t("components.roulette.share.url")}
          </button>
        )}
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
