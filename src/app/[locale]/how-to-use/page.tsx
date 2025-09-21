import { Metadata } from "next";
import HowToUsePageClient from "./Client";

export async function generateMetadata(props: { params: Promise<{ locale:string }> }): Promise<Metadata> {
    const params = await props.params;
    const { locale } = await params;
    const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

    return {
        title: t.howToUse.title,
        description: t.howToUse.description,
        openGraph: {
            title: t.howToUse.title,
            description: t.howToUse.description,
            images: [
                {
                    url: 'favicon.ico',
                    width: 1200,
                    height: 630,
                    alt: t.title,
                },
            ],
        },
        twitter: {
            title: t.howToUse.title,
            description: t.howToUse.description,
            images: ['favicon.ico'],
        },
    }
}

const HowToUsePage = () => {
    return <HowToUsePageClient />;
}

export default HowToUsePage;
