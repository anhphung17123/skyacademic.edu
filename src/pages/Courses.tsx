import { useTranslation } from 'react-i18next';
import { CourseCard } from '../components/course/CourseCard';
import { useEffect, useMemo, useState } from 'react';
import { Search, Grid, List, SlidersHorizontal, X, BookOpen, GraduationCap, DollarSign, Volume2, MessageCircle, Award } from 'lucide-react';
import { courseApi } from '@/services/api/course-service';
import { Course } from '@/types';
import { Loading } from '@/components/common/Loading';

interface CategoryGroup {
  id: string;
  name: string;
  nameVi: string;
  icon: typeof Volume2;
  tagline: string;
  taglineVi: string;
  courses: Course[];
}

export const Courses = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const currentLang = i18n.language;

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const data = await courseApi.fetchCourses();
        if (isMounted) {
          setCourses(data);
          setError(null);
        }
      } catch {
        if (isMounted) {
          setCourses([]);
          setError(t('courses.loadError'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        // Language filter
        if (languageFilter === 'all') return true;
        const courseLang = course.language;
        if (!courseLang) return false;
        // Bilingual courses should show for both English and Vietnamese filters
        if (courseLang === 'bilingual') return true;
        // Filter by specific language
        if (languageFilter === 'english') return courseLang === 'en';
        if (languageFilter === 'vietnamese') return courseLang === 'vi';
        return true;
      })
      .filter((course) => {
        const term = searchTerm.toLowerCase();
        const title = currentLang === 'vi' && course.titleVi ? course.titleVi : course.title;
        const description = currentLang === 'vi' && course.descriptionVi ? course.descriptionVi : course.description;
        return (
          title.toLowerCase().includes(term) ||
          description.toLowerCase().includes(term)
        );
      })
      .filter((course) => {
        if (levelFilter === 'all') return true;
        // Map 'basic' to 'beginner' for filtering
        const courseLevel = course.level === 'beginner' ? 'beginner' : course.level;
        return courseLevel === levelFilter;
      })
      .filter((course) => {
        if (priceFilter === 'free') return course.price === 0;
        if (priceFilter === 'paid') return course.price > 0;
        return true;
      })
      .filter((course) => {
        if (categoryFilter === 'all') return true;
        return course.category === categoryFilter;
      });
  }, [courses, languageFilter, levelFilter, priceFilter, categoryFilter, searchTerm, currentLang]);

  // Group courses by category
  const categoryGroups = useMemo(() => {
    const groups: CategoryGroup[] = [
      {
        id: 'pronunciation',
        name: 'Pronunciation – 44 IPA Sounds',
        nameVi: 'Phát Âm – 44 Âm IPA',
        icon: Volume2,
        tagline: 'Speak clearly. Sound natural.',
        taglineVi: 'Nói rõ ràng. Âm thanh tự nhiên.',
        courses: filteredCourses.filter(c => c.category === 'Pronunciation'),
      },
      {
        id: 'communication',
        name: 'Communication English',
        nameVi: 'Giao Tiếp Tiếng Anh',
        icon: MessageCircle,
        tagline: 'Use English in real life, not just textbooks.',
        taglineVi: 'Sử dụng tiếng Anh trong cuộc sống thực, không chỉ sách giáo khoa.',
        courses: filteredCourses.filter(c => c.category === 'Communication English'),
      },
      {
        id: 'ielts',
        name: 'IELTS Preparation',
        nameVi: 'Luyện Thi IELTS',
        icon: Award,
        tagline: 'Learn smart. Score higher.',
        taglineVi: 'Học thông minh. Điểm cao hơn.',
        courses: filteredCourses.filter(c => c.category === 'IELTS Preparation'),
      },
    ];
    return groups.filter(group => group.courses.length > 0);
  }, [filteredCourses, currentLang]);

  const clearFilters = () => {
    setSearchTerm('');
    setLanguageFilter('all');
    setLevelFilter('all');
    setPriceFilter('all');
    setCategoryFilter('all');
  };

  const hasActiveFilters = searchTerm || languageFilter !== 'all' || levelFilter !== 'all' || priceFilter !== 'all' || categoryFilter !== 'all';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-12 md:py-16 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-400/8 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center lg:text-left space-y-3">
              {/* Icon Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-medium">
                <BookOpen className="w-4 h-4" />
                <span>{t('courses.badge')}</span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                {t('nav.courses')}
              </h1>
              
              {/* Subtitle with count */}
              <p className="text-lg md:text-xl text-white/85">
                <span className="font-semibold">{filteredCourses.length}</span> {t('courses.available')}
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                <div className="text-2xl font-bold">{filteredCourses.length}</div>
                <div className="text-white/70 text-xs">{t('courses.total')}</div>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="text-center px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-white/70 text-xs">{t('courses.rating')}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-gray-50 dark:fill-slate-950"/>
          </svg>
        </div>
      </section>

      <div className="container-custom py-8">
        {/* Search and Filters Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 md:p-6 mb-8 border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('courses.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer min-w-[160px]"
                >
                  <option value="all">{t('courses.allLanguages')}</option>
                  <option value="english">{t('courses.english')}</option>
                  <option value="vietnamese">{t('courses.vietnamese')}</option>
                  <option value="bilingual">{t('courses.bilingual')}</option>
                </select>
              </div>

              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer min-w-[180px]"
                >
                  <option value="all">{t('courses.allCategories')}</option>
                  <option value="Pronunciation">{t('courses.categoryPronunciation')}</option>
                  <option value="Communication English">{t('courses.categoryCommunication')}</option>
                  <option value="IELTS Preparation">{t('courses.categoryIelts')}</option>
                </select>
              </div>

              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer min-w-[160px]"
                >
                  <option value="all">{t('courses.allLevels')}</option>
                  <option value="beginner">{t('courses.beginner')}</option>
                  <option value="intermediate">{t('courses.intermediate')}</option>
                  <option value="advanced">{t('courses.advanced')}</option>
                </select>
              </div>

              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer min-w-[140px]"
                >
                  <option value="all">{t('courses.allPrices')}</option>
                  <option value="free">{t('courses.free')}</option>
                  <option value="paid">{t('courses.paid')}</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  aria-label={t('common.gridView')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                  <Grid className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  aria-label={t('common.listView')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                  <List className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>{t('common.filters')}</span>
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                  {[languageFilter !== 'all', levelFilter !== 'all', priceFilter !== 'all', categoryFilter !== 'all'].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              >
                <option value="all">{t('courses.allLanguages')}</option>
                <option value="english">{t('courses.english')}</option>
                <option value="vietnamese">{t('courses.vietnamese')}</option>
                <option value="bilingual">{t('courses.bilingual')}</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              >
                <option value="all">{t('courses.allCategories')}</option>
                <option value="Pronunciation">{t('courses.categoryPronunciation')}</option>
                <option value="Communication English">{t('courses.categoryCommunication')}</option>
                <option value="IELTS Preparation">{t('courses.categoryIelts')}</option>
              </select>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              >
                <option value="all">{t('courses.allLevels')}</option>
                <option value="beginner">{t('courses.beginner')}</option>
                <option value="intermediate">{t('courses.intermediate')}</option>
                <option value="advanced">{t('courses.advanced')}</option>
              </select>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              >
                <option value="all">{t('courses.allPrices')}</option>
                <option value="free">{t('courses.free')}</option>
                <option value="paid">{t('courses.paid')}</option>
              </select>
            </div>
          )}

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-500">{t('courses.activeFilters')}</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                  "{searchTerm}"
                  <button onClick={() => setSearchTerm('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {languageFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  {languageFilter === 'english' ? t('courses.english') : languageFilter === 'vietnamese' ? t('courses.vietnamese') : t('courses.bilingual')}
                  <button onClick={() => setLanguageFilter('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {categoryFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 rounded-full text-sm">
                  {categoryFilter === 'Pronunciation' 
                    ? t('courses.categoryPronunciation')
                    : categoryFilter === 'Communication English'
                    ? t('courses.categoryCommunication')
                    : categoryFilter === 'IELTS Preparation'
                    ? t('courses.categoryIelts')
                    : categoryFilter}
                  <button onClick={() => setCategoryFilter('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {levelFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 rounded-full text-sm">
                  {t(`courses.${levelFilter}`)}
                  <button onClick={() => setLevelFilter('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {priceFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 rounded-full text-sm">
                  {priceFilter === 'free' ? t('courses.free') : t('courses.paid')}
                  <button onClick={() => setPriceFilter('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              <button onClick={clearFilters} className="text-sm text-primary-600 hover:underline ml-2">
                {t('common.clearAll')}
              </button>
            </div>
          )}
        </div>

        {/* Course Categories */}
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {/* Category Groups */}
            {categoryGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.id} className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        {currentLang === 'vi' ? group.nameVi : group.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {currentLang === 'vi' ? group.taglineVi : group.tagline}
                      </p>
                    </div>
                  </div>
                  
                  {group.courses.length > 0 ? (
                    <div className={viewMode === 'grid' 
                      ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'space-y-4'
                    }>
                      {group.courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      {t('courses.noCoursesInCategory')}
                    </div>
                  )}
                </div>
              );
            })}

            {/* No Results */}
            {filteredCourses.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                  <BookOpen className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('courses.noResults')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t('courses.noResultsDesc')}
                </p>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="btn-primary">
                    {t('common.clearFilters')}
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {error && (
          <p className="text-sm text-warning-600 mt-4 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
