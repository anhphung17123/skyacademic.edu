import { ButtonHTMLAttributes, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const { t } = useTranslation();
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-offset-background-dark disabled:opacity-50 disabled:cursor-not-allowed border border-border-subtle dark:border-border-subtle-dark';

  const variants = {
    primary:
      'bg-accent-primary text-surface hover:bg-accent-secondary focus:ring-accent-primary shadow-sm hover:shadow dark:bg-accent-primary-dark dark:text-surface-dark dark:hover:bg-accent-secondary-dark dark:focus:ring-accent-primary-dark',
    secondary:
      'bg-accent-secondary text-surface hover:bg-accent-primary focus:ring-accent-secondary shadow-sm hover:shadow dark:bg-accent-secondary-dark dark:text-surface-dark dark:hover:bg-accent-primary-dark dark:focus:ring-accent-secondary-dark',
    ghost:
      'bg-transparent text-text-primary hover:bg-elevated focus:ring-border-strong dark:text-text-primary-dark dark:hover:bg-elevated-dark dark:focus:ring-border-strong-dark',
    danger:
      'bg-error text-surface hover:bg-error focus:ring-error shadow-sm hover:shadow dark:bg-error-dark dark:text-surface-dark dark:hover:bg-error-dark dark:focus:ring-error-dark',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {t('common.loading')}
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

