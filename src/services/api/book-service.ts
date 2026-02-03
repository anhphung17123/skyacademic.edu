import { mockBooks } from '../mock/data/Books';
import { BOOK_TABLE_OF_CONTENTS } from '../mock/data/BookTableOfContents';
import { Book } from '@/types';
import { mapBookDtoToBook } from '@/mappers/api-mappers';

const processBooks = (): Book[] => {
  return mockBooks.map((book) =>
    mapBookDtoToBook(book, BOOK_TABLE_OF_CONTENTS[book.slug ?? ''] ?? [])
  );
};

export const bookApi = {
  async fetchBooks(): Promise<Book[]> {
    return processBooks();
  },
};