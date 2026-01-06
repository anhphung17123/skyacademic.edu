import { useState, useEffect, useCallback } from 'react';
import { SCROLL_THRESHOLD } from '@/constants';

interface UseScrollOptions {
  threshold?: number;
}

interface UseScrollReturn {
  isScrolled: boolean;
  scrollY: number;
}

/**
 * Custom hook to track scroll position
 * @param options - Configuration options
 * @returns Object with isScrolled boolean and scrollY number
 */
export const useScroll = (options: UseScrollOptions = {}): UseScrollReturn => {
  const { threshold = SCROLL_THRESHOLD.HEADER } = options;
  const [scrollY, setScrollY] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY;
    }
    return 0;
  });
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > threshold;
    }
    return false;
  });

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);
    setIsScrolled(currentScrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { isScrolled, scrollY };
};

