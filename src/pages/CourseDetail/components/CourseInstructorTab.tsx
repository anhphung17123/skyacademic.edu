import { useTranslation } from "react-i18next";
import { Award, Star } from "lucide-react";
import { getDefaultTeacher } from "@/services/mock/data/Teachers";
import type { Course } from "@/types";

interface CourseInstructorTabProps {
  course: Course;
}

export function CourseInstructorTab({ course }: CourseInstructorTabProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const instructor = course.instructor ?? getDefaultTeacher();

  if (!instructor) return null;

  const name =
    currentLang === "vi" && instructor.nameVi
      ? instructor.nameVi
      : instructor.name;
  const role =
    currentLang === "vi" && instructor.roleVi
      ? instructor.roleVi
      : instructor.role;
  const bio =
    currentLang === "vi" && instructor.bioVi ? instructor.bioVi : instructor.bio;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/30 to-cyan-100/30 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-xl transform hover:scale-110 transition-transform duration-300">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("courseDetail.instructorTitle")}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
              {t("courseDetail.instructorSubtitle")}
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl p-8 border border-blue-100 dark:border-blue-800 shadow-inner">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <img
                src={instructor.imageUrl}
                alt={instructor.name}
                className="w-24 h-24 rounded-2xl object-cover shadow-lg flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-bold mb-4 text-xl">
                  {role}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {bio}
                </p>
              </div>
            </div>
            {instructor.credentials && instructor.credentials.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-blue-200 dark:border-blue-700">
                {instructor.credentials.map((cred, idx) => {
                  const Icon = idx === 1 ? Star : Award;
                  const label =
                    currentLang === "vi" && cred.textVi
                      ? cred.textVi
                      : cred.text;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600"
                    >
                      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
