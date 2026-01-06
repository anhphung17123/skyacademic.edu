import { AlertCircle, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { clsx } from 'clsx';

export interface ErrorStateProps {
  readonly error: string | null;
  readonly onRetry?: () => void;
  readonly className?: string;
}

/**
 * Reusable error state component with enhanced UI
 */
export const ErrorState = ({ error, onRetry, className }: ErrorStateProps) => {
  const { t } = useTranslation();

  return (
    <div className={clsx('text-center py-16 md:py-24', className)}>
      <div className="inline-flex items-center justify-center w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-error to-error/80 dark:from-error-dark/30 dark:to-error-dark/30 rounded-full mb-6 shadow-lg animate-scale-in">
        <AlertCircle className="w-14 h-14 md:w-16 md:h-16 text-error dark:text-error-dark" />
      </div>
      <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary dark:text-text-primary-dark mb-3">
        {t('common.errorTitle')}
      </h3>
      <p className="text-error dark:text-error-dark mb-8 max-w-md mx-auto text-lg">
        {error || t('common.error')}
      </p>
      {onRetry && (
        <Button 
          onClick={onRetry} 
          variant="primary"
          className="inline-flex items-center gap-2 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <RefreshCw className="w-4 h-4" />
          {t('common.retry')}
        </Button>
      )}
    </div>
  );
};

