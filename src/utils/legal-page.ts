import type { i18n } from 'i18next';

export type LegalPageColor = 'blue' | 'purple' | 'green' | 'amber' | 'indigo' | 'rose' | 'red' | 'orange';

const LEGAL_COLOR_MAP: Record<
  LegalPageColor,
  { bg: string; text: string; iconBg: string; border?: string }
> = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    iconBg: 'from-blue-500 to-blue-600',
    border: 'border-blue-200 dark:border-blue-800',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
    iconBg: 'from-purple-500 to-purple-600',
    border: 'border-purple-200 dark:border-purple-800',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
    iconBg: 'from-green-500 to-green-600',
    border: 'border-green-200 dark:border-green-800',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    text: 'text-amber-600 dark:text-amber-400',
    iconBg: 'from-amber-500 to-amber-600',
    border: 'border-amber-200 dark:border-amber-800',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    text: 'text-indigo-600 dark:text-indigo-400',
    iconBg: 'from-indigo-500 to-indigo-600',
    border: 'border-indigo-200 dark:border-indigo-800',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    text: 'text-rose-600 dark:text-rose-400',
    iconBg: 'from-rose-500 to-rose-600',
    border: 'border-rose-200 dark:border-rose-800',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400',
    iconBg: 'from-red-500 to-red-600',
    border: 'border-red-200 dark:border-red-800',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-600 dark:text-orange-400',
    iconBg: 'from-orange-500 to-orange-600',
    border: 'border-orange-200 dark:border-orange-800',
  },
};

export function getLegalPageColorClasses(color: LegalPageColor): {
  bg: string;
  text: string;
  iconBg: string;
  border: string;
} {
  const base = LEGAL_COLOR_MAP[color] ?? LEGAL_COLOR_MAP.blue;
  return {
    ...base,
    border: base.border ?? 'border-gray-200 dark:border-gray-700',
  };
}

export function getLegalPageI18nItems(i18n: i18n, key: string): string[] {
  const items = i18n.getResource(i18n.language, 'translation', key);
  return Array.isArray(items) ? items : [];
}

/**
 * Safe short title for nav (e.g. "1. Information We Collect" -> "Information We Collect").
 * Falls back to full title if pattern does not match.
 */
export function getLegalSectionShortTitle(fullTitle: string): string {
  const afterDot = fullTitle.split('. ')[1];
  return afterDot?.trim() ?? fullTitle;
}
