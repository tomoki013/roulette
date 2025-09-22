"use client";

"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const Step = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => (
  <div className="flex items-start gap-4">
    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" />
    <div>
      <h3 className="text-xl font-semibold text-yellow-300">{title}</h3>
      <p className="text-white/80 mt-1">{content}</p>
    </div>
  </div>
);

interface HowToUseTemplatesPageClientProps {
  locale: string;
}

const HowToUseTemplatesPageClient = ({
  locale,
}: HowToUseTemplatesPageClientProps) => {
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
          {t("howToUse.loggedIn.templates")}
        </h1>
        <p className="text-center text-lg text-white/80 mb-8">
          {t("howToUse.loggedIn.templates_description")}
        </p>
        <div className="space-y-6">
          <Step
            title={t(
              "howToUse.loggedIn.templates_detail_structured.step1_title"
            )}
            content={t(
              "howToUse.loggedIn.templates_detail_structured.step1_content"
            )}
          />
          <Step
            title={t(
              "howToUse.loggedIn.templates_detail_structured.step2_title"
            )}
            content={t(
              "howToUse.loggedIn.templates_detail_structured.step2_content"
            )}
          />
          <Step
            title={t(
              "howToUse.loggedIn.templates_detail_structured.step3_title"
            )}
            content={t(
              "howToUse.loggedIn.templates_detail_structured.step3_content"
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

export default HowToUseTemplatesPageClient;
