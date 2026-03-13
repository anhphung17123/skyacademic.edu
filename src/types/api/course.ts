import { CourseType, DeliveryMode } from '../core';
import { BackendLanguage, CourseStatusDto } from './common';

export interface CourseDto {
  id: string;
  title: string;
  title_vi?: string;
  title_en?: string;
  slug: string;
  summary?: string;
  summary_vi?: string;
  summary_en?: string;
  description: string;
  description_vi?: string;
  description_en?: string;
  cover_url?: string;
  level: string;
  type: CourseType;
  language: BackendLanguage;
  delivery_mode: DeliveryMode;
  price: number;
  currency: string;
  youtube_playlist_url?: string;
  support_email?: string;
  status?: CourseStatusDto;
  created_at?: string;
  students_count?: number;
  rating?: number;
  duration?: string;
  category?: string;
  category_vi?: string;
  thumbnail_url?: string;
  levels_label?: string;
  instructor_id?: string;
}