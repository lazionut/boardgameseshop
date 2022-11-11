import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: require("./locales/en/enTranslation.json"),
    },
    ro: {
      translations: require("./locales/ro/roTranslation.json"),
    },
  },
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  ns: ["translations"],
  defaultNS: "translations",
});

export default i18n;
