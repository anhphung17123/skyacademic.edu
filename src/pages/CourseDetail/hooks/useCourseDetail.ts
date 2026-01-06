import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { courseApi } from '@/services/api/course-service';
import { classroomApi } from '@/services/api/classroom-service';
import { freeVideoApi } from '@/services/api/free-video-service';
import { Course } from '@/types';
import { ClassroomDto, FreeVideoDto } from '@/types/api';

interface UseCourseDetailReturn {
  course: Course | null;
  courseClassrooms: ClassroomDto[];
  selectedClassroomId: string | null;
  setSelectedClassroomId: (id: string | null) => void;
  selectedClassroom: ClassroomDto | null;
  courseFreeVideos: FreeVideoDto[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for fetching and managing course detail data
 * @returns Course detail data and state management functions
 */
export const useCourseDetail = (): UseCourseDetailReturn => {
  const { slug } = useParams<{ slug: string; language: string }>();
  const { t } = useTranslation();
  const [course, setCourse] = useState<Course | null>(null);
  const [classrooms, setClassrooms] = useState<ClassroomDto[]>([]);
  const [videos, setVideos] = useState<FreeVideoDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClassroomId, setSelectedClassroomId] = useState<string | null>(null);

  const fetchCourseData = useCallback(async () => {
    if (!slug) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Try to find course by slug first, then by ID
      let fullCourse = await courseApi.getCourseBySlug(slug);
      if (!fullCourse) {
        fullCourse = await courseApi.getCourse(slug);
      }

      if (!fullCourse) {
        setError(t('courseDetail.notFound'));
        setIsLoading(false);
        return;
      }

      const courseId = fullCourse.id;
      const [courseClassrooms, courseVideos] = await Promise.all([
        classroomApi.fetchClassrooms({ courseId }),
        freeVideoApi.fetchVideos({ search: courseId }),
      ]);

      setCourse(fullCourse);
      setClassrooms(courseClassrooms);
      setVideos(courseVideos);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : t('courseDetail.loadError');
      setError(errorMessage);
      setCourse(null);
      setClassrooms([]);
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  }, [slug, t]);

  useEffect(() => {
    void fetchCourseData();
  }, [fetchCourseData]);

  const courseClassrooms = useMemo(
    () => (course ? classrooms.filter((classroom) => classroom.course_id === course.id) : []),
    [classrooms, course]
  );

  useEffect(() => {
    if (!selectedClassroomId && courseClassrooms.length > 0) {
      setSelectedClassroomId(courseClassrooms[0].id);
    }
  }, [courseClassrooms, selectedClassroomId]);

  const selectedClassroom = useMemo(
    () => courseClassrooms.find((classroom) => classroom.id === selectedClassroomId) ?? null,
    [courseClassrooms, selectedClassroomId]
  );

  const courseFreeVideos = useMemo(
    () => (course ? videos.filter((video) => video.course_id === course.id) : []),
    [course, videos]
  );

  return {
    course,
    courseClassrooms,
    selectedClassroomId,
    setSelectedClassroomId,
    selectedClassroom,
    courseFreeVideos,
    isLoading,
    error,
  };
};

