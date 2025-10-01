import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Item } from "@/types";
import { ROULETTE_COLORS } from "@/constants/roulette";

export const useRouletteSettings = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  const addItem = useCallback(() => {
    setItems((prev) => {
      const newItemColor =
        ROULETTE_COLORS[prev.length % ROULETTE_COLORS.length];
      return [
        ...prev,
        {
          name: `${t("components.roulette.settings.optionDefault")} ${prev.length + 1}`,
          ratio: 1,
          color: newItemColor,
        },
      ];
    });
  }, [t]);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => {
      if (prev.length <= 2) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const updateItem = useCallback(
    (index: number, field: keyof Item, value: string | number) => {
      setItems((prev) => {
        const newItems = [...prev];
        const updatedValue = field === "color" ? String(value) : value;
        newItems[index] = { ...newItems[index], [field]: updatedValue };
        return newItems;
      });
    },
    []
  );

  return {
    title,
    setTitle,
    items,
    setItems,
    addItem,
    removeItem,
    updateItem,
  };
};
