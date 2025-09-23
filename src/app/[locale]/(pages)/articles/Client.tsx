"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArticleData } from "@/lib/articles";
import { BookText, Calendar, User } from "lucide-react";

interface ArticlesPageClientProps {
  articles: Omit<ArticleData, "content">[];
  locale: string;
}

const ArticlesPageClient = ({ articles, locale }: ArticlesPageClientProps) => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <BookText className="text-yellow-300" />
          {t("articles.title")}
        </h1>
        <p className="text-lg text-white/80">{t("articles.description")}</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {articles.map((article) => (
          <motion.div key={article.slug} variants={itemVariants}>
            <Link href={`/${locale}/articles/${article.slug}`} legacyBehavior>
              <a className="block bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors duration-300">
                <h2 className="text-2xl font-bold text-yellow-300 mb-2">
                  {article.title}
                </h2>
                <p className="text-white/80 mb-4">{article.excerpt}</p>
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
              </a>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ArticlesPageClient;
