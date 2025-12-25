import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { courseApi } from '@/services/api/course-service';
import { bookApi } from '@/services/api/book-service';
import { Course, Book } from '@/types';

export const useHome = () => {
  const { t } = useTranslation();
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [popularBooks, setPopularBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const [courses, books] = await Promise.all([courseApi.fetchCourses(), bookApi.fetchBooks()]);

        if (isMounted) {
          setFeaturedCourses(courses.slice(0, 3));
          setPopularBooks(books.slice(0, 3));
          setError(null);
        }
      } catch {
        if (isMounted) {
          setError(t('home.loadError'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    featuredCourses,
    popularBooks,
    isLoading,
    error,
  };
};

