import { Language, Level, DeliveryMode, CourseType } from './core';

export interface Course {
  id: string;
  slug?: string;
  title: string;
  titleEn?: string;
  titleVi?: string;
  description: string;
  descriptionEn?: string;
  descriptionVi?: string;
  summary?: string;
  summaryEn?: string;
  summaryVi?: string;
  price: number;
  duration?: string;
  level: Level;
  language?: Language;
  thumbnail?: string;
  coverImage?: string;
  heroImage?: string;
  category?: string;
  categoryVi?: string;
  deliveryMode?: DeliveryMode;
  currency?: string;
  trailerUrl?: string;
  youtubePlaylistUrl?: string;
  type?: CourseType;
  supportEmail?: string;
  students?: number;
  rating?: number;
  lessonsCount?: number;
  isFeatured?: boolean;
  isPublished?: boolean;
  status?: 'draft' | 'published' | 'archived';
  createdAt?: string;
}