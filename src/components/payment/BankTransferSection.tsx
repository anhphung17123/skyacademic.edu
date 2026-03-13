import { useTranslation } from 'react-i18next';
import { QrCode, Copy, Check } from 'lucide-react';
import { PAYMENT_CONFIG } from '@/config/payment.config';

interface BankTransferSectionProps {
  readonly showQrCode: boolean;
  readonly copiedField: string | null;
  readonly onCopy: (text: string, field: string) => void;
}

export const BankTransferSection = ({ showQrCode, copiedField, onCopy }: BankTransferSectionProps) => {
  const { t } = useTranslation();

  const bankDetails = [
    { label: t('payment.accountName'), value: PAYMENT_CONFIG.bank.accountName, field: 'accountName' },
    { label: t('payment.accountNumber'), value: PAYMENT_CONFIG.bank.accountNumber, field: 'accountNumber' },
    { label: t('payment.bankName'), value: PAYMENT_CONFIG.bank.bankName, field: 'bankName' },
    { label: t('common.swift'), value: PAYMENT_CONFIG.bank.swift, field: 'swift' },
    { label: t('payment.currency'), value: PAYMENT_CONFIG.bank.currency, field: 'currency' },
  ];

  return (
    <div className="p-4 sm:p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <QrCode className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-base text-gray-900 dark:text-white mb-1">
            {t('payment.bankTransfer')}
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            {t('payment.bankTransferDesc')}
          </p>
        </div>
      </div>

      {showQrCode && (
        <div className="mx-auto w-full max-w-xs mb-5 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <img
            src={PAYMENT_CONFIG.bank.qrCodeUrl}
            alt={t('payment.qrCodeAlt')}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      <div className="space-y-2.5">
        {bankDetails.map((item) => (
          <div
            key={item.field}
            className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 group hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
          >
            <div className="flex-1 min-w-0 pr-3">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                {item.label}
              </p>
              <p className="font-bold text-sm sm:text-base text-gray-900 dark:text-white font-mono break-all">
                {item.value}
              </p>
            </div>
            <button
              onClick={() => onCopy(item.value, item.field)}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex-shrink-0"
              title={t('common.copy')}
            >
              {copiedField === item.field ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
