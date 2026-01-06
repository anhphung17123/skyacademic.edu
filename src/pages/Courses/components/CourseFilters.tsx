import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, GraduationCap, DollarSign } from 'lucide-react';
import { FilterBar, type FilterItem, type ActiveFilter } from '@/components/common/FilterBar';

interface CourseFiltersProps {
  readonly searchTerm: string;
  readonly onSearchChange: (value: string) => void;
  readonly languageFilter: string;
  readonly onLanguageFilterChange: (value: string) => void;
  readonly levelFilter: string;
  readonly onLevelFilterChange: (value: string) => void;
  readonly priceFilter: string;
  readonly onPriceFilterChange: (value: string) => void;
  readonly categoryFilter: string;
  readonly onCategoryFilterChange: (value: string) => void;
  readonly showFilters: boolean;
  readonly onToggleFilters: () => void;
  readonly hasActiveFilters: boolean;
  readonly activeFiltersCount: number;
  readonly onClearFilters: () => void;
}

export const CourseFilters = ({
  searchTerm,
  onSearchChange,
  languageFilter,
  onLanguageFilterChange,
  levelFilter,
  onLevelFilterChange,
  priceFilter,
  onPriceFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  hasActiveFilters,
  activeFiltersCount,
  onClearFilters,
}: CourseFiltersProps) => {
  const { t } = useTranslation();

  const filters: FilterItem[] = useMemo(() => [
    {
      id: 'language',
      value: languageFilter,
      onChange: onLanguageFilterChange,
      options: [
        { value: 'all', label: t('courses.allLanguages') },
        { value: 'english', label: t('courses.english') },
        { value: 'vietnamese', label: t('courses.vietnamese') },
        { value: 'bilingual', label: t('courses.bilingual') },
      ],
      icon: BookOpen,
      priority: 1,
      minWidth: { mobile: '140px', tablet: '160px', desktop: '160px' },
    },
    {
      id: 'category',
      value: categoryFilter,
      onChange: onCategoryFilterChange,
      options: [
        { value: 'all', label: t('courses.allCategories') },
        { value: 'Pronunciation', label: t('courses.categoryPronunciation') },
        { value: 'Communication English', label: t('courses.categoryCommunication') },
        { value: 'IELTS Preparation', label: t('courses.categoryIelts') },
      ],
      icon: BookOpen,
      priority: 2,
      minWidth: { mobile: '160px', tablet: '180px', desktop: '180px' },
    },
    {
      id: 'level',
      value: levelFilter,
      onChange: onLevelFilterChange,
      options: [
        { value: 'all', label: t('courses.allLevels') },
        { value: 'beginner', label: t('courses.beginner') },
        { value: 'intermediate', label: t('courses.intermediate') },
        { value: 'advanced', label: t('courses.advanced') },
      ],
      icon: GraduationCap,
      priority: 3,
      minWidth: { mobile: '140px', tablet: '160px', desktop: '160px' },
    },
    {
      id: 'price',
      value: priceFilter,
      onChange: onPriceFilterChange,
      options: [
        { value: 'all', label: t('courses.allPrices') },
        { value: 'free', label: t('courses.free') },
        { value: 'paid', label: t('courses.paid') },
      ],
      icon: DollarSign,
      priority: 4,
      minWidth: { mobile: '120px', tablet: '140px', desktop: '140px' },
    },
  ], [
    languageFilter,
    onLanguageFilterChange,
    categoryFilter,
    onCategoryFilterChange,
    levelFilter,
    onLevelFilterChange,
    priceFilter,
    onPriceFilterChange,
    t,
  ]);

  const activeFilters: ActiveFilter[] = useMemo(() => {
    const filters: ActiveFilter[] = [];

    if (languageFilter !== 'all') {
      filters.push({
        id: 'language',
        label: languageFilter === 'english' ? t('courses.english') : languageFilter === 'vietnamese' ? t('courses.vietnamese') : t('courses.bilingual'),
        value: languageFilter,
        onRemove: () => onLanguageFilterChange('all'),
        color: 'blue',
      });
    }

    if (categoryFilter !== 'all') {
      filters.push({
        id: 'category',
        label: categoryFilter === 'Pronunciation'
          ? t('courses.categoryPronunciation')
          : categoryFilter === 'Communication English'
          ? t('courses.categoryCommunication')
          : categoryFilter === 'IELTS Preparation'
          ? t('courses.categoryIelts')
          : categoryFilter,
        value: categoryFilter,
        onRemove: () => onCategoryFilterChange('all'),
        color: 'secondary',
      });
    }

    if (levelFilter !== 'all') {
      filters.push({
        id: 'level',
        label: t(`courses.${levelFilter}`),
        value: levelFilter,
        onRemove: () => onLevelFilterChange('all'),
        color: 'secondary',
      });
    }

    if (priceFilter !== 'all') {
      filters.push({
        id: 'price',
        label: priceFilter === 'free' ? t('courses.free') : t('courses.paid'),
        value: priceFilter,
        onRemove: () => onPriceFilterChange('all'),
        color: 'success',
      });
    }

    return filters;
  }, [
    languageFilter,
    categoryFilter,
    levelFilter,
    priceFilter,
    onLanguageFilterChange,
    onCategoryFilterChange,
    onLevelFilterChange,
    onPriceFilterChange,
    t,
  ]);

  return (
    <FilterBar
      searchValue={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder={t('courses.searchPlaceholder')}
      filters={filters}
      activeFilters={activeFilters}
      activeFiltersCount={activeFiltersCount}
      onClearAll={onClearFilters}
      showActiveFilters={hasActiveFilters}
    />
  );
};
