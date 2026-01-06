import { type ReactNode, memo } from 'react';
import { clsx } from 'clsx';
import { useTheme } from '@/contexts/theme-context';

export type SectionPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type SectionBackground = 'default' | 'muted' | 'gradient' | 'transparent';

export interface SectionProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly padding?: SectionPadding;
  readonly background?: SectionBackground;
  readonly as?: 'section' | 'div' | 'article' | 'aside';
  readonly id?: string;
}

const PADDING_CLASSES: Record<SectionPadding, string> = {
  none: '',
  sm: 'py-6 sm:py-8',
  md: 'py-8 sm:py-12',
  lg: 'py-12 sm:py-16 lg:py-20',
  xl: 'py-16 sm:py-20 lg:py-24',
  '2xl': 'py-20 sm:py-24 lg:py-32',
} as const;

const BACKGROUND_CLASSES: Record<SectionBackground, string> = {
  default: 'dark:bg-gray-900',
  muted: 'dark:bg-gray-800/50',
  gradient: 'dark:from-gray-900 dark:via-gray-800 dark:to-gray-900',
  transparent: 'bg-transparent',
} as const;

const LIGHT_BACKGROUND_STYLES: Record<SectionBackground, React.CSSProperties> = {
  default: {
    background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
  },
  muted: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)',
  },
  gradient: {
    background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)',
  },
  transparent: {
    background: 'transparent',
  },
} as const;

/**
 * Section wrapper component for consistent spacing and backgrounds
 * Optimized for performance with memoization and flexible configuration
 */
export const Section = memo<SectionProps>(({
  children,
  className,
  padding = 'md',
  background = 'default',
  as: Component = 'section',
  id,
}: SectionProps) => {
  const { resolvedTheme } = useTheme();
  const isLightMode = resolvedTheme === 'light';
  const lightStyle = isLightMode && background !== 'transparent' 
    ? LIGHT_BACKGROUND_STYLES[background] 
    : undefined;

  return (
    <Component
      id={id}
      className={clsx(
        PADDING_CLASSES[padding],
        BACKGROUND_CLASSES[background],
        'transition-colors duration-200 ease-in-out',
        'w-full max-w-full overflow-x-hidden',
        className
      )}
      style={lightStyle}
    >
      {children}
    </Component>
  );
});

Section.displayName = 'Section';

