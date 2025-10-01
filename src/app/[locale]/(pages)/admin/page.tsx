import { getOfficialTemplates } from "@/lib/services/rouletteService";
import { AdminPageClient } from "@/components/features/admin/AdminPageClient";
import { Locale } from "@/../i18n-config";
import { createTranslation } from "@/i18n/server";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await props.params;
  // Fetch initial data on the server
  const templates = await getOfficialTemplates();
  const { t } = await createTranslation(locale, "common");

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">
          {t("pages.admin.dashboard.title")}
        </h1>
        <Link
          href={`/${locale}/admin/new`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
        >
          <Plus size={20} />
          {t("pages.admin.dashboard.newTemplate")}
        </Link>
      </div>
      <AdminPageClient initialTemplates={templates} />
    </div>
  );
}