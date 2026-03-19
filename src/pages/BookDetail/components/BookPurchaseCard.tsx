import { useTranslation } from "react-i18next";
import { clsx } from "clsx";
import { Share2, Shield } from "lucide-react";
import {
  formatPrice,
  formatApproximateVndFromUsd,
  shouldShowApproxVnd,
} from "@/utils/currency";
import { PaymentInfo } from "@/components/payment/PaymentInfo";
import type { BookProduct } from "@/types";

interface BookPurchaseCardProps {
  book: BookProduct;
  isLightMode: boolean;
  onShare: () => void;
}

export function BookPurchaseCard({
  book,
  isLightMode,
  onShare,
}: BookPurchaseCardProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="lg:sticky lg:top-24">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6">
            {book.price > 0 && (
              <div className="mb-4">
                <span
                  className={clsx(
                    "text-3xl font-bold",
                    isLightMode ? "text-gray-900" : "text-white"
                  )}
                >
                  {formatPrice(book.price, book.currency || "USD", t('common.free'))}
                </span>
                {shouldShowApproxVnd(book.price, book.currency || "USD") && (
                  <p
                    className={clsx(
                      "mt-1 text-sm font-semibold tabular-nums",
                      isLightMode ? "text-gray-600" : "text-gray-300"
                    )}
                  >
                    {formatApproximateVndFromUsd(book.price)}
                  </p>
                )}
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={onShare}
                className="w-full py-3 rounded-xl font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-2 transition-all"
              >
                <Share2 className="w-5 h-5" />
                {t("bookDetail.share")}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  {t("bookDetail.guarantee")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block mt-6">
          <PaymentInfo
            showQrCode={true}
            showContactInfo={true}
            isDonation={book.price === 0}
          />
        </div>
      </div>
    </div>
  );
}
