"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import DynamicHeading from "@/components/elements/common/DynamicHeading";

interface Content {
  type: string;
  text?: string;
  level?: number;
  items?: { text: string; href?: string }[];
  linkText?: string;
  href?: string;
  afterText?: string;
}

const PrivacyPolicyPageClient = () => {
  const { t, i18n } = useTranslation();
  const content = t("pages.privacyPolicy.content", {
    returnObjects: true,
  }) as Content[];

  const renderContent = (item: Content, index: number) => {
    switch (item.type) {
      case "heading":
        return (
          <DynamicHeading
            key={index}
            level={item.level || 2}
            className="text-2xl font-semibold pt-4 pb-2"
          >
            {item.text}
          </DynamicHeading>
        );
      case "paragraph":
        return (
          <p key={index} className="text-white/90">
            {item.text}
          </p>
        );
      case "paragraphWithLink":
        return (
          <p key={index} className="text-white/90">
            {item.text}
            <Link
              href={item.href || ""}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-yellow-300"
            >
              {item.linkText}
            </Link>
            {item.afterText}
          </p>
        );
      case "list":
        return (
          <ul key={index} className="list-disc list-inside pl-4 space-y-1">
            {item.items?.map((li, liIndex) => (
              <li key={liIndex}>
                {li.href ? (
                  <Link
                    href={li.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-yellow-300"
                  >
                    {li.text}
                  </Link>
                ) : (
                  li.text
                )}
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">{t("seo.privacyPolicy.title")}</h1>
      <div className="space-y-4 text-white/90">
        <p>{t("pages.privacyPolicy.lastUpdated")}</p>
        {Array.isArray(content) &&
          content.map((item, index) => renderContent(item, index))}
      </div>
    </div>
  );
};

export default PrivacyPolicyPageClient;