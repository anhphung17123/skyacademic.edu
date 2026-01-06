import { useTranslation } from 'react-i18next';
import {
  Clock,
  Award,
  BarChart3,
  Play,
} from 'lucide-react';
import { Course } from '@/types';
import { useTheme } from '@/contexts/theme-context';
import { clsx } from 'clsx';
import { PriceDisplay } from '@/components/common/PriceDisplay';

interface CourseHeaderProps {
  course: Course;
  error: string | null;
}

export const CourseHeader = ({ course, error }: CourseHeaderProps) => {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  const isLightMode = resolvedTheme === "light";
  const currentLang = i18n.language;

  const title = currentLang === 'vi' && course.titleVi ? course.titleVi : course.title;
  const description = currentLang === 'vi' && course.descriptionVi ? course.descriptionVi : course.description;
  const category = currentLang === 'vi' && course.categoryVi ? course.categoryVi : course.category;

  const levelColors: Record<string, { bg: string; text: string }> = {
    beginner: { bg: 'bg-green-200 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-300' },
    intermediate: { bg: 'bg-blue-200 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-300' },
    advanced: { bg: 'bg-purple-200 dark:bg-purple-900/30', text: 'text-purple-800 dark:text-purple-300' },
  };

  const levelStyle = levelColors[course.level] || levelColors.beginner;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
      {/* Course Thumbnail */}
      <div className="relative w-full lg:w-96 flex-shrink-0 group">
        <div className={isLightMode
          ? "relative rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/20"
          : "relative rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/20"
        }>
          <img
            src={course.thumbnail}
            alt={title}
            className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className={isLightMode
              ? "p-4 rounded-full bg-white/95 text-primary-600 shadow-xl hover:scale-110 transition-transform"
              : "p-4 rounded-full bg-white/95 text-primary-600 shadow-2xl hover:scale-110 transition-transform"
            }>
              <Play className="w-8 h-8 fill-current" />
            </button>
          </div>
          
          {/* Level Badge */}
          <div className="absolute top-4 left-4">
            <span className={clsx(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm",
              levelStyle.bg,
              levelStyle.text,
              isLightMode ? "shadow-md" : "shadow-lg"
            )}>
              <BarChart3 className="w-3.5 h-3.5" />
              {t(`courses.${course.level}`)}
            </span>
          </div>

          {/* Duration Badge */}
          {course.duration && (
            <div className={isLightMode
              ? "absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-sm text-white text-sm font-semibold shadow-md drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
              : "absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-sm font-medium shadow-lg"
            }>
              <Clock className="w-4 h-4" />
              <span>
                {course.duration === 'Self-paced' ? t('courses.durationLabel') : course.duration}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Course Info */}
      <div className="flex-1 text-white space-y-5">
        {/* Category */}
        {category && (
          <div className={isLightMode
            ? "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 text-white text-sm font-semibold shadow-md drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
            : "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm font-medium shadow-lg"
          }>
            {category}
          </div>
        )}

        {/* Title */}
        <div className="mb-5">
          <h1 className={isLightMode
            ? "text-3xl lg:text-4xl font-bold mb-3 leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            : "text-3xl lg:text-4xl font-bold mb-3 leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          }>
            {title}
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-sm" />
        </div>

        {/* Description */}
        <p className={isLightMode
          ? "text-white text-base lg:text-lg leading-relaxed max-w-2xl mb-6 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
          : "text-white/95 text-base lg:text-lg leading-relaxed max-w-2xl mb-7 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
        }>
          {description}
        </p>

        {/* Price */}
        <div className="mt-6">
          <PriceDisplay
            price={course.price}
            currency={course.currency}
            variant="large"
            showLabel={true}
          />
        </div>

        {/* Instructor */}
        <div className={isLightMode
          ? "flex items-center gap-4 pt-4 border-t border-white/40"
          : "flex items-center gap-4 pt-5 border-t border-white/30"
        }>
          <div className={isLightMode
            ? "w-11 h-11 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center shadow-xl border-2 border-white/30"
            : "w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center shadow-xl border-2 border-white/20"
          }>
            <Award className={isLightMode ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
          </div>
          <div>
            <p className={isLightMode
              ? "text-white text-xs font-semibold mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
              : "text-white/90 text-xs font-semibold mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
            }>
              {t('courseDetail.createdBy')}
            </p>
            <p className={isLightMode
              ? "text-white font-bold text-base drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
              : "text-white font-bold text-base drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
            }>{t('courseDetail.instructorName')}</p>
            <p className={isLightMode
              ? "text-white text-xs font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
              : "text-white/90 text-xs font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
            }>{t('courseDetail.instructorRole')}</p>
          </div>
        </div>

        {error && (
          <div className={isLightMode
            ? "p-4 rounded-xl bg-yellow-500/30 backdrop-blur-sm border border-yellow-500/50 shadow-md"
            : "p-4 rounded-xl bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30"
          }>
            <p className={isLightMode
              ? "text-sm text-yellow-900 font-semibold drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]"
              : "text-sm text-yellow-200 font-medium"
            }>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
