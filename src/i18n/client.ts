"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { getOptions } from "./settings";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      return import(`./locales/${language}/translation.json`);
    })
  )
  .init({
    ...getOptions(),
    lng: undefined,
  });

export default i18next;
