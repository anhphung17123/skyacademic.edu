import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import type { FlashcardTopic } from '@/types/product';
import { getTopicCoverUrl } from '@/utils/flashcard';

export interface FlashcardTopicCardProps {
  topic: FlashcardTopic;
  lang: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export const FlashcardTopicCard = memo(({
  topic,
  lang,
  isActive,
  onClick,
  className,
}: FlashcardTopicCardProps) => {
  const { t } = useTranslation();
  const name = lang === 'vi' ? topic.nameVi : topic.nameEn;
  const shortPurpose = lang === 'vi' ? topic.purposeVi : topic.purposeEn;
  const thumbnail = getTopicCoverUrl(topic);
  const examplesLabel = t('flashcard.examplesLabel');

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'text-left rounded-2xl border-2 overflow-hidden transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2',
        isActive
          ? 'border-violet-500 dark:border-violet-400 shadow-lg shadow-violet-200/40 dark:shadow-violet-900/30 bg-violet-50/50 dark:bg-violet-900/20'
          : 'border-gray-200 dark:border-gray-600 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-md bg-white dark:bg-gray-800',
        className
      )}
    >
      <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-4xl">
            📚
          </div>
        )}
        <div
          className={clsx(
            'absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/70 to-transparent',
            isActive && 'from-violet-900/80'
          )}
        >
          <span
            className={clsx(
              'text-lg font-bold text-white drop-shadow',
              isActive && 'underline underline-offset-2 decoration-2'
            )}
          >
            {name}
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {shortPurpose}
        </p>
        {topic.examples?.length > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {examplesLabel}
            {topic.examples.slice(0, 3).join(', ')}
          </p>
        )}
      </div>
    </button>
  );
});

FlashcardTopicCard.displayName = 'FlashcardTopicCard';
