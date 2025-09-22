import { Metadata } from "next";
import HowToUseAccountMeritPageClient from "./Client";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = await params;
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  const title = t.howToUse.account.merit;
  const description = t.howToUse.account.merit_description;

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

const HowToUseAccountMeritPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  return <HowToUseAccountMeritPageClient locale={locale} />;
};

export default HowToUseAccountMeritPage;
