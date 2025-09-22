import { Metadata } from "next";
import HowToUseAccountMeritPageClient from "./Client";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
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
                    url: '/favicon.ico',
                    width: 1200,
                    height: 630,
                    alt: t.title,
                },
            ],
        },
        twitter: {
            title: title,
            description: description,
            images: ['/favicon.ico'],
        },
    }
}

interface HowToUseAccountMeritPageProps {
  params: {
    locale: string;
  };
}

const HowToUseAccountMeritPage = ({
  params: { locale },
}: HowToUseAccountMeritPageProps) => {
  return <HowToUseAccountMeritPageClient locale={locale} />;
};

export default HowToUseAccountMeritPage;
