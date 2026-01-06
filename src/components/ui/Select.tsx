import { SelectHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { LucideIcon } from 'lucide-react';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

/**
 * Reusable select component with optional icon
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ value, onChange, options, icon: Icon, iconPosition = 'left', className, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
      onChange(e.target.value);
    };

    const iconPadding = Icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '';

    return (
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted dark:text-muted-dark w-5 h-5 pointer-events-none" />
        )}
        <select
          ref={ref}
          value={value}
          onChange={handleChange}
          className={clsx(
            'w-full px-4 py-3.5 bg-surface dark:bg-surface-dark border border-border-subtle dark:border-border-subtle-dark rounded-xl',
            'text-text-primary dark:text-text-primary-dark font-medium',
            'appearance-none cursor-pointer',
            'hover:border-accent-primary focus:ring-2 focus:ring-accent-primary focus:border-transparent dark:hover:border-accent-primary-dark dark:focus:ring-accent-primary-dark transition-all',
            iconPadding,
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {Icon && iconPosition === 'right' && (
          <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted dark:text-muted-dark w-5 h-5 pointer-events-none" />
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

