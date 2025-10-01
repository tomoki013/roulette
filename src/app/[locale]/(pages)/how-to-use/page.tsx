import { Metadata } from "next";
import HowToUsePageClient from "./Client";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = await params;
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  return {
    title: t.seo.howToUse.title,
    description: t.seo.howToUse.description,
    openGraph: {
      title: t.seo.howToUse.title,
      description: t.seo.howToUse.description,
      images: [
        {
          url: "favicon.ico",
          width: 1200,
          height: 630,
          alt: t.common.appName,
        },
      ],
    },
    twitter: {
      title: t.seo.howToUse.title,
      description: t.seo.howToUse.description,
      images: ["favicon.ico"],
    },
  };
}

const HowToUsePage = async (props: { params: Promise<{ locale: string }> }) => {
  const params = await props.params;
  const { locale } = await params;
  return <HowToUsePageClient locale={locale} />;
};

export default HowToUsePage;
