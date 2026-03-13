import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { BookCard } from '@/components/book/BookCard';
import { bookApi } from '@/services/api/book-service';
import { Book } from '@/types';
import { useFeaturedData } from '@/hooks';
import { CardSkeleton, GridSkeleton } from '@/components/common/Skeleton';
import { ResponsiveGrid } from '@/components/common/ResponsiveGrid';

const FEATURED_COUNT = 4;

interface FeaturedBooksSectionProps {
  /** When provided (e.g. from Home useHome), no fetch is performed */
  books?: Book[];
}

export const FeaturedBooksSection = ({ books: booksProp }: FeaturedBooksSectionProps = {}) => {
  const { t } = useTranslation();
  const { data: books, isLoading } = useFeaturedData(bookApi.fetchBooks, {
    initialData: booksProp,
    count: FEATURED_COUNT,
  });

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
          <GridSkeleton count={4} desktopColumns="lg:grid-cols-3" itemWidth="w-[240px] sm:w-[280px]">
            <CardSkeleton variant="book" />
          </GridSkeleton>
        ) : (
          <ResponsiveGrid
            desktopColumns="lg:grid-cols-3"
            mobileItemWidth="w-[400px]"
            mobileItemClassName="w-[400px]"
          >
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </ResponsiveGrid>
        )}

        {/* View All Button - Mobile */}
        <div className="mt-10 text-center md:hidden">
          <Link
            to="/products"
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

