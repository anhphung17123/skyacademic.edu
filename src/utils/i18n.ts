/**
 * i18n utility functions
 */

import type { Language } from '@/types';

/**
 * Get the current language from i18n
 * @param i18n - i18n instance
 * @returns Current language ('en' | 'vi')
 */
export const getCurrentLanguage = (i18n: { language: string }): Language => {
  return (i18n.language === 'vi' ? 'vi' : 'en') as Language;
};

/**
 * Get localized text based on current language
 * @param currentLang - Current language
 * @param defaultText - Default text (fallback)
 * @param enText - English text (optional)
 * @param viText - Vietnamese text (optional)
 * @returns Localized text
 */
export const getLocalizedText = (
  currentLang: string,
  defaultText: string | undefined,
  enText?: string,
  viText?: string
): string => {
  const fallback = defaultText ?? '';
  if (currentLang === 'vi' && viText) {
    return viText;
  }
  if (currentLang === 'en' && enText) {
    return enText;
  }
  return fallback;
};


