import { Language, BookFormat } from './core';
import type { Teacher } from './teacher';

/** One entry in a book's table of contents (title, chapter, or section). */
export interface TableOfContentsItem {
  type: 'title' | 'chapter' | 'section';
  text: string;
  chapterNumber?: number;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  titleVi?: string;
  author?: string;
  description: string;
  descriptionEn?: string;
  descriptionVi?: string;
  tableOfContents?: TableOfContentsItem[];
  price: number;
  salePrice: number;
  currency?: string;
  language?: Language;
  pages?: number;
  format?: BookFormat;
  type?: 'physical' | 'ebook' | 'bundle';
  thumbnail: string;
  previewImages?: Record<string, string[]>;
  category?: string;
  categoryVi?: string;
  stock?: number;
  isbn?: string;
  publisher?: string;
  publishedDate?: string;
  publishedDateVi?: string;
  rating?: number;
  createdAt?: string;
  teacher?: Teacher;
}