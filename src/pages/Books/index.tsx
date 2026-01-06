import { useTranslation } from 'react-i18next';
import { BookOpen, Sparkles } from 'lucide-react';
import { Loading } from '@/components/common/Loading';
import { useBooks } from './hooks/useBooks';
import { PageHero } from '@/components/common/PageHero';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ViewModeToggle } from '@/components/common/ViewModeToggle';
import { ResultsInfo } from '@/components/common/ResultsInfo';
import { BooksFilters } from './components/BooksFilters';
import { BooksGrid } from './components/BooksGrid';
import { useMemo } from 'react';

export const Books = () => {
  const { t } = useTranslation();
  const {
    filteredBooks,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    languageFilter,
    setLanguageFilter,
    formatFilter,
    setFormatFilter,
    priceFilter,
    setPriceFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    clearFilters,
    activeFiltersCount,
    hasActiveFilters,
    books,
  } = useBooks();

  const heroStats = useMemo(
    () => [
      { value: `${books.length}+`, label: t('books.titles') },
      { value: '4.9', label: t('books.avgRating') },
    ],
    [books.length, t]
  );

  return (
    <>
      <PageHero
        title={t('nav.books')}
        subtitle={t('books.subtitle')}
        badge={t('books.badge')}
        badgeIcon={Sparkles}
        gradient="page"
        stats={heroStats}
      />

      <Section padding="lg" background="default">
        <Container>
          {/* Search and Filters */}
          <BooksFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            languageFilter={languageFilter}
            onLanguageFilterChange={setLanguageFilter}
            formatFilter={formatFilter}
            onFormatFilterChange={setFormatFilter}
            priceFilter={priceFilter}
            onPriceFilterChange={setPriceFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            activeFiltersCount={activeFiltersCount}
            onClearFilters={clearFilters}
          />

          {/* Results info and View toggle */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <ResultsInfo
              count={filteredBooks.length}
              resultsLabel={t('books.results')}
              activeFiltersCount={activeFiltersCount}
              hasActiveFilters={hasActiveFilters}
            />
            <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>

          {/* Books Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loading />
            </div>
          ) : error ? (
            <ErrorState error={error} onRetry={() => window.location.reload()} />
          ) : filteredBooks.length > 0 ? (
            <BooksGrid books={filteredBooks} viewMode={viewMode} />
          ) : (
            <EmptyState
              icon={BookOpen}
              title={t('books.noResults')}
              description={t('books.noResultsDesc')}
              action={
                hasActiveFilters
                  ? {
                      label: t('common.clearFilters'),
                      onClick: clearFilters,
                    }
                  : undefined
              }
            />
          )}
        </Container>
      </Section>
    </>
  );
};

