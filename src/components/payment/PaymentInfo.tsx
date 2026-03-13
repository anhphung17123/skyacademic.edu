import { useTranslation } from 'react-i18next';
import { CreditCard, Heart, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { useCopyToClipboard } from '@/hooks';
import { CONTACT_INFO } from '@/config/contact.config';
import { PayPalSection } from './PayPalSection';
import { MomoSection } from './MomoSection';
import { BankTransferSection } from './BankTransferSection';

interface PaymentInfoProps {
  showQrCode?: boolean;
  showContactInfo?: boolean;
  isDonation?: boolean;
  variant?: 'default' | 'modal';
}

export const PaymentInfo = ({
  showQrCode = true,
  showContactInfo = true,
  isDonation = false,
  variant = 'default',
}: PaymentInfoProps) => {
  const { t } = useTranslation();
  const { copiedField, handleCopy } = useCopyToClipboard();
  const isModal = variant === 'modal';

  return (
    <div className={clsx(
      !isModal && 'bg-surface dark:bg-surface-dark rounded-2xl shadow-xl shadow-elevated/50 dark:shadow-elevated-dark/50 border border-border-subtle dark:border-border-subtle-dark overflow-hidden'
    )}>
      {!isModal && (
        <div className="p-6 border-b border-border-subtle dark:border-border-subtle-dark">
          <div className="flex items-center gap-3 mb-2">
            <div className={clsx(
              'p-2 rounded-xl text-surface dark:text-surface-dark',
              isDonation
                ? 'bg-gradient-to-br from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600'
                : 'bg-gradient-to-br from-accent-primary to-accent-secondary dark:from-accent-primary-dark dark:to-accent-secondary-dark'
            )}>
              {isDonation ? (
                <Heart className="w-5 h-5 fill-current" />
              ) : (
                <CreditCard className="w-5 h-5" />
              )}
            </div>
            <h3 className="text-lg font-bold text-text-primary dark:text-text-primary-dark">
              {isDonation ? t('payment.donationTitle') : t('payment.title')}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {isDonation ? t('payment.donationDescription') : t('payment.description')}
          </p>
          {isDonation && (
            <div className="mt-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-medium">
                {t('payment.donationNote')}
              </p>
            </div>
          )}
        </div>
      )}

      <div className={clsx('space-y-4 sm:space-y-6', isModal ? 'p-0' : 'p-6')}>
        <PayPalSection isDonation={isDonation} isModal={isModal} copiedField={copiedField} onCopy={handleCopy} />
        <MomoSection isDonation={isDonation} isModal={isModal} copiedField={copiedField} onCopy={handleCopy} />
        <BankTransferSection showQrCode={showQrCode} copiedField={copiedField} onCopy={handleCopy} />

        {showContactInfo && !isDonation && (
          <div className="mt-6 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  {t('payment.afterPaymentTitle')}
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  {t('payment.afterPaymentDesc')}
                </p>
                <div className="mt-2 space-y-1 text-xs text-yellow-700 dark:text-yellow-300">
                  <p>
                    <strong>{t('contact.email')}:</strong>{' '}
                    <a href={`mailto:${CONTACT_INFO.email}`} className="underline hover:text-yellow-800">
                      {CONTACT_INFO.email}
                    </a>
                  </p>
                  <p>
                    <strong>{t('contact.phoneWhatsAppZalo')}:</strong>{' '}
                    <a href={`tel:${CONTACT_INFO.phone}`} className="underline hover:text-yellow-800">
                      {CONTACT_INFO.phoneFormatted}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
