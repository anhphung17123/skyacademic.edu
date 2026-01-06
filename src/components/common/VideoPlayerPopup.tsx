import { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Maximize2, Minimize2, Volume2, VolumeX } from 'lucide-react';
import { extractYoutubeId } from '@/utils/youtube';

interface VideoPlayerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
  autoPlay?: boolean;
}

export const VideoPlayerPopup = ({
  isOpen,
  onClose,
  videoUrl,
  title,
  autoPlay = true,
}: VideoPlayerPopupProps) => {
  const { t } = useTranslation();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const youtubeId = extractYoutubeId(videoUrl);

  // Handle escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const embedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=${autoPlay ? 1 : 0}&mute=${isMuted ? 1 : 0}&rel=0&modestbranding=1`
    : videoUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-fade-in cursor-pointer"
        onClick={onClose}
      />

      {/* Video Container */}
      <div
        className={`relative z-10 w-full mx-4 animate-scale-in ${
          isFullscreen ? 'max-w-none h-screen m-0' : 'max-w-5xl'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          {title && (
            <h3 className="text-white font-semibold text-lg truncate flex-1 mr-4">
              {title}
            </h3>
          )}
          <div className="flex items-center gap-2">
            {/* Mute Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={isMuted ? t('common.unmute') : t('common.mute')}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={isFullscreen ? t('common.exitFullscreen') : t('common.fullscreen')}
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition-colors"
              title={t('common.close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div
          className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl ${
            isFullscreen ? 'h-[calc(100vh-80px)]' : 'aspect-video'
          }`}
        >
          {youtubeId ? (
            <iframe
              src={embedUrl}
              title={title || t('common.videoPlayer')}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video
              src={videoUrl}
              className="w-full h-full object-contain"
              controls
              autoPlay={autoPlay}
              muted={isMuted}
            >
              {t('common.videoNotSupported')}
            </video>
          )}

          {/* Loading Spinner (shown while iframe loads) */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 -z-10">
            <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
          </div>
        </div>

        {/* Video Info */}
        <div className="mt-4 px-2 text-center">
          <p className="text-white/60 text-sm">
            {(() => {
              const text = t('common.pressEscToClose');
              const parts = text.split('ESC');
              return parts.map((part, index, array) => 
                index === array.length - 1 ? (
                  <span key={index}>{part}</span>
                ) : (
                  <span key={index}>
                    {part}
                    <kbd className="px-2 py-0.5 bg-white/10 rounded text-white/80">ESC</kbd>
                  </span>
                )
              );
            })()}
          </p>
        </div>
      </div>
    </div>
  );
};
