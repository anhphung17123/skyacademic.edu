// ========================================
// Static Course Service
// ========================================
// Uses mock data directly - no API calls

import { mockCourses } from '../mock/data/Courses';
import { Course } from '@/types';
import { mapCourseDtoToCourse } from '@/mappers/api-mappers';

// Simulate async behavior
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const courseApi = {
  async fetchCourses(): Promise<Course[]> {
    await delay(300);
    return mockCourses.map(mapCourseDtoToCourse);
  },

  async getCourse(id: string): Promise<Course | null> {
    await delay(200);
    const dto = mockCourses.find(course => course.id === id);
    return dto ? mapCourseDtoToCourse(dto) : null;
  },

  async getCourseBySlug(slug: string): Promise<Course | null> {
    await delay(200);
    const dto = mockCourses.find(course => course.slug === slug);
    return dto ? mapCourseDtoToCourse(dto) : null;
  },
};