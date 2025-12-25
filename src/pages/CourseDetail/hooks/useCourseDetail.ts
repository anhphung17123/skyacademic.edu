import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { courseApi } from '@/services/api/course-service';
import { classroomApi } from '@/services/api/classroom-service';
import { freeVideoApi } from '@/services/api/free-video-service';
import { Course } from '@/types';
import { ClassroomDto, FreeVideoDto } from '@/types/api';

export const useCourseDetail = () => {
  const { slug } = useParams<{ slug: string; language: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [classrooms, setClassrooms] = useState<ClassroomDto[]>([]);
  const [videos, setVideos] = useState<FreeVideoDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClassroomId, setSelectedClassroomId] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;

    const fetchCourseData = async () => {
      try {
        setIsLoading(true);
        // Try to find course by slug first, then by ID
        let fullCourse = await courseApi.getCourseBySlug(slug);
        if (!fullCourse) {
          fullCourse = await courseApi.getCourse(slug);
        }
        
        const courseId = fullCourse?.id || slug;
        const [courseClassrooms, courseVideos] = await Promise.all([
          classroomApi.fetchClassrooms({ courseId }),
          freeVideoApi.fetchVideos({ search: courseId }),
        ]);
        if (isMounted) {
          setCourse(fullCourse);
          setClassrooms(courseClassrooms);
          setVideos(courseVideos);
          setError(null);
        }
      } catch {
        if (isMounted) {
          setCourse(null);
          setClassrooms([]);
          setVideos([]);
          setError('Course details could not be loaded from the server.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchCourseData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

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

