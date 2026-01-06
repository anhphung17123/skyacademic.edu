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
  defaultText: string,
  enText?: string,
  viText?: string
): string => {
  if (currentLang === 'vi' && viText) {
    return viText;
  }
  if (currentLang === 'en' && enText) {
    return enText;
  }
  return defaultText;
};

/**
 * Get localized course/book title based on current language
 * @param currentLang - Current language
 * @param title - Default title
 * @param titleEn - English title (optional)
 * @param titleVi - Vietnamese title (optional)
 * @returns Localized title
 */
export const getLocalizedTitle = (
  currentLang: string,
  title: string,
  titleEn?: string,
  titleVi?: string
): string => {
  if (currentLang === 'vi' && titleVi) {
    return titleVi;
  }
  if (currentLang === 'en' && titleEn) {
    return titleEn;
  }
  return title;
};

/**
 * Get localized course/book description based on current language
 * @param currentLang - Current language
 * @param description - Default description
 * @param descriptionEn - English description (optional)
 * @param descriptionVi - Vietnamese description (optional)
 * @returns Localized description
 */
export const getLocalizedDescription = (
  currentLang: string,
  description: string,
  descriptionEn?: string,
  descriptionVi?: string
): string => {
  if (currentLang === 'vi' && descriptionVi) {
    return descriptionVi;
  }
  if (currentLang === 'en' && descriptionEn) {
    return descriptionEn;
  }
  return description;
};

