import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, Sparkles } from 'lucide-react';
import { FilterBar, type FilterItem, type ActiveFilter } from '@/components/common/FilterBar';

interface VideoFiltersProps {
  readonly searchTerm: string;
  readonly onSearchChange: (value: string) => void;
  readonly selectedCategory: string;
  readonly onCategoryChange: (value: string) => void;
  readonly categories: string[];
}

export const VideoFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: VideoFiltersProps) => {
  const { t } = useTranslation();

  const categoryOptions = useMemo(() => [
    { value: 'all', label: t('freeVideos.allCategories') },
    ...categories.map((category) => ({
      value: category,
      label: t(`freeVideos.category.${category}`),
    })),
  ], [categories, t]);

  const filters: FilterItem[] = useMemo(() => [
    {
      id: 'category',
      value: selectedCategory,
      onChange: onCategoryChange,
      options: categoryOptions,
      icon: Filter,
      priority: 1,
      minWidth: { mobile: '140px', tablet: '160px', desktop: '200px' },
    },
  ], [selectedCategory, onCategoryChange, categoryOptions]);

  const activeFilters: ActiveFilter[] = useMemo(() => {
    if (selectedCategory === 'all') {
      return [];
    }
    return [
      {
        id: 'category',
        label: t(`freeVideos.category.${selectedCategory}`),
        value: selectedCategory,
        onRemove: () => onCategoryChange('all'),
        color: 'primary',
      },
    ];
  }, [selectedCategory, onCategoryChange, t]);

  const hasActiveCategory = selectedCategory !== 'all';
  const activeFiltersCount = hasActiveCategory ? 1 : 0;

  return (
    <div className="mb-8">
      <FilterBar
        searchValue={searchTerm}
        onSearchChange={onSearchChange}
        searchPlaceholder={t('freeVideos.searchPlaceholder')}
        filters={filters}
        activeFilters={activeFilters}
        activeFiltersCount={activeFiltersCount}
        onClearAll={hasActiveCategory ? () => onCategoryChange('all') : undefined}
        showActiveFilters={hasActiveCategory}
        className="mb-4"
      />
      
      {/* Quick category pills */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-primary-600 text-white shadow-md hover:bg-primary-700'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {t('freeVideos.allVideos')}
          </button>
          {categories.slice(0, 5).map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-md hover:bg-primary-700'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {t(`freeVideos.category.${category}`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
