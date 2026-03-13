import type { Language } from './core';

export type ClassroomStatus = 'active' | 'upcoming' | 'completed' | 'cancelled';

export interface Classroom {
  id: string;
  courseId: string;
  code: string;
  title: string;
  description?: string;
  status: ClassroomStatus;
  language?: Language;
  timezone?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
}
