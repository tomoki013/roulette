"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Database } from "@/types/database.types";
import { Trash, Edit, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

type Roulette = Database["public"]["Tables"]["roulettes"]["Row"];

interface AdminDashboardClientProps {
  initialTemplates: Roulette[];
}

export function AdminDashboardClient({
  initialTemplates,
}: AdminDashboardClientProps) {
  const [templates, setTemplates] = useState(initialTemplates);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useTranslation("admin");
  const params = useParams();
  const locale = params.locale as string;

  const handleDelete = async (id: string) => {
    if (window.confirm(t("dashboard.deleteConfirm"))) {
      setError(null);
      const res = await fetch(`/api/admin/roulettes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTemplates((prev) => prev.filter((t) => t.id !== id));
      } else {
        try {
          const data = await res.json();
          setError(data.error || t("dashboard.deleteError"));
        } catch {
          setError(t("dashboard.deleteError"));
        }
      }
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(`/${locale}/admin/login`);
    router.refresh();
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">
          {t("dashboard.templatesTitle")}
        </h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm font-semibold"
        >
          <LogOut size={16} />
          {t("dashboard.logout")}
        </button>
      </div>
      {error && (
        <p className="m-4 text-center text-red-400 bg-red-900/50 p-3 rounded-md">
          {error}
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="p-4 font-semibold">
                {t("dashboard.table.title")}
              </th>
              <th className="p-4 font-semibold hidden md:table-cell">
                {t("dashboard.table.createdAt")}
              </th>
              <th className="p-4 font-semibold">
                {t("dashboard.table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <tr
                key={template.id}
                className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
              >
                <td className="p-4 font-medium">{template.title}</td>
                <td className="p-4 hidden md:table-cell text-gray-400">
                  {new Date(template.created_at).toLocaleDateString(locale)}
                </td>
                <td className="p-4 flex items-center gap-2">
                  <Link
                    href={`/${locale}/admin/edit/${template.id}`}
                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-md transition-colors"
                    title={t("dashboard.editTooltip")}
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-md transition-colors"
                    title={t("dashboard.deleteTooltip")}
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
            {t("dashboard.noTemplates")}
          </p>
        )}
      </div>
    </div>
  );
}
