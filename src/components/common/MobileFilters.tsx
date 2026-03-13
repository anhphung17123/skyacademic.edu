import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Select } from '@/components/ui/Select';
import type { FilterItem } from './FilterBar';

interface MobileFiltersProps {
  readonly filters: FilterItem[];
  readonly hasActiveFilters: boolean;
  readonly activeFiltersCount: number;
  readonly activeFiltersLength: number;
  readonly onClearAll?: () => void;
}

export const MobileFilters = ({
  filters,
  hasActiveFilters,
  activeFiltersCount,
  activeFiltersLength,
  onClearAll,
}: MobileFiltersProps) => {
  const { t } = useTranslation();

  return (
    <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
      {filters.map((filter) => (
        <div key={filter.id}>
          <Select
            value={filter.value}
            onChange={filter.onChange}
            options={filter.options}
            icon={filter.icon}
          />
        </div>
      ))}

      {hasActiveFilters && onClearAll && (
        <button
          onClick={onClearAll}
          className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400 transition-colors hover:bg-primary-100 dark:hover:bg-primary-900/50"
        >
          <X className="h-4 w-4" />
          {t('common.clearFilters')} ({activeFiltersCount || activeFiltersLength})
        </button>
      )}
    </div>
  );
};
