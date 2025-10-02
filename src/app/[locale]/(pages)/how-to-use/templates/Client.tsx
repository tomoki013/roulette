"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  ArrowLeft,
  Layers,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Item } from "@/types";
import RouletteWheel from "@/components/features/roulette/RouletteWheel";
import { ROULETTE_COLORS } from "@/constants/roulette";

// Mock Data for Demo
const mockTemplates = (t: (key: string) => string) => [
  {
    id: 1,
    title: t("pages.howToUse.demo.template1.title"),
    items: [
      {
        name: t("pages.howToUse.demo.template1.item1"),
        color: ROULETTE_COLORS[0],
        ratio: 1,
      },
      {
        name: t("pages.howToUse.demo.template1.item2"),
        color: ROULETTE_COLORS[1],
        ratio: 1,
      },
      {
        name: t("pages.howToUse.demo.template1.item3"),
        color: ROULETTE_COLORS[2],
        ratio: 1,
      },
    ],
  },
  {
    id: 2,
    title: t("pages.howToUse.demo.template2.title"),
    items: [
      {
        name: t("pages.howToUse.demo.template2.item1"),
        color: ROULETTE_COLORS[3],
        ratio: 1,
      },
      {
        name: t("pages.howToUse.demo.template2.item2"),
        color: ROULETTE_COLORS[4],
        ratio: 1,
      },
      {
        name: t("pages.howToUse.demo.template2.item3"),
        color: ROULETTE_COLORS[5],
        ratio: 1,
      },
      {
        name: t("pages.howToUse.demo.template2.item4"),
        color: ROULETTE_COLORS[0],
        ratio: 1,
      },
    ],
  },
  {
    id: 3,
    title: t("pages.howToUse.demo.template3.title"),
    items: [
      {
        name: t("pages.howToUse.demo.template3.item1"),
        color: ROULETTE_COLORS[1],
        ratio: 1,
      },
      {
        name: t("pages.howToUse.demo.template3.item2"),
        color: ROULETTE_COLORS[2],
        ratio: 1,
      },
    ],
  },
];

const Step = ({ title, content }: { title: string; content: string }) => (
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
  const templates = mockTemplates(t);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

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
          {t("pages.howToUse.loggedIn.templates.title")}
        </h1>
        <p className="text-center text-lg text-white/80 mb-8">
          {t("pages.howToUse.loggedIn.templates.description")}
        </p>

        <div className="p-4 border border-yellow-300/30 rounded-lg bg-yellow-500/10 mb-8">
          <p className="text-center text-yellow-200">
            {t("pages.howToUse.demo.notice")}
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-start">
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-2xl font-bold text-yellow-300 flex items-center gap-2">
              <Layers />
              {t("pages.howToUse.demo.availableTemplates")}
            </h2>
            <div className="space-y-3 w-full">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedTemplate.id === template.id
                      ? "bg-yellow-500/30 text-yellow-200"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {template.title}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 mt-8 lg:mt-0">
            <h2 className="text-2xl font-bold text-yellow-300 text-center">
              {selectedTemplate.title}
            </h2>
            <RouletteWheel
              items={selectedTemplate.items}
              rotation={0}
              isSpinning={false}
            />
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105">
              <Download />
              {t("pages.howToUse.demo.loadTemplate")}
            </button>
          </div>
        </div>

        <div className="space-y-6 mt-12">
          <Step
            title={t("pages.howToUse.loggedIn.templates.step1.title")}
            content={t("pages.howToUse.loggedIn.templates.step1.content")}
          />
          <Step
            title={t("pages.howToUse.loggedIn.templates.step2.title")}
            content={t("pages.howToUse.loggedIn.templates.step2.content")}
          />
          <Step
            title={t("pages.howToUse.loggedIn.templates.step3.title")}
            content={t("pages.howToUse.loggedIn.templates.step3.content")}
          />
        </div>
      </motion.div>
      <div className="mt-8 text-center">
        <Link
          href={`/${locale}/how-to-use`}
          className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{t("pages.howToUse.backToList")}</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default HowToUseTemplatesPageClient;
