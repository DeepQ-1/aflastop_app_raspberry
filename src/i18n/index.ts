import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en';
import de from './locales/de';
import fr from './locales/fr';
import hr from './locales/hr';
import it from './locales/it';
import hu from './locales/hu';
import es from './locales/es';
import zh from './locales/zh';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      de,
      fr,
      hr,
      it,
      hu,
      es,
      zh
    },
    fallbackLng: 'hr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;