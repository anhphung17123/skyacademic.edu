import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  QrCode,
  Copy,
  Check,
  CreditCard,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import qrCodeImage from "@/images/QR-code.jpg";
import { mockContactInfo } from "@/services/mock/data/Contact";

interface PaymentInfoProps {
  showQrCode?: boolean;
  showContactInfo?: boolean;
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
}: PaymentInfoProps) => {
  const { t } = useTranslation();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-600 text-white">
            <CreditCard className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {t("payment.title")}
          </h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("payment.description")}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* PayPal */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PP</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {PAYMENT_INFO.paypal.label}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("payment.paypalDesc")}
                </p>
              </div>
            </div>
            <a
              href={PAYMENT_INFO.paypal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              {t("payment.payWithPayPal")}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>{t("payment.paypalUrl")}:</span>
            <code className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs font-mono">
              {PAYMENT_INFO.paypal.url}
            </code>
            <button
              onClick={() => handleCopy(PAYMENT_INFO.paypal.url, "paypal")}
              className="p-1.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              title={t("common.copy")}
            >
              {copiedField === "paypal" ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Momo */}
        <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-200 dark:border-pink-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {PAYMENT_INFO.momo.label}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("payment.momoDesc")}
                </p>
              </div>
            </div>
            <a
              href={PAYMENT_INFO.momo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              {t("payment.payWithMomo")}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>{t("payment.momoUrl")}:</span>
            <code className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs font-mono">
              {PAYMENT_INFO.momo.url}
            </code>
            <button
              onClick={() => handleCopy(PAYMENT_INFO.momo.url, "momo")}
              className="p-1.5 rounded hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"
              title={t("common.copy")}
            >
              {copiedField === "momo" ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Bank Transfer */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {t("payment.bankTransfer")}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t("payment.bankTransferDesc")}
              </p>
            </div>
          </div>

          {showQrCode && (
            <div className="mx-auto w-fit mb-4">
              <img
                src={PAYMENT_INFO.bank.qrCodeUrl}
                alt={t("payment.qrCodeAlt")}
                className="w-100 h-80 sm:h-72 object-contain"
              />
            </div>
          )}

          {/* Bank Details */}
          <div className="space-y-3">
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
                className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-gray-700/50 group"
              >
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                    {item.label}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white font-mono">
                    {item.value}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(item.value, item.field)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-600 shadow-sm hover:shadow-md transition-all opacity-0 group-hover:opacity-100"
                  title={t("common.copy")}
                >
                  {copiedField === item.field ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info After Payment */}
        {showContactInfo && (
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
