/**
 * Page-specific theme types and definitions
 */

import { ThemeMode } from './core';

/**
 * Color palette for a page theme
 * Supports both light and dark mode variants
 */
export interface PageThemeColors {
  /** Primary accent color */
  primary: string;
  /** Secondary accent color */
  secondary: string;
  /** Background gradient colors */
  background: {
    start: string;
    end: string;
  };
  /** Accent gradient colors */
  accent: {
    start: string;
    end: string;
  };
  /** Overlay colors for cards and surfaces */
  overlay: {
    light: string;
    dark: string;
  };
}

/**
 * Complete page theme configuration
 */
export interface PageTheme {
  /** Theme name identifier */
  name: string;
  /** Light mode colors */
  light: PageThemeColors;
  /** Dark mode colors */
  dark: PageThemeColors;
}

/**
 * Page theme identifier
 */
export type PageThemeId =
  | 'home'
  | 'courses'
  | 'course-detail'
  | 'products'
  | 'book-detail'
  | 'flashcard-detail'
  | 'about'
  | 'contact'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'default';

/**
 * Page theme context value
 */
export interface PageThemeContextValue {
  /** Current page theme ID */
  currentThemeId: PageThemeId;
  /** Current page theme configuration */
  currentTheme: PageTheme;
  /** Resolved theme mode (light or dark) */
  themeMode: ThemeMode;
  /** Get colors for current theme and mode */
  getColors: () => PageThemeColors;
  /** Set page theme by ID */
  setPageTheme: (themeId: PageThemeId) => void;
}

