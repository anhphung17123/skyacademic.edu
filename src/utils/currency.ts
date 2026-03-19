import { DEFAULT_VALUES, LANGUAGE_MAP, USD_TO_VND_REFERENCE_RATE } from '@/constants';

/**
 * Format currency based on currency code and locale.
 * Pure utility — does not depend on i18n framework.
 */
export const formatCurrency = (
  amount: number,
  currency: string = DEFAULT_VALUES.CURRENCY,
  options?: {
    locale?: string;
    showSymbol?: boolean;
  }
): string => {
  const locale = options?.locale || 'en-US';

  if (currency === 'VND') {
    const formatted = new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return options?.showSymbol !== false ? `${formatted}đ` : formatted;
  }

  if (currency === 'USD') {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return options?.showSymbol !== false ? `$${formatted}` : formatted;
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
};

/**
 * Format price with "Free" label for zero amounts.
 * @param freeLabel - Translated string for free items (e.g. t('common.free')).
 *                    Defaults to "Free" if not provided.
 */
export const formatPrice = (
  amount: number,
  currency: string = 'USD',
  freeLabel = 'Free'
): string => {
  if (amount === 0) return freeLabel;
  return formatCurrency(amount, currency, { showSymbol: true });
};

/**
 * Whether to show an approximate VND line under a displayed price.
 */
export const shouldShowApproxVnd = (amount: number, currency: string): boolean =>
  amount > 0 && currency.toUpperCase() === 'USD';

/**
 * Rounds USD→VND to nearest 1,000 VND for a cleaner "~2.600.000đ" line.
 */
export const approximateVndFromUsd = (usdAmount: number): number =>
  Math.round((usdAmount * USD_TO_VND_REFERENCE_RATE) / 1000) * 1000;

/**
 * "~2.600.000đ" style hint below USD prices (vi-VN grouping).
 */
export const formatApproximateVndFromUsd = (usdAmount: number): string => {
  const vnd = approximateVndFromUsd(usdAmount);
  const formatted = new Intl.NumberFormat('vi-VN', {
    maximumFractionDigits: 0,
  }).format(vnd);
  return `~${formatted}đ`;
};

/**
 * Convenience: resolve locale from language code.
 */
export const getLocaleFromLanguage = (lang: string): string => {
  return LANGUAGE_MAP[lang as keyof typeof LANGUAGE_MAP] ?? 'en-US';
};
