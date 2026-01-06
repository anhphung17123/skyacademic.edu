import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter } from 'lucide-react';
import { FilterBar, type FilterItem, type ActiveFilter } from '@/components/common/FilterBar';

interface BooksFiltersProps {
  readonly searchTerm: string;
  readonly onSearchChange: (value: string) => void;
  readonly languageFilter: string;
  readonly onLanguageFilterChange: (value: string) => void;
  readonly formatFilter: string;
  readonly onFormatFilterChange: (value: string) => void;
  readonly priceFilter: string;
  readonly onPriceFilterChange: (value: string) => void;
  readonly sortBy: string;
  readonly onSortByChange: (value: string) => void;
  readonly activeFiltersCount: number;
  readonly onClearFilters: () => void;
}

export const BooksFilters = ({
  searchTerm,
  onSearchChange,
  languageFilter,
  onLanguageFilterChange,
  formatFilter,
  onFormatFilterChange,
  priceFilter,
  onPriceFilterChange,
  sortBy,
  onSortByChange,
  activeFiltersCount,
  onClearFilters,
}: BooksFiltersProps) => {
  const { t } = useTranslation();

  const filters: FilterItem[] = useMemo(() => [
    {
      id: 'language',
      value: languageFilter,
      onChange: onLanguageFilterChange,
      options: [
        { value: 'all', label: t('books.allLanguages') },
        { value: 'english', label: t('books.english') },
        { value: 'vietnamese', label: t('books.vietnamese') },
        { value: 'bilingual', label: t('books.bilingual') },
      ],
      icon: Filter,
      priority: 1,
      minWidth: { mobile: '140px', tablet: '160px', desktop: '160px' },
    },
    {
      id: 'format',
      value: formatFilter,
      onChange: onFormatFilterChange,
      options: [
        { value: 'all', label: t('books.allFormats') },
        { value: 'physical', label: t('books.physical') },
        { value: 'digital', label: t('books.digital') },
        { value: 'both', label: t('books.both') },
      ],
      icon: Filter,
      priority: 2,
      minWidth: { mobile: '140px', tablet: '160px', desktop: '160px' },
    },
    {
      id: 'price',
      value: priceFilter,
      onChange: onPriceFilterChange,
      options: [
        { value: 'all', label: t('books.allPrices') },
        { value: 'under20', label: t('books.under20') },
        { value: '20to50', label: t('books.price20to50') },
        { value: 'over50', label: t('books.over50') },
      ],
      priority: 3,
      minWidth: { mobile: '120px', tablet: '140px', desktop: '140px' },
    },
    {
      id: 'sort',
      value: sortBy,
      onChange: onSortByChange,
      options: [
        { value: 'popular', label: t('books.sortPopular') },
        { value: 'newest', label: t('books.sortNewest') },
        { value: 'priceLow', label: t('books.sortPriceLow') },
        { value: 'priceHigh', label: t('books.sortPriceHigh') },
      ],
      priority: 4,
      minWidth: { mobile: '140px', tablet: '160px', desktop: '160px' },
    },
  ], [
    languageFilter,
    onLanguageFilterChange,
    formatFilter,
    onFormatFilterChange,
    priceFilter,
    onPriceFilterChange,
    sortBy,
    onSortByChange,
    t,
  ]);

  const activeFilters: ActiveFilter[] = useMemo(() => {
    const filters: ActiveFilter[] = [];

    if (languageFilter !== 'all') {
      filters.push({
        id: 'language',
        label: languageFilter === 'english' ? t('books.english') : languageFilter === 'vietnamese' ? t('books.vietnamese') : t('books.bilingual'),
        value: languageFilter,
        onRemove: () => onLanguageFilterChange('all'),
        color: 'blue',
      });
    }

    if (formatFilter !== 'all') {
      filters.push({
        id: 'format',
        label: formatFilter === 'physical' ? t('books.physical') : formatFilter === 'digital' ? t('books.digital') : t('books.both'),
        value: formatFilter,
        onRemove: () => onFormatFilterChange('all'),
        color: 'secondary',
      });
    }

    if (priceFilter !== 'all') {
      filters.push({
        id: 'price',
        label: priceFilter === 'under20' ? t('books.under20') : priceFilter === '20to50' ? t('books.price20to50') : t('books.over50'),
        value: priceFilter,
        onRemove: () => onPriceFilterChange('all'),
        color: 'success',
      });
    }

    return filters;
  }, [
    languageFilter,
    formatFilter,
    priceFilter,
    onLanguageFilterChange,
    onFormatFilterChange,
    onPriceFilterChange,
    t,
  ]);

  return (
    <FilterBar
      searchValue={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder={t('books.searchPlaceholder')}
      filters={filters}
      activeFilters={activeFilters}
      activeFiltersCount={activeFiltersCount}
      onClearAll={onClearFilters}
      showActiveFilters={activeFiltersCount > 0}
    />
  );
};
