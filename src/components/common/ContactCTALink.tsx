import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants';

export type ContactCTAVariant = 'card' | 'button';

interface ContactCTALinkProps {
  variant?: ContactCTAVariant;
  /** For variant="card": icon shown in the left circle (e.g. UserCheck) */
  icon?: ReactNode;
  /** Main content. For card: e.g. 1-on-1 rate text. For button: optional custom label (default: contact.title) */
  children?: ReactNode;
  className?: string;
}

const cardClass =
  'flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 border-2 border-primary-200 dark:border-primary-700 shadow-md hover:shadow-xl hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-200 group';

const buttonClass =
  'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors';

export function ContactCTALink({
  variant = 'button',
  icon,
  children,
  className = '',
}: ContactCTALinkProps) {
  const { t } = useTranslation();

  const label = children ?? t('contact.title');

  if (variant === 'card') {
    return (
      <Link to={ROUTES.ABOUT_CONTACT} className={`${cardClass} ${className}`.trim()}>
        {icon && (
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg text-white [&>svg]:w-7 [&>svg]:h-7">
            {icon}
          </div>
        )}
        <div className="flex-1 text-center sm:text-left min-w-0">
          {typeof label === 'string' ? (
            <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white leading-snug">
              {label}
            </p>
          ) : (
            label
          )}
        </div>
        <span className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all">
          {t('contact.title')}
          <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    );
  }

  return (
    <Link to={ROUTES.ABOUT_CONTACT} className={`${buttonClass} ${className}`.trim()}>
      {label}
      <ArrowRight className="w-4 h-4" />
    </Link>
  );
}
