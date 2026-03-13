import { useTranslation } from "react-i18next";
import { CreditCard, Heart, ChevronRight } from "lucide-react";
import { clsx } from "clsx";

interface PaymentDetailsTriggerProps {
  isDonation?: boolean;
  onOpenDetails: () => void;
  className?: string;
}

/**
 * Compact block for detail pages: optional support/donation text + button to open full payment details in modal.
 */
export const PaymentDetailsTrigger = ({
  isDonation = false,
  onOpenDetails,
  className,
}: PaymentDetailsTriggerProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        "rounded-2xl border overflow-hidden",
        "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg",
        className
      )}
    >
      <div className="p-5">
        {isDonation && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <p className="text-xs text-green-800 dark:text-green-200 font-medium">
              {t("payment.donationNote")}
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={onOpenDetails}
          className={clsx(
            "w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-colors",
            isDonation
              ? "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
              : "bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white"
          )}
        >
          {isDonation ? (
            <Heart className="w-4 h-4 fill-current" />
          ) : (
            <CreditCard className="w-4 h-4" />
          )}
          {t("payment.detailsButton")}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
