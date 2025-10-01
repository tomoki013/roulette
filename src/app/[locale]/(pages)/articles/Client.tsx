"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArticleData } from "@/lib/articles";
import { BookText, Calendar, User, Tag as TagIcon } from "lucide-react";

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
    <div className="max-w-6xl mx-auto text-white">
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {articles.map((article) => (
          <motion.div
            key={article.slug}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl flex flex-col"
          >
            <Link href={`/${locale}/articles/${article.slug}`} legacyBehavior>
              <a className="p-6 flex-grow flex flex-col hover:bg-white/5 rounded-2xl transition-colors duration-300 h-full">
                <h2 className="text-xl font-bold text-yellow-300 mb-2">
                  {article.title}
                </h2>
                <p className="text-white/80 mb-4 flex-grow">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-yellow-300/20 text-yellow-300 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1"
                    >
                      <TagIcon size={12} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-sm text-white/60 space-x-4 mt-auto pt-4 border-t border-white/10">
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
