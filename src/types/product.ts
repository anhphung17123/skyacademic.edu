/**
 * Product domain types
 * Product = BookProduct | FlashcardProduct (discriminated union)
 */

import { Book } from './book';

/** Discriminated union: product type */
export type ProductType = 'book' | 'flashcard';

/** Book as a product (for /products list and /products/:slug) */
export interface BookProduct extends Omit<Book, 'type'> {
  type: 'book';
}

/** Single side of a flashcard (front or back) */
export interface FlashcardCardSide {
  language: 'en' | 'vi';
  sentence: string;
  image: string;
}

/** One flashcard card within a topic */
export interface FlashcardCard {
  id: string;
  topic: string;
  front: FlashcardCardSide;
  back: FlashcardCardSide;
}

/** Learning topic (Activities, Places, Special Days) */
export interface FlashcardTopic {
  id: string;
  key: 'activities' | 'places' | 'special-days';
  nameEn: string;
  nameVi: string;
  purposeEn: string;
  purposeVi: string;
  /** Content rules / description (paragraph) */
  contentEn: string;
  contentVi: string;
  /** Example phrases (e.g. "eating breakfast", "market") */
  examples: string[];
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

/** Flashcard product (full detail page data) */
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
  heroImage?: string;
  topics: FlashcardTopic[];
  packages: FlashcardPackage[];
  bonusClass: FlashcardBonusClass;
  targetAudience: string[];
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
