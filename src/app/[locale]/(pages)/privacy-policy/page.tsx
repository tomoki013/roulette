import { Metadata } from "next";
import PrivacyPolicyPageClient from "./Client";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = await params;
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  return {
    title: t.seo.privacyPolicy.title,
    description: t.seo.privacyPolicy.description,
    openGraph: {
      title: t.seo.privacyPolicy.title,
      description: t.seo.privacyPolicy.description,
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
      title: t.seo.privacyPolicy.title,
      description: t.seo.privacyPolicy.description,
      images: ["favicon.ico"],
    },
  };
}

const PrivacyPolicyPage = () => {
  return <PrivacyPolicyPageClient />;
};

export default PrivacyPolicyPage;
