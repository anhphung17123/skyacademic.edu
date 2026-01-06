import { LoadingProps } from '@/types/components';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

export const Loading = ({ size = 'md', fullScreen = false }: LoadingProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const spinner = (
    <div className="relative">
      <div className={clsx(
        sizeClasses[size],
        'border-4 border-accent-primary dark:border-accent-primary-dark border-t-accent-secondary dark:border-t-accent-secondary-dark rounded-full animate-spin'
      )} />
      <Loader2 className={clsx(
        sizeClasses[size],
        'absolute inset-0 text-accent-primary dark:text-accent-primary-dark animate-spin',
        '[animation-duration:1.5s]'
      )} />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/90 dark:bg-background-dark/90 backdrop-blur-sm z-50">
        <div className="text-center">
          {spinner}
          <p className="mt-4 text-sm text-text-secondary dark:text-text-secondary-dark animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {spinner}
      <p className="mt-4 text-sm text-text-secondary dark:text-text-secondary-dark animate-pulse">
        Loading...
      </p>
    </div>
  );
};
