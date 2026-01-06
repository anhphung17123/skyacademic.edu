/**
 * Page-specific theme configurations
 * Each page has its own characteristic color scheme that adapts to light and dark modes
 */

import { PageTheme, PageThemeId } from '@/types/page-theme';

/**
 * Default theme used as fallback
 */
const defaultTheme: PageTheme = {
  name: 'default',
  light: {
    primary: '#2563eb',
    secondary: '#f97316',
    background: {
      start: '#f8fafc',
      end: '#f1f5f9',
    },
    accent: {
      start: '#3b82f6',
      end: '#2563eb',
    },
    overlay: {
      light: 'rgba(255, 255, 255, 0.8)',
      dark: 'rgba(15, 23, 42, 0.95)',
    },
  },
  dark: {
    primary: '#3b82f6',
    secondary: '#fb923c',
    background: {
      start: '#0f172a',
      end: '#1e293b',
    },
    accent: {
      start: '#60a5fa',
      end: '#3b82f6',
    },
    overlay: {
      light: 'rgba(30, 41, 59, 0.95)',
      dark: 'rgba(15, 23, 42, 0.98)',
    },
  },
};

/**
 * Home page theme - Warm and welcoming (Golden Yellow)
 */
const homeTheme: PageTheme = {
  name: 'home',
  light: {
    primary: '#d97706',
    secondary: '#f59e0b',
    background: {
      start: '#fffbeb',
      end: '#fef3c7',
    },
    accent: {
      start: '#fbbf24',
      end: '#f59e0b',
    },
    overlay: {
      light: 'rgba(255, 251, 235, 0.9)',
      dark: 'rgba(15, 23, 42, 0.95)',
    },
  },
  dark: {
    primary: '#fbbf24',
    secondary: '#fcd34d',
    background: {
      start: '#78350f',
      end: '#451a03',
    },
    accent: {
      start: '#fcd34d',
      end: '#fbbf24',
    },
    overlay: {
      light: 'rgba(120, 53, 15, 0.95)',
      dark: 'rgba(20, 14, 4, 0.98)',
    },
  },
};

/**
 * Courses page theme - Professional blue (Sky Blue)
 */
const coursesTheme: PageTheme = {
  name: 'courses',
  light: {
    primary: '#0284c7',
    secondary: '#0ea5e9',
    background: {
      start: '#e0f2fe',
      end: '#bae6fd',
    },
    accent: {
      start: '#38bdf8',
      end: '#0ea5e9',
    },
    overlay: {
      light: 'rgba(240, 249, 255, 0.9)',
      dark: 'rgba(15, 23, 42, 0.95)',
    },
  },
  dark: {
    primary: '#38bdf8',
    secondary: '#7dd3fc',
    background: {
      start: '#0c4a6e',
      end: '#082f49',
    },
    accent: {
      start: '#7dd3fc',
      end: '#38bdf8',
    },
    overlay: {
      light: 'rgba(12, 74, 110, 0.95)',
      dark: 'rgba(8, 47, 73, 0.98)',
    },
  },
};

/**
 * Course detail page theme - Deep blue (Royal Blue)
 */
const courseDetailTheme: PageTheme = {
  name: 'course-detail',
  light: {
    primary: '#1e40af',
    secondary: '#2563eb',
    background: {
      start: '#dbeafe',
      end: '#bfdbfe',
    },
    accent: {
      start: '#3b82f6',
      end: '#2563eb',
    },
    overlay: {
      light: 'rgba(239, 246, 255, 0.9)',
      dark: 'rgba(15, 23, 42, 0.95)',
    },
  },
  dark: {
    primary: '#60a5fa',
    secondary: '#93c5fd',
    background: {
      start: '#1e3a8a',
      end: '#1e40af',
    },
    accent: {
      start: '#93c5fd',
      end: '#60a5fa',
    },
    overlay: {
      light: 'rgba(30, 58, 138, 0.95)',
      dark: 'rgba(15, 23, 42, 0.98)',
    },
  },
};

/**
 * Books page theme - Warm orange/amber (Vibrant Orange)
 * Matches the beautiful amber-orange-red gradient
 */
const booksTheme: PageTheme = {
  name: 'books',
  light: {
    primary: '#f97316', // orange-500 (middle of gradient)
    secondary: '#ef4444', // red-500 (end of gradient)
    background: {
      start: '#ffedd5',
      end: '#fed7aa',
    },
    accent: {
      start: '#f59e0b', // amber-500 (start of gradient)
      end: '#f97316', // orange-500 (middle)
    },
    overlay: {
      light: 'rgba(255, 255, 255, 0.9)',
      dark: 'rgba(15, 23, 42, 0.95)',
    },
  },
  dark: {
    primary: '#fb923c', // orange-400
    secondary: '#f87171', // red-400
    background: {
      start: '#9a3412',
      end: '#7c2d12',
    },
    accent: {
      start: '#fbbf24', // amber-400
      end: '#fb923c', // orange-400
    },
    overlay: {
      light: 'rgba(154, 52, 18, 0.95)',
      dark: 'rgba(15, 23, 42, 0.98)',
    },
  },
};

/**
 * Book detail page theme - Rich amber-orange-red gradient
 * Matches the beautiful amber-orange-red gradient from hardcoded version
 */
const bookDetailTheme: PageTheme = {
  name: 'book-detail',
  light: {
    primary: '#f97316', // orange-500 (middle of gradient)
    secondary: '#ef4444', // red-500 (end of gradient)
    background: {
      start: '#ffedd5',
      end: '#fed7aa',
    },
    accent: {
      start: '#f59e0b', // amber-500 (start of gradient)
      end: '#ef4444', // red-500 (end of gradient)
    },
    overlay: {
      light: 'rgba(255, 255, 255, 0.9)',
      dark: 'rgba(15, 23, 42, 0.95)',
    },
  },
  dark: {
    primary: '#fb923c', // orange-400
    secondary: '#f87171', // red-400
    background: {
      start: '#9a3412',
      end: '#7c2d12',
    },
    accent: {
      start: '#fbbf24', // amber-400
      end: '#f87171', // red-400
    },
    overlay: {
      light: 'rgba(154, 52, 18, 0.95)',
      dark: 'rgba(15, 23, 42, 0.98)',
    },
  },
};

/**
 * Free videos page theme - Vibrant purple
 */
const freeVideosTheme: PageTheme = {
  name: 'free-videos',
  light: {
    primary: '#7c3aed',
    secondary: '#a855f7',
    background: {
      start: '#faf5ff',
      end: '#f3e8ff',
    },
    accent: {
      start: '#a855f7',
      end: '#7c3aed',
    },
    overlay: {
      light: 'rgba(255, 255, 255, 0.9)',
      dark: 'rgba(15, 23, 42, 0.95)',
    },
  },
  dark: {
    primary: '#a78bfa',
    secondary: '#c084fc',
    background: {
      start: '#581c87',
      end: '#4c1d95',
    },
    accent: {
      start: '#c084fc',
      end: '#a78bfa',
    },
    overlay: {
      light: 'rgba(88, 28, 135, 0.95)',
      dark: 'rgba(15, 23, 42, 0.98)',
    },
  },
};

/**
 * About page theme - Calm green (Emerald Green)
 */
const aboutTheme: PageTheme = {
  name: 'about',
  light: {
    primary: '#059669',
    secondary: '#10b981',
    background: {
      start: '#ecfdf5',
      end: '#d1fae5',
    },
    accent: {
      start: '#34d399',
      end: '#10b981',
    },
    overlay: {
      light: 'rgba(236, 253, 245, 0.9)',
      dark: 'rgba(15, 23, 42, 0.95)',
    },
  },
  dark: {
    primary: '#34d399',
    secondary: '#6ee7b7',
    background: {
      start: '#064e3b',
      end: '#022c22',
    },
    accent: {
      start: '#6ee7b7',
      end: '#34d399',
    },
    overlay: {
      light: 'rgba(6, 78, 59, 0.95)',
      dark: 'rgba(2, 44, 34, 0.98)',
    },
  },
};

/**
 * Contact page theme - Friendly teal (Cyan)
 */
const contactTheme: PageTheme = {
  name: 'contact',
  light: {
    primary: '#0891b2',
    secondary: '#06b6d4',
    background: {
      start: '#ecfeff',
      end: '#cffafe',
    },
    accent: {
      start: '#22d3ee',
      end: '#06b6d4',
    },
    overlay: {
      light: 'rgba(236, 254, 255, 0.9)',
      dark: 'rgba(15, 23, 42, 0.95)',
    },
  },
  dark: {
    primary: '#22d3ee',
    secondary: '#67e8f9',
    background: {
      start: '#164e63',
      end: '#083344',
    },
    accent: {
      start: '#67e8f9',
      end: '#22d3ee',
    },
    overlay: {
      light: 'rgba(22, 78, 99, 0.95)',
      dark: 'rgba(8, 51, 68, 0.98)',
    },
  },
};

/**
 * Privacy policy page theme - Professional indigo-blue
 */
const privacyPolicyTheme: PageTheme = {
  name: 'privacy-policy',
  light: {
    primary: '#4f46e5', // indigo-600
    secondary: '#6366f1', // indigo-500
    background: {
      start: '#eef2ff',
      end: '#e0e7ff',
    },
    accent: {
      start: '#6366f1', // indigo-500
      end: '#4f46e5', // indigo-600
    },
    overlay: {
      light: 'rgba(255, 255, 255, 0.9)',
      dark: 'rgba(15, 23, 42, 0.95)',
    },
  },
  dark: {
    primary: '#818cf8', // indigo-400
    secondary: '#a5b4fc', // indigo-300
    background: {
      start: '#312e81',
      end: '#1e1b4b',
    },
    accent: {
      start: '#a5b4fc', // indigo-300
      end: '#818cf8', // indigo-400
    },
    overlay: {
      light: 'rgba(49, 46, 129, 0.95)',
      dark: 'rgba(30, 27, 75, 0.98)',
    },
  },
};

/**
 * Terms of service page theme - Professional rose/pink
 */
const termsOfServiceTheme: PageTheme = {
  name: 'terms-of-service',
  light: {
    primary: '#e11d48', // rose-600
    secondary: '#f43f5e', // rose-500
    background: {
      start: '#fff1f2',
      end: '#ffe4e6',
    },
    accent: {
      start: '#f43f5e', // rose-500
      end: '#e11d48', // rose-600
    },
    overlay: {
      light: 'rgba(255, 255, 255, 0.9)',
      dark: 'rgba(15, 23, 42, 0.95)',
    },
  },
  dark: {
    primary: '#fb7185', // rose-400
    secondary: '#fda4af', // rose-300
    background: {
      start: '#881337',
      end: '#9f1239',
    },
    accent: {
      start: '#fda4af', // rose-300
      end: '#fb7185', // rose-400
    },
    overlay: {
      light: 'rgba(136, 19, 55, 0.95)',
      dark: 'rgba(159, 18, 57, 0.98)',
    },
  },
};

/**
 * Map of page theme IDs to theme configurations
 */
export const PAGE_THEMES: Record<PageThemeId, PageTheme> = {
  'home': homeTheme,
  'courses': coursesTheme,
  'course-detail': courseDetailTheme,
  'books': booksTheme,
  'book-detail': bookDetailTheme,
  'free-videos': freeVideosTheme,
  'about': aboutTheme,
  'contact': contactTheme,
  'privacy-policy': privacyPolicyTheme,
  'terms-of-service': termsOfServiceTheme,
  'default': defaultTheme,
} as const;

/**
 * Get page theme by ID
 * @param themeId - Page theme identifier
 * @returns Page theme configuration
 */
export const getPageTheme = (themeId: PageThemeId): PageTheme => {
  return PAGE_THEMES[themeId] || PAGE_THEMES.default;
};

