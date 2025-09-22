"use client";

"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BookOpen, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";

const Benefit = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => (
  <div className="flex items-start gap-4">
    <Star className="text-yellow-400 mt-1 flex-shrink-0" />
    <div>
      <h3 className="text-xl font-semibold text-yellow-300">{title}</h3>
      <p className="text-white/80 mt-1">{content}</p>
    </div>
  </div>
);

interface HowToUseAccountMeritPageClientProps {
  locale: string;
}

const HowToUseAccountMeritPageClient = ({
  locale,
}: HowToUseAccountMeritPageClientProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
      >
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <BookOpen className="text-yellow-300" />
          {t("howToUse.account.merit")}
        </h1>
        <p className="text-center text-lg text-white/80 mb-8">
          {t("howToUse.account.merit_description")}
        </p>
        <div className="space-y-6">
          <Benefit
            title={t("howToUse.account.merit_detail_structured.benefit1_title")}
            content={t(
              "howToUse.account.merit_detail_structured.benefit1_content"
            )}
          />
          <Benefit
            title={t("howToUse.account.merit_detail_structured.benefit2_title")}
            content={t(
              "howToUse.account.merit_detail_structured.benefit2_content"
            )}
          />
          <Benefit
            title={t("howToUse.account.merit_detail_structured.benefit3_title")}
            content={t(
              "howToUse.account.merit_detail_structured.benefit3_content"
            )}
          />
        </div>
      </motion.div>
      <div className="mt-8 text-center">
        <Link
          href={`/${locale}/how-to-use`}
          className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{t("howToUse.back_to_list")}</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default HowToUseAccountMeritPageClient;
