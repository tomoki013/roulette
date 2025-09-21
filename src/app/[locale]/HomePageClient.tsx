"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Languages,
  LogIn,
  User,
  HelpCircle,
  LayoutGrid,
} from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { ArticleData } from "@/lib/articles";
import UseCasesSection from "@/components/features/home/UseCasesSection";

interface HomePageClientProps {
  articles: Omit<ArticleData, "content">[];
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: {
    y: -5,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
};

const HomePageClient = ({ articles }: HomePageClientProps) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center text-center text-white py-12 px-4">
      {/* Main Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-orange-300 pb-4">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/80">{t("excerpt")}</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href={`/${locale}/original-roulette`}
            className="mt-10 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {t("heroSection.createRoulette.title")}
          </Link>
        </motion.div>
      </motion.div>

      {/* Sections Grid */}
      <div className="mt-24 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Use Cases Section (Full Width) */}
        <div className="md:col-span-2">
          <UseCasesSection articles={articles} locale={locale} />
        </div>

        {/* Login/MyPage Section */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center md:text-left"
        >
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
            {user ? (
              <User className="text-yellow-300" />
            ) : (
              <LogIn className="text-yellow-300" />
            )}
            {t("heroSection.login.title")}
          </h2>
          <p className="text-white/80 mb-6">
            {t("heroSection.login.excerpt")}
          </p>
          <Link
            href={user ? `/${locale}/mypage` : `/${locale}/auth`}
            className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {user
              ? t("heroSection.login.goToMypage")
              : t("heroSection.login.goToLogin")}
          </Link>
        </motion.div>

        {/* Templates Section */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center md:text-left"
        >
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
            <LayoutGrid className="text-yellow-300" />
            {t("heroSection.templates.title")}
          </h2>
          <p className="text-white/80 mb-6">
            {t("heroSection.templates.excerpt")}
          </p>
          <Link
            href={`/${locale}/templates`}
            className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {t("templates.template")}
          </Link>
        </motion.div>

        {/* How to use Section */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center md:text-left"
        >
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
            <HelpCircle className="text-yellow-300" />
            {t("howToUse.title")}
          </h2>
          <p className="text-white/80 mb-6">{t("howToUse.description")}</p>
          <Link
            href={`/${locale}/how-to-use`}
            className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {t("howToUse.title")}
          </Link>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center md:text-left"
        >
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
            <Mail className="text-yellow-300" />
            {t("heroSection.contact.title")}
          </h2>
          <p className="text-white/80 mb-6">
            {t("heroSection.contact.excerpt")}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {t("heroSection.contact.title")}
          </Link>
        </motion.div>

        {/* Language Section (Full Width) */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ duration: 0.5, delay: 0.6 }}
          className="md:col-span-2 bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center md:text-left"
        >
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
            <Languages className="text-yellow-300" />
            {t("heroSection.language.title")}
          </h2>
          <p className="text-white/80">{t("heroSection.language.excerpt")}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePageClient;
