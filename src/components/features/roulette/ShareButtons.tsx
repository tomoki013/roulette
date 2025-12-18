"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaXTwitter, FaLine, FaFacebook } from "react-icons/fa6";
import { Copy, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareButtonsProps {
  onCopyUrl: () => void;
  getShareUrl: () => Promise<string>;
  shareText: string;
}

const ShareButtons = ({ onCopyUrl, getShareUrl, shareText }: ShareButtonsProps) => {
  const { t } = useTranslation();
  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSocialShare = async (platform: "twitter" | "line" | "facebook") => {
    setLoadingPlatform(platform);

    try {
      const targetUrl = await getShareUrl();
      if (!targetUrl) return;

      const encodedText = encodeURIComponent(shareText);
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

  const handleCopy = async () => {
    // onCopyUrl is expected to handle the full process (generate, copy, toast)
    // But if we want to show a local "Check" icon, we might want to wrap it.
    // However, existing logic uses a global modal for success.
    // For this button, let's just trigger the prop.
    // Wait, the user wants a "Copy mark".

    // If onCopyUrl returns a promise, we can await it?
    // In useRouletteShare, handleShareUrl is async.
    setLoadingPlatform("copy");
    try {
        await onCopyUrl();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } finally {
        setLoadingPlatform(null);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => handleSocialShare("twitter")}
        disabled={!!loadingPlatform}
        className="p-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 shadow-sm"
        title="Share on X"
      >
        {loadingPlatform === "twitter" ? <Loader2 className="animate-spin" size={18} /> : <FaXTwitter size={18} />}
      </button>
      <button
        onClick={() => handleSocialShare("line")}
        disabled={!!loadingPlatform}
        className="p-2.5 bg-[#06C755] text-white rounded-full hover:bg-[#05b34c] transition-colors disabled:opacity-50 shadow-sm"
        title="Share on LINE"
      >
         {loadingPlatform === "line" ? <Loader2 className="animate-spin" size={18} /> : <FaLine size={18} />}
      </button>
      <button
        onClick={() => handleSocialShare("facebook")}
        disabled={!!loadingPlatform}
        className="p-2.5 bg-[#1877F2] text-white rounded-full hover:bg-[#166fe5] transition-colors disabled:opacity-50 shadow-sm"
        title="Share on Facebook"
      >
         {loadingPlatform === "facebook" ? <Loader2 className="animate-spin" size={18} /> : <FaFacebook size={18} />}
      </button>

      <div className="w-px h-6 bg-gray-300/20 mx-1"></div>

      <button
        onClick={handleCopy}
        disabled={!!loadingPlatform}
        className="p-2.5 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors disabled:opacity-50 border border-white/10 shadow-sm"
        title={t("components.roulette.share.url")}
      >
        {loadingPlatform === "copy" ? (
             <Loader2 className="animate-spin" size={18} />
        ) : copied ? (
             <Check size={18} className="text-green-400" />
        ) : (
             <Copy size={18} />
        )}
      </button>
    </div>
  );
};

export default ShareButtons;
