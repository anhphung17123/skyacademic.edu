import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { bookApi } from '@/services/api/book-service';
import { Book, ViewMode } from '@/types';
import { FILTER_OPTIONS, VIEW_MODES } from '@/constants';
import { useDataFetch, useDebounce } from '@/hooks';

interface UseBooksReturn {
  books: Book[];
  filteredBooks: Book[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  languageFilter: string;
  setLanguageFilter: (value: string) => void;
  formatFilter: string;
  setFormatFilter: (value: string) => void;
  priceFilter: string;
  setPriceFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  clearFilters: () => void;
  activeFiltersCount: number;
  hasActiveFilters: boolean;
}

/**
 * Custom hook for managing books page state and filtering logic
 * @returns Books data, filters, and state management functions
 */
export const useBooks = (): UseBooksReturn => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [languageFilter, setLanguageFilter] = useState<string>(FILTER_OPTIONS.ALL);
  const [formatFilter, setFormatFilter] = useState<string>(FILTER_OPTIONS.ALL);
  const [priceFilter, setPriceFilter] = useState<string>(FILTER_OPTIONS.ALL);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [viewMode, setViewMode] = useState<ViewMode>(VIEW_MODES.GRID);

  const {
    data: books = [],
    isLoading,
    error: fetchError,
  } = useDataFetch<Book[]>(
    () => bookApi.fetchBooks(),
    {
      immediate: true,
      onError: (err) => {
        console.error('Failed to fetch books:', err);
      },
    }
  );

  const error = fetchError ? (fetchError.message || t('books.loadError')) : null;

  const filteredBooks = useMemo(() => {
    if (!books || books.length === 0) {
      return [];
    }

    const searchTermLower = debouncedSearchTerm.toLowerCase();
    const hasSearch = searchTermLower.length > 0;
    const hasLanguageFilter = languageFilter !== FILTER_OPTIONS.ALL;
    const hasFormatFilter = formatFilter !== FILTER_OPTIONS.ALL;
    const hasPriceFilter = priceFilter !== FILTER_OPTIONS.ALL;

    // Combine all filters in a single pass for better performance
    const filtered = books.filter((book) => {
      // Language filter
      if (hasLanguageFilter) {
        if (languageFilter === FILTER_OPTIONS.ENGLISH) {
          if (book.language !== 'en' && book.language !== 'bilingual') return false;
        } else if (languageFilter === FILTER_OPTIONS.VIETNAMESE) {
          if (book.language !== 'vi' && book.language !== 'bilingual') return false;
        } else if (languageFilter === 'bilingual') {
          if (book.language !== 'bilingual') return false;
        }
      }

      // Search filter
      if (hasSearch) {
        const matchesSearch =
          book.title.toLowerCase().includes(searchTermLower) ||
          (book.author ?? '').toLowerCase().includes(searchTermLower) ||
          book.description.toLowerCase().includes(searchTermLower);
        if (!matchesSearch) return false;
      }

      // Format filter
      if (hasFormatFilter && book.format !== formatFilter) {
        return false;
      }

      // Price filter
      if (hasPriceFilter) {
        if (priceFilter === 'under20' && book.price >= 20) return false;
        if (priceFilter === '20to50' && (book.price < 20 || book.price > 50)) return false;
        if (priceFilter === 'over50' && book.price <= 50) return false;
      }

      return true;
    });

    // Sort
    if (sortBy === 'priceLow') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHigh') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
    }

    return filtered;
  }, [books, formatFilter, languageFilter, debouncedSearchTerm, priceFilter, sortBy]);

  const activeFiltersCount = useMemo(
    () =>
      [
        languageFilter !== FILTER_OPTIONS.ALL,
        formatFilter !== FILTER_OPTIONS.ALL,
        priceFilter !== FILTER_OPTIONS.ALL,
        debouncedSearchTerm !== '',
      ].filter(Boolean).length,
    [languageFilter, formatFilter, priceFilter, debouncedSearchTerm]
  );

  const hasActiveFilters = useMemo(() => activeFiltersCount > 0, [activeFiltersCount]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setLanguageFilter(FILTER_OPTIONS.ALL);
    setFormatFilter(FILTER_OPTIONS.ALL);
    setPriceFilter(FILTER_OPTIONS.ALL);
    setSortBy('popular');
  }, []);

  return {
    books: books ?? [],
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
  };
};



