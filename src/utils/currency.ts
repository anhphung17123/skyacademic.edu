import i18n from '@/i18n';
import { DEFAULT_VALUES, LANGUAGE_MAP } from '@/constants';

/**
 * Format currency based on currency code and current language
 * @param amount - The amount to format
 * @param currency - Currency code (USD, VND, etc.)
 * @param options - Additional formatting options
 * @returns Formatted currency string
 */
const formatCurrency = (
  amount: number,
  currency: string = DEFAULT_VALUES.CURRENCY,
  options?: {
    locale?: string;
    showSymbol?: boolean;
  }
): string => {
  const currentLang = i18n.language || DEFAULT_VALUES.LANGUAGE;
  const locale = options?.locale || LANGUAGE_MAP[currentLang as keyof typeof LANGUAGE_MAP] || 'en-US';
  
  // For VND, use Vietnamese locale and format
  if (currency === 'VND') {
    const formatted = new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return options?.showSymbol !== false ? `${formatted}đ` : formatted;
  }
  
  // For USD and other currencies, use standard formatting
  if (currency === 'USD') {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return options?.showSymbol !== false ? `$${formatted}` : formatted;
  }
  
  // For other currencies, use Intl.NumberFormat with currency style
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    // Fallback to simple formatting
    return `${amount} ${currency}`;
  }
};

/**
 * Format price with currency symbol based on currency code
 * @param amount - The amount to format
 * @param currency - Currency code (USD, VND, etc.)
 * @returns Formatted price string with symbol or translated "Free" if amount is 0
 */
export const formatPrice = (amount: number, currency: string = 'USD'): string => {
  if (amount === 0) {
    return i18n.t('common.free');
  }
  return formatCurrency(amount, currency, { showSymbol: true });
};

