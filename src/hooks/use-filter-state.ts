import { useState, useCallback, useMemo } from 'react';

interface UseFilterStateOptions {
  initialSearchTerm?: string;
  initialFilters?: Record<string, string>;
}

interface UseFilterStateReturn {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filters: Record<string, string>;
  setFilter: (key: string, value: string) => void;
  clearFilters: () => void;
  clearSearch: () => void;
  activeFiltersCount: number;
  hasActiveFilters: boolean;
}

/**
 * Reusable hook for managing filter state (search + multiple filters)
 */
export const useFilterState = (
  options: UseFilterStateOptions = {}
): UseFilterStateReturn => {
  const { initialSearchTerm = '', initialFilters = {} } = options;
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [filters, setFilters] = useState<Record<string, string>>(initialFilters);

  const setFilter = useCallback((key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchTerm(initialSearchTerm);
  }, [initialFilters, initialSearchTerm]);

  const clearSearch = useCallback(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const activeFiltersCount = useMemo(() => {
    const filterCount = Object.values(filters).filter(
      (value) => value !== 'all' && value !== ''
    ).length;
    return filterCount + (searchTerm ? 1 : 0);
  }, [filters, searchTerm]);

  const hasActiveFilters = useMemo(() => activeFiltersCount > 0, [activeFiltersCount]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilter,
    clearFilters,
    clearSearch,
    activeFiltersCount,
    hasActiveFilters,
  };
};

