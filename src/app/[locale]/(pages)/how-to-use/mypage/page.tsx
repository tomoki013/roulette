import { Metadata } from "next";
import HowToUseMyPagePageClient from "./Client";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  const title = t.howToUse.loggedIn.mypage;
  const description = t.howToUse.loggedIn.mypage_description;

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
          alt: t.title,
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

interface HowToUseMyPagePageProps {
  params: {
    locale: string;
  };
}

const HowToUseMyPagePage = ({
  params: { locale },
}: HowToUseMyPagePageProps) => {
  return <HowToUseMyPagePageClient locale={locale} />;
};

export default HowToUseMyPagePage;
