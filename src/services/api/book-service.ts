// ========================================
// Static Book Service
// ========================================
// Uses mock data directly - no API calls
// Cached in localStorage for instant loading

import { mockBooks } from '../mock/data/Books';
import { Book } from '@/types';
import { mapBookDtoToBook } from '@/mappers/api-mappers';
import { getCachedData, setCachedData } from '@/utils/cache';

const CACHE_KEY_BOOKS = 'skyacademy_books_cache';
const CACHE_KEY_BOOK_PREFIX = 'skyacademy_book_';

const processBooks = (): Book[] => {
  return mockBooks.map(mapBookDtoToBook);
};

export const bookApi = {
  async fetchBooks(): Promise<Book[]> {
    // Check cache first
    const cached = getCachedData<Book[]>(CACHE_KEY_BOOKS);
    if (cached) {
      return cached;
    }

    // Process and cache
    const books = processBooks();
    setCachedData(CACHE_KEY_BOOKS, books);
    return books;
  },

  async getBook(id: string): Promise<Book | null> {
    // Check cache first
    const cacheKey = `${CACHE_KEY_BOOK_PREFIX}${id}`;
    const cached = getCachedData<Book>(cacheKey);
    if (cached) {
      return cached;
    }

    // Find and cache
    const dto = mockBooks.find((book) => book.id === id);
    if (!dto) return null;

    const book = mapBookDtoToBook(dto);
    setCachedData(cacheKey, book);
    return book;
  },
};