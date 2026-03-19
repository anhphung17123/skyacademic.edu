import { useTranslation } from "react-i18next";
import { BookOpen, Star, Share2, CreditCard, Smartphone, Landmark, MessageCircle, Compass } from "lucide-react";
import { clsx } from "clsx";
import { mockSiteStats } from "@/services/mock/data/SiteStats";
import {
  formatPrice,
  formatApproximateVndFromUsd,
  shouldShowApproxVnd,
} from "@/utils/currency";
import type { Course } from "@/types";
import { CONTACT_INFO } from "@/config/contact.config";

interface CoursePricingSidebarProps {
  course: Course;
  onPaymentDetails: () => void;
  onShare: () => void;
}

export function CoursePricingSidebar({
  course,
  onPaymentDetails,
  onShare,
}: CoursePricingSidebarProps) {
  const { t } = useTranslation();
  const isPaid = course.price > 0;
  const isViewOnly = Boolean(course.viewOnly);

  const paymentMethods = (
    <div className="mb-6">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
        {t("payment.acceptedMethods")}
      </p>
      <div className="flex flex-wrap gap-2">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
          title={t("payment.paypal")}
        >
          <CreditCard className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs font-medium">PayPal</span>
        </span>
        <span
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-pink-50 dark:bg-pink-900/30 border border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300"
          title={t("payment.momo")}
        >
          <Smartphone className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs font-medium">Momo</span>
        </span>
        <span
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
          title={t("payment.bankTransfer")}
        >
          <Landmark className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs font-medium">{t("payment.bankTransfer")}</span>
        </span>
      </div>
    </div>
  );

  return (
    <div
      className={clsx(
        "relative rounded-3xl overflow-hidden border shadow-xl transition-all duration-300 hover:shadow-2xl",
        isPaid
          ? "bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 border-amber-200/60 dark:border-amber-500/30"
          : "bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 border-emerald-200/60 dark:border-emerald-500/30"
      )}
    >
      <div
        className={clsx(
          "absolute top-0 left-0 right-0 h-1.5",
          isPaid
            ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600"
            : "bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600"
        )}
      />
      <div className="p-6 sm:p-8 pt-7">
        {isPaid ? (
          <>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/30">
                <Star className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  {t("courses.price")}
                </p>
                <p className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tabular-nums">
                  {formatPrice(course.price, course.currency || "USD", t('common.free'))}
                </p>
                {shouldShowApproxVnd(course.price, course.currency || "USD") && (
                  <p className="mt-1 text-sm font-semibold text-amber-800/90 dark:text-amber-200/90 tabular-nums">
                    {formatApproximateVndFromUsd(course.price)}
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {t("courseDetail.paidCourseNote")}
            </p>
            {paymentMethods}
            <button
              type="button"
              onClick={onPaymentDetails}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/40 transition-all duration-200 hover:scale-[1.02]"
            >
              <BookOpen className="w-5 h-5" />
              {t("payment.detailsButton")}
            </button>
          </>
        ) : (
          <>
            {isViewOnly && (
              <div className="mb-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                    <Compass className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-200 mb-1">
                      {t("courseDetail.exploreTitle")}
                    </h4>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300/90">
                      {t("courseDetail.exploreDesc")}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400/30">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t("courseDetail.freeCourse")}
                </h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                  {mockSiteStats.freeContentPercent > 0
                  ? t("courseDetail.oneHundredPercentFree", { percent: mockSiteStats.freeContentPercent })
                  : t("courseDetail.free")}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {t("courseDetail.freeCourseDesc")}
            </p>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-4">
              {t("courseDetail.supportByAnyAmount")}
            </p>
            {isViewOnly && (
              <a
                href={CONTACT_INFO.contactFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mb-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {t("courseDetail.leaveAComment")}
              </a>
            )}
            {paymentMethods}
            {course.youtubePlaylistUrl && (
              <a
                href={course.youtubePlaylistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mb-4 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-200 shadow-lg hover:scale-[1.02]"
              >
                <BookOpen className="w-5 h-5" />
                {t("courseDetail.watchOnYouTube")}
              </a>
            )}
            <button
              type="button"
              onClick={onPaymentDetails}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-colors"
            >
              {t("payment.detailsButton")}
            </button>
          </>
        )}
        <button
          type="button"
          onClick={onShare}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          {t("common.share")}
        </button>
      </div>
    </div>
  );
}
