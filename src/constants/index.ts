/**
 * Application-wide constants
 */

export const STORAGE_KEYS = {
  THEME: 'skyacademy-theme',
  LANGUAGE: 'language',
} as const;

export const DEFAULT_VALUES = {
  LANGUAGE: 'en',
  THEME: 'system',
  CURRENCY: 'USD',
  THUMBNAIL: 'https://via.placeholder.com/640x360?text=Course',
  BOOK_COVER: 'https://via.placeholder.com/320x480?text=Book',
} as const;

export const SCROLL_THRESHOLD = {
  HEADER: 20,
} as const;

export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:language/:slug',
  PRODUCTS: '/products',
  BOOK_DETAIL: '/books/:slug',
  FLASHCARD_DETAIL: '/flashcards/:slug',
  FREE_VIDEOS: '/free-videos',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_SERVICE: '/terms-of-service',
} as const;

export const LANGUAGE_MAP = {
  en: 'en-US',
  vi: 'vi-VN',
} as const;

export const COURSE_CATEGORIES = {
  PRONUNCIATION: 'Pronunciation',
  COMMUNICATION: 'Communication English',
  IELTS: 'IELTS Preparation',
} as const;

export const FILTER_OPTIONS = {
  ALL: 'all',
  FREE: 'free',
  PAID: 'paid',
  ENGLISH: 'english',
  VIETNAMESE: 'vietnamese',
} as const;

export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
} as const;

