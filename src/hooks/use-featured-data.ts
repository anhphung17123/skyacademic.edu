import { useMemo } from 'react';
import { useDataFetch } from './use-data-fetch';

interface UseFeaturedDataOptions<T> {
  /** When provided, no fetch is performed; data is taken from this. */
  initialData?: T[] | undefined;
  /** Max number of items to slice from fetched result. */
  count: number;
  onError?: (error: Error) => void;
}

interface UseFeaturedDataReturn<T> {
  data: T[];
  isLoading: boolean;
}

/**
 * Shared "featured section" pattern: use initialData if provided, otherwise fetch and slice.
 * Composes useDataFetch to avoid duplicating fetch/cleanup logic.
 */
export function useFeaturedData<T>(
  fetchFn: () => Promise<T[]>,
  options: UseFeaturedDataOptions<T>
): UseFeaturedDataReturn<T> {
  const { initialData, count, onError } = options;
  const shouldFetch = initialData === undefined;

  const { data: fetchedData, isLoading } = useDataFetch<T[]>(fetchFn, {
    immediate: shouldFetch,
    onError,
  });

  const data = useMemo(() => {
    if (initialData !== undefined) return initialData;
    return (fetchedData ?? []).slice(0, count);
  }, [initialData, fetchedData, count]);

  return {
    data,
    isLoading: shouldFetch ? isLoading : false,
  };
}
