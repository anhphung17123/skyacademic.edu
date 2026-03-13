import { useState, useCallback, useRef, useEffect } from 'react';

const DEFAULT_DURATION_MS = 3000;

export interface UseToastReturn {
  isVisible: boolean;
  show: (durationMs?: number) => void;
  hide: () => void;
}

/**
 * Manages toast visibility with optional auto-dismiss.
 */
export function useToast(defaultDurationMs = DEFAULT_DURATION_MS): UseToastReturn {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  }, []);

  const show = useCallback(
    (durationMs?: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(true);
      const duration = durationMs ?? defaultDurationMs;
      if (duration > 0) {
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null;
          setIsVisible(false);
        }, duration);
      }
    },
    [defaultDurationMs]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { isVisible, show, hide };
}
