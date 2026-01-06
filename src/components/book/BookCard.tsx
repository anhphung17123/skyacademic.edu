import { memo } from 'react';
import { Star, BookOpen, Eye, Smartphone, Package, ArrowRight } from 'lucide-react';
import { Book } from '@/types';
import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PriceDisplay } from '@/components/common/PriceDisplay';

interface BookCardProps {
  book: Book;
}

export const BookCard = memo(({ book }: BookCardProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language;

  const title = currentLang === 'vi' && book.titleVi ? book.titleVi : book.title;
  const description =
    currentLang === 'vi' && book.descriptionVi ? book.descriptionVi : book.description;
  const category = currentLang === 'vi' && book.categoryVi ? book.categoryVi : book.category;

  const formatBadge = {
    physical: { icon: Package, label: t('books.physical'), color: 'bg-accent-primary/10 text-accent-primary dark:bg-accent-primary-dark/20 dark:text-accent-primary-dark' },
    digital: { icon: Smartphone, label: t('books.digital'), color: 'bg-accent-secondary/10 text-accent-secondary dark:bg-accent-secondary-dark/20 dark:text-accent-secondary-dark' },
    both: { icon: Package, label: t('books.both'), color: 'bg-success/10 text-success dark:bg-success-dark/20 dark:text-success-dark' },
  };

  const format = formatBadge[book.format as keyof typeof formatBadge] || formatBadge.physical;
  const FormatIcon = format.icon;

  return (
    <div className="group relative card-light rounded-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 bg-surface dark:bg-surface-dark">
      {/* Image container with book cover style */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-elevated to-surface dark:from-elevated-dark dark:to-surface-dark">
        {/* Book spine effect */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-background/20 to-transparent dark:from-background-dark/20 z-10" />
        
        <img
          src={book.thumbnail || 'https://via.placeholder.com/300x400?text=Book'}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent dark:from-background-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick action button */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
          <button
            onClick={() => {
              navigate(`/books/${book.id}`);
            }}
            className="p-2.5 bg-surface dark:bg-surface-dark rounded-full shadow-md dark:shadow-lg backdrop-blur-sm text-text-primary dark:text-text-primary-dark hover:bg-accent-primary hover:text-surface dark:hover:bg-accent-primary-dark dark:hover:text-surface-dark transition-all duration-300"
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
          <span className="px-2.5 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-full border border-primary-200/60 dark:border-primary-700/40">
            {category}
          </span>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full ${format.color}`}>
            <FormatIcon className="w-3 h-3" />
            {format.label}
          </span>
        </div>

        {/* Title */}
        <h3 
          className="text-base font-bold text-gray-800 dark:text-gray-100 mb-1.5 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors cursor-pointer leading-snug"
          onClick={() => navigate(`/books/${book.id}`)}
        >
          {title}
        </h3>

        {/* Author */}
        <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold mb-2">
          {book.author}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200/80 dark:border-gray-700/80">
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
          <PriceDisplay
            price={book.price}
            currency={book.currency}
            variant="small"
            showLabel={false}
          />
          
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
});

BookCard.displayName = 'BookCard';
