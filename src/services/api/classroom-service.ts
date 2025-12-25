// ========================================
// Static Classroom Service
// ========================================
// Uses mock data directly - no API calls

import { mockClassrooms } from '../mock/data/Classrooms';
import { ClassroomDto } from '@/types/api/classroom';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface FetchClassroomsParams {
  courseId?: string;
}

export const classroomApi = {
  async fetchClassrooms(params?: FetchClassroomsParams): Promise<ClassroomDto[]> {
    await delay(300);
    if (params?.courseId) {
      return mockClassrooms.filter(classroom => classroom.course_id === params.courseId);
    }
    return [...mockClassrooms];
  },
};
