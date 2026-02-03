/**
 * Product domain types
 * Product = BookProduct | FlashcardProduct (discriminated union)
 */

import { Book } from './book';

/** Book as a product (for /products list and /products/:slug) */
export interface BookProduct extends Omit<Book, 'type'> {
  type: 'book';
}

/** Một thẻ trong topic: chỉ có ảnh mặt trước và mặt sau (imageKey). Không có chữ. */
export interface FlashcardCard {
  id: string;
  topic: string;
  /** imageKey cho ảnh mặt trước; URL = topic.images[front] */
  front: string;
  /** imageKey cho ảnh mặt sau; URL = topic.images[back] */
  back: string;
}

/** Learning topic. Có images riêng (key → URL cho mặt trước/sau thẻ trong topic). Flashcard product không có images. */
export interface FlashcardTopic {
  id: string;
  key: 'activities' | 'places' | 'special-days';
  nameEn: string;
  nameVi: string;
  purposeEn: string;
  purposeVi: string;
  coverImage: string;
  contentEn: string;
  contentVi: string;
  examples: string[];
  /** imageKey → URL cho ảnh mặt trước / mặt sau của thẻ trong topic này */
  images: Record<string, string>;
  cards: FlashcardCard[];
}

/** Package option (Physical, PDF, Combo) */
export interface FlashcardPackage {
  id: string;
  key: 'physical' | 'pdf' | 'combo';
  nameEn: string;
  nameVi: string;
  descriptionEn: string;
  descriptionVi: string;
  features: string[];
  ctaEn: string;
  ctaVi: string;
  highlight?: boolean;
}

/** Bonus class info */
export interface FlashcardBonusClass {
  titleEn: string;
  titleVi: string;
  duration: string;
  format: string;
  items: string[];
  itemsVi: string[];
  noExtraFee: string;
  noExtraFeeVi: string;
}

/** Flashcard product. Không có images; chỉ topics có images (và cards có front/back imageKey). */
export interface FlashcardProduct {
  type: 'flashcard';
  id: string;
  slug: string;
  titleEn: string;
  titleVi: string;
  subtitleEn: string;
  subtitleVi: string;
  descriptionEn: string;
  descriptionVi: string;
  topics: FlashcardTopic[];
  packages: FlashcardPackage[];
  bonusClass: FlashcardBonusClass;
  targetAudience: string[];
  targetAudienceVi: string[];
}

/** Union type for any product */
export type Product = BookProduct | FlashcardProduct;

/** Type guard: is BookProduct */
export function isBookProduct(p: Product): p is BookProduct {
  return p.type === 'book';
}

/** Type guard: is FlashcardProduct */
export function isFlashcardProduct(p: Product): p is FlashcardProduct {
  return p.type === 'flashcard';
}
