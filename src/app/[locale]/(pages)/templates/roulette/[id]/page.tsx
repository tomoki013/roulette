import { Metadata } from "next";
import TemplatesRoulettePageClient from "./Client";
import { getRouletteById } from "@/lib/services/rouletteService";

export async function generateMetadata(props: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await props.params;
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;
  const roulette = await getRouletteById(id);

  const title = roulette ? roulette.title : t.common.appName;
  let description = t.pages.templates.noExcerpt;
  if (roulette) {
    if (typeof roulette.description === "string") {
      description = roulette.description;
    } else if (
      roulette.description &&
      typeof roulette.description === "object" &&
      !Array.isArray(roulette.description)
    ) {
      description = JSON.stringify(roulette.description);
    }
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "favicon.ico",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: ["favicon.ico"],
    },
  };
}

const TemplateRoulettePage = () => {
  return <TemplatesRoulettePageClient />;
};

export default TemplateRoulettePage;
