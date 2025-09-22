import { Metadata } from "next";
import HowToUseTemplatesPageClient from "./Client";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  const title = t.howToUse.loggedIn.templates;
  const description = t.howToUse.loggedIn.templates_description;

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

interface HowToUseTemplatesPageProps {
  params: {
    locale: string;
  };
}

const HowToUseTemplatesPage = ({
  params: { locale },
}: HowToUseTemplatesPageProps) => {
  return <HowToUseTemplatesPageClient locale={locale} />;
};

export default HowToUseTemplatesPage;
