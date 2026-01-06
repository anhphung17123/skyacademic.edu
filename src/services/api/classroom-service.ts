// ========================================
// Static Classroom Service
// ========================================
// Uses mock data directly - no API calls
// Cached in localStorage for instant loading

import { mockClassrooms } from '../mock/data/Classrooms';
import { ClassroomDto } from '@/types/api/classroom';
import { getCachedData, setCachedData } from '@/utils/cache';

const CACHE_KEY_CLASSROOMS = 'skyacademy_classrooms_cache';

interface FetchClassroomsParams {
  courseId?: string;
}

export const classroomApi = {
  async fetchClassrooms(params?: FetchClassroomsParams): Promise<ClassroomDto[]> {
    // For filtered results, don't cache (too many combinations)
    if (params?.courseId) {
      return mockClassrooms.filter((classroom) => classroom.course_id === params.courseId);
    }

    // Cache full list
    const cached = getCachedData<ClassroomDto[]>(CACHE_KEY_CLASSROOMS);
    if (cached) {
      return cached;
    }

    const classrooms = [...mockClassrooms];
    setCachedData(CACHE_KEY_CLASSROOMS, classrooms);
    return classrooms;
  },
};
