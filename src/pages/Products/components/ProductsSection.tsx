import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Layers, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/common/PageHero';
import { Loading } from '@/components/common/Loading';
import { ErrorState } from '@/components/common/ErrorState';
import { BookCard } from '@/components/book/BookCard';
import { FlashcardCard } from '@/components/flashcard/FlashcardCard';
import type { BookProduct, FlashcardProduct } from '@/types';
import { useProducts } from '../hooks/useProducts';
import { useMemo, useState } from 'react';
import { clsx } from 'clsx';

type TabId = 'all' | 'books' | 'flashcards';

export const ProductsSection = memo(() => {
  const { t } = useTranslation();
  const { books, flashcards, isLoading, error } = useProducts();
  const [activeTab, setActiveTab] = useState<TabId>('all');

  const heroStats = useMemo(
    () => [
      { value: `${books.length + flashcards.length}`, label: t('products.items') },
      { value: `${books.length}`, label: t('products.books') },
      { value: `${flashcards.length}`, label: t('products.flashcards') },
    ],
    [books.length, flashcards.length, t]
  );

  const tabs: { id: TabId; label: string; icon: typeof BookOpen }[] = [
    { id: 'all', label: t('products.all'), icon: Layers },
    { id: 'books', label: t('products.booksTab'), icon: BookOpen },
    { id: 'flashcards', label: t('products.flashcardsTab'), icon: Sparkles },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <Section padding="lg" background="default">
        <Container>
          <ErrorState error={error} onRetry={() => window.location.reload()} />
        </Container>
      </Section>
    );
  }

  const showBooks = activeTab === 'all' || activeTab === 'books';
  const showFlashcards = activeTab === 'all' || activeTab === 'flashcards';

  return (
    <>
      <PageHero
        title={t('nav.products')}
        subtitle={t('products.subtitle')}
        badge={t('products.badge')}
        badgeIcon={Sparkles}
        gradient="page"
        stats={heroStats}
      />

      <Section padding="lg" background="default">
        <Container>
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={clsx(
                  'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all',
                  activeTab === id
                    ? 'bg-primary-600 text-white dark:bg-primary-500 shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Books */}
          {showBooks && books.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-500" />
                {t('products.booksSection')}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {books.map((book: BookProduct) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </div>
          )}

          {/* Flashcards - one card per product */}
          {showFlashcards && flashcards.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-500" />
                {t('products.flashcardsSection')}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {flashcards.map((product: FlashcardProduct) => (
                  <FlashcardCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {books.length === 0 && flashcards.length === 0 && (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              {t('products.noProducts')}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
});

ProductsSection.displayName = 'ProductsSection';
