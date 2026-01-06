/**
 * Course-related utility functions
 */

import type { Course, Language } from '@/types';

/**
 * Get course navigation language parameter
 * Maps UI language to route parameter
 * @param language - Course language
 * @returns Route language parameter
 */
export const getCourseRouteLanguage = (language?: Language): string => {
  if (!language || language === 'bilingual') {
    return 'bilingual';
  }
  return language === 'vi' ? 'vietnamese' : 'english';
};

/**
 * Get course URL path
 * @param course - Course object
 * @returns Course detail URL
 */
export const getCourseUrl = (course: Course): string => {
  const lang = getCourseRouteLanguage(course.language);
  return `/courses/${lang}/${course.slug || course.id}`;
};

