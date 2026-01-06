/**
 * Page-specific theme context
 * Provides dynamic theming based on current page/route
 */

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeMode } from '@/types/core';
import { PageThemeId, PageThemeContextValue, PageThemeColors } from '@/types/page-theme';
import { getPageTheme } from '@/config/page-themes.config';
import { useTheme } from './theme-context';
import { ROUTES } from '@/constants';

/**
 * Map route paths to page theme IDs
 */
const routeToThemeMap: Record<string, PageThemeId> = {
  [ROUTES.HOME]: 'home',
  [ROUTES.COURSES]: 'courses',
  [ROUTES.BOOKS]: 'books',
  [ROUTES.FREE_VIDEOS]: 'free-videos',
  [ROUTES.ABOUT]: 'about',
  [ROUTES.CONTACT]: 'contact',
  [ROUTES.PRIVACY_POLICY]: 'privacy-policy',
  [ROUTES.TERMS_OF_SERVICE]: 'terms-of-service',
};

/**
 * Extract theme ID from current route
 * @param pathname - Current route pathname
 * @returns Page theme ID
 */
const getThemeIdFromRoute = (pathname: string): PageThemeId => {
  // Normalize pathname (remove trailing slash, handle exact matches)
  const normalizedPath = pathname.endsWith('/') && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;

  // Check exact matches first
  if (routeToThemeMap[normalizedPath]) {
    return routeToThemeMap[normalizedPath];
  }

  // Check for course detail pattern: /courses/:language/:slug
  if (/^\/courses\/[^/]+\/[^/]+$/.test(normalizedPath)) {
    return 'course-detail';
  }

  // Check for book detail pattern: /books/:id
  if (/^\/books\/[^/]+$/.test(normalizedPath)) {
    return 'book-detail';
  }

  // Check if path starts with known routes (for nested routes)
  if (normalizedPath.startsWith('/courses')) {
    return 'courses';
  }
  if (normalizedPath.startsWith('/books')) {
    return 'books';
  }
  if (normalizedPath.startsWith('/free-videos')) {
    return 'free-videos';
  }
  if (normalizedPath.startsWith('/about')) {
    return 'about';
  }
  if (normalizedPath.startsWith('/contact')) {
    return 'contact';
  }
  if (normalizedPath.startsWith('/privacy-policy')) {
    return 'privacy-policy';
  }
  if (normalizedPath.startsWith('/terms-of-service')) {
    return 'terms-of-service';
  }

  // Default fallback
  return normalizedPath === '/' ? 'home' : 'default';
};

/**
 * Apply page theme CSS variables to document
 * @param colors - Page theme colors
 * @param themeMode - Current theme mode (light/dark)
 */
const applyPageThemeToDocument = (
  colors: PageThemeColors,
  themeMode: ThemeMode
): void => {
  if (typeof document === 'undefined') {
    return;
  }
  const rootElement = document.documentElement;
  rootElement.style.setProperty('--page-primary', colors.primary);
  rootElement.style.setProperty('--page-secondary', colors.secondary);
  rootElement.style.setProperty('--page-bg-start', colors.background.start);
  rootElement.style.setProperty('--page-bg-end', colors.background.end);
  rootElement.style.setProperty('--page-accent-start', colors.accent.start);
  rootElement.style.setProperty('--page-accent-end', colors.accent.end);
  rootElement.style.setProperty('--page-overlay-light', colors.overlay.light);
  rootElement.style.setProperty('--page-overlay-dark', colors.overlay.dark);
  rootElement.setAttribute('data-page-theme', themeMode);
};

const PageThemeContext = createContext<PageThemeContextValue | undefined>(
  undefined
);

interface PageThemeProviderProps {
  children: ReactNode;
}

/**
 * Page theme provider component
 * Manages page-specific theming based on current route
 */
export const PageThemeProvider = ({ children }: PageThemeProviderProps) => {
  const location = useLocation();
  const { resolvedTheme } = useTheme();
  const [currentThemeId, setCurrentThemeId] = useState<PageThemeId>(() =>
    getThemeIdFromRoute(location.pathname)
  );

  // Update theme when route changes
  useEffect(() => {
    const newThemeId = getThemeIdFromRoute(location.pathname);
    if (newThemeId !== currentThemeId) {
      setCurrentThemeId(newThemeId);
    }
  }, [location.pathname, currentThemeId]);

  // Get current theme configuration
  const currentTheme = useMemo(
    () => getPageTheme(currentThemeId),
    [currentThemeId]
  );

  // Get colors for current theme and mode
  const getColors = useCallback((): PageThemeColors => {
    return resolvedTheme === 'dark' ? currentTheme.dark : currentTheme.light;
  }, [currentTheme, resolvedTheme]);

  // Apply theme to document when theme or mode changes
  useEffect(() => {
    const colors = getColors();
    applyPageThemeToDocument(colors, resolvedTheme);
  }, [getColors, resolvedTheme]);

  // Set page theme manually (for programmatic control)
  const setPageTheme = useCallback((themeId: PageThemeId) => {
    setCurrentThemeId(themeId);
  }, []);

  const value = useMemo<PageThemeContextValue>(
    () => ({
      currentThemeId,
      currentTheme,
      themeMode: resolvedTheme,
      getColors,
      setPageTheme,
    }),
    [currentThemeId, currentTheme, resolvedTheme, getColors, setPageTheme]
  );

  return (
    <PageThemeContext.Provider value={value}>
      {children}
    </PageThemeContext.Provider>
  );
};

/**
 * Hook to access page theme context
 * @returns Page theme context value
 * @throws Error if used outside PageThemeProvider
 */
export const usePageTheme = (): PageThemeContextValue => {
  const context = useContext(PageThemeContext);
  if (!context) {
    throw new Error('usePageTheme must be used within PageThemeProvider');
  }
  return context;
};

