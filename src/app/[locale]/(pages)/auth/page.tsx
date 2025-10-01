import { Metadata } from "next";
import AuthPageClient from "./Client";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = await params;
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  return {
    title: t.seo.auth.title,
    description: t.seo.auth.description,
    openGraph: {
      title: t.seo.auth.title,
      description: t.seo.auth.description,
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
      title: t.seo.auth.title,
      description: t.seo.auth.description,
      images: ["favicon.ico"],
    },
  };
}

const AuthPage = () => {
  return <AuthPageClient />;
};

export default AuthPage;
