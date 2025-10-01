import { Metadata } from "next";
import TermsOfServicePageClient from "./Client";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = await params;
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  return {
    title: t.seo.termsOfService.title,
    description: t.seo.termsOfService.description,
    openGraph: {
      title: t.seo.termsOfService.title,
      description: t.seo.termsOfService.description,
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
      title: t.seo.termsOfService.title,
      description: t.seo.termsOfService.description,
      images: ["favicon.ico"],
    },
  };
}

const TermsOfServicePage = () => {
  return <TermsOfServicePageClient />;
};

export default TermsOfServicePage;
