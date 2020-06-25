import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationPT from './locales/pt/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  pt: {
    translation: translationPT,
  },
};

const options = {
  order: ['cookie', 'navigator', 'localStorage', 'querystring', 'htmlTag'],
  lookupCookie: 'language',
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    detection: options,
    resources,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
