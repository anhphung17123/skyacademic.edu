import { mockBooks } from '../mock/data/Books';
import { BOOK_TABLE_OF_CONTENTS } from '../mock/data/BookTableOfContents';
import { Book } from '@/types';
import { mapBookDtoToBook } from '@/mappers/api-mappers';
import { attachTeacher } from './helpers/attach-person';

const processBooks = (): Book[] => {
  return mockBooks.map((dto) => {
    const book = mapBookDtoToBook(dto, BOOK_TABLE_OF_CONTENTS[dto.slug ?? ''] ?? []);
    return attachTeacher(book, dto.teacher_id);
  });
};

export const bookApi = {
  async fetchBooks(): Promise<Book[]> {
    return processBooks();
  },

  async getBookBySlug(slug: string): Promise<Book | null> {
    const dto = mockBooks.find((b) => b.slug === slug);
    if (!dto) return null;
    const book = mapBookDtoToBook(dto, BOOK_TABLE_OF_CONTENTS[dto.slug ?? ''] ?? []);
    return attachTeacher(book, dto.teacher_id);
  },
};
