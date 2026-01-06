import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CourseCard } from '@/components/course/CourseCard';
import { useEffect, useState } from 'react';
import { courseApi } from '@/services/api/course-service';
import { Course } from '@/types';
import { HorizontalScroll } from '@/components/common/HorizontalScroll';

export const FeaturedCoursesSection = () => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        const data = await courseApi.fetchCourses();
        if (isMounted) {
          // Get first 4 courses for featured section (1 row)
          setCourses(data.slice(0, 4));
        }
      } catch {
        // Fail silently
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

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
          <>
            <div className="hidden lg:grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
                  <div className="p-5 space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
            <HorizontalScroll className="lg:hidden">
              <div className="w-4 md:w-6 flex-shrink-0" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-[280px] sm:w-[320px] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
                  <div className="p-5 space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </HorizontalScroll>
          </>
        ) : (
          <>
            <div className="hidden lg:grid grid-cols-4 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            <HorizontalScroll className="lg:hidden">
              <div className="w-4 md:w-6 flex-shrink-0" />
              {courses.map((course) => (
                <div key={course.id} className="w-[280px] sm:w-[320px]">
                  <CourseCard course={course} />
                </div>
              ))}
            </HorizontalScroll>
          </>
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
