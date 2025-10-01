import { i18n } from "../../i18n-config";

export function getOptions(
  locale: string = "ja",
  ns: string | string[] = "common"
) {
  return {
    // debug: true,
    supportedLngs: i18n.locales,
    fallbackLng: "ja",
    lng: locale,
    ns: Array.isArray(ns) ? ns : [ns],
    defaultNS: Array.isArray(ns) ? ns[0] : ns,
  };
}
