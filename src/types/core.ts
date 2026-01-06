/**
 * Core domain types used throughout the application
 */

export type Language = 'en' | 'vi' | 'bilingual';

export type Level = 'beginner' | 'intermediate' | 'advanced' | 'kids' | 'teens' | 'adults';

export type BookFormat = 'physical' | 'digital' | 'both';

export type CourseType = 'free_youtube' | 'paid_classroom' | 'paid_digital' | 'membership';

export type DeliveryMode = 'onsite' | 'online' | 'hybrid';

export type ViewMode = 'grid' | 'list';

export type ThemeMode = 'light' | 'dark';

export type ThemePreference = ThemeMode | 'system';