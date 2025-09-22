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
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <li className="border-b border-white/10 py-3 transition-all hover:pl-2">
      <Link
        href={`/${locale}/how-to-use/${href}`}
        className="flex items-center justify-between text-white/90 hover:text-yellow-300"
      >
        <span>{children}</span>
        <ChevronRight size={20} />
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
          <ul className="space-y-2">
            <ListItemLink href="create">
              {t("howToUse.basic.create")}
            </ListItemLink>
            <ListItemLink href="spin">{t("howToUse.basic.spin")}</ListItemLink>
            <ListItemLink href="share">
              {t("howToUse.basic.share")}
            </ListItemLink>
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
          <ul className="space-y-2">
            <ListItemLink href="account-merit">
              {t("howToUse.account.merit")}
            </ListItemLink>
            <ListItemLink href="auth">
              {t("howToUse.account.auth")}
            </ListItemLink>
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
          <ul className="space-y-2">
            <ListItemLink href="mypage">
              {t("howToUse.loggedIn.mypage")}
            </ListItemLink>
            <ListItemLink href="templates">
              {t("howToUse.loggedIn.templates")}
            </ListItemLink>
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
          <ul className="space-y-2">
            <ListItemLink href="original-roulette">
              <div className="special-link-hover p-2 rounded-md">
                {t("howToUse.advanced.original_roulette")}
              </div>
            </ListItemLink>
          </ul>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default HowToUsePageClient;
