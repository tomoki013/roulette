import { getArticleBySlug, getAllArticleSlugs } from "@/lib/articles";
import ArticleDetailClient from "./Client";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const article = getArticleBySlug(params.slug);

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: "/favicon.ico",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      title: article.title,
      description: article.excerpt,
      images: ["/favicon.ico"],
    },
  };
}

export async function generateStaticParams() {
  const articles = getAllArticleSlugs();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

const ArticlePage = async (props: {
  params: Promise<{ slug: string; locale: string }>;
}) => {
  const params = await props.params;
  const article = getArticleBySlug(params.slug);
  return <ArticleDetailClient article={article} />;
};

export default ArticlePage;
