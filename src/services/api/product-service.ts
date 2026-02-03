/**
 * Product service: Books + Flashcards
 * Uses mock data; getProductBySlug(slug) for /products/:slug
 */

import { bookApi } from './book-service';
import { mockFlashcardProduct } from '../mock/data/Flashcards';
import type { Book, Product, BookProduct, FlashcardProduct } from '@/types';
import { isBookProduct } from '@/types';

const FLASHCARD_SLUG = mockFlashcardProduct.slug;

const processBookToProduct = (book: Book): BookProduct => ({
  ...book,
  type: 'book',
  slug: book.slug,
});

export const productApi = {
  async fetchProducts(): Promise<Product[]> {
    const books = await bookApi.fetchBooks();
    const bookProducts: BookProduct[] = books.map(processBookToProduct);
    return [...bookProducts, mockFlashcardProduct];
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (slug === FLASHCARD_SLUG) {
      return mockFlashcardProduct;
    }
    const books = await bookApi.fetchBooks();
    const book = books.find((b) => b.slug === slug);
    if (!book) return null;
    return processBookToProduct(book);
  },

  async getBookBySlug(slug: string): Promise<BookProduct | null> {
    const product = await this.getProductBySlug(slug);
    return product && isBookProduct(product) ? product : null;
  },

  async getFlashcardBySlug(slug: string): Promise<FlashcardProduct | null> {
    const product = await this.getProductBySlug(slug);
    return product && product.type === 'flashcard' ? product : null;
  },
};
