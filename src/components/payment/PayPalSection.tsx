import { useTranslation } from 'react-i18next';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { PAYMENT_CONFIG } from '@/config/payment.config';

interface PayPalSectionProps {
  readonly isDonation: boolean;
  readonly isModal: boolean;
  readonly copiedField: string | null;
  readonly onCopy: (text: string, field: string) => void;
}

export const PayPalSection = ({ isDonation, isModal, copiedField, onCopy }: PayPalSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="p-4 sm:p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
      <div className={clsx(isModal ? 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4' : 'block')}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm sm:text-base">PP</span>
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-base text-gray-900 dark:text-white">
              {PAYMENT_CONFIG.paypal.label}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
              {t('payment.paypalDesc')}
            </p>
          </div>
        </div>
        <div className={clsx(!isModal && 'mt-4')}>
          <a
            href={PAYMENT_CONFIG.paypal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm font-semibold"
          >
            {isDonation ? t('payment.donateWithPayPal') : t('payment.payWithPayPal')}
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
          </a>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-blue-200/50 dark:border-blue-800/50 space-y-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-10 sm:w-12 flex-shrink-0">
            {t('payment.paypalUrl')}:
          </span>
          <code className="flex-1 min-w-0 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg text-xs font-mono border border-gray-200 dark:border-gray-700 break-all">
            {PAYMENT_CONFIG.paypal.url}
          </code>
          <button
            type="button"
            onClick={() => onCopy(PAYMENT_CONFIG.paypal.url, 'paypal')}
            className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex-shrink-0"
            title={t('common.copy')}
          >
            {copiedField === 'paypal' ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-10 sm:w-12 flex-shrink-0">
            Email:
          </span>
          <code className="flex-1 min-w-0 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg text-xs font-mono border border-gray-200 dark:border-gray-700 break-all">
            {PAYMENT_CONFIG.paypal.email}
          </code>
          <button
            type="button"
            onClick={() => onCopy(PAYMENT_CONFIG.paypal.email, 'paypalEmail')}
            className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex-shrink-0"
            title={t('common.copy')}
          >
            {copiedField === 'paypalEmail' ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
