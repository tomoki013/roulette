"use client";

import { I18nextProvider } from "react-i18next";
import { createInstance, i18n } from "i18next";
import { useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { getOptions } from "@/i18n/settings";

export default function I18nProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  // i18nextのインスタンスをstateで管理
  const [i18nInstance, setI18nInstance] = useState<i18n | null>(null);

  // localeが変更されるたびに、i18nextインスタンスを初期化する
  useEffect(() => {
    const init = async () => {
      const newInstance = createInstance();
      await newInstance
        .use(initReactI18next)
        .use(
          resourcesToBackend(
            (language: string, namespace: string) =>
              import(`@/i18n/locales/${language}/${namespace}.json`)
          )
        )
        .init(getOptions(locale));

      // 初期化が完了したら、stateを更新して再レンダリングをトリガー
      setI18nInstance(newInstance);
    };

    init();
  }, [locale]); // localeが変更されたらこのeffectを再実行

  // インスタンスがまだ準備できていない場合は、何も表示しない（またはローディング画面を表示）
  if (!i18nInstance) {
    return null;
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
