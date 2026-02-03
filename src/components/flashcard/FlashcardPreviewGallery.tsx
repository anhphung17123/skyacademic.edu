import { memo, useState } from 'react';
import { X } from 'lucide-react';
import type { FlashcardTopic } from '@/types';

interface FlashcardPreviewGalleryProps {
  topics: FlashcardTopic[];
}

/**
 * Gallery of flashcard samples; modal to view front/back.
 * Can be extended later with flip animation and audio.
 */
export const FlashcardPreviewGallery = memo(({ topics }: FlashcardPreviewGalleryProps) => {
  const [modalCard, setModalCard] = useState<{
    front: string;
    back: string;
    frontImage?: string;
    backImage?: string;
  } | null>(null);

  const allCards = topics.flatMap((t) => t.cards);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {allCards.slice(0, 8).map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() =>
              setModalCard({
                front: card.front.sentence,
                back: card.back.sentence,
                frontImage: card.front.image,
                backImage: card.back.image,
              })
            }
            className="text-left rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-xl hover:border-violet-300 dark:hover:border-violet-500/50 transition-all duration-200 hover:-translate-y-1 active:scale-[0.98]"
          >
            <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 overflow-hidden">
              {card.front.image && (
                <img
                  src={card.front.image}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                {card.front.sentence}
              </p>
              <p className="text-xs text-violet-600 dark:text-violet-400 font-medium line-clamp-2 mt-1.5">
                {card.back.sentence}
              </p>
            </div>
          </button>
        ))}
      </div>

      {modalCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setModalCard(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Flashcard preview"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-2">
              <button
                type="button"
                onClick={() => setModalCard(null)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400 mb-1.5">
                  Front (EN)
                </p>
                {modalCard.frontImage && (
                  <img
                    src={modalCard.frontImage}
                    alt=""
                    className="w-full aspect-video object-cover rounded-lg mb-2"
                  />
                )}
                <p className="text-gray-900 dark:text-white">{modalCard.front}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400 mb-1.5">
                  Back (VI)
                </p>
                {modalCard.backImage && (
                  <img
                    src={modalCard.backImage}
                    alt=""
                    className="w-full aspect-video object-cover rounded-lg mb-2"
                  />
                )}
                <p className="text-gray-900 dark:text-white">{modalCard.back}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

FlashcardPreviewGallery.displayName = 'FlashcardPreviewGallery';
