"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { getPublicTemplates } from "@/lib/services/rouletteService";
import { Database } from "@/types/database.types";
import LoadingScreen from "@/components/elements/loadingAnimation/LoadingScreen";
import TemplateCard from "@/components/features/templates/TemplateCard";

type Roulette = Database["public"]["Tables"]["roulettes"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Template = Roulette & { profiles: Pick<Profile, "username"> | null };

const TemplatesPageClient = () => {
  const { t } = useTranslation();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"created_at" | "like_count">(
    "created_at"
  );
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getPublicTemplates(searchTerm, sortBy, languageFilter);
      setTemplates(data as Template[]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, sortBy, languageFilter]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTemplates();
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white">
          {t("templates.title")}
        </h1>
        <p className="text-white/80 mt-2">{t("templates.subtitle")}</p>
      </div>

      {/* Search and Filter Bar */}
      {/* <div className="bg-black/20 backdrop-blur-sm p-4 rounded-2xl mb-8 flex flex-wrap items-center gap-4">
                <form onSubmit={handleSearch} className="flex-grow flex items-center gap-2 bg-white/10 rounded-lg p-2">
                    <Search size={20} className="text-white/60" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t('templates.searchPlaceholder')}
                        className="bg-transparent w-full text-white focus:outline-none"
                    />
                </form>
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={20} className="text-white/60" />
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'created_at' | 'like_count')} className="bg-white/10 text-white rounded-lg p-2 focus:outline-none">
                        <option value="created_at" className="bg-gray-800">{t('templates.sortBy.newest')}</option>
                        <option value="like_count" className="bg-gray-800">{t('templates.sortBy.popular')}</option>
                    </select>
                </div>
            </div> */}

      {/* Template Grid */}
      {templates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      ) : (
        <div className="text-center text-white/80 bg-white/10 p-12 rounded-2xl">
          <p>{t("templates.noResults")}</p>
        </div>
      )}
    </div>
  );
};

export default TemplatesPageClient;
