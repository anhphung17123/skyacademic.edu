/**
 * Theme-aware class helpers to avoid repeated isLightMode ternaries.
 * Prefer Tailwind dark: when possible; use these for complex or conditional sets.
 */

import type { ThemeMode } from '@/types/core';

export interface ThemeClasses {
  light: string;
  dark: string;
}

export function themeClasses(mode: ThemeMode, classes: ThemeClasses): string {
  return mode === "light" ? classes.light : classes.dark;
}
