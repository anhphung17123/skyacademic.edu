import { useTranslation } from "react-i18next";
import { BookOpen, CheckCircle2, Globe, Users, Clock } from "lucide-react";
import { FreeVideosSection } from "./FreeVideosSection";
import type { Course } from "@/types";
import type { FreeVideoDto } from "@/types/api";

interface CourseOverviewTabProps {
  course: Course;
  courseFreeVideos: FreeVideoDto[] | null;
}

const GET_ITEMS = [
  { icon: BookOpen, key: "courseDetail.getMaterials" as const },
  { icon: Users, key: "courseDetail.getSupport" as const },
  { icon: Globe, key: "courseDetail.getBilingual" as const },
  { icon: Clock, key: "courseDetail.getFlexible" as const },
];

export function CourseOverviewTab({
  course,
  courseFreeVideos,
}: CourseOverviewTabProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const description =
    currentLang === "vi" && course.descriptionVi
      ? course.descriptionVi
      : currentLang === "en" && course.descriptionEn
        ? course.descriptionEn
        : course.description;

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100/30 to-secondary-100/30 dark:from-primary-900/10 dark:to-secondary-900/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 text-white shadow-xl transform hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t("courseDetail.descriptionTitle")}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                {t("courseDetail.descriptionSubtitle")}
              </p>
            </div>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {course.levelsLabel && (
              <p className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-4">
                {t("courseDetail.levelsIncluded", { count: 3 })}
              </p>
            )}
            <div className="bg-gradient-to-r from-primary-50/80 to-secondary-50/80 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-6 md:p-8 border-l-4 border-primary-600 dark:border-primary-400 shadow-lg">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base whitespace-pre-line">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-100/30 to-emerald-100/30 dark:from-green-900/10 dark:to-emerald-900/10 rounded-full blur-3xl -ml-32 -mb-32" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl transform hover:scale-110 transition-transform duration-300">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t("courseDetail.whatYouGet")}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                {t("courseDetail.whatYouGetSubtitle")}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {GET_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-700/30 hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-300 group border border-gray-200/50 dark:border-gray-600/50 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-lg"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-semibold text-base group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {t(item.key)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {courseFreeVideos && courseFreeVideos.length > 0 && (
        <FreeVideosSection courseFreeVideos={courseFreeVideos} />
      )}
    </>
  );
}
