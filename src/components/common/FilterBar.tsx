import { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { LucideIcon } from 'lucide-react';
import { MobileFilters } from './MobileFilters';
import { ActiveFiltersDisplay } from './ActiveFiltersDisplay';

export interface FilterOption {
  readonly value: string;
  readonly label: string;
}

export interface FilterItem {
  readonly id: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly options: FilterOption[];
  readonly icon?: LucideIcon;
  readonly label?: string;
  readonly priority?: number;
  readonly minWidth?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
}

export interface ActiveFilter {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly onRemove: () => void;
  readonly color?: 'primary' | 'secondary' | 'success' | 'blue';
}

export interface FilterBarProps {
  readonly searchValue: string;
  readonly onSearchChange: (value: string) => void;
  readonly searchPlaceholder: string;
  readonly filters: FilterItem[];
  readonly activeFilters?: ActiveFilter[];
  readonly activeFiltersCount?: number;
  readonly onClearAll?: () => void;
  readonly showActiveFilters?: boolean;
  readonly className?: string;
}

const FILTER_WIDTH_CLASSES = 'min-w-[140px] md:min-w-[160px] lg:min-w-[180px]';

export const FilterBar = ({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  filters,
  activeFilters = [],
  activeFiltersCount = 0,
  onClearAll,
  showActiveFilters = true,
  className,
}: FilterBarProps) => {
  const { t } = useTranslation();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isTabletMoreOpen, setIsTabletMoreOpen] = useState(false);
  const tabletDropdownRef = useRef<HTMLDivElement>(null);

  const hasActiveFilters = activeFiltersCount > 0 || activeFilters.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        tabletDropdownRef.current &&
        !tabletDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTabletMoreOpen(false);
      }
    };

    if (isTabletMoreOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isTabletMoreOpen]);

  const sortedFilters = useMemo(() => {
    return [...filters].sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));
  }, [filters]);

  const tabletVisibleFilters = useMemo(() => sortedFilters.slice(0, 3), [sortedFilters]);
  const tabletHiddenFilters = useMemo(() => sortedFilters.slice(3), [sortedFilters]);

  const clearButton = hasActiveFilters && onClearAll && (
    <button
      onClick={onClearAll}
      className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/30 flex-shrink-0"
    >
      <X className="h-4 w-4" />
      <span className="hidden xl:inline">{t('common.clearFilters')}</span>
      <span className="xl:hidden">{t('common.clear')}</span>
      {activeFiltersCount > 0 && (
        <span className="w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
          {activeFiltersCount}
        </span>
      )}
    </button>
  );

  return (
    <div className={clsx(
      'bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 md:p-6 mb-8 border border-gray-100 dark:border-gray-800',
      className
    )}>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <SearchInput
            value={searchValue}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          />
        </div>

        {/* Desktop Filters (lg+) */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-wrap">
          {sortedFilters.map((filter) => (
            <div key={filter.id} className={clsx('flex-shrink-0', FILTER_WIDTH_CLASSES)}>
              <Select
                value={filter.value}
                onChange={filter.onChange}
                options={filter.options}
                icon={filter.icon}
              />
            </div>
          ))}
          {clearButton}
        </div>

        {/* Tablet Filters (md to lg) */}
        <div className="hidden md:flex lg:hidden items-center gap-2 flex-wrap">
          {tabletVisibleFilters.map((filter) => (
            <div key={filter.id} className={clsx('flex-shrink-0', FILTER_WIDTH_CLASSES)}>
              <Select
                value={filter.value}
                onChange={filter.onChange}
                options={filter.options}
                icon={filter.icon}
              />
            </div>
          ))}

          {tabletHiddenFilters.length > 0 && (
            <div className="relative" ref={tabletDropdownRef}>
              <button
                onClick={() => setIsTabletMoreOpen(!isTabletMoreOpen)}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                <span>{t('common.moreFilters')}</span>
                <ChevronDown className={clsx('h-4 w-4 transition-transform', isTabletMoreOpen && 'transform rotate-180')} />
                {tabletHiddenFilters.some(f => f.value !== 'all') && (
                  <span className="w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                    {tabletHiddenFilters.filter(f => f.value !== 'all').length}
                  </span>
                )}
              </button>
              {isTabletMoreOpen && (
                <div className="absolute top-full right-0 mt-2 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 min-w-[200px]">
                  <div className="space-y-3">
                    {tabletHiddenFilters.map((filter) => (
                      <div key={filter.id} className="w-full">
                        <Select
                          value={filter.value}
                          onChange={filter.onChange}
                          options={filter.options}
                          icon={filter.icon}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {hasActiveFilters && onClearAll && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/30 flex-shrink-0"
            >
              <X className="h-4 w-4" />
              <span>{t('common.clear')}</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span>{t('common.filters')}</span>
          {hasActiveFilters && (
            <span className="w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
              {activeFiltersCount || activeFilters.length}
            </span>
          )}
        </button>
      </div>

      {isMobileFiltersOpen && (
        <MobileFilters
          filters={sortedFilters}
          hasActiveFilters={hasActiveFilters}
          activeFiltersCount={activeFiltersCount}
          activeFiltersLength={activeFilters.length}
          onClearAll={onClearAll}
        />
      )}

      {showActiveFilters && (
        <ActiveFiltersDisplay
          activeFilters={activeFilters}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onClearAll={onClearAll}
        />
      )}
    </div>
  );
};
