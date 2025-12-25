import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/utils/currency';
import {
  Clock,
  Award,
  BarChart3,
  Play,
} from 'lucide-react';
import { Course } from '@/types';

interface CourseHeaderProps {
  course: Course;
  error: string | null;
}

export const CourseHeader = ({ course, error }: CourseHeaderProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const title = currentLang === 'vi' && course.titleVi ? course.titleVi : course.title;
  const description = currentLang === 'vi' && course.descriptionVi ? course.descriptionVi : course.description;
  const category = currentLang === 'vi' && course.categoryVi ? course.categoryVi : course.category;

  const levelColors: Record<string, { bg: string; text: string }> = {
    beginner: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300' },
    intermediate: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300' },
    advanced: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300' },
  };

  const levelStyle = levelColors[course.level] || levelColors.beginner;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
      {/* Course Thumbnail */}
      <div className="relative w-full lg:w-96 flex-shrink-0 group">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/20">
          <img
            src={course.thumbnail}
            alt={title}
            className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-4 rounded-full bg-white/95 text-primary-600 shadow-2xl hover:scale-110 transition-transform">
              <Play className="w-8 h-8 fill-current" />
            </button>
          </div>
          
          {/* Level Badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${levelStyle.bg} ${levelStyle.text} shadow-lg backdrop-blur-sm`}>
              <BarChart3 className="w-3.5 h-3.5" />
              {t(`courses.${course.level}`)}
            </span>
          </div>

          {/* Duration Badge */}
          {course.duration && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-sm font-medium shadow-lg">
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-sm font-medium">
            {category}
          </div>
        )}

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {title}
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" />
        </div>

        {/* Description */}
        <p className="text-white/90 text-lg lg:text-xl leading-relaxed max-w-2xl mb-8">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-4 mt-8">
          {course.price > 0 ? (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  {formatPrice(course.price, course.currency || 'USD')}
                </span>
                <span className="text-2xl text-yellow-300">+</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/80 text-sm font-medium">
                  {t('courseDetail.startingPrice')}
                </span>
                <span className="text-white/60 text-xs">
                  {t('courseDetail.payWhatYouWish')}
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-200 via-green-300 to-green-400 bg-clip-text text-transparent leading-[1.1] pt-1">
                {t('courseDetail.free')}
              </span>
              <span className="px-3 py-1 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-sm font-medium text-green-200">
                {t('courseDetail.oneHundredPercentFree')}
              </span>
            </div>
          )}
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/20">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center shadow-lg">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white/70 text-xs font-medium mb-0.5">
              {t('courseDetail.createdBy')}
            </p>
            <p className="text-white font-bold text-lg">{t('courseDetail.instructorName')}</p>
            <p className="text-white/80 text-sm">{t('courseDetail.instructorRole')}</p>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30">
            <p className="text-sm text-yellow-200 font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
