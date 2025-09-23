"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  return (
    <motion.header
      className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl mb-8"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Link
        href={`/${locale}`}
        className="text-3xl font-bold text-white flex items-center gap-2"
      >
        <Sparkles className="text-yellow-300" />
        {t("title")}
      </Link>
    </motion.header>
  );
};

export default Header;
