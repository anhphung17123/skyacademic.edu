import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { BookCard } from '@/components/book/BookCard';
import { useEffect, useState } from 'react';
import { bookApi } from '@/services/api/book-service';
import { Book } from '@/types';
import { HorizontalScroll } from '@/components/common/HorizontalScroll';

export const FeaturedBooksSection = () => {
  const { t } = useTranslation();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchBooks = async () => {
      try {
        const data = await bookApi.fetchBooks();
        if (isMounted) {
          // Get first 4 books for featured section (1 row)
          setBooks(data.slice(0, 4));
        }
      } catch {
        // Fail silently
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchBooks();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              {t('home.featuredLabel')}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-3">
              {t('home.featuredBooks')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 w-full lg:max-w-xl">
              {t('home.featuredBooksSubtitle')}
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-secondary-600 dark:text-secondary-400 font-semibold hover:gap-3 transition-all self-start lg:self-auto"
          >
            {t('books.viewAll')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Books Grid - Single Row with Horizontal Scroll on Mobile/iPad */}
        {isLoading ? (
          <>
            <div className="hidden lg:grid grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700" />
                  <div className="p-5 space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
            </div>
            <HorizontalScroll className="lg:hidden" isIconShown={false}>
                <div className="w-[240px] sm:w-[280px] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700" />
                  <div className="p-5 space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
            </HorizontalScroll>
          </>
        ) : (
          <>
            <div className="hidden lg:grid grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
            <HorizontalScroll className="lg:hidden" isIconShown={false}>
              {books.map((book) => (
                <div key={book.id} className="w-[400px]">
                  <BookCard book={book} />
                </div>
              ))}
            </HorizontalScroll>
          </>
        )}

        {/* View All Button - Mobile */}
        <div className="mt-10 text-center md:hidden">
          <Link
            to="/books"
            className="inline-flex items-center gap-2 bg-secondary-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-secondary-700 transition-colors"
          >
            {t('books.viewAll')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

