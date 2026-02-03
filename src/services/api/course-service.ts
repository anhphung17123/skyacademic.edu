// ========================================
// Static Course Service
// ========================================
// Uses mock data directly - no API calls

import { mockCourses } from '../mock/data/Courses';
import { Course } from '@/types';
import { mapCourseDtoToCourse } from '@/mappers/api-mappers';

const processCourses = (): Course[] => {
  return mockCourses.map(mapCourseDtoToCourse);
};

export const courseApi = {
  async fetchCourses(): Promise<Course[]> {
    return processCourses();
  },

  async getCourse(id: string): Promise<Course | null> {
    const dto = mockCourses.find((course) => course.id === id);
    if (!dto) return null;
    return mapCourseDtoToCourse(dto);
  },

  async getCourseBySlug(slug: string): Promise<Course | null> {
    const dto = mockCourses.find((course) => course.slug === slug);
    if (!dto) return null;
    return mapCourseDtoToCourse(dto);
  },
};