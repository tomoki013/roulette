import { Metadata } from "next";
import TermsOfServicePageClient from "./Client"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const params = await props.params;
    const { locale } = await params;
    const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

    return {
        title: t.termsOfService.title,
        description: t.termsOfService.description,
        openGraph: {
            title: t.termsOfService.title,
            description: t.termsOfService.description,
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
            title: t.termsOfService.title,
            description: t.termsOfService.description,
            images: ['favicon.ico'],
        },
    }
}

const TermsOfServicePage = () => {
    return <TermsOfServicePageClient />;
}

export default TermsOfServicePage;
