import { Metadata } from "next";
import HowToUseMyPagePageClient from "./Client";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = await params;
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  const title = t.pages.howToUse.loggedIn.mypage.title;
  const description = t.pages.howToUse.loggedIn.mypage.description;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: "/favicon.ico",
          width: 1200,
          height: 630,
          alt: t.common.appName,
        },
      ],
    },
    twitter: {
      title: title,
      description: description,
      images: ["/favicon.ico"],
    },
  };
}

const HowToUseMyPagePage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  return <HowToUseMyPagePageClient locale={locale} />;
};

export default HowToUseMyPagePage;
