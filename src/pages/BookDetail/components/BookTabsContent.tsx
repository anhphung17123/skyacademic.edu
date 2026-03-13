import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { ContactInfo } from "@/components/common/ContactInfo";
import type { BookProduct } from "@/types";

export type BookTabId = "description" | "details" | "reviews";

interface BookTabsContentProps {
  book: BookProduct;
  activeTab: BookTabId;
  onTabChange: (tab: BookTabId) => void;
}

export function BookTabsContent({
  book,
  activeTab,
  onTabChange,
}: BookTabsContentProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const description =
    currentLang === "vi" && book.descriptionVi
      ? book.descriptionVi
      : currentLang === "en" && book.descriptionEn
        ? book.descriptionEn
        : book.description;

  const detailsRows = [
    book.isbn && { label: t("bookDetail.isbn"), value: book.isbn },
    book.publisher && {
      label: t("bookDetail.publisher"),
      value: book.publisher,
    },
    book.language && {
      label: t("bookDetail.language"),
      value:
        book.language === "en"
          ? t("bookDetail.languageEn")
          : book.language === "vi"
            ? t("bookDetail.languageVi")
            : book.language === "bilingual"
              ? t("bookDetail.languageBilingual")
              : t("bookDetail.languageEn"),
    },
    book.pages &&
      book.pages > 0 && {
        label: t("bookDetail.pages"),
        value: book.pages.toString(),
      },
    book.format && {
      label: t("bookDetail.format"),
      value:
        book.format === "physical"
          ? t("bookDetail.format")
          : book.format === "digital"
            ? t("bookDetail.formatDigital")
            : t("bookDetail.formatBoth"),
    },
    (book.publishedDate || book.publishedDateVi) && {
      label: t("bookDetail.publishDate"),
      value:
        currentLang === "vi"
          ? book.publishedDateVi || book.publishedDate || ""
          : book.publishedDate || book.publishedDateVi || "",
    },
  ].filter(
    (item): item is { label: string; value: string } => Boolean(item)
  );

  const tabs: { id: BookTabId; label: string }[] = [
    { id: "description", label: t("bookDetail.tabDescription") },
    { id: "details", label: t("bookDetail.tabDetails") },
    { id: "reviews", label: t("bookDetail.tabReviews") },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-600 overflow-hidden">
      <div className="flex border-b border-gray-100 dark:border-gray-600">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-6 py-4 font-medium transition-all ${
              activeTab === tab.id
                ? "text-orange-600 dark:text-orange-300 border-b-2 border-orange-600 dark:border-orange-400 bg-orange-50/50 dark:bg-orange-900/30"
                : "text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "description" && (
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-base">
              {description}
            </p>
          </div>
        )}

        {activeTab === "details" && (
          <div className="space-y-4">
            {detailsRows.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-600 last:border-0"
              >
                <span className="text-gray-500 dark:text-gray-300">
                  {item.label}
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mb-4 shadow-lg">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t("bookDetail.feedbackTitle")}
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-1">
                {t("bookDetail.feedbackDescription")}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("bookDetail.feedbackSubtitle")}
              </p>
            </div>
            <ContactInfo variant="default" />
          </div>
        )}
      </div>
    </div>
  );
}
