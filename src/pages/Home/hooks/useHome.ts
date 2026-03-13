import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { courseApi } from '@/services/api/course-service';
import { bookApi } from '@/services/api/book-service';
import { freeVideoApi } from '@/services/api/free-video-service';
import { Course, Book } from '@/types';
import type { FreeVideoDto } from '@/types/api';
import { useDataFetch } from '@/hooks';

const FEATURED_COURSES_COUNT = 4;
const FEATURED_BOOKS_COUNT = 4;
const FEATURED_VIDEOS_COUNT = 4;

interface HomeData {
  courses: Course[];
  books: Book[];
  videos: FreeVideoDto[];
}

export const useHome = () => {
  const { t } = useTranslation();

  const {
    data: homeData,
    isLoading,
    error: fetchError,
  } = useDataFetch<HomeData>(
    async () => {
      const [courses, books, videos] = await Promise.all([
        courseApi.fetchCourses(),
        bookApi.fetchBooks(),
        freeVideoApi.fetchVideos(),
      ]);
      return { courses, books, videos };
    },
    { immediate: true }
  );

  const featuredCourses = useMemo(
    () => (homeData?.courses ?? []).slice(0, FEATURED_COURSES_COUNT),
    [homeData?.courses]
  );

  const featuredBooks = useMemo(
    () => (homeData?.books ?? []).slice(0, FEATURED_BOOKS_COUNT),
    [homeData?.books]
  );

  const featuredVideos = useMemo(
    () => (homeData?.videos ?? []).slice(0, FEATURED_VIDEOS_COUNT),
    [homeData?.videos]
  );

  const featuredVideo = useMemo(
    () => homeData?.videos?.[0] ?? null,
    [homeData?.videos]
  );

  const error = fetchError ? (fetchError.message || t('home.loadError')) : null;

  return {
    featuredCourses,
    featuredBooks,
    featuredVideos,
    featuredVideo,
    isLoading,
    error,
  };
};

