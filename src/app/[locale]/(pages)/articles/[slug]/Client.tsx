"use client";

import { ArticleData } from "@/lib/articles";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Article from "@/components/features/article/Article";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface ArticleDetailClientProps {
  article: ArticleData;
  locale: string;
}

const ArticleDetailClient = ({ article, locale }: ArticleDetailClientProps) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto text-white"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
        <h1 className="text-4xl font-bold text-yellow-300 mb-4">
          {article.title}
        </h1>
        <div className="flex items-center text-sm text-white/60 space-x-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{article.author}</span>
          </div>
        </div>
      </div>
      <Article article={article} locale={locale} />
      <div className="mt-8 text-center">
        <Link
          href={`/${locale}/articles`}
          className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{t("articles.back_to_list")}</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default ArticleDetailClient;
