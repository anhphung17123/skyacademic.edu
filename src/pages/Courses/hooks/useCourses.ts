import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { courseApi } from '@/services/api/course-service';
import { Course, ViewMode } from '@/types';
import { getLocalizedText } from '@/utils';
import { FILTER_OPTIONS, VIEW_MODES, COURSE_CATEGORIES } from '@/constants';
import { Volume2, MessageCircle, Award } from 'lucide-react';
import { useDataFetch, useDebounce } from '@/hooks';

interface CategoryGroup {
  id: string;
  name: string;
  nameVi: string;
  icon: typeof Volume2;
  tagline: string;
  taglineVi: string;
  courses: Course[];
}

interface UseCoursesReturn {
  courses: Course[];
  filteredCourses: Course[];
  categoryGroups: CategoryGroup[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  languageFilter: string;
  setLanguageFilter: (value: string) => void;
  levelFilter: string;
  setLevelFilter: (value: string) => void;
  priceFilter: string;
  setPriceFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export const useCourses = (): UseCoursesReturn => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [languageFilter, setLanguageFilter] = useState<string>(FILTER_OPTIONS.ALL);
  const [levelFilter, setLevelFilter] = useState<string>(FILTER_OPTIONS.ALL);
  const [priceFilter, setPriceFilter] = useState<string>(FILTER_OPTIONS.ALL);
  const [categoryFilter, setCategoryFilter] = useState<string>(FILTER_OPTIONS.ALL);
  const [viewMode, setViewMode] = useState<ViewMode>(VIEW_MODES.GRID);
  const currentLang = i18n.language;

  const {
    data: courses = [],
    isLoading,
    error: fetchError,
  } = useDataFetch<Course[]>(
    () => courseApi.fetchCourses(),
    {
      immediate: true,
      onError: (err) => {
        console.error('Failed to fetch courses:', err);
      },
    }
  );

  const error = fetchError ? (fetchError.message || t('courses.loadError')) : null;

  const filteredCourses = useMemo(() => {
    if (!courses || courses.length === 0) {
      return [];
    }

    const searchTermLower = debouncedSearchTerm.toLowerCase();
    const hasSearch = searchTermLower.length > 0;
    const hasLanguageFilter = languageFilter !== FILTER_OPTIONS.ALL;
    const hasLevelFilter = levelFilter !== FILTER_OPTIONS.ALL;
    const hasPriceFilter = priceFilter !== FILTER_OPTIONS.ALL;
    const hasCategoryFilter = categoryFilter !== FILTER_OPTIONS.ALL;

    // Combine all filters in a single pass for better performance
    return courses.filter((course) => {
      // Language filter
      if (hasLanguageFilter) {
        const courseLang = course.language;
        if (!courseLang) return false;
        if (courseLang === 'bilingual') return true;
        if (languageFilter === FILTER_OPTIONS.ENGLISH && courseLang !== 'en') return false;
        if (languageFilter === FILTER_OPTIONS.VIETNAMESE && courseLang !== 'vi') return false;
      }

      // Search filter
      if (hasSearch) {
        const title = getLocalizedText(currentLang, course.title, course.titleEn, course.titleVi);
        const description = getLocalizedText(
          currentLang,
          course.description,
          course.descriptionEn,
          course.descriptionVi
        );
        const matchesSearch =
          title.toLowerCase().includes(searchTermLower) ||
          description.toLowerCase().includes(searchTermLower);
        if (!matchesSearch) return false;
      }

      // Level filter
      if (hasLevelFilter && course.level !== levelFilter) {
        return false;
      }

      // Price filter
      if (hasPriceFilter) {
        if (priceFilter === FILTER_OPTIONS.FREE && course.price !== 0) return false;
        if (priceFilter === FILTER_OPTIONS.PAID && course.price === 0) return false;
      }

      // Category filter
      if (hasCategoryFilter && course.category !== categoryFilter) {
        return false;
      }

      return true;
    });
  }, [courses, languageFilter, levelFilter, priceFilter, categoryFilter, debouncedSearchTerm, currentLang]);

  const categoryGroups = useMemo(() => {
    const groups: CategoryGroup[] = [
      {
        id: 'pronunciation',
        name: 'Pronunciation – 44 IPA Sounds',
        nameVi: 'Phát Âm – 44 Âm IPA',
        icon: Volume2,
        tagline: 'Speak clearly. Sound natural.',
        taglineVi: 'Nói rõ ràng. Âm thanh tự nhiên.',
        courses: filteredCourses.filter((c) => c.category === COURSE_CATEGORIES.PRONUNCIATION),
      },
      {
        id: 'communication',
        name: 'Communication English',
        nameVi: 'Giao Tiếp Tiếng Anh',
        icon: MessageCircle,
        tagline: 'Use English in real life, not just textbooks.',
        taglineVi: 'Sử dụng tiếng Anh trong cuộc sống thực, không chỉ sách giáo khoa.',
        courses: filteredCourses.filter((c) => c.category === COURSE_CATEGORIES.COMMUNICATION),
      },
      {
        id: 'ielts',
        name: 'IELTS Preparation',
        nameVi: 'Luyện Thi IELTS',
        icon: Award,
        tagline: 'Learn smart. Score higher.',
        taglineVi: 'Học thông minh. Điểm cao hơn.',
        courses: filteredCourses.filter((c) => c.category === COURSE_CATEGORIES.IELTS),
      },
    ];
    return groups.filter((group) => group.courses.length > 0);
  }, [filteredCourses]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setLanguageFilter(FILTER_OPTIONS.ALL);
    setLevelFilter(FILTER_OPTIONS.ALL);
    setPriceFilter(FILTER_OPTIONS.ALL);
    setCategoryFilter(FILTER_OPTIONS.ALL);
  }, []);

  const hasActiveFilters = useMemo(
    () =>
      Boolean(
        debouncedSearchTerm ||
          languageFilter !== FILTER_OPTIONS.ALL ||
          levelFilter !== FILTER_OPTIONS.ALL ||
          priceFilter !== FILTER_OPTIONS.ALL ||
          categoryFilter !== FILTER_OPTIONS.ALL
      ),
    [debouncedSearchTerm, languageFilter, levelFilter, priceFilter, categoryFilter]
  );

  return {
    courses: courses ?? [],
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
  };
};

