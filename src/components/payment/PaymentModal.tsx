import { useTranslation } from "react-i18next";
import { X, CreditCard, Heart } from "lucide-react";
import { PaymentInfo } from "./PaymentInfo";
import { useEffect } from "react";
import { clsx } from "clsx";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDonation?: boolean;
}

export const PaymentModal = ({
  isOpen,
  onClose,
  isDonation = false,
}: PaymentModalProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300 p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full sm:h-auto sm:max-w-2xl sm:max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 sm:rounded-2xl shadow-2xl animate-scale-in flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <div className={clsx(
              "p-2 rounded-xl",
              isDonation
                ? "bg-gradient-to-br from-pink-500 to-rose-500"
                : "bg-gradient-to-br from-primary-600 to-secondary-600"
            )}>
              {isDonation ? (
                <Heart className="w-5 h-5 text-white fill-current" />
              ) : (
                <CreditCard className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {isDonation ? t("payment.donationTitle") : t("payment.title")}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {isDonation ? t("payment.donationDescription") : t("payment.description")}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors flex-shrink-0"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Donation Note */}
        {isDonation && (
          <div className="px-4 sm:px-6 pt-4 pb-2">
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-medium">
                {t("payment.donationNote")}
              </p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 px-4 sm:px-6 py-4 sm:py-6">
          <PaymentInfo
            showQrCode={true}
            showContactInfo={true}
            isDonation={isDonation}
            variant="modal"
          />
        </div>
      </div>
    </div>
  );
};

