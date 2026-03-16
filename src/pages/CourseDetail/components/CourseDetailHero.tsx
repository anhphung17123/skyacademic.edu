import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Share2 } from "lucide-react";
import { clsx } from "clsx";
import { Container } from "@/components/layout/Container";
import { CourseHeader } from "./CourseHeader";
import type { Course } from "@/types";

interface CourseDetailHeroProps {
  course: Course;
  error: string | null;
  isLightMode: boolean;
  onShare: () => void;
}

export function CourseDetailHero({
  course,
  error,
  isLightMode,
  onShare,
}: CourseDetailHeroProps) {
  const { t } = useTranslation();

  const isViewOnly = Boolean(course.viewOnly);

  return (
    <div
      className={clsx(
        "relative overflow-hidden",
        isViewOnly
          ? isLightMode
            ? "bg-gradient-to-br from-primary-500 via-secondary-500/90 to-primary-600"
            : "bg-gradient-to-br from-primary-600 via-secondary-600/90 to-primary-700"
          : isLightMode
            ? "bg-gradient-to-br from-primary-500 via-blue-500 to-secondary-500"
            : "bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600"
      )}
    >
      <div className="absolute inset-0">
        <div
          className={
            isLightMode
              ? "absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl animate-pulse-soft"
              : "absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl animate-pulse-soft"
          }
        />
        <div
          className={
            isLightMode
              ? "absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-300/15 rounded-full blur-3xl animate-pulse-soft"
              : "absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-400/8 rounded-full blur-3xl animate-pulse-soft"
          }
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.12] dark:opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />
        {isViewOnly && (
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
              backgroundSize: "32px 32px",
            }}
            aria-hidden
          />
        )}
      </div>

      <div
        className={
          isLightMode
            ? "absolute inset-0 bg-gradient-to-b from-black/15 via-black/8 to-black/5 pointer-events-none z-0"
            : "absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/10 pointer-events-none z-0"
        }
      />

      <Container>
        <div className="py-12 md:py-16 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <Link
              to="/courses"
              className={
                isLightMode
                  ? "inline-flex items-center gap-2 text-white hover:text-white transition-colors group font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
                  : "inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors group drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
              }
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">
                {t("common.backToCourses")}
              </span>
            </Link>
            <button
              type="button"
              onClick={onShare}
              className={clsx(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200",
                "backdrop-blur-sm border shadow-lg",
                isLightMode
                  ? "bg-white/20 border-white/40 text-white hover:bg-white/30 hover:scale-105"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105"
              )}
            >
              <Share2 className="w-4 h-4" />
              {t("common.share")}
            </button>
          </div>
          <CourseHeader course={course} error={error} />
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          className="w-full h-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
            fill="currentColor"
            className="text-gray-50 dark:text-gray-900"
          />
        </svg>
      </div>
    </div>
  );
}
