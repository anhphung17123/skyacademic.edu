import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { FlashcardPreviewGallery } from './FlashcardPreviewGallery';
import type { FlashcardTopic } from '@/types';

interface FlashcardPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: FlashcardTopic | null;
}

/**
 * Modal xem trước 3 thẻ flashcard với kích thước lớn, có thể lật thẻ.
 */
export const FlashcardPreviewModal = memo(({ isOpen, onClose, topic }: FlashcardPreviewModalProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('flashcard.previewCards')}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {t('flashcard.previewCardsDesc')}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={t('common.close')}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body: gallery với thẻ to hơn */}
        <div className="flex-1 overflow-auto p-6 sm:p-8">
          {topic ? (
            <FlashcardPreviewGallery
              topics={[topic]}
              images={topic.images}
              size="modal"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
});

FlashcardPreviewModal.displayName = 'FlashcardPreviewModal';
