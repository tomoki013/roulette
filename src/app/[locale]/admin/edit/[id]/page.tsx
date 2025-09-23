import { getRouletteById } from "@/lib/services/rouletteService";
import { TemplateForm } from "../../components/TemplateForm";
import { notFound } from "next/navigation";
import { Locale } from "@/../i18n-config";
import { createTranslation } from "@/i18n/server";

export const dynamic = "force-dynamic";

export default async function EditTemplatePage(props: {
  params: Promise<{ id: string; locale: Locale }>;
}) {
  const params = await props.params;
  const { id, locale } = params;

  const template = await getRouletteById(id);
  const { t } = await createTranslation(locale, "admin");

  // If the template doesn't exist or if it's not an official template (user_id is not null),
  // then it's not accessible via the admin panel.
  if (!template || template.user_id !== null) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          {t("form.editTitle")}
        </h1>
        <TemplateForm initialData={template} />
      </div>
    </div>
  );
}
