import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { STORAGE_KEYS, DEFAULT_VALUES } from '@/constants';
import en from './locales/en.json';
import vi from './locales/vi.json';

const savedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || DEFAULT_VALUES.LANGUAGE;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    lng: savedLanguage,
    fallbackLng: DEFAULT_VALUES.LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
