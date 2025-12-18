"use client";

import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Share2, Loader2 } from "lucide-react";
import { Item } from "@/types";
import { FaXTwitter, FaLine, FaFacebook } from "react-icons/fa6";
import { useState } from "react";

interface ResultModalProps {
  isOpen: boolean;
  result: Item | null;
  onClose: () => void;
  onShareImage?: () => void;
  onShareUrl?: () => void;
  shareUrl?: string; // Legacy sync URL
  getShareUrl?: (withResult?: boolean) => Promise<string>; // New async URL getter
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
  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null);

  const handleSocialShare = async (platform: "twitter" | "line" | "facebook") => {
    setLoadingPlatform(platform);

    let targetUrl = initialShareUrl;

    try {
        if (getShareUrl) {
            targetUrl = await getShareUrl(true);
        } else if (!targetUrl && onShareUrl) {
            // Fallback if no URL provided but onShareUrl exists?
            // onShareUrl in parent might just copy to clipboard.
            // We need a URL to open social share.
            return;
        }

        if (!targetUrl) return;

        // If withResult, we might want to append result param if not already there
        // The getShareUrl(true) above should handle it if implemented correctly in hook.
        // If targetUrl comes from initialShareUrl, it might be the long one.

        // Ensure result is attached if simple URL
        const urlObj = new URL(targetUrl);
        if (result && !urlObj.searchParams.has("result")) {
             urlObj.searchParams.set("result", result.name);
        }
        targetUrl = urlObj.toString();


        const text = `${t("components.roulette.result.title")}: ${result?.name}\n`;
        const encodedText = encodeURIComponent(text);
        const encodedUrl = encodeURIComponent(targetUrl);

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
    } catch (e) {
        console.error("Share failed", e);
    } finally {
        setLoadingPlatform(null);
    }
  };

  const renderActionButtons = () => (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleSocialShare("twitter")}
          disabled={!!loadingPlatform}
          className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
          title="Share on X"
        >
          {loadingPlatform === "twitter" ? <Loader2 className="animate-spin" size={20} /> : <FaXTwitter size={20} />}
        </button>
        <button
          onClick={() => handleSocialShare("line")}
          disabled={!!loadingPlatform}
          className="p-3 bg-[#06C755] text-white rounded-full hover:bg-[#05b34c] transition-colors disabled:opacity-50"
          title="Share on LINE"
        >
           {loadingPlatform === "line" ? <Loader2 className="animate-spin" size={20} /> : <FaLine size={20} />}
        </button>
        <button
          onClick={() => handleSocialShare("facebook")}
          disabled={!!loadingPlatform}
          className="p-3 bg-[#1877F2] text-white rounded-full hover:bg-[#166fe5] transition-colors disabled:opacity-50"
          title="Share on Facebook"
        >
           {loadingPlatform === "facebook" ? <Loader2 className="animate-spin" size={20} /> : <FaFacebook size={20} />}
        </button>
      </div>

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
