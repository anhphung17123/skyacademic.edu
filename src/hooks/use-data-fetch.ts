import { useState, useEffect, useCallback, useRef } from 'react';

interface UseDataFetchOptions<T> {
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseDataFetchReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for fetching data with automatic cleanup on unmount
 * Prevents state updates after component unmounts
 * @param fetchFunction - The async function to fetch data
 * @param options - Configuration options
 * @returns Object with data, loading state, error, refetch function, and reset function
 */
export const useDataFetch = <T>(
  fetchFunction: () => Promise<T>,
  options: UseDataFetchOptions<T> = {}
): UseDataFetchReturn<T> => {
  const { immediate = true, onSuccess, onError } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(immediate);
  const [error, setError] = useState<Error | null>(null);
  const isMountedRef = useRef(true);
  const fetchFunctionRef = useRef(fetchFunction);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  // Update refs when values change
  useEffect(() => {
    fetchFunctionRef.current = fetchFunction;
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  }, [fetchFunction, onSuccess, onError]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchData = useCallback(async () => {
    if (!isMountedRef.current) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFunctionRef.current();
      if (isMountedRef.current) {
        setData(result);
        setIsLoading(false);
        onSuccessRef.current?.(result);
      }
    } catch (err) {
      if (isMountedRef.current) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        setIsLoading(false);
        onErrorRef.current?.(error);
      }
    }
  }, []);

  const reset = useCallback(() => {
    if (isMountedRef.current) {
      setData(null);
      setError(null);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (immediate) {
      void fetchData();
    }
  }, [immediate, fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    reset,
  };
};

