import { Star, BookOpen, Eye, Smartphone, Package, ArrowRight } from 'lucide-react';
import { Book } from '../../types';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/utils/currency';
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language;

  const title = currentLang === 'vi' && book.titleVi ? book.titleVi : book.title;
  const description =
    currentLang === 'vi' && book.descriptionVi ? book.descriptionVi : book.description;
  const category = currentLang === 'vi' && book.categoryVi ? book.categoryVi : book.category;

  const formatBadge = {
    physical: { icon: Package, label: t('books.physical'), color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    digital: { icon: Smartphone, label: t('books.digital'), color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
    both: { icon: Package, label: t('books.both'), color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  };

  const format = formatBadge[book.format as keyof typeof formatBadge] || formatBadge.physical;
  const FormatIcon = format.icon;

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:-translate-y-2">
      {/* Image container with book cover style */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
        {/* Book spine effect */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/20 to-transparent z-10" />
        
        <img
          src={book.thumbnail || 'https://via.placeholder.com/300x400?text=Book'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick action button */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
          <button
            onClick={() => {
              navigate(`/books/${book.id}`);
            }}
            className="p-2.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-primary-500 hover:text-white transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
        
        {/* Stock warning */}
        {book.stock !== undefined && book.stock < 10 && book.stock > 0 && (
          <div className="absolute bottom-3 left-3 z-10">
            <div className="bg-yellow-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
              {t('books.lowStock')} {book.stock} {t('books.left')}
            </div>
          </div>
        )}
        
        {/* Out of stock overlay */}
        {book.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <span className="px-4 py-2 bg-gray-900 text-white font-bold rounded-lg">
              {t('books.outOfStock')}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tags row */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2.5 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full">
            {category}
          </span>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${format.color}`}>
            <FormatIcon className="w-3 h-3" />
            {format.label}
          </span>
        </div>

        {/* Title */}
        <h3 
          className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors cursor-pointer"
          onClick={() => navigate(`/books/${book.id}`)}
        >
          {title}
        </h3>

        {/* Author */}
        <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">
          {book.author}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3.5 h-3.5 ${i < Math.floor(book.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                />
              ))}
            </div>
            <span className="font-medium">({(book.rating ?? 0).toFixed(1)})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-secondary-500" />
            <span>{(book.pages ?? 0).toString()} {t('books.pages')}</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {formatPrice(book.price, book.currency || 'USD')}
            </span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              navigate(`/books/${book.id}`);
            }}
            className="!px-3 hover:bg-gray-100 dark:hover:bg-gray-700 group/btn"
          >
            <span className="hidden sm:inline mr-1">{t('common.details')}</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>
      
      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-400/50 transition-colors pointer-events-none" />
    </div>
  );
};
