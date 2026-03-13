import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CourseCard } from '@/components/course/CourseCard';
import { courseApi } from '@/services/api/course-service';
import { Course } from '@/types';
import { useFeaturedData } from '@/hooks';
import { CardSkeleton, GridSkeleton } from '@/components/common/Skeleton';
import { ResponsiveGrid } from '@/components/common/ResponsiveGrid';

const FEATURED_COUNT = 4;

interface FeaturedCoursesSectionProps {
  /** When provided (e.g. from Home useHome), no fetch is performed */
  courses?: Course[];
}

export const FeaturedCoursesSection = ({ courses: coursesProp }: FeaturedCoursesSectionProps = {}) => {
  const { t } = useTranslation();
  const { data: courses, isLoading } = useFeaturedData(courseApi.fetchCourses, {
    initialData: coursesProp,
    count: FEATURED_COUNT,
  });

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-950">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              {t('home.featuredLabel')}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-3">
              {t('home.featuredCourses')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 w-full lg:max-w-xl">
              {t('home.featuredSubtitle')}
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all self-start lg:self-auto"
          >
            {t('courses.viewAll')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Courses Grid - Single Row with Horizontal Scroll on Mobile/iPad */}
        {isLoading ? (
          <GridSkeleton count={4}>
            <CardSkeleton variant="course" />
          </GridSkeleton>
        ) : (
          <ResponsiveGrid>
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </ResponsiveGrid>
        )}

        {/* View All Button - Mobile */}
        <div className="mt-10 text-center md:hidden">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-primary-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary-700 transition-colors"
          >
            {t('courses.viewAll')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
