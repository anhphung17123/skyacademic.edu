import { memo } from 'react';
import { Book } from '@/types';
import { BookCard } from '@/components/book/BookCard';
import { VIEW_MODES } from '@/constants';
import { ViewMode } from '@/types/core';
import { clsx } from 'clsx';

interface BooksGridProps {
  readonly books: Book[];
  readonly viewMode: ViewMode;
}

export const BooksGrid = memo(({ books, viewMode }: BooksGridProps) => {
  return (
    <div
      className={clsx(
        viewMode === VIEW_MODES.GRID
          ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
          : 'space-y-4'
      )}
    >
      {books.map((book: Book) => (
        <div key={book.id}>
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
});

BooksGrid.displayName = 'BooksGrid';

