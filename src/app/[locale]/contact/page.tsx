import { Metadata } from "next";
import ContactPageClient from "./Client"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const params = await props.params;
    const { locale } = await params;
    const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

    return {
        title: t.contact.title,
        description: t.contact.description,
        openGraph: {
            title: t.contact.title,
            description: t.contact.description,
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
            title: t.contact.title,
            description: t.contact.description,
            images: ['favicon.ico'],
        },
    }
}

const ContactPage = () => {
    return <ContactPageClient />;
}

export default ContactPage;
