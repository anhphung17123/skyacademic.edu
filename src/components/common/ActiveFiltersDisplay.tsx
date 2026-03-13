import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import type { ActiveFilter } from './FilterBar';

const FILTER_COLOR_MAP: Record<string, string> = {
  primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
  secondary: 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300',
  success: 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300',
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
};

const DEFAULT_FILTER_COLOR = FILTER_COLOR_MAP.primary;

interface ActiveFiltersDisplayProps {
  readonly activeFilters: ActiveFilter[];
  readonly searchValue: string;
  readonly onSearchChange: (value: string) => void;
  readonly onClearAll?: () => void;
}

export const ActiveFiltersDisplay = ({
  activeFilters,
  searchValue,
  onSearchChange,
  onClearAll,
}: ActiveFiltersDisplayProps) => {
  const { t } = useTranslation();

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
        {t('courses.activeFilters')}
      </span>
      {activeFilters.map((filter) => (
        <span
          key={filter.id}
          className={clsx(
            'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm flex-shrink-0',
            FILTER_COLOR_MAP[filter.color ?? ''] ?? DEFAULT_FILTER_COLOR
          )}
        >
          <span className="whitespace-nowrap">{filter.label}</span>
          <button
            onClick={filter.onRemove}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
            aria-label={`Remove ${filter.label} filter`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      {searchValue && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm flex-shrink-0 max-w-full">
          <span className="truncate">&quot;{searchValue}&quot;</span>
          <button
            onClick={() => onSearchChange('')}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
            aria-label="Clear search"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
      {onClearAll && (
        <button
          onClick={onClearAll}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex-shrink-0"
        >
          {t('common.clearAll')}
        </button>
      )}
    </div>
  );
};
