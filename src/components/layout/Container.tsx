import { type ReactNode, memo } from 'react';
import { clsx } from 'clsx';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly size?: ContainerSize;
  readonly as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer';
}

const SIZE_CLASSES: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[90rem]',
  full: 'max-w-full',
} as const;

/**
 * Responsive container component with consistent padding and flexible sizing
 * Optimized for performance with memoization
 */
export const Container = memo<ContainerProps>(({ 
  children, 
  className, 
  size = 'lg',
  as: Component = 'div',
}: ContainerProps) => {
  return (
    <Component 
      className={clsx(
        'mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8 overflow-x-hidden',
        SIZE_CLASSES[size],
        className
      )}
    >
      {children}
    </Component>
  );
});

Container.displayName = 'Container';

