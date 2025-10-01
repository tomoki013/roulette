import { Metadata } from "next";
import FaqPageClient from "./Client";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = await params;
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  return {
    title: t.faq.title,
    description: t.faq.description,
    openGraph: {
      title: t.faq.title,
      description: t.faq.description,
      images: [
        {
          url: "favicon.ico",
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
    },
    twitter: {
      title: t.faq.title,
      description: t.faq.description,
      images: ["favicon.ico"],
    },
  };
}

const FaqPage = () => {
  return <FaqPageClient />;
};

export default FaqPage;
