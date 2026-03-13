import { BackendLanguage } from "./common";

export interface BookDto {
  id: string;
  slug?: string;
  title: string;
  title_vi?: string;
  title_en?: string;
  description: string;
  description_vi?: string;
  description_en?: string;
  cover_images?: Record<string, string[]>;
  preview_images?: Record<string, string[]>;
  price: number;
  currency: string;
  category: string;
  category_vi?: string;
  language: BackendLanguage;
  type: 'physical' | 'ebook' | 'bundle' | 'digital';
  stock_quantity?: number;
  created_at?: string;
  author?: string;
  pages?: number;
  publisher?: string;
  isbn?: string;
  published_date?: string;
  published_date_vi?: string;
  rating?: number;
  teacher_id?: string;
}