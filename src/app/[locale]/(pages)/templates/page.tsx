import { Metadata } from "next";
import TemplatesPageClient from "./Client";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = await params;
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  return {
    title: t.seo.templates.title,
    description: t.seo.templates.description,
    openGraph: {
      title: t.seo.templates.title,
      description: t.seo.templates.description,
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
      title: t.seo.templates.title,
      description: t.seo.templates.description,
      images: ["favicon.ico"],
    },
  };
}

const TemplatesPage = () => {
  return <TemplatesPageClient />;
};

export default TemplatesPage;
