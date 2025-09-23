"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Sparkles,
  Target,
  Users,
  CheckSquare,
  ArrowRight,
  Contact2,
} from "lucide-react";
import Link from "next/link";

const AboutPageClient = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

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
          <Sparkles className="text-yellow-300" />
          {t("about.title2")}
        </h1>
        <p className="text-lg text-white/80">{t("about.subtitle")}</p>
      </motion.div>

      <div className="space-y-8">
        {/* Purpose Section */}
        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold pb-2 flex items-center gap-2 mb-4 border-b border-white/20">
            <Target className="text-yellow-300" />
            {t("about.section1Title")}
          </h2>
          <p className="text-white/90">{t("about.section1Content")}</p>
        </motion.section>

        {/* Target Audience Section */}
        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold pb-2 flex items-center gap-2 mb-4 border-b border-white/20">
            <Users className="text-yellow-300" />
            {t("about.section2Title")}
          </h2>
          <p className="text-white/90">{t("about.section2Content")}</p>
        </motion.section>

        {/* Features Section */}
        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold pb-2 flex items-center gap-2 mb-4 border-b border-white/20">
            <CheckSquare className="text-yellow-300" />
            {t("about.features.title")}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-white/90">
            <li>{t("about.features.customization")}</li>
            <li>{t("about.features.sharing")}</li>
            <li>{t("about.features.authentication")}</li>
            <li>{t("about.features.mypage")}</li>
            <li>{t("about.features.templates")}</li>
            <li>{t("about.features.multiLanguage")}</li>
          </ul>
        </motion.section>

        {/* Feedback & CTA Section */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8"
        >
          <p className="text-white/90 mb-6">{t("about.section3Content")}</p>
          <div className="flex flex-col justify-center gap-4 md:flex-row md:items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`/${locale}/original-roulette`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all duration-300"
              >
                {t("heroSection.createRoulette.title")}
                <ArrowRight size={20} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white-30 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all duration-300"
              >
                <Contact2 size={20} />
                {t("contact.title")}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPageClient;
