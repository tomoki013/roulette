import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ArticleData } from "@/lib/articles";

interface UseCasesSectionProps {
  articles: Omit<ArticleData, "content">[];
  locale: string;
}

const UseCasesSection = ({ articles, locale }: UseCasesSectionProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center justify-center md:justify-start gap-3 text-center md:text-left">
          <BookOpen className="text-yellow-300" />
          {t("components.heroSection.useCases.title")}
        </h2>
        <p className="text-white/80 mb-8 text-center md:text-left">
          {t("components.heroSection.useCases.excerpt")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/${locale}/articles/${article.slug}`}
              passHref
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                }}
                className="bg-white/10 hover:bg-white/20 p-6 rounded-lg h-full flex flex-col cursor-pointer transition-all duration-300"
              >
                <h3 className="font-bold text-lg mb-2 text-yellow-300">
                  {article.title}
                </h3>
                <p className="text-white/70 text-sm flex-grow">
                  {article.excerpt}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UseCasesSection;
