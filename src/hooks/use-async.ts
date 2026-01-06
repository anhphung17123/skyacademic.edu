import { useState, useEffect, useCallback, useRef } from 'react';

interface UseAsyncOptions<T> {
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseAsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface UseAsyncReturn<T> extends UseAsyncState<T> {
  execute: (...args: unknown[]) => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for handling async operations with loading and error states
 * @param asyncFunction - The async function to execute
 * @param options - Configuration options
 * @returns Object with data, loading state, error, execute function, and reset function
 */
export const useAsync = <T>(
  asyncFunction: (...args: unknown[]) => Promise<T>,
  options: UseAsyncOptions<T> = {}
): UseAsyncReturn<T> => {
  const { immediate = false, onSuccess, onError } = options;
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(
    async (...args: unknown[]) => {
      if (!isMountedRef.current) {
        return;
      }
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const data = await asyncFunction(...args);
        if (isMountedRef.current) {
          setState({ data, isLoading: false, error: null });
          onSuccess?.(data);
        }
      } catch (error) {
        if (isMountedRef.current) {
          const err = error instanceof Error ? error : new Error(String(error));
          setState((prev) => ({ ...prev, isLoading: false, error: err }));
          onError?.(err);
        }
      }
    },
    [asyncFunction, onSuccess, onError]
  );

  const reset = useCallback(() => {
    if (isMountedRef.current) {
      setState({ data: null, isLoading: false, error: null });
    }
  }, []);

  useEffect(() => {
    if (immediate) {
      void execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  return {
    ...state,
    execute,
    reset,
  };
};

