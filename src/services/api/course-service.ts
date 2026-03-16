import { mockCourses } from '../mock/data/Courses';
import { Course } from '@/types';
import { mapCourseDtoToCourse } from '@/mappers/api-mappers';
import { attachInstructor } from './helpers/attach-person';

const processCourses = (): Course[] => {
  return mockCourses.map((dto) => {
    const course = mapCourseDtoToCourse(dto);
    return attachInstructor(course, dto.instructor_id);
  });
};

export const courseApi = {
  async fetchCourses(): Promise<Course[]> {
    return processCourses();
  },

  async fetchAvailableCourses(): Promise<Course[]> {
    return processCourses().filter((c) => !c.viewOnly);
  },

  async getCourse(id: string): Promise<Course | null> {
    const dto = mockCourses.find((course) => course.id === id);
    if (!dto) return null;
    return attachInstructor(mapCourseDtoToCourse(dto), dto.instructor_id);
  },

  async getCourseBySlug(slug: string): Promise<Course | null> {
    const dto = mockCourses.find((course) => course.slug === slug);
    if (!dto) return null;
    return attachInstructor(mapCourseDtoToCourse(dto), dto.instructor_id);
  },
};
