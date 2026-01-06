import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PreviewGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  startIndex?: number;
}

export const PreviewGalleryModal = ({
  isOpen,
  onClose,
  images,
  startIndex = 0,
}: PreviewGalleryModalProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentIndex(startIndex);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, startIndex]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleArrowKeys = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleArrowKeys);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleArrowKeys);
    };
  }, [isOpen, handleNext, handlePrevious, onClose]);

  useEffect(() => {
    if (isOpen && imageRefs.current[currentIndex]) {
      imageRefs.current[currentIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex, isOpen]);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white">
              {t('bookDetail.samplePages')}
            </h2>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
            aria-label={t('common.closeModal')}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
              aria-label={t('common.previous')}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
              aria-label={t('common.next')}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Main Image Display */}
        <div className="flex-1 flex items-center justify-center p-4 pt-20 pb-32 overflow-y-auto overflow-x-hidden">
          <div className="relative w-full max-w-5xl flex items-center justify-center min-h-0">
            <div className="relative w-full bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-visible shadow-2xl flex items-center justify-center p-3 border border-white/10">
              <img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Preview page ${currentIndex + 1}`}
                className="max-w-full h-auto object-contain animate-in zoom-in-95 duration-300"
                style={{
                  maxHeight: 'calc(100vh - 300px)',
                  width: 'auto',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/80 to-transparent px-4 py-6">
          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide px-4 scroll-smooth"
          >
            {images.map((image, index) => (
              <div
                key={index}
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                onClick={() => handleImageClick(index)}
                className={`relative flex-shrink-0 w-20 h-28 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 bg-gray-800 ${
                  index === currentIndex
                    ? 'ring-4 ring-orange-500 scale-110 shadow-xl'
                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-contain"
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-orange-500/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

