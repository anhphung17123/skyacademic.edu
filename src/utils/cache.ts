/**
 * Simple cache utility for localStorage
 * Used to cache static data and avoid re-fetching
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Get cached data from localStorage
 */
export const getCachedData = <T>(key: string): T | null => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const entry: CacheEntry<T> = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is expired
    if (now - entry.timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }

    return entry.data;
  } catch {
    return null;
  }
};

/**
 * Set data in cache
 */
export const setCachedData = <T>(key: string, data: T): void => {
  try {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // Ignore errors (e.g., quota exceeded)
  }
};

/**
 * Clear cache for a specific key
 */
export const clearCache = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore errors
  }
};

