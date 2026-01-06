import { Course } from '@/types';
import { CourseCard } from '@/components/course/CourseCard';
import { HorizontalScroll } from '@/components/common/HorizontalScroll';
import { useTranslation } from 'react-i18next';
import { LucideIcon } from 'lucide-react';

interface CategoryGroup {
  id: string;
  name: string;
  nameVi: string;
  icon: LucideIcon;
  tagline: string;
  taglineVi: string;
  courses: Course[];
}

interface CourseCategorySectionProps {
  group: CategoryGroup;
  viewMode: 'grid' | 'list';
  currentLang: string;
}

export const CourseCategorySection = ({
  group,
  viewMode,
  currentLang,
}: CourseCategorySectionProps) => {
  const { t } = useTranslation();
  const Icon = group.icon;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl text-white">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {currentLang === 'vi' ? group.nameVi : group.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {currentLang === 'vi' ? group.taglineVi : group.tagline}
          </p>
        </div>
      </div>
      
      {group.courses.length > 0 ? (
        <>
          {/* Mobile and iPad: Horizontal Scroll */}
          <div className="lg:hidden w-full max-w-full overflow-hidden">
            <HorizontalScroll showControls={true} isIconShown={true}>
              {group.courses.map((course) => (
                <div key={course.id} className="w-[280px] sm:w-[300px] md:w-[320px] flex-shrink-0 h-full max-w-[calc(100vw-2rem)]">
                  <CourseCard course={course} />
                </div>
              ))}
            </HorizontalScroll>
          </div>
          
          {/* Desktop: Grid or List View */}
          <div className={viewMode === 'grid' 
            ? 'hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6'
            : 'hidden lg:block lg:space-y-4'
          }>
            {group.courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {t('courses.noCoursesInCategory')}
        </div>
      )}
    </div>
  );
};

