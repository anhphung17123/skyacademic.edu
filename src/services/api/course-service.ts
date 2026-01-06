// ========================================
// Static Course Service
// ========================================
// Uses mock data directly - no API calls
// Cached in localStorage for instant loading

import { mockCourses } from '../mock/data/Courses';
import { Course } from '@/types';
import { mapCourseDtoToCourse } from '@/mappers/api-mappers';
import { getCachedData, setCachedData } from '@/utils/cache';

const CACHE_KEY_COURSES = 'skyacademy_courses_cache';
const CACHE_KEY_COURSE_PREFIX = 'skyacademy_course_';

const processCourses = (): Course[] => {
  return mockCourses.map(mapCourseDtoToCourse);
};

export const courseApi = {
  async fetchCourses(): Promise<Course[]> {
    // Check cache first
    const cached = getCachedData<Course[]>(CACHE_KEY_COURSES);
    if (cached) {
      return cached;
    }

    // Process and cache
    const courses = processCourses();
    setCachedData(CACHE_KEY_COURSES, courses);
    return courses;
  },

  async getCourse(id: string): Promise<Course | null> {
    // Check cache first
    const cacheKey = `${CACHE_KEY_COURSE_PREFIX}${id}`;
    const cached = getCachedData<Course>(cacheKey);
    if (cached) {
      return cached;
    }

    // Find and cache
    const dto = mockCourses.find((course) => course.id === id);
    if (!dto) return null;

    const course = mapCourseDtoToCourse(dto);
    setCachedData(cacheKey, course);
    return course;
  },

  async getCourseBySlug(slug: string): Promise<Course | null> {
    // Check cache first
    const cacheKey = `${CACHE_KEY_COURSE_PREFIX}slug_${slug}`;
    const cached = getCachedData<Course>(cacheKey);
    if (cached) {
      return cached;
    }

    // Find and cache
    const dto = mockCourses.find((course) => course.slug === slug);
    if (!dto) return null;

    const course = mapCourseDtoToCourse(dto);
    setCachedData(cacheKey, course);
    return course;
  },
};