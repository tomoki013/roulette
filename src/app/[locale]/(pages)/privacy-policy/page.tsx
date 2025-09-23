import { Metadata } from "next";
import PrivacyPolicyPageClient from "./Client";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = await params;
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  return {
    title: t.privacyPolicy.title,
    description: t.privacyPolicy.description,
    openGraph: {
      title: t.privacyPolicy.title,
      description: t.privacyPolicy.description,
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
      title: t.privacyPolicy.title,
      description: t.privacyPolicy.description,
      images: ["favicon.ico"],
    },
  };
}

const PrivacyPolicyPage = () => {
  return <PrivacyPolicyPageClient />;
};

export default PrivacyPolicyPage;
