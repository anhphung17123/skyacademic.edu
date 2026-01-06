import { type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { clsx } from 'clsx';

export interface EmptyStateProps {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description?: string;
  readonly action?: {
    readonly label: string;
    readonly onClick: () => void;
  };
  readonly className?: string;
}

/**
 * Reusable empty state component with enhanced UI
 */
export const EmptyState = ({ icon: Icon, title, description, action, className }: EmptyStateProps) => {
  return (
    <div className={clsx('text-center py-16 md:py-24', className)}>
      <div className="inline-flex items-center justify-center w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-surface to-elevated dark:from-surface-dark dark:to-elevated-dark rounded-full mb-6 shadow-lg animate-scale-in">
        <Icon className="w-14 h-14 md:w-16 md:h-16 text-muted dark:text-muted-dark" />
      </div>
      <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary dark:text-text-primary-dark mb-3">
        {title}
      </h3>
      {description && (
        <p className="text-text-secondary dark:text-text-secondary-dark mb-8 max-w-md mx-auto text-lg leading-relaxed">
          {description}
        </p>
      )}
      {action && (
        <Button 
          onClick={action.onClick} 
          variant="primary"
          className="animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};

