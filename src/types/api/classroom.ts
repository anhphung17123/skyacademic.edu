import { BackendLanguage, ClassroomStatusDto } from './common';

export interface ClassroomDto {
  id: string;
  course_id: string;
  code: string;
  title: string;
  description?: string;
  status: ClassroomStatusDto;
  language?: BackendLanguage;
  timezone?: string;
  start_date?: string;
  end_date?: string;
  created_at?: string;
}