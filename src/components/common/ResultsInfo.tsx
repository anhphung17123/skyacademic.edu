import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';

interface ResultsInfoProps {
  readonly count: number;
  readonly resultsLabel: string;
  readonly activeFiltersCount?: number;
  readonly hasActiveFilters?: boolean;
  readonly additionalInfo?: React.ReactNode;
  readonly onClearFilter?: () => void;
  readonly clearFilterLabel?: string;
  readonly className?: string;
}

/**
 * Reusable results info component showing count and active filters
 */
export const ResultsInfo = ({
  count,
  resultsLabel,
  activeFiltersCount,
  hasActiveFilters,
  additionalInfo,
  onClearFilter,
  clearFilterLabel,
  className,
}: ResultsInfoProps) => {
  const { t } = useTranslation();

  return (
    <div className={clsx('mb-6 flex items-center justify-between w-full', className)}>
      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base break-words min-w-0 flex-1">
        {t('common.showing')}{' '}
        <span className="font-semibold text-gray-900 dark:text-white">{count}</span> {resultsLabel}
        {hasActiveFilters && activeFiltersCount !== undefined && activeFiltersCount > 0 && (
          <span className="ml-2 text-xs font-medium text-primary-700 dark:text-primary-300 whitespace-nowrap">
            ({activeFiltersCount} {t('common.activeFilters')})
          </span>
        )}
        {additionalInfo && <span className="ml-2">{additionalInfo}</span>}
      </p>
      {onClearFilter && (
        <button
          onClick={onClearFilter}
          className="text-xs font-medium text-primary-700 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-200 hover:underline transition-colors flex-shrink-0 ml-2"
        >
          {clearFilterLabel || t('common.clearFilter')}
        </button>
      )}
    </div>
  );
};

