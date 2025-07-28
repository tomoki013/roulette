import { Metadata } from "next";
import CreateRoulettePageClient from "./Client";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const params = await props.params;
    const { locale } = await params;
    const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

    return {
        title: t.roulette.title,
        description: t.roulette.description,
        openGraph: {
            title: t.roulette.title,
            description: t.roulette.description,
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
            title: t.roulette.title,
            description: t.roulette.description,
            images: ['favicon.ico'],
        },
    }
}

const CreateRoulettePage = () => {
    return <CreateRoulettePageClient />;
}

export default CreateRoulettePage;
