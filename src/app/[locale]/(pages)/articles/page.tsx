import { getAllArticles } from '@/lib/articles';
import ArticlesPageClient from './Client';
import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const params = await props.params;
    const { locale } = await params;
    const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

    return {
        title: t.articles.title,
        description: t.articles.description,
        openGraph: {
            title: t.articles.title,
            description: t.articles.description,
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
            title: t.articles.title,
            description: t.articles.description,
            images: ['favicon.ico'],
        },
    }
}

const ArticlesPage = () => {
  const articles = getAllArticles();
  return <ArticlesPageClient articles={articles} />;
};

export default ArticlesPage;
