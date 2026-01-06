import { type ReactNode, memo } from 'react';
import { clsx } from 'clsx';
import { Container, type ContainerSize } from './Container';

export interface PageContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly containerSize?: ContainerSize;
  readonly fullHeight?: boolean;
  readonly as?: 'div' | 'main' | 'article';
}

/**
 * Page container component combining Section and Container
 * Provides consistent page-level spacing and layout
 * Optimized for performance with memoization
 */
export const PageContainer = memo<PageContainerProps>(({
  children,
  className,
  containerSize = 'lg',
  fullHeight = true,
  as: Component = 'div',
}: PageContainerProps) => {
  return (
    <Component 
      className={clsx(
        fullHeight && 'min-h-screen',
        'w-full max-w-full overflow-x-hidden',
        className
      )}
    >
      <Container size={containerSize}>{children}</Container>
    </Component>
  );
});

PageContainer.displayName = 'PageContainer';

