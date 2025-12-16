"use client";

import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Plus, X, Save, Loader2, Share2, HelpCircle, Menu, BookText } from "lucide-react";
import { Item } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ROULETTE_COLORS } from "@/constants/roulette";

interface SettingsPanelProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  description?: string;
  onDescriptionChange?: (newDescription: string) => void;
  items: Item[];
  onItemAdd: () => void;
  onItemRemove: (index: number) => void;
  onItemUpdate: (
    index: number,
    field: keyof Item,
    value: string | number
  ) => void;
  onItemsReplace?: (newItems: Item[]) => void;
  onSave: () => void;
  isSaving: boolean;
  isLoggedIn: boolean;
  saveButtonText?: string;
  showSaveButton?: boolean;
  onShareRoulette?: () => void;
  showShareButton?: boolean;
}

const SettingsPanel = ({
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  items,
  onItemAdd,
  onItemRemove,
  onItemUpdate,
  onItemsReplace,
  onSave: handleSave,
  isSaving,
  saveButtonText,
  showSaveButton = true,
  onShareRoulette,
  showShareButton = false,
}: SettingsPanelProps) => {
  const { t } = useTranslation();
  const params = useParams();
  // Safe access to locale
  const locale = (params && params.locale) ? params.locale : "en";
  const titleMaxLength = 30;

  const [inputMode, setInputMode] = useState<"list" | "text">("list");
  const [textModeValue, setTextModeValue] = useState("");

  const shakeVariants = {
    shake: {
      x: [0, -6, 6, -6, 6, 0],
      transition: { duration: 0.4 },
    },
    initial: { x: 0 },
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(e.target.value.slice(0, titleMaxLength));
  };

  const handleModeChange = useCallback((mode: "list" | "text") => {
    if (mode === "text") {
      // List to Text
      const text = items.map(item => item.name).join("\n");
      setTextModeValue(text);
    } else {
      // Text to List
      if (onItemsReplace) {
        const lines = textModeValue.split("\n").filter(line => line.trim() !== "");
        // If empty, create one default item
        if (lines.length === 0) {
           onItemsReplace([{
             name: t("components.roulette.settings.optionDefault") + " 1",
             color: ROULETTE_COLORS[0],
             ratio: 1
           }]);
        } else {
            const newItems: Item[] = lines.map((line, index) => ({
              name: line,
              color: ROULETTE_COLORS[index % ROULETTE_COLORS.length],
              ratio: 1,
            }));
            onItemsReplace(newItems);
        }
      }
    }
    setInputMode(mode);
  }, [items, textModeValue, onItemsReplace, t]);

  const handleTextModeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Basic DoS protection: limit length
    if (e.target.value.length > 10000) return;
    setTextModeValue(e.target.value);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-white">
              {t("components.roulette.settings.title")}
            </h2>
            <Link href={`/${locale}/how-to-use`} passHref>
              <HelpCircle
                size={18}
                className="text-white/60 hover:text-white transition-colors"
              />
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-white/80 text-sm font-medium mb-2">
            {t("components.roulette.settings.name")}
          </label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            maxLength={titleMaxLength}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            placeholder={t("roulette.settings.namePlaceholder")}
          />
          <motion.div
            className={`text-right text-xs mt-1 ${title.length >= titleMaxLength ? "text-red-400" : "text-white/60"}`}
            variants={shakeVariants}
            animate={title.length >= titleMaxLength ? "shake" : "initial"}
          >
            {title.length} / {titleMaxLength}
          </motion.div>
        </div>

        {onDescriptionChange && (
          <div className="mb-6">
            <label className="block text-white/80 text-sm font-medium mb-2">
              {t("components.roulette.settings.description")}
            </label>
            <textarea
              value={description || ""}
              onChange={(e) => onDescriptionChange(e.target.value)}
              className="w-full h-24 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              placeholder={t(
                "components.roulette.settings.descriptionPlaceholder"
              )}
            />
          </div>
        )}

        {/* Mode Switcher */}
        {onItemsReplace && (
          <div className="flex bg-white/10 p-1 rounded-lg mb-4">
            <button
              onClick={() => handleModeChange("list")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                inputMode === "list"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Menu size={16} />
              {t("components.roulette.settings.modeList")}
            </button>
            <button
              onClick={() => handleModeChange("text")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                inputMode === "text"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <BookText size={16} />
              {t("components.roulette.settings.modeText")}
            </button>
          </div>
        )}

        {inputMode === "list" ? (
          <div className="space-y-3">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 p-3 bg-white/5 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* カラーピッカー */}
                <input
                  type="color"
                  value={item.color}
                  onChange={(e) => onItemUpdate(index, "color", e.target.value)}
                  className="w-10 h-10 rounded-full cursor-pointer bg-transparent border-none"
                  style={{ backgroundColor: item.color }}
                />

                {/* 名前入力 */}
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => onItemUpdate(index, "name", e.target.value)}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />

                {/* 比率選択 */}
                <select
                  value={item.ratio}
                  onChange={(e) =>
                    onItemUpdate(index, "ratio", parseInt(e.target.value))
                  }
                  className="px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num} className="bg-gray-800">
                      {num}
                    </option>
                  ))}
                </select>

                {/* 削除ボタン */}
                {items.length > 2 && (
                  <button
                    onClick={() => onItemRemove(index)}
                    className="flex items-center justify-center p-2 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </motion.div>
            ))}

            <button
              onClick={onItemAdd}
              className="w-full p-3 border-2 border-dashed border-white/30 rounded-lg text-white/80 hover:text-white hover:border-white/50 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              {t("components.roulette.settings.items.addItem")}
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <textarea
              value={textModeValue}
              onChange={handleTextModeChange}
              className="w-full h-64 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-mono leading-relaxed resize-y"
              placeholder={t("components.roulette.settings.textModePlaceholder")}
            />
            <p className="text-white/60 text-xs mt-2 text-right">
              {textModeValue.length}/10000
            </p>
          </motion.div>
        )}

        <div className="flex justify-end items-center mt-6 gap-3">
          {showShareButton && onShareRoulette && (
            <motion.button
              onClick={onShareRoulette}
              className="px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={16} />
              {t("components.roulette.share.url")}
            </motion.button>
          )}

          {showSaveButton && (
            <motion.button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg disabled:opacity-50"
              whileHover={!isSaving ? { scale: 1.05 } : {}}
              whileTap={!isSaving ? { scale: 0.95 } : {}}
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {t("components.roulette.settings.saveInProgress")}
                </>
              ) : (
                <>
                  <Save size={16} />
                  {saveButtonText || t("common.save")}
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPanel;
