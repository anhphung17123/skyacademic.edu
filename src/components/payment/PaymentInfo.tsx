import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  QrCode,
  Copy,
  Check,
  CreditCard,
  ExternalLink,
  AlertCircle,
  Heart,
} from "lucide-react";
import { clsx } from "clsx";
import qrCodeImage from "@/images/QR-code.jpg";
import { mockContactInfo } from "@/services/mock/data/Contact";

interface PaymentInfoProps {
  showQrCode?: boolean;
  showContactInfo?: boolean;
  isDonation?: boolean;
  variant?: 'default' | 'modal';
}

// Real payment information
const PAYMENT_INFO = {
  paypal: {
    url: "https://paypal.me/Xuan123hv",
    label: "PayPal",
  },
  momo: {
    url: "https://me.momo.vn/xuansongsky",
    label: "Momo",
  },
  bank: {
    accountName: "PHUNG THI XUAN",
    accountNumber: "1638544056870",
    bankName: "MB Bank – MB Hải Châu",
    swift: "MSCBVNVX",
    currency: "VND",
    qrCodeUrl: qrCodeImage,
  },
};

export const PaymentInfo = ({
  showQrCode = true,
  showContactInfo = true,
  isDonation = false,
  variant = 'default',
}: PaymentInfoProps) => {
  const { t } = useTranslation();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const isModal = variant === 'modal';

  return (
    <div className={clsx(
      !isModal && "bg-surface dark:bg-surface-dark rounded-2xl shadow-xl shadow-elevated/50 dark:shadow-elevated-dark/50 border border-border-subtle dark:border-border-subtle-dark overflow-hidden"
    )}>
      {/* Header - Only show in default variant */}
      {!isModal && (
        <div className="p-6 border-b border-border-subtle dark:border-border-subtle-dark">
          <div className="flex items-center gap-3 mb-2">
            <div className={clsx(
              "p-2 rounded-xl text-surface dark:text-surface-dark",
              isDonation
                ? "bg-gradient-to-br from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600"
                : "bg-gradient-to-br from-accent-primary to-accent-secondary dark:from-accent-primary-dark dark:to-accent-secondary-dark"
            )}>
              {isDonation ? (
                <Heart className="w-5 h-5 fill-current" />
              ) : (
                <CreditCard className="w-5 h-5" />
              )}
            </div>
            <h3 className="text-lg font-bold text-text-primary dark:text-text-primary-dark">
              {isDonation ? t("payment.donationTitle") : t("payment.title")}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {isDonation ? t("payment.donationDescription") : t("payment.description")}
          </p>
          {isDonation && (
            <div className="mt-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-medium">
                {t("payment.donationNote")}
              </p>
            </div>
          )}
        </div>
      )}

      <div className={clsx(
        "space-y-4 sm:space-y-6",
        isModal ? "p-0" : "p-6"
      )}>
        {/* PayPal */}
        <div className="p-4 sm:p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-base">PP</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                  {PAYMENT_INFO.paypal.label}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  {t("payment.paypalDesc")}
                </p>
              </div>
            </div>
            <a
              href={PAYMENT_INFO.paypal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-2 text-sm font-semibold shadow-md hover:shadow-lg"
            >
              {isDonation ? t("payment.donateWithPayPal") : t("payment.payWithPayPal")}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 dark:text-gray-300 pt-2 border-t border-blue-200/50 dark:border-blue-800/50">
            <span className="font-medium">{t("payment.paypalUrl")}:</span>
            <code className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg text-xs font-mono border border-gray-200 dark:border-gray-700 flex-1 min-w-0 break-all">
              {PAYMENT_INFO.paypal.url}
            </code>
            <button
              onClick={() => handleCopy(PAYMENT_INFO.paypal.url, "paypal")}
              className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex-shrink-0"
              title={t("common.copy")}
            >
              {copiedField === "paypal" ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Momo */}
        <div className="p-4 sm:p-5 bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-200 dark:border-pink-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-base">M</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                  {PAYMENT_INFO.momo.label}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  {t("payment.momoDesc")}
                </p>
              </div>
            </div>
            <a
              href={PAYMENT_INFO.momo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-pink-600 text-white rounded-lg hover:bg-pink-700 active:bg-pink-800 transition-colors flex items-center justify-center gap-2 text-sm font-semibold shadow-md hover:shadow-lg"
            >
              {isDonation ? t("payment.donateWithMomo") : t("payment.payWithMomo")}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 dark:text-gray-300 pt-2 border-t border-pink-200/50 dark:border-pink-800/50">
            <span className="font-medium">{t("payment.momoUrl")}:</span>
            <code className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg text-xs font-mono border border-gray-200 dark:border-gray-700 flex-1 min-w-0 break-all">
              {PAYMENT_INFO.momo.url}
            </code>
            <button
              onClick={() => handleCopy(PAYMENT_INFO.momo.url, "momo")}
              className="p-2 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors flex-shrink-0"
              title={t("common.copy")}
            >
              {copiedField === "momo" ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Bank Transfer */}
        <div className="p-4 sm:p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                {t("payment.bankTransfer")}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                {t("payment.bankTransferDesc")}
              </p>
            </div>
          </div>

          {showQrCode && (
            <div className="mx-auto w-full max-w-xs mb-5 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <img
                src={PAYMENT_INFO.bank.qrCodeUrl}
                alt={t("payment.qrCodeAlt")}
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          {/* Bank Details */}
          <div className="space-y-2.5">
            {[
              {
                label: t("payment.accountName"),
                value: PAYMENT_INFO.bank.accountName,
                field: "accountName",
              },
              {
                label: t("payment.accountNumber"),
                value: PAYMENT_INFO.bank.accountNumber,
                field: "accountNumber",
              },
              {
                label: t("payment.bankName"),
                value: PAYMENT_INFO.bank.bankName,
                field: "bankName",
              },
              {
                label: t("common.swift"),
                value: PAYMENT_INFO.bank.swift,
                field: "swift",
              },
              {
                label: t("payment.currency"),
                value: PAYMENT_INFO.bank.currency,
                field: "currency",
              },
            ].map((item) => (
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
                  onClick={() => handleCopy(item.value, item.field)}
                  className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex-shrink-0"
                  title={t("common.copy")}
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

        {/* Contact Info After Payment */}
        {showContactInfo && !isDonation && (
          <div className="mt-6 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  {t("payment.afterPaymentTitle")}
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  {t("payment.afterPaymentDesc")}
                </p>
                <div className="mt-2 space-y-1 text-xs text-yellow-700 dark:text-yellow-300">
                  <p>
                    <strong>
                      {t("contact.email")}:
                    </strong>{" "}
                    <a
                      href={`mailto:${mockContactInfo.email}`}
                      className="underline hover:text-yellow-800"
                    >
                      {mockContactInfo.email}
                    </a>
                  </p>
                  <p>
                    <strong>
                      {t("contact.phoneWhatsAppZalo")}
                      :
                    </strong>{" "}
                    <a
                      href={`tel:${mockContactInfo.phone}`}
                      className="underline hover:text-yellow-800"
                    >
                      {mockContactInfo.phoneFormatted}
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
