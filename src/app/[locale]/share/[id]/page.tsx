import { Metadata } from "next";
import SharePageClient from "./Client";
import { getRouletteById } from "@/lib/services/rouletteService";

export async function generateMetadata(props: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await props.params;
  const common = (await import(`@/i18n/locales/${locale}/common.json`)).default;
  const roulette = await getRouletteById(id);

  const title = roulette ? roulette.title : common.common.appName;
  const description = common.seo.roulette.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const SharePage = () => {
  return <SharePageClient />;
};

export default SharePage;
