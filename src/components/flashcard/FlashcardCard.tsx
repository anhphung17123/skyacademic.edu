import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import type { FlashcardProduct } from '@/types';
import { getTopicCoverUrls } from '@/utils/flashcard';

interface FlashcardCardProps {
  product: FlashcardProduct;
}

/**
 * Card for Flashcard product in list view.
 * Cover = ảnh cover của mỗi topic (topic.coverImage).
 */
export const FlashcardCard = memo(({ product }: FlashcardCardProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language;
  const coverUrls = getTopicCoverUrls(product);

  const title = lang === 'vi' ? product.titleVi : product.titleEn;
  const subtitle = lang === 'vi' ? product.subtitleVi : product.subtitleEn;
  const description = lang === 'vi' ? product.descriptionVi : product.descriptionEn;

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Visual: cover mỗi topic */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 overflow-hidden">
        {coverUrls.length > 0 ? (
          <div className="absolute inset-0 flex">
            {coverUrls.map((src, i) => (
              <div key={i} className="flex-1 min-w-0 border-r border-white/50 last:border-r-0">
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl text-amber-400">
            📚
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-semibold rounded-full">
            {t('products.flashcard')}
          </span>
        </div>
        <h3
          className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          onClick={() => navigate(`/flashcards/${product.slug}`)}
        >
          {title}
        </h3>
        <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-2">
          {subtitle}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
          {description}
        </p>
        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          {/* Price – strong highlight */}
          <div className="rounded-xl bg-amber-100 dark:bg-amber-900/50 border-2 border-amber-400 dark:border-amber-500 px-4 py-3 mb-4 shadow-md shadow-amber-200/50 dark:shadow-amber-900/30">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-lg font-bold text-amber-800 dark:text-amber-200">
                {t('flashcard.pricePerSet')}
              </span>
              <span className="text-lg font-black text-amber-600 dark:text-amber-400">
                {t('flashcard.priceThreeSets')}
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              navigate(`/flashcards/${product.slug}`);
            }}
            className="!px-3 hover:bg-gray-100 dark:hover:bg-gray-700 group/btn"
          >
            <span className="hidden sm:inline mr-1">{t('common.details')}</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
});

FlashcardCard.displayName = 'FlashcardCard';
