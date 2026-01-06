import { type ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

export interface PageTransitionProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * Page transition wrapper component for smooth page changes
 */
export const PageTransition = ({ children, className }: PageTransitionProps) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
    // Use requestAnimationFrame for smooth transition
    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });

    return () => cancelAnimationFrame(frameId);
  }, [location.pathname]);

  return (
    <div
      className={clsx(
        'transition-opacity duration-200 ease-in-out',
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      {children}
    </div>
  );
};

