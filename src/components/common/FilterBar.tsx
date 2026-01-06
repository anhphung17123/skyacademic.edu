import { useState, useMemo, useEffect, useRef, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { LucideIcon } from 'lucide-react';

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
  readonly priority?: number; // Lower number = higher priority (shown first on smaller screens)
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

/**
 * Reusable FilterBar component with intelligent responsive design
 * 
 * Responsive Strategy:
 * - Mobile (< 768px): Collapsible dropdown with all filters stacked
 * - Tablet (768px - 1024px): Smart layout - shows priority filters in row, rest in dropdown
 * - Desktop (> 1024px): All filters in a row with intelligent wrapping
 */
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

  // Close tablet dropdown when clicking outside
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
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isTabletMoreOpen]);

  // Sort filters by priority (lower number = higher priority)
  const sortedFilters = useMemo(() => {
    return [...filters].sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));
  }, [filters]);

  // For tablet: show first 2-3 priority filters, rest in "More" dropdown
  const tabletVisibleFilters = useMemo(() => {
    return sortedFilters.slice(0, 3);
  }, [sortedFilters]);

  const tabletHiddenFilters = useMemo(() => {
    return sortedFilters.slice(3);
  }, [sortedFilters]);

  const getFilterWidth = (filter: FilterItem): string => {
    if (filter.minWidth) {
      const mobile = filter.minWidth.mobile || '140px';
      const tablet = filter.minWidth.tablet || '160px';
      const desktop = filter.minWidth.desktop || '180px';
      return `min-w-[${mobile}] md:min-w-[${tablet}] lg:min-w-[${desktop}]`;
    }
    // Default responsive widths
    return 'min-w-[140px] md:min-w-[160px] lg:min-w-[180px]';
  };

  const getFilterColor = (color?: string): string => {
    switch (color) {
      case 'primary':
        return 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300';
      case 'secondary':
        return 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300';
      case 'success':
        return 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300';
      case 'blue':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      default:
        return 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300';
    }
  };

  return (
    <div className={clsx(
      'bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 md:p-6 mb-8 border border-gray-100 dark:border-gray-800',
      className
    )}>
      {/* Search and Main Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-0">
          <SearchInput
            value={searchValue}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          />
        </div>

        {/* Desktop Filters (lg and above) - All filters visible with wrapping */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-wrap">
          {sortedFilters.map((filter) => (
            <div
              key={filter.id}
              className={clsx('flex-shrink-0', getFilterWidth(filter))}
            >
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
          )}
        </div>

        {/* Tablet Filters (md to lg) - Priority filters visible, rest in dropdown */}
        <div className="hidden md:flex lg:hidden items-center gap-2 flex-wrap">
          {tabletVisibleFilters.map((filter) => (
            <div
              key={filter.id}
              className={clsx('flex-shrink-0', getFilterWidth(filter))}
            >
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
                <ChevronDown className={clsx(
                  'h-4 w-4 transition-transform',
                  isTabletMoreOpen && 'transform rotate-180'
                )} />
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

        {/* Mobile Filter Button - Only show on mobile (< md), not tablet */}
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

      {/* Mobile Filters Dropdown - Only show on mobile (< md), not tablet */}
      {isMobileFiltersOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
          {sortedFilters.map((filter) => (
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
              {t('common.clearFilters')} ({activeFiltersCount || activeFilters.length})
            </button>
          )}
        </div>
      )}

      {/* Active Filters Display */}
      {showActiveFilters && activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
            {t('courses.activeFilters')}
          </span>
          {activeFilters.map((filter) => (
            <span
              key={filter.id}
              className={clsx(
                'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm flex-shrink-0',
                getFilterColor(filter.color)
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
              <span className="truncate">"{searchValue}"</span>
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
      )}
    </div>
  );
};

