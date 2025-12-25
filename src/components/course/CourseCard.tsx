import { Star, Users, Clock, Play, BookOpen, Award, ArrowRight } from 'lucide-react';
import { Course } from '../../types';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/utils/currency';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language;

  const title = currentLang === 'vi' && course.titleVi ? course.titleVi : course.title;
  const description =
    currentLang === 'vi' && course.descriptionVi ? course.descriptionVi : course.description;

  const levelColors: Record<string, string> = {
    'Beginner': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Intermediate': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Advanced': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'All Levels': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:-translate-y-2">
      {/* Image container */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.thumbnail || 'https://via.placeholder.com/640x360?text=Course'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Play button overlay */}
        {course.trailerUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
              <Play className="w-7 h-7 text-primary-600 ml-1" fill="currentColor" />
            </button>
          </div>
        )}
        
        {/* Featured badge */}
        {course.isFeatured && (
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
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
      <div className="p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2.5 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full">
            {currentLang === 'vi' && course.categoryVi ? course.categoryVi : course.category}
          </span>
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${levelColors[course.level] || levelColors['All Levels']}`}>
            {t(`courses.${course.level}`)}
          </span>
        </div>

        {/* Title */}
        <h3 
          className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors cursor-pointer"
          onClick={() => {
            const lang = course.language === 'bilingual' ? 'bilingual' : course.language === 'vi' ? 'vietnamese' : 'english';
            navigate(`/courses/${lang}/${course.slug || course.id}`);
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
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
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {course.price === 0 ? (
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {t('courses.free')}
              </span>
            ) : (
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  {formatPrice(course.price, course.currency || 'USD')}
                </span>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              const lang = course.language === 'bilingual' ? 'bilingual' : course.language === 'vi' ? 'vietnamese' : 'english';
              navigate(`/courses/${lang}/${course.slug || course.id}`);
            }}
            className="!px-3 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-400/50 transition-colors pointer-events-none" />
    </div>
  );
};
