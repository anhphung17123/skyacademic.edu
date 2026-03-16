import { useTranslation } from 'react-i18next';
import { Heart, Copy, Check } from 'lucide-react';
import { PAYMENT_CONFIG } from '@/config/payment.config';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { CONTACT_INFO } from '@/config/contact.config';

export const SupportSection = () => {
  const { t } = useTranslation();
  const { copiedField, handleCopy } = useCopyToClipboard();

  const bankDetails = [
    { label: t('payment.accountName'), value: PAYMENT_CONFIG.bank.accountName, field: 'accountName' },
    { label: t('payment.accountNumber'), value: PAYMENT_CONFIG.bank.accountNumber, field: 'accountNumber' },
    { label: t('payment.bankName'), value: PAYMENT_CONFIG.bank.bankName, field: 'bankName' },
    { label: t('common.swift'), value: PAYMENT_CONFIG.bank.swift, field: 'swift' },
    { label: t('payment.currency'), value: PAYMENT_CONFIG.bank.currency, field: 'currency' },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        {t('about.skyShares.supportByAnyAmount')}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {t('payment.donationDescription')}
      </p>

      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-6 md:p-8 border-2 border-primary-200/80 dark:border-primary-800/80 shadow-lg mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-primary-500" />
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {t('payment.bankTransfer')}
          </h3>
        </div>
        <div className="space-y-2">
          {bankDetails.map((item) => (
            <div
              key={item.field}
              className="flex items-center justify-between gap-3 py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <div className="min-w-0">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {item.label}:
                </span>
                <span className="ml-2 font-mono text-sm text-gray-900 dark:text-white break-all">
                  {item.value}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(item.value, item.field)}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 flex-shrink-0"
                title={t('common.copy')}
              >
                {copiedField === item.field ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <a
          href={CONTACT_INFO.contactFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors"
        >
          {t('about.skyShares.studentReviewForm')}
        </a>
      </div>
    </div>
  );
};
