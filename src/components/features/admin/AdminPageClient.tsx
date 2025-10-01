"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Database } from "@/types/database.types";
import { Trash, Edit } from "lucide-react";
import { useTranslation } from "react-i18next";

type Roulette = Database["public"]["Tables"]["roulettes"]["Row"];

interface AdminPageClientProps {
  initialTemplates: Roulette[];
}

export function AdminPageClient({
  initialTemplates,
}: AdminPageClientProps) {
  const [templates, setTemplates] = useState(initialTemplates);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const params = useParams();
  const locale = params.locale as string;

  const handleDelete = async (id: string) => {
    if (window.confirm(t("pages.admin.dashboard.deleteConfirm"))) {
      setError(null);
      const res = await fetch(`/api/admin/roulettes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTemplates((prev) => prev.filter((t) => t.id !== id));
      } else {
        try {
          const data = await res.json();
          setError(data.error || t("pages.admin.dashboard.deleteError"));
        } catch {
          setError(t("pages.admin.dashboard.deleteError"));
        }
      }
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        {t("pages.admin.dashboard.templatesTitle")}
      </h2>
      {error && (
        <p className="m-4 text-center text-red-400 bg-red-900/50 p-3 rounded-md">
          {error}
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-white/20">
            <tr>
              <th className="p-4 font-semibold text-white">
                {t("pages.admin.dashboard.table.title")}
              </th>
              <th className="p-4 font-semibold text-white hidden md:table-cell">
                {t("common.createdAt")}
              </th>
              <th className="p-4 font-semibold text-white">
                {t("common.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <tr
                key={template.id}
                className="border-b border-white/20 hover:bg-white/10 transition-colors"
              >
                <td className="p-4 font-medium text-white">{template.title}</td>
                <td className="p-4 hidden md:table-cell text-gray-300">
                  {new Date(template.created_at).toLocaleDateString(locale)}
                </td>
                <td className="p-4 flex items-center gap-2">
                  <Link
                    href={`/${locale}/admin/edit/${template.id}`}
                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-md transition-colors"
                    title={t("pages.admin.dashboard.editTooltip")}
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-md transition-colors"
                    title={t("pages.admin.dashboard.deleteTooltip")}
                  >
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {templates.length === 0 && (
          <p className="p-6 text-center text-gray-400">
            {t("pages.admin.dashboard.noTemplates")}
          </p>
        )}
      </div>
    </div>
  );
}