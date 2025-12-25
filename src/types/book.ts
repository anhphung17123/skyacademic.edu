import { Language, BookFormat } from './core';

export interface Book {
  id: string;
  slug?: string;
  title: string;
  titleEn?: string;
  titleVi?: string;
  author?: string;
  description: string;
  descriptionEn?: string;
  descriptionVi?: string;
  price: number;
  currency?: string;
  language?: Language;
  pages?: number;
  format?: BookFormat;
  type?: 'physical' | 'ebook' | 'bundle';
  deliveryType?: 'shipping' | 'digital' | 'hybrid';
  thumbnail: string;
  image?: string;
  imageUrl?: string;
  previewUrl?: string;
  category?: string;
  categoryVi?: string;
  stock?: number;
  stockQuantity?: number;
  isbn?: string;
  publisher?: string;
  publishedDate?: string;
  rating?: number;
  downloadUrl?: string;
  createdAt?: string;
}