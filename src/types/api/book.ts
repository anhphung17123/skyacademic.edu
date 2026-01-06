import { BackendLanguage } from "./common";

export interface BookDto {
  id: string;
  title: string;
  title_vi?: string;
  title_en?: string;
  description: string;
  description_vi?: string;
  description_en?: string;
  cover_url?: string;
  preview_url?: string;
  price: number;
  currency: string;
  category: string;
  category_vi?: string;
  category_en?: string;
  language: BackendLanguage;
  type: 'physical' | 'ebook' | 'bundle' | 'digital';
  delivery_type?: 'shipping' | 'digital' | 'hybrid';
  stock_quantity?: number;
  download_url?: string;
  created_at?: string;
  author?: string;
  pages?: number;
  publisher?: string;
  isbn?: string;
  published_date?: string;
  published_date_vi?: string;
  rating?: number;
}