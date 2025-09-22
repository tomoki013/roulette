import { Metadata } from "next";
import HowToUseSpinPageClient from "./Client";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  const title = t.howToUse.basic.spin;
  const description = t.howToUse.basic.spin_description;

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

interface HowToUseSpinPageProps {
  params: {
    locale: string;
  };
}

const HowToUseSpinPage = ({ params: { locale } }: HowToUseSpinPageProps) => {
  return <HowToUseSpinPageClient locale={locale} />;
};

export default HowToUseSpinPage;
