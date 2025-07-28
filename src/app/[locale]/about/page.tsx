import { Metadata } from "next";
import AboutPageClient from "./Client"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const params = await props.params;
    const { locale } = await params;
    const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

    return {
        title: t.about.title,
        description: t.about.description,
        openGraph: {
            title: t.about.title,
            description: t.about.description,
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
            title: t.about.title,
            description: t.about.description,
            images: ['favicon.ico'],
        },
    }
}

const AboutPage = () => {
    return <AboutPageClient />;
}

export default AboutPage;
