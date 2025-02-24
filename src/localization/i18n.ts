import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "src/localization/locales/en/enTranslation.json";
import roTranslation from "src/localization/locales/ro/roTranslation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: enTranslation,
    },
    ro: {
      translations: roTranslation,
    },
  },
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  ns: ["translations"],
  defaultNS: "translations",
});

export default i18n;
