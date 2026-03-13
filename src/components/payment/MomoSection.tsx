import { useTranslation } from 'react-i18next';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { PAYMENT_CONFIG } from '@/config/payment.config';

interface MomoSectionProps {
  readonly isDonation: boolean;
  readonly isModal: boolean;
  readonly copiedField: string | null;
  readonly onCopy: (text: string, field: string) => void;
}

export const MomoSection = ({ isDonation, isModal, copiedField, onCopy }: MomoSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="p-4 sm:p-5 bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-200 dark:border-pink-800">
      <div className={clsx(isModal ? 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4' : 'block')}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm sm:text-base">M</span>
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-base text-gray-900 dark:text-white">
              {PAYMENT_CONFIG.momo.label}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
              {t('payment.momoDesc')}
            </p>
          </div>
        </div>
        <div className={clsx(!isModal && 'mt-4')}>
          <a
            href={PAYMENT_CONFIG.momo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-pink-600 text-white rounded-lg hover:bg-pink-700 active:bg-pink-800 transition-colors text-sm font-semibold"
          >
            {isDonation ? t('payment.donateWithMomo') : t('payment.payWithMomo')}
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
          </a>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 dark:text-gray-300 pt-2 border-t border-pink-200/50 dark:border-pink-800/50">
        <span className="font-medium">{t('payment.momoUrl')}:</span>
        <code className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg text-xs font-mono border border-gray-200 dark:border-gray-700 flex-1 min-w-0 break-all">
          {PAYMENT_CONFIG.momo.url}
        </code>
        <button
          onClick={() => onCopy(PAYMENT_CONFIG.momo.url, 'momo')}
          className="p-2 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors flex-shrink-0"
          title={t('common.copy')}
        >
          {copiedField === 'momo' ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
    </div>
  );
};
