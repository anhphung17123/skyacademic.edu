import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Sparkles } from 'lucide-react';
import { Loading } from '@/components/common/Loading';
import { PageHero } from '@/components/common/PageHero';
import { CourseFilters } from './components/CourseFilters';
import { CourseCategorySection } from './components/CourseCategorySection';
import { EmptyState } from '@/components/common/EmptyState';
import { ViewModeToggle } from '@/components/common/ViewModeToggle';
import { ResultsInfo } from '@/components/common/ResultsInfo';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { useCourses } from './hooks/useCourses';
import { FILTER_OPTIONS } from '@/constants';

export const Courses = () => {
  const { t, i18n } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const {
    filteredCourses,
    categoryGroups,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    languageFilter,
    setLanguageFilter,
    levelFilter,
    setLevelFilter,
    priceFilter,
    setPriceFilter,
    categoryFilter,
    setCategoryFilter,
    viewMode,
    setViewMode,
    clearFilters,
    hasActiveFilters,
  } = useCourses();

  const currentLang = i18n.language;
  const activeFiltersCount = useMemo(
    () =>
      [
        languageFilter !== FILTER_OPTIONS.ALL,
        levelFilter !== FILTER_OPTIONS.ALL,
        priceFilter !== FILTER_OPTIONS.ALL,
        categoryFilter !== FILTER_OPTIONS.ALL,
      ].filter(Boolean).length,
    [languageFilter, levelFilter, priceFilter, categoryFilter]
  );

  const heroStats = useMemo(
    () => [
      { value: `${filteredCourses.length}+`, label: t('courses.total') },
      { value: '4.9', label: t('courses.rating') },
    ],
    [filteredCourses.length, t]
  );

  return (
    <>
      <PageHero
        title={t('nav.courses')}
        subtitle={t('courses.subtitle')}
        badge={t('courses.badge')}
        badgeIcon={Sparkles}
        gradient="primary"
        stats={heroStats}
      />

      <Section padding="lg" background="default">
        <Container>
          <CourseFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            languageFilter={languageFilter}
            onLanguageFilterChange={setLanguageFilter}
            levelFilter={levelFilter}
            onLevelFilterChange={setLevelFilter}
            priceFilter={priceFilter}
            onPriceFilterChange={setPriceFilter}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            hasActiveFilters={hasActiveFilters}
            activeFiltersCount={activeFiltersCount}
            onClearFilters={clearFilters}
          />

          {/* View Toggle and Results Info */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <ResultsInfo
              count={filteredCourses.length}
              resultsLabel={t('courses.results')}
              activeFiltersCount={activeFiltersCount}
              hasActiveFilters={hasActiveFilters}
            />
            <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>

          {/* Course Categories */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loading />
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-sm text-warning-600">{error}</p>
            </div>
          ) : categoryGroups.length > 0 ? (
            categoryGroups.map((group) => (
              <CourseCategorySection
                key={group.id}
                group={group}
                viewMode={viewMode}
                currentLang={currentLang}
              />
            ))
          ) : (
            <EmptyState
              icon={BookOpen}
              title={t('courses.noResults')}
              description={t('courses.noResultsDesc')}
              action={
                hasActiveFilters
                  ? {
                      label: t('common.clearFilters'),
                      onClick: clearFilters,
                    }
                  : undefined
              }
            />
          )}
        </Container>
      </Section>
    </>
  );
};

