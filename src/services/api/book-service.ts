// ========================================
// Static Book Service
// ========================================
// Uses mock data directly - no API calls

import { mockBooks } from '../mock/data/Books';
import { Book } from '@/types';
import { mapBookDtoToBook } from '@/mappers/api-mappers';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const bookApi = {
  async fetchBooks(): Promise<Book[]> {
    await delay(300);
    return mockBooks.map(mapBookDtoToBook);
  },

  async getBook(id: string): Promise<Book | null> {
    await delay(200);
    const dto = mockBooks.find(book => book.id === id);
    return dto ? mapBookDtoToBook(dto) : null;
  },
};