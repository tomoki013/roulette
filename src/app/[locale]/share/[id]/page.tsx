import { Metadata } from "next";
import { getRouletteById } from "@/lib/services/rouletteService";
import SharePageClient from "./Client";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { id } = params;
  const roulette = await getRouletteById(id);

  if (!roulette) {
    return {
      title: "Roulette Not Found",
    };
  }

  return {
    title: roulette.title,
    description: `Check out this roulette: ${roulette.title}`,
    openGraph: {
      title: roulette.title,
      description: `Spin the wheel!`,
      images: [`/share/${id}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: roulette.title,
      description: `Spin the wheel!`,
      images: [`/share/${id}/opengraph-image`],
    },
  };
}

const SharePage = async (props: Props) => {
  const params = await props.params;
  const { id } = params;
  const roulette = await getRouletteById(id);

  if (!roulette) {
    notFound();
  }

  return <SharePageClient roulette={roulette} />;
};

export default SharePage;
