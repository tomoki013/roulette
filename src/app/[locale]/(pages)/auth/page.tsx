import { Metadata } from "next";
import AuthPageClient from "./Client";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = await params;
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  return {
    title: t.auth.title,
    description: t.auth.description,
    openGraph: {
      title: t.auth.title,
      description: t.auth.description,
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
      title: t.auth.title,
      description: t.auth.description,
      images: ["favicon.ico"],
    },
  };
}

const AuthPage = () => {
  return <AuthPageClient />;
};

export default AuthPage;
