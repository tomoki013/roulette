"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";
import GitHubIcon from "../elements/icons/GithubIcon";
import { motion } from "framer-motion";
import CookieBanner from "./CookieBanner";
import { useAuth } from "@/lib/hooks/useAuth";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <motion.footer
        className="w-full mt-16 bg-black/20 backdrop-blur-sm border-t border-white/20 text-white rounded-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* ブランドセクション */}
            <div className="col-span-1">
              <Link
                href={`/${locale}`}
                className="flex items-center gap-2 mb-4"
              >
                <Sparkles className="text-yellow-300" size={28} />
                <span className="text-2xl font-bold">{t("common.appName")}</span>
              </Link>
              <p className="text-white/70">{t("components.footer.tagline")}</p>
            </div>

            {/* サービスリンク */}
            <div>
              <h3 className="font-semibold mb-4 tracking-widest uppercase text-yellow-300">
                {t("common.services")}
              </h3>
              <nav className="flex flex-col space-y-3">
                <Link
                  href={`/${locale}/original-roulette`}
                  className="text-sm hover:text-yellow-300 underline transition-colors"
                >
                  {t("seo.roulette.title")}
                </Link>
                {/* テンプレートページへのリンクを追加 */}
                <Link
                  href={`/${locale}/templates`}
                  className="text-sm hover:text-yellow-300 underline transition-colors"
                >
                  {t("common.template")}
                </Link>
                <Link
                  href={`/${locale}/articles`}
                  className="text-sm hover:text-yellow-300 underline transition-colors"
                >
                  {t("seo.articles.title")}
                </Link>
                <Link
                  href={`/${locale}/how-to-use`}
                  className="text-sm hover:text-yellow-300 underline transition-colors"
                >
                  {t("components.footer.howToUse")}
                </Link>
                {user && (
                  <Link
                    href={`/${locale}/mypage`}
                    className="text-sm hover:text-yellow-300 underline transition-colors"
                  >
                    {t("seo.mypage.title")}
                  </Link>
                )}
              </nav>
            </div>

            {/* 法務リンク */}
            <div>
              <h3 className="font-semibold mb-4 tracking-widest uppercase text-yellow-300">
                {t("common.legal")}
              </h3>
              <nav className="flex flex-col space-y-3">
                <Link
                  href={`/${locale}/about`}
                  className="text-sm hover:text-yellow-300 underline transition-colors"
                >
                  {t("seo.about.title")}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="text-sm hover:text-yellow-300 underline transition-colors"
                >
                  {t("seo.contact.title")}
                </Link>
                <Link
                  href={`/${locale}/faq`}
                  className="text-sm hover:text-yellow-300 underline transition-colors"
                >
                  {t("seo.faq.title")}
                </Link>
                <Link
                  href={`/${locale}/privacy-policy`}
                  className="text-sm hover:text-yellow-300 underline transition-colors"
                >
                  {t("seo.privacyPolicy.title")}
                </Link>
                <Link
                  href={`/${locale}/terms-of-service`}
                  className="text-sm hover:text-yellow-300 underline transition-colors"
                >
                  {t("seo.termsOfService.title")}
                </Link>
              </nav>
            </div>

            {/* ソーシャルリンク */}
            <div>
              <h3 className="font-semibold mb-4 tracking-widest uppercase text-yellow-300">
                {t("common.social")}
              </h3>
              <div className="flex space-x-4">
                <GitHubIcon />
              </div>
            </div>
          </div>

          {/* コピーライト */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60 md:flex md:justify-between">
            <p>
              &copy; 2025
              {currentYear > 2025 ? `-${currentYear} ` : " "}
              {t("components.footer.copyright")}
            </p>
            <div className="hidden md:block">
              <Link
                href={`/terms-of-service`}
                className="text-sm hover:text-yellow-300 underline transition-colors"
              >
                {t("seo.termsOfService.title")}
              </Link>{" "}
              &nbsp;|&nbsp;{" "}
              <Link
                href={`privacy-policy`}
                className="text-sm hover:text-yellow-300 underline transition-colors"
              >
                {t("seo.privacyPolicy.title")}
              </Link>
            </div>
          </div>
        </div>
      </motion.footer>
      <CookieBanner />
    </>
  );
};

export default Footer;
