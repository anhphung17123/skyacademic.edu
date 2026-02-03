import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Layers, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import type { FlashcardProduct, FlashcardTopic } from '@/types';

interface FlashcardTopicCardProps {
  product: FlashcardProduct;
  topic: FlashcardTopic;
}

/**
 * Card for one flashcard topic on Products page (Activities, Places, Special Days).
 * Each topic is a separate card linking to flashcard detail.
 */
export const FlashcardTopicCard = memo(({ product, topic }: FlashcardTopicCardProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language;

  const topicName = lang === 'vi' ? topic.nameVi : topic.nameEn;
  const purpose = lang === 'vi' ? topic.purposeVi : topic.purposeEn;
  const sampleCard = topic.cards[0];

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="relative w-32 h-40">
            <div className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-lg transform rotate-[-6deg] border border-violet-200/50 dark:border-gray-600" />
            <div className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-xl transform rotate-[4deg] translate-y-1 border-2 border-violet-300/60 dark:border-violet-500/40 flex items-center justify-center">
              <Layers className="w-10 h-10 text-violet-500 dark:text-violet-400" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      <div className="p-5">
        <span className="inline-block px-2.5 py-1 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs font-semibold rounded-full mb-2">
          {t('products.flashcard')}
        </span>
        <h3
          className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 cursor-pointer hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          onClick={() => navigate(`/flashcards/${product.slug}/${topic.key}`)}
        >
          {topicName}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
          {purpose}
        </p>
        {sampleCard && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mb-4">
            {sampleCard.front.sentence} → {sampleCard.back.sentence}
          </p>
        )}
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate(`/flashcards/${product.slug}/${topic.key}`)}
          className="w-full sm:w-auto"
        >
          <span>{t('common.details')}</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
});

FlashcardTopicCard.displayName = 'FlashcardTopicCard';
