import { getAllArticles } from "@/lib/articles";
import ArticlesPageClient from "./Client";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = await params;
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  return {
    title: t.seo.articles.title,
    description: t.seo.articles.description,
    openGraph: {
      title: t.seo.articles.title,
      description: t.seo.articles.description,
      images: [
        {
          url: "favicon.ico",
          width: 1200,
          height: 630,
          alt: t.common.appName,
        },
      ],
    },
    twitter: {
      title: t.seo.articles.title,
      description: t.seo.articles.description,
      images: ["favicon.ico"],
    },
  };
}

const ArticlesPage = async (props: { params: Promise<{ locale: string }> }) => {
  const { params } = await props;
  const { locale } = await params;
  const articles = getAllArticles();
  return <ArticlesPageClient articles={articles} locale={locale} />;
};

export default ArticlesPage;
