"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  HelpCircle,
  BookOpen,
  UserPlus,
  LogIn,
  ChevronRight,
  Star,
} from "lucide-react";
import Link from "next/link";

interface HowToUsePageClientProps {
  locale: string;
}

const HowToUsePageClient = ({ locale }: HowToUsePageClientProps) => {
  const { t } = useTranslation();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const ListItemLink = ({
    href,
    title,
    description,
  }: {
    href: string;
    title: string;
    description: string;
  }) => (
    <li className="border-b border-white/10 transition-all hover:bg-white/5 -mx-3 rounded-md">
      <Link
        href={`/${locale}/how-to-use/${href}`}
        className="flex items-center justify-between text-white/90 hover:text-yellow-300 py-4 px-3"
      >
        <div className="flex-grow">
          <span className="font-semibold text-md">{title}</span>
          <p className="text-sm text-white/60 mt-1 pr-4">{description}</p>
        </div>
        <ChevronRight size={20} className="flex-shrink-0" />
      </Link>
    </li>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto text-white"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <HelpCircle className="text-yellow-300" />
          {t("howToUse.title")}
        </h1>
        <p className="text-lg text-white/80">{t("howToUse.description")}</p>
      </motion.div>

      <div className="space-y-8">
        {/* Basic Usage Section */}
        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold pb-2 flex items-center gap-2 mb-4 border-b border-white/20">
            <BookOpen className="text-yellow-300" />
            {t("howToUse.basic.title")}
          </h2>
          <ul className="space-y-1">
            <ListItemLink
              href="create"
              title={t("howToUse.basic.create")}
              description={t("howToUse.basic.create_description")}
            />
            <ListItemLink
              href="spin"
              title={t("howToUse.basic.spin")}
              description={t("howToUse.basic.spin_description")}
            />
            <ListItemLink
              href="share"
              title={t("howToUse.basic.share")}
              description={t("howToUse.basic.share_description")}
            />
          </ul>
        </motion.section>

        {/* Account Features Section */}
        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold pb-2 flex items-center gap-2 mb-4 border-b border-white/20">
            <UserPlus className="text-yellow-300" />
            {t("howToUse.account.title")}
          </h2>
          <ul className="space-y-1">
            <ListItemLink
              href="account-merit"
              title={t("howToUse.account.merit")}
              description={t("howToUse.account.merit_description")}
            />
            <ListItemLink
              href="auth"
              title={t("howToUse.account.auth")}
              description={t("howToUse.account.auth_description")}
            />
          </ul>
        </motion.section>

        {/* Logged-in Features Section */}
        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold pb-2 flex items-center gap-2 mb-4 border-b border-white/20">
            <LogIn className="text-yellow-300" />
            {t("howToUse.loggedIn.title")}
          </h2>
          <ul className="space-y-1">
            <ListItemLink
              href="mypage"
              title={t("howToUse.loggedIn.mypage")}
              description={t("howToUse.loggedIn.mypage_description")}
            />
            <ListItemLink
              href="templates"
              title={t("howToUse.loggedIn.templates")}
              description={t("howToUse.loggedIn.templates_description")}
            />
          </ul>
        </motion.section>

        {/* Advanced Features Section */}
        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold pb-2 flex items-center gap-2 mb-4 border-b border-white/20">
            <Star className="text-yellow-300" />
            {t("howToUse.advanced.title")}
          </h2>
          <ul className="space-y-1">
            <ListItemLink
              href="original-roulette"
              title={t("howToUse.advanced.original_roulette")}
              description={t("howToUse.advanced.original_roulette_description")}
            />
          </ul>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default HowToUsePageClient;
