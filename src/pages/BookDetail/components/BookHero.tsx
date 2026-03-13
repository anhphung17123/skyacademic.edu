import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Book, FileText, Globe, Sparkles } from "lucide-react";
import { PriceDisplay } from "@/components/common/PriceDisplay";
import { getBookPreviewImages } from "@/services/mock/data/Books";
import type { BookProduct } from "@/types";

interface BookHeroProps {
  book: BookProduct;
  isLightMode: boolean;
  onPreviewScroll: () => void;
}

export function BookHero({
  book,
  isLightMode,
  onPreviewScroll,
}: BookHeroProps) {
  const { t, i18n } = useTranslation();
  const bookSlug = book.slug ?? "";
  const previewImages = book.previewImages?.[bookSlug]?.length
    ? book.previewImages[bookSlug]
    : getBookPreviewImages(bookSlug);

  const authorName =
    i18n.language === "vi" && book.teacher?.nameVi
      ? book.teacher.nameVi
      : book.teacher?.name ?? book.author;

  const languageLabel =
    book.language === "en"
      ? t("bookDetail.languageEn")
      : book.language === "vi"
        ? t("bookDetail.languageVi")
        : book.language === "bilingual"
          ? t("bookDetail.languageBilingual")
          : t("bookDetail.languageEn");

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(to right, var(--page-accent-start) 0%, var(--page-primary) 50%, var(--page-secondary) 100%)`,
      }}
    >
      <div
        className={
          isLightMode
            ? "absolute inset-0 bg-gradient-to-b from-black/5 via-black/2 to-transparent pointer-events-none z-0"
            : "absolute inset-0 bg-gradient-to-b from-black/15 via-black/8 to-transparent pointer-events-none z-0"
        }
      />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/15 rounded-full blur-3xl animate-pulse-soft" />
        <div
          className={
            isLightMode
              ? "absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-400/25 rounded-full blur-2xl animate-float"
              : "absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-300/30 rounded-full blur-2xl animate-float"
          }
        />
      </div>

      <div className="relative z-10 py-4 md:py-6">
        <div className="container-custom">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-white hover:text-white transition-colors mb-3 group font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">
              {t("common.backToProducts")}
            </span>
          </Link>

          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center lg:justify-between">
            <div className="relative w-full lg:w-64 xl:w-72 flex-shrink-0 group lg:mr-8">
              <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-black/15 bg-white">
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-full h-auto aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                {book.format && (
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-white/95 text-orange-600 text-xs font-bold shadow-sm flex items-center gap-1.5">
                    <Book className="w-3.5 h-3.5" />
                    {book.format === "physical"
                      ? t("bookDetail.format")
                      : book.format === "digital"
                        ? t("bookDetail.formatDigital")
                        : t("bookDetail.format")}
                  </div>
                )}
              </div>
              {previewImages.length > 0 && (
                <button
                  onClick={onPreviewScroll}
                  className="absolute w-max -bottom-2.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white dark:bg-gray-100 text-orange-600 dark:text-orange-700 font-semibold shadow-md dark:shadow-2xl hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(251,146,60,0.3)] hover:-translate-y-1 transition-all flex items-center gap-2 hover:scale-105"
                >
                  <FileText className="w-4 h-4" />
                  {t("bookDetail.preview")}
                </button>
              )}
            </div>

            <div className="flex-1 text-white pt-1 lg:pt-0 lg:flex lg:flex-col lg:justify-center">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span
                  className={
                    isLightMode
                      ? "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-500/80 backdrop-blur-md text-yellow-950 text-sm font-bold border-2 border-yellow-600 shadow-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                      : "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-500/75 backdrop-blur-md text-yellow-900 text-sm font-bold border-2 border-yellow-400 shadow-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                  }
                >
                  <Sparkles className="w-4 h-4" />
                  {t("bookDetail.bestseller")}
                </span>
                <span
                  className={
                    isLightMode
                      ? "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-600/50 backdrop-blur-md text-white text-sm font-bold border-2 border-orange-700/90 shadow-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
                      : "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-600/60 backdrop-blur-md text-white text-sm font-bold border-2 border-orange-500/80 shadow-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
                  }
                >
                  {t("bookDetail.newEdition")}
                </span>
              </div>

              <h1
                className={
                  isLightMode
                    ? "text-2xl lg:text-4xl xl:text-5xl font-bold mb-2 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
                    : "text-2xl lg:text-4xl xl:text-5xl font-bold mb-2 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                }
              >
                {book.title}
              </h1>

              <div
                className={
                  isLightMode
                    ? "flex items-center gap-3 mb-3 text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                    : "flex items-center gap-3 mb-3 text-white font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
                }
              >
                {book.teacher ? (
                  <>
                    <img
                      src={book.teacher.imageUrl}
                      alt={book.teacher.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/40 flex-shrink-0"
                    />
                    <span className="text-base lg:text-lg">
                      <span className="font-medium">{t("books.by")}</span>{" "}
                      <span className="font-semibold">{authorName}</span>
                    </span>
                  </>
                ) : (
                  <span className="text-base lg:text-lg">
                    <span className="font-medium">{t("books.by")}</span>{" "}
                    <span className="font-semibold">{book.author}</span>
                  </span>
                )}
              </div>

              <div className="mb-4">
                <PriceDisplay
                  price={book.price}
                  currency={book.currency}
                  variant="large"
                  showLabel={true}
                />
              </div>

              <div className="flex flex-wrap gap-4 text-sm lg:text-base">
                {book.language && (
                  <div
                    className={
                      isLightMode
                        ? "flex items-center gap-2 text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                        : "flex items-center gap-2 text-white font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
                    }
                  >
                    <Globe className="w-4 h-4" />
                    <span>{languageLabel}</span>
                  </div>
                )}
                {book.pages && book.pages > 0 && (
                  <div
                    className={
                      isLightMode
                        ? "flex items-center gap-2 text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                        : "flex items-center gap-2 text-white font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
                    }
                  >
                    <FileText className="w-4 h-4" />
                    <span>
                      {book.pages} {t("bookDetail.pages")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24">
          <path
            fill="currentColor"
            className="text-gray-50 dark:text-gray-900"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </div>
  );
}
