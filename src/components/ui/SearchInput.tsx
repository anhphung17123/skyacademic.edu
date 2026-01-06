import { InputHTMLAttributes, forwardRef } from 'react';
import { Search, X } from 'lucide-react';
import { clsx } from 'clsx';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
}

/**
 * Reusable search input component with icon and clear button
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, onClear, showClearButton = true, className, ...props }, ref) => {
    const handleClear = (): void => {
      onChange('');
      onClear?.();
    };

    return (
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted dark:text-muted-dark w-5 h-5 pointer-events-none" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={clsx(
            'w-full pl-12 pr-10 py-3.5 bg-surface dark:bg-surface-dark border border-border-subtle dark:border-border-subtle-dark rounded-xl',
            'text-text-primary dark:text-text-primary-dark placeholder-text-muted dark:placeholder-text-muted-dark',
            'focus:ring-2 focus:ring-accent-primary dark:focus:ring-accent-primary-dark focus:border-transparent transition-all',
            className
          )}
          {...props}
        />
        {showClearButton && value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted hover:text-text-primary dark:text-muted-dark dark:hover:text-text-primary-dark transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

