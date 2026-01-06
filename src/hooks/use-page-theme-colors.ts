/**
 * Hook to get page theme colors as CSS-compatible values
 * Useful for inline styles or programmatic color access
 */

import { useMemo } from 'react';
import { usePageTheme } from '@/contexts/page-theme-context';

/**
 * CSS-compatible color values from page theme
 */
export interface PageThemeColorValues {
  /** Primary color */
  primary: string;
  /** Secondary color */
  secondary: string;
  /** Background gradient start */
  bgStart: string;
  /** Background gradient end */
  bgEnd: string;
  /** Accent gradient start */
  accentStart: string;
  /** Accent gradient end */
  accentEnd: string;
  /** Light overlay color */
  overlayLight: string;
  /** Dark overlay color */
  overlayDark: string;
  /** Current overlay based on theme mode */
  overlay: string;
  /** Background gradient as CSS value */
  backgroundGradient: string;
  /** Accent gradient as CSS value */
  accentGradient: string;
}

/**
 * Hook to get page theme colors as CSS-compatible values
 * @returns Page theme color values
 */
export const usePageThemeColors = (): PageThemeColorValues => {
  const { getColors, themeMode } = usePageTheme();
  const colors = getColors();

  return useMemo<PageThemeColorValues>(
    () => ({
      primary: colors.primary,
      secondary: colors.secondary,
      bgStart: colors.background.start,
      bgEnd: colors.background.end,
      accentStart: colors.accent.start,
      accentEnd: colors.accent.end,
      overlayLight: colors.overlay.light,
      overlayDark: colors.overlay.dark,
      overlay: themeMode === 'dark' ? colors.overlay.dark : colors.overlay.light,
      backgroundGradient: `linear-gradient(135deg, ${colors.background.start} 0%, ${colors.background.end} 100%)`,
      accentGradient: `linear-gradient(135deg, ${colors.accent.start} 0%, ${colors.accent.end} 100%)`,
    }),
    [colors, themeMode]
  );
};

