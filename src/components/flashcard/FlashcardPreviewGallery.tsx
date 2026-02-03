import { memo, useCallback, useState } from 'react';
import { clsx } from 'clsx';
import type { FlashcardTopic } from '@/types';

interface FlashcardPreviewGalleryProps {
  topics: FlashcardTopic[];
  images: Record<string, string>;
  /** 'modal' = thẻ to hơn, dùng trong modal xem trước */
  size?: 'default' | 'modal';
}

/**
 * Gallery mẫu thẻ (3 thẻ): bấm vào thẻ để lật xem mặt sau (hiệu ứng 3D flip).
 * Layout tối ưu cho 3 thẻ: 1 cột mobile (thẻ to), 3 cột desktop.
 */
export const FlashcardPreviewGallery = memo(({ topics, images, size = 'default' }: FlashcardPreviewGalleryProps) => {
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());
  const isModal = size === 'modal';

  const toggleFlip = useCallback((cardId: string) => {
    setFlippedIds((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) next.delete(cardId);
      else next.add(cardId);
      return next;
    });
  }, []);

  const allCards = topics.flatMap((t) => t.cards);

  return (
    <div
      className={isModal
        ? 'grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto'
        : 'grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto'
      }
    >
      {allCards.map((card) => {
        const frontUrl = images[card.front];
        const backUrl = images[card.back];
        const isFlipped = flippedIds.has(card.id);
        return (
          <button
            key={card.id}
            type="button"
            onClick={() => toggleFlip(card.id)}
            className="rounded-2xl border-2 border-gray-200 dark:border-gray-600 overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl hover:border-violet-300 dark:hover:border-violet-500/50 transition-all duration-200 hover:-translate-y-1 active:scale-[0.98] w-full max-w-sm mx-auto sm:max-w-none [perspective:1200px]"
            aria-pressed={isFlipped}
            aria-label={isFlipped ? 'Flip card to front' : 'Flip card to back'}
          >
            <div
              className={clsx(
                'relative w-full aspect-[3/4] bg-gray-100 dark:bg-gray-700 [transform-style:preserve-3d]',
                isModal ? 'min-h-[260px] sm:min-h-[340px]' : 'min-h-[220px] sm:min-h-[280px]'
              )}
              style={{ perspectiveOrigin: 'center center' }}
            >
              <div
                className="absolute inset-0 w-full h-full [transform-style:preserve-3d]"
                style={{
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  willChange: 'transform',
                }}
              >
                {/* Mặt trước */}
                <div
                  className="absolute inset-0 w-full h-full rounded-xl overflow-hidden backface-hidden"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
                >
                  {frontUrl ? (
                    <img
                      src={frontUrl}
                      alt=""
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-600" />
                  )}
                </div>
                {/* Mặt sau */}
                <div
                  className="absolute inset-0 w-full h-full rounded-xl overflow-hidden backface-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {backUrl ? (
                    <img
                      src={backUrl}
                      alt=""
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-600" />
                  )}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
});

FlashcardPreviewGallery.displayName = 'FlashcardPreviewGallery';
