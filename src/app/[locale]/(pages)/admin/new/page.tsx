"use client"
import { TemplateForm } from "@/components/features/admin/TemplateForm";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { Database } from "@/types/database.types";

type RouletteInsert = Database["public"]["Tables"]["roulettes"]["Insert"];
type RouletteUpdate = Database["public"]["Tables"]["roulettes"]["Update"];

export default function NewTemplatePage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const handleSubmit = async (data: RouletteInsert | RouletteUpdate) => {
    const res = await fetch("/api/admin/roulettes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push(`/${i18n.language}/admin`);
      router.refresh();
    } else {
      const errorData = await res.json();
      alert(t("form.saveError") + `: ${errorData.error}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        {t("form.createTitle")}
      </h1>
      <TemplateForm onSubmit={handleSubmit} isEditing={false} />
    </div>
  );
}