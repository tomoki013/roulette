"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Database } from "@/types/database.types";
import { Save, Plus, Trash2 } from "lucide-react";

type Roulette = Database["public"]["Tables"]["roulettes"]["Row"];
type RouletteInsert = Database["public"]["Tables"]["roulettes"]["Insert"];
type RouletteUpdate = Database["public"]["Tables"]["roulettes"]["Update"];

interface TemplateFormProps {
  template?: Roulette;
  onSubmit: (data: RouletteInsert | RouletteUpdate) => Promise<void>;
  isEditing: boolean;
}

export function TemplateForm({ template, onSubmit, isEditing }: TemplateFormProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<{ name: string; color: string; ratio: number }[]>([]);
  const [tags, setTags] = useState("");
  const [supportedLanguages, setSupportedLanguages] = useState("en");

  useEffect(() => {
    if (template) {
      setTitle(template.title);
      setDescription(String(template.description) || "");
      setItems(template.items as { name: string; color: string; ratio: number }[]);
      setTags(template.tags?.join(", ") || "");
      setSupportedLanguages(template.supported_languages.join(", "));
    }
  }, [template]);

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", color: "#ffffff", ratio: 1 }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      title,
      description: description,
      items,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      supported_languages: supportedLanguages.split(",").map((lang) => lang.trim()).filter(Boolean),
    };
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-white/80 mb-1">
          {t("form.titleLabel")}
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-white/20 rounded-md text-white"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-1">
          {t("form.descriptionLabel")}
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-24 p-2 bg-white/20 rounded-md text-white"
          placeholder={t("form.descriptionPlaceholder")}
        />
      </div>

      <div>
          <h3 className="text-lg font-medium text-white/80 mb-2">{t("form.itemsLabel")}</h3>
          <div className="space-y-4">
              {items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-white/10">
                      <input type="text" placeholder={t("form.itemNamePlaceholder")} value={item.name} onChange={e => handleItemChange(index, "name", e.target.value)} className="w-1/2 p-2 bg-white/20 rounded-md text-white" />
                      <input type="color" value={item.color} onChange={e => handleItemChange(index, "color", e.target.value)} className="p-1 bg-white/20 rounded-md" />
                      <input type="number" placeholder="Ratio" value={item.ratio} onChange={e => handleItemChange(index, "ratio", parseInt(e.target.value, 10))} className="w-1/4 p-2 bg-white/20 rounded-md text-white" />
                      <button type="button" onClick={() => removeItem(index)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-md"><Trash2 size={16} /></button>
                  </div>
              ))}
          </div>
          <button type="button" onClick={addItem} className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              <Plus size={16} /> {t("form.addItem")}
          </button>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-white/80 mb-1">
          {t("form.tagsLabel")}
        </label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 bg-white/20 rounded-md text-white"
          placeholder={t("form.tagsPlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="supportedLanguages" className="block text-sm font-medium text-white/80 mb-1">
          {t("form.supportedLanguagesLabel")}
        </label>
        <input
          id="supportedLanguages"
          type="text"
          value={supportedLanguages}
          onChange={(e) => setSupportedLanguages(e.target.value)}
          className="w-full p-2 bg-white/20 rounded-md text-white"
          placeholder={t("form.supportedLanguagesPlaceholder")}
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 rounded-lg transition-colors"
        >
          {t("form.cancel")}
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          <Save size={16} />
          <span>{isEditing ? t("form.updateButton") : t("form.createButton")}</span>
        </button>
      </div>
    </form>
  );
}