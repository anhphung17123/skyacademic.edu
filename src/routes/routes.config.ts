import { lazy } from 'react';
import { ROUTES as APP_ROUTES } from '@/constants';

/**
 * Route configuration for the application
 * Centralizes route definitions and lazy loading
 */

// Eager load Home page (most common entry point)
import { Home } from '@/pages/Home';

// Lazy load other pages for code splitting
export const Courses = lazy(() => import('@/pages/Courses').then((module) => ({ default: module.Courses })));
export const CourseDetail = lazy(() => import('@/pages/CourseDetail').then((module) => ({ default: module.CourseDetail })));
export const Books = lazy(() => import('@/pages/Books').then((module) => ({ default: module.Books })));
export const BookDetail = lazy(() => import('@/pages/BookDetail').then((module) => ({ default: module.BookDetail })));
export const FreeVideos = lazy(() => import('@/pages/FreeVideos').then((module) => ({ default: module.FreeVideos })));
export const About = lazy(() => import('@/pages/About').then((module) => ({ default: module.About })));
export const Contact = lazy(() => import('@/pages/Contact').then((module) => ({ default: module.Contact })));
export const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy').then((module) => ({ default: module.PrivacyPolicy })));
export const TermsOfService = lazy(() => import('@/pages/TermsOfService').then((module) => ({ default: module.TermsOfService })));

// Export Home as regular component (not lazy)
export { Home };

/**
 * Route paths configuration
 * Re-export from constants for consistency
 */
export const ROUTES = APP_ROUTES;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];

