import { type ReactNode, memo, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface HorizontalScrollProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly showControls?: boolean;
  readonly scrollStep?: number;
  readonly isIconShown?: boolean;
}

/**
 * Horizontal scroll container component for mobile and tablet
 * Provides smooth horizontal scrolling with optional navigation controls
 */
export const HorizontalScroll = memo<HorizontalScrollProps>(({
  children,
  className,
  showControls = true,
  scrollStep = 300,
  isIconShown = true,
}: HorizontalScrollProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollLeftRef = useRef<HTMLButtonElement>(null);
  const scrollRightRef = useRef<HTMLButtonElement>(null);

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const isAtStart = scrollLeft <= 0;
    const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1;

    if (scrollLeftRef.current) {
      scrollLeftRef.current.disabled = isAtStart;
      scrollLeftRef.current.classList.toggle('opacity-50', isAtStart);
      scrollLeftRef.current.classList.toggle('cursor-not-allowed', isAtStart);
    }

    if (scrollRightRef.current) {
      scrollRightRef.current.disabled = isAtEnd;
      scrollRightRef.current.classList.toggle('opacity-50', isAtEnd);
      scrollRightRef.current.classList.toggle('cursor-not-allowed', isAtEnd);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollButtons();
    container.addEventListener('scroll', checkScrollButtons, { passive: true });
    window.addEventListener('resize', checkScrollButtons, { passive: true });

    return () => {
      container.removeEventListener('scroll', checkScrollButtons);
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -scrollStep : scrollStep;
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className={clsx('relative', className)}>
      {showControls && isIconShown && (
        <>
          <button
            ref={scrollLeftRef}
            onClick={() => scroll('left')}
            className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            ref={scrollRightRef}
            onClick={() => scroll('right')}
            className="absolute right-1 md:right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </>
      )}
      <div
        ref={scrollContainerRef}
        className={clsx(
          'overflow-x-auto overflow-y-hidden',
          'scrollbar-hide',
          'scroll-smooth',
          'flex flex-nowrap gap-6 items-stretch',
          'pb-4 px-8',
          'snap-x snap-mandatory',
          '[&>*]:snap-start [&>*]:flex-shrink-0',
          'w-full max-w-full'
        )}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
});

HorizontalScroll.displayName = 'HorizontalScroll';

