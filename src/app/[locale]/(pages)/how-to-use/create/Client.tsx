"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Item } from "@/types";
import SettingsPanel from "@/components/features/roulette/SettingsPanel";
import { ROULETTE_COLORS } from "@/constants/roulette";

interface HowToUseCreatePageClientProps {
  locale: string;
}

const HowToUseCreatePageClient = ({
  locale,
}: HowToUseCreatePageClientProps) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(t("howToUse.demo.defaultTitle"));
  const [items, setItems] = useState<Item[]>([
    { name: t("howToUse.demo.item1"), color: ROULETTE_COLORS[0], ratio: 1 },
    { name: t("howToUse.demo.item2"), color: ROULETTE_COLORS[1], ratio: 1 },
    { name: t("howToUse.demo.item3"), color: ROULETTE_COLORS[2], ratio: 1 },
  ]);

  const handleItemAdd = () => {
    const newItem: Item = {
      name: ``,
      color: ROULETTE_COLORS[
        items.length % ROULETTE_COLORS.length
      ],
      ratio: 1,
    };
    setItems([...items, newItem]);
  };

  const handleItemRemove = (index: number) => {
    if (items.length > 2) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleItemUpdate = (
    index: number,
    field: keyof Item,
    value: string | number
  ) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    setItems(newItems);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
      >
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <BookOpen className="text-yellow-300" />
          {t("howToUse.basic.create")}
        </h1>
        <p className="text-center text-lg text-white/80 mb-8">
          {t("howToUse.basic.create_interactive_description")}
        </p>

        <div className="p-4 border border-yellow-300/30 rounded-lg bg-yellow-500/10 mb-8">
          <p className="text-center text-yellow-200">
            {t("howToUse.demo.notice")}
          </p>
        </div>

        <SettingsPanel
          title={title}
          onTitleChange={setTitle}
          items={items}
          onItemAdd={handleItemAdd}
          onItemRemove={handleItemRemove}
          onItemUpdate={handleItemUpdate}
          onSave={() => {}}
          isSaving={false}
          isLoggedIn={false}
          showSaveButton={false}
        />
      </motion.div>
      <div className="mt-8 text-center">
        <Link
          href={`/${locale}/how-to-use`}
          className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{t("howToUse.back_to_list")}</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default HowToUseCreatePageClient;
