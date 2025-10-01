"use client";

import { useState, useEffect } from "react";
import { TemplateForm } from "@/components/features/admin/TemplateForm";
import { useTranslation } from "react-i18next";
import { useRouter, useParams } from "next/navigation";
import { Database } from "@/types/database.types";
import LoadingSpinner from "@/components/elements/loadingAnimation/LoadingSpinner";

type Roulette = Database["public"]["Tables"]["roulettes"]["Row"];
type RouletteInsert = Database["public"]["Tables"]["roulettes"]["Insert"];
type RouletteUpdate = Database["public"]["Tables"]["roulettes"]["Update"];

export default function EditTemplatePage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [template, setTemplate] = useState<Roulette | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchTemplate = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/admin/roulettes/${id}`);
          if (!res.ok) {
            throw new Error(t("form.fetchError"));
          }
          const data = await res.json();
          setTemplate(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : String(err));
        } finally {
          setLoading(false);
        }
      };
      fetchTemplate();
    }
  }, [id, t]);

  const handleSubmit = async (data: RouletteInsert | RouletteUpdate) => {
    const res = await fetch(`/api/admin/roulettes/${id}`, {
      method: "PUT",
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

  if (loading) {
    return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        {t("form.editTitle")}
      </h1>
      {template && (
        <TemplateForm
          template={template}
          onSubmit={handleSubmit}
          isEditing={true}
        />
      )}
    </div>
  );
}