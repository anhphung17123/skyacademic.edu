import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { courseApi } from '@/services/api/course-service';
import { bookApi } from '@/services/api/book-service';
import { Course, Book } from '@/types';
import { useDataFetch } from '@/hooks';

interface HomeData {
  courses: Course[];
  books: Book[];
}

export const useHome = () => {
  const { t } = useTranslation();

  const {
    data: homeData,
    isLoading,
    error: fetchError,
  } = useDataFetch<HomeData>(
    async () => {
      const [courses, books] = await Promise.all([
        courseApi.fetchCourses(),
        bookApi.fetchBooks(),
      ]);
      return { courses, books };
    },
    {
      immediate: true,
      onError: (err) => {
        console.error('Failed to fetch home content:', err);
      },
    }
  );

  const featuredCourses = useMemo(
    () => homeData?.courses.slice(0, 3) ?? [],
    [homeData?.courses]
  );

  const popularBooks = useMemo(
    () => homeData?.books.slice(0, 3) ?? [],
    [homeData?.books]
  );

  const error = fetchError ? (fetchError.message || t('home.loadError')) : null;

  return {
    featuredCourses,
    popularBooks,
    isLoading,
    error,
  };
};

