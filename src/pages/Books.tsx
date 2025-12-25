import { useTranslation } from 'react-i18next';
import { BookCard } from '../components/book/BookCard';
import { useEffect, useMemo, useState } from 'react';
import { Search, Filter, BookOpen, Sparkles, X, Grid3X3, List } from 'lucide-react';
import { bookApi } from '@/services/api/book-service';
import { Book } from '@/types';
import { Loading } from '@/components/common/Loading';

export const Books = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [formatFilter, setFormatFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const data = await bookApi.fetchBooks();
        if (isMounted) {
          setBooks(data);
          setError(null);
        }
      } catch {
        if (isMounted) {
          setBooks([]);
          setError(t('books.loadError'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchBooks();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredBooks = useMemo(() => {
    const result = books
      .filter((book) => {
        // Language filter
        if (languageFilter === 'all') return true;
        if (languageFilter === 'english') return book.language === 'en' || book.language === 'bilingual';
        if (languageFilter === 'vietnamese') return book.language === 'vi' || book.language === 'bilingual';
        if (languageFilter === 'bilingual') return book.language === 'bilingual';
        return true;
      })
      .filter((book) => {
        const term = searchTerm.toLowerCase();
        return (
          book.title.toLowerCase().includes(term) ||
          (book.author ?? '').toLowerCase().includes(term) ||
          book.description.toLowerCase().includes(term)
        );
      })
      .filter((book) => formatFilter === 'all' || book.format === formatFilter)
      .filter((book) => {
        if (priceFilter === 'all') return true;
        if (priceFilter === 'under20') return book.price < 20;
        if (priceFilter === '20to50') return book.price >= 20 && book.price <= 50;
        if (priceFilter === 'over50') return book.price > 50;
        return true;
      });

    // Sort
    if (sortBy === 'priceLow') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'priceHigh') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') result.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    
    return result;
  }, [books, formatFilter, languageFilter, searchTerm, priceFilter, sortBy]);

  const activeFiltersCount = [
    languageFilter !== 'all',
    formatFilter !== 'all',
    priceFilter !== 'all',
    searchTerm !== '',
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearchTerm('');
    setLanguageFilter('all');
    setFormatFilter('all');
    setPriceFilter('all');
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-primary-600 via-purple-600 to-secondary-600 py-12 md:py-16 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center lg:text-left space-y-3">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-medium">
                <Sparkles className="w-4 h-4" />
                <span>{t('books.badge')}</span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                {t('nav.books')}
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-xl">
                {t('books.subtitle')}
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                <div className="text-2xl font-bold">{books.length}+</div>
                <div className="text-white/70 text-xs">{t('books.titles')}</div>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="text-center px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-white/70 text-xs">{t('books.avgRating')}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-gray-50 dark:fill-gray-900"/>
          </svg>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('books.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Filter row */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              {/* Language filter */}
              <div className="relative">
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 text-sm font-medium appearance-none cursor-pointer hover:border-primary-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  <option value="all">{t('books.allLanguages')}</option>
                  <option value="english">{t('books.english')}</option>
                  <option value="vietnamese">{t('books.vietnamese')}</option>
                  <option value="bilingual">{t('books.bilingual')}</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Format filter */}
              <div className="relative">
                <select
                  value={formatFilter}
                  onChange={(e) => setFormatFilter(e.target.value)}
                  className="pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 text-sm font-medium appearance-none cursor-pointer hover:border-primary-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  <option value="all">{t('books.allFormats')}</option>
                  <option value="physical">{t('books.physical')}</option>
                  <option value="digital">{t('books.digital')}</option>
                  <option value="both">{t('books.both')}</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              
              {/* Price filter */}
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 text-sm font-medium appearance-none cursor-pointer hover:border-primary-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
                <option value="all">{t('books.allPrices')}</option>
                <option value="under20">{t('books.under20')}</option>
                <option value="20to50">{t('books.price20to50')}</option>
                <option value="over50">{t('books.over50')}</option>
              </select>
              
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 text-sm font-medium appearance-none cursor-pointer hover:border-primary-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
                <option value="popular">{t('books.sortPopular')}</option>
                <option value="newest">{t('books.sortNewest')}</option>
                <option value="priceLow">{t('books.sortPriceLow')}</option>
                <option value="priceHigh">{t('books.sortPriceHigh')}</option>
              </select>
              
              {activeFiltersCount > 0 && (
                <button 
                  onClick={clearFilters}
                  className="px-4 py-2.5 text-primary-600 dark:text-primary-400 text-sm font-medium hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-xl transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  {t('common.clearFilters')} ({activeFiltersCount})
                </button>
              )}
            </div>
            
            {/* View toggle */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {t('common.showing')} <span className="font-semibold text-gray-900 dark:text-white">{filteredBooks.length}</span> {t('books.results')}
          </p>
        </div>

        {/* Books Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loading />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
              <BookOpen className="w-10 h-10 text-red-500" />
            </div>
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
            >
              {t('common.retry')}
            </button>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-4"
          }>
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('books.noResults')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {t('books.noResultsDesc')}
            </p>
            <button 
              onClick={clearFilters}
              className="px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors"
            >
              {t('common.clearFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
