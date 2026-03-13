import { memo } from 'react';
import { Star, Users, Clock, Play, BookOpen, Award, ArrowRight } from 'lucide-react';
import { Course } from '@/types';
import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { getCourseUrl, getLocalizedText } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_VALUES } from '@/constants';
import { PriceDisplay } from '@/components/common/PriceDisplay';

interface CourseCardProps {
  course: Course;
}

const LEVEL_COLORS: Record<string, string> = {
  Beginner: 'bg-success/10 text-success dark:bg-success-dark/20 dark:text-success-dark',
  Intermediate: 'bg-accent-primary/10 text-accent-primary dark:bg-accent-primary-dark/20 dark:text-accent-primary-dark',
  Advanced: 'bg-accent-secondary/10 text-accent-secondary dark:bg-accent-secondary-dark/20 dark:text-accent-secondary-dark',
  'All Levels': 'bg-elevated text-text-secondary dark:bg-elevated-dark dark:text-text-secondary-dark',
} as const;

export const CourseCard = memo(({ course }: CourseCardProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language;

  const title = getLocalizedText(currentLang, course.title, course.titleEn, course.titleVi);
  const description = getLocalizedText(
    currentLang,
    course.description,
    course.descriptionEn,
    course.descriptionVi
  );
  const category = getLocalizedText(currentLang, course.category || '', undefined, course.categoryVi);
  const courseUrl = getCourseUrl(course);

  const handleCardClick = (): void => {
    navigate(courseUrl);
  };

  return (
    <div className="group relative card-light rounded-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 h-full flex flex-col">
      {/* Image container */}
      <div className="relative aspect-video overflow-hidden flex-shrink-0">
        <img
          src={course.thumbnail || DEFAULT_VALUES.THUMBNAIL}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Play button overlay */}
        {course.youtubePlaylistUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl dark:shadow-2xl hover:scale-110 transition-transform">
              <Play className="w-7 h-7 text-primary-600 ml-1" fill="currentColor" />
            </button>
          </div>
        )}
        
        {/* Featured badge */}
        {course.isFeatured && (
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md dark:shadow-lg flex items-center gap-1">
              <Award className="w-3 h-3" />
              {t('courses.featured')}
            </div>
          </div>
        )}
        
        {/* Bottom info bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-white text-sm">
            <BookOpen className="w-4 h-4" />
            <span>{course.lessonsCount || 12} {t('courses.lessons')}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-sm font-medium">{(course.rating ?? 4.8).toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {category && (
            <span className="px-2.5 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-full border border-primary-200/60 dark:border-primary-700/40">
              {category}
            </span>
          )}
          <span
            className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
              course.levelsLabel
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-700/40'
                : LEVEL_COLORS[course.level] || LEVEL_COLORS['All Levels']
            }`}
          >
            {course.levelsLabel ? t('courses.threeLevels') : t(`courses.${course.level}`)}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-base font-bold text-gray-800 dark:text-gray-100 mb-2.5 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors cursor-pointer leading-snug min-h-[2.75rem] flex-shrink-0"
          onClick={handleCardClick}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed flex-shrink-0">
          {description}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200/80 dark:border-gray-700/80 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary-500" />
            <span>{(course.students ?? 0).toLocaleString()} {t('courses.students')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-secondary-500" />
            <span>{course.duration === 'Self-paced' ? t('courses.durationLabel') : (course.duration ?? t('courses.durationLabel'))}</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between mt-auto flex-shrink-0">
          <PriceDisplay
            price={course.price}
            currency={course.currency}
            variant="small"
            showLabel={false}
          />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCardClick}
            className="!px-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={t('courses.viewCourse')}
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-400/50 transition-colors pointer-events-none" />
    </div>
  );
});

CourseCard.displayName = 'CourseCard';
