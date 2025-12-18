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
  isSharing?: boolean;
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
  isSharing = false,
}: SettingsPanelProps) => {
  const { t } = useTranslation();
  const params = useParams();
  // Safe access to locale
  const locale = (params && params.locale) ? params.locale : "en";
  const titleMaxLength = 30;

  const [inputMode, setInputMode] = useState<"list" | "text">("list");
  const [textModeValue, setTextModeValue] = useState("");
  // Cache to store items when switching to text mode, allowing us to restore metadata (color, ratio)
  const [cachedItems, setCachedItems] = useState<Item[]>([]);

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
      setCachedItems(items); // Save current items to cache
      const text = items.map(item => item.name).join("\n");
      setTextModeValue(text);
    } else {
      // Text to List
      // Only update items if we haven't already synced them via text change
      if (onItemsReplace) {
         const lines = textModeValue.split("\n").filter(line => line.trim() !== "");
         // Re-generate list from current text value to be sure
         if (lines.length === 0) {
            onItemsReplace([{
              name: t("components.roulette.settings.optionDefault") + " 1",
              color: ROULETTE_COLORS[0],
              ratio: 1
            }]);
         } else {
            const newItems: Item[] = lines.map((line, index) => {
              // Try to find in cache first
              const cached = cachedItems.find(i => i.name === line);
              if (cached) {
                return { ...cached };
              }
              // If not in cache, try finding in current items (though likely they are default if text mode updated them)
              // This is a fallback
              const current = items.find(i => i.name === line);
              if (current) {
                return { ...current };
              }

              return {
                name: line,
                color: ROULETTE_COLORS[index % ROULETTE_COLORS.length],
                ratio: 1,
              };
            });
            onItemsReplace(newItems);
         }
      }
    }
    setInputMode(mode);
  }, [items, textModeValue, onItemsReplace, t, cachedItems]);

  const handleTextModeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    // Basic DoS protection: limit length
    if (val.length > 10000) return;

    setTextModeValue(val);

    // Sync to parent items immediately to fix "Save" bug
    if (onItemsReplace) {
        const lines = val.split("\n").filter(line => line.trim() !== "");
        if (lines.length > 0) {
            const newItems: Item[] = lines.map((line, index) => {
               // Restore from cache if possible
               const cached = cachedItems.find(i => i.name === line);
               return {
                  name: line,
                  color: cached?.color || ROULETTE_COLORS[index % ROULETTE_COLORS.length],
                  ratio: cached?.ratio || 1,
               };
            });
            onItemsReplace(newItems);
        } else {
            // If empty, we can choose to set an empty list or a default
            // If we set empty list, validation might fail elsewhere, but it reflects current text
            // Let's set a default item if empty to keep it valid
             onItemsReplace([{
               name: t("components.roulette.settings.optionDefault") + " 1",
               color: ROULETTE_COLORS[0],
               ratio: 1
             }]);
        }
    }
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
          <div className="flex border-b border-white/10 mb-6">
            <button
              onClick={() => handleModeChange("text")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-all relative ${
                inputMode === "text"
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <BookText size={18} />
              {t("components.roulette.settings.modeText")}
              {inputMode === "text" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"
                />
              )}
            </button>
            <button
              onClick={() => handleModeChange("list")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-all relative ${
                inputMode === "list"
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <Menu size={18} />
              {t("components.roulette.settings.modeList")}
              {inputMode === "list" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"
                />
              )}
            </button>
          </div>
        )}

        {inputMode === "list" ? (
          <div className="space-y-3">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {/* カラーピッカー */}
                <div className="relative group">
                  <div
                    className="w-8 h-8 rounded-full shadow-lg border-2 border-white/20 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: item.color }}
                  />
                  <input
                    type="color"
                    value={item.color}
                    onChange={(e) => onItemUpdate(index, "color", e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                {/* 名前入力 */}
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => onItemUpdate(index, "name", e.target.value)}
                  className="w-full px-3 py-2 bg-transparent border-b border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                  placeholder={t("components.roulette.settings.items.itemPlaceholder")}
                />

                {/* 比率選択 */}
                <div className="flex flex-col items-center">
                   <span className="text-[10px] text-white/40 mb-0.5">Ratio</span>
                   <select
                    value={item.ratio}
                    onChange={(e) =>
                      onItemUpdate(index, "ratio", parseInt(e.target.value))
                    }
                    className="px-2 py-1 bg-white/10 border border-white/20 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/30 transition-all cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 10, 20, 50, 100].map((num) => (
                      <option key={num} value={num} className="bg-gray-800 text-white">
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 削除ボタン */}
                <button
                  onClick={() => onItemRemove(index)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                    items.length <= 2
                      ? "text-white/10 cursor-not-allowed"
                      : "text-white/40 hover:text-red-400 hover:bg-white/5"
                  }`}
                  disabled={items.length <= 2}
                >
                  <X size={16} />
                </button>
              </motion.div>
            ))}

            <button
              onClick={onItemAdd}
              className="w-full py-3 border border-dashed border-white/20 rounded-lg text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <Plus size={18} />
              {t("components.roulette.settings.items.addItem")}
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <textarea
                value={textModeValue}
                onChange={handleTextModeChange}
                className="w-full h-80 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-mono leading-relaxed resize-none scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                placeholder={t("components.roulette.settings.textModePlaceholder")}
              />
              <div className="absolute bottom-3 right-4 text-xs text-white/30 pointer-events-none">
                {textModeValue.length}/10000
              </div>
            </div>
            <p className="text-white/40 text-xs mt-3 flex items-start gap-2">
              <BookText size={14} className="mt-0.5 shrink-0" />
              <span>{t("components.roulette.settings.textModeDescription", "Paste your list here. Each line will become an item on the wheel.")}</span>
            </p>
          </motion.div>
        )}

        <div className="flex justify-end items-center mt-6 gap-3">
          {showShareButton && onShareRoulette && (
            <motion.button
              onClick={onShareRoulette}
              disabled={isSharing}
              className="px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg disabled:opacity-50"
              whileHover={!isSharing ? { scale: 1.05 } : {}}
              whileTap={!isSharing ? { scale: 0.95 } : {}}
            >
              {isSharing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Share2 size={16} />
              )}
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
