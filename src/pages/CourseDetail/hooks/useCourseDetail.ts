import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { courseApi } from '@/services/api/course-service';
import { classroomApi } from '@/services/api/classroom-service';
import { freeVideoApi } from '@/services/api/free-video-service';
import { useDataFetch } from '@/hooks';
import { Course } from '@/types';
import { ClassroomDto, FreeVideoDto } from '@/types/api';

interface CourseDetailData {
  course: Course;
  classrooms: ClassroomDto[];
  videos: FreeVideoDto[];
}

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

export const useCourseDetail = (): UseCourseDetailReturn => {
  const { slug } = useParams<{ slug: string; language: string }>();
  const { t } = useTranslation();
  const [selectedClassroomId, setSelectedClassroomId] = useState<string | null>(null);

  const { data, isLoading, error: fetchError } = useDataFetch<CourseDetailData | null>(
    async () => {
      if (!slug) return null;
      let fullCourse = await courseApi.getCourseBySlug(slug);
      if (!fullCourse) {
        fullCourse = await courseApi.getCourse(slug);
      }
      if (!fullCourse) {
        throw new Error(t('courseDetail.notFound'));
      }
      const courseId = fullCourse.id;
      const [classrooms, videos] = await Promise.all([
        classroomApi.fetchClassrooms({ courseId }),
        freeVideoApi.fetchVideos({ search: courseId }),
      ]);
      return { course: fullCourse, classrooms, videos };
    },
    { immediate: !!slug }
  );

  const course = data?.course ?? null;
  const courseClassrooms = useMemo(
    () =>
      data?.course
        ? (data.classrooms?.filter((c) => c.course_id === data.course.id) ?? [])
        : [],
    [data]
  );

  useEffect(() => {
    if (!selectedClassroomId && courseClassrooms.length > 0) {
      setSelectedClassroomId(courseClassrooms[0].id);
    }
  }, [courseClassrooms, selectedClassroomId]);

  const selectedClassroom = useMemo(
    () => courseClassrooms.find((c) => c.id === selectedClassroomId) ?? null,
    [courseClassrooms, selectedClassroomId]
  );

  const courseFreeVideos = useMemo(
    () =>
      data?.course
        ? (data.videos?.filter((v) => v.course_id === data.course.id) ?? [])
        : [],
    [data]
  );

  const error = fetchError
    ? (fetchError instanceof Error ? fetchError.message : t('courseDetail.loadError'))
    : null;

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
