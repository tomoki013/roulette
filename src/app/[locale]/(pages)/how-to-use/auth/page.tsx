import { Metadata } from "next";
import HowToUseAuthPageClient from "./Client";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
    const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

    const title = t.howToUse.account.auth;
    const description = t.howToUse.account.auth_description;

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

interface HowToUseAuthPageProps {
  params: {
    locale: string;
  };
}

const HowToUseAuthPage = ({
  params: { locale },
}: HowToUseAuthPageProps) => {
  return <HowToUseAuthPageClient locale={locale} />;
};

export default HowToUseAuthPage;
