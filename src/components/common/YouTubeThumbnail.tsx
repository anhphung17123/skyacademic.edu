import { useState } from 'react';
import { extractYoutubeId, getYoutubeThumbnailWithFallback } from '@/utils/youtube';

interface YouTubeThumbnailProps {
  url: string;
  alt: string;
  className?: string;
  fallbackUrl?: string;
}

/**
 * YouTube thumbnail component with automatic fallback handling
 * Falls back through: maxresdefault -> hqdefault -> mqdefault -> sddefault -> fallbackUrl
 */
export const YouTubeThumbnail = ({
  url,
  alt,
  className = '',
  fallbackUrl,
}: YouTubeThumbnailProps) => {
  const videoId = extractYoutubeId(url);
  const { thumbnail, getFallback } = getYoutubeThumbnailWithFallback(videoId);
  const [currentThumbnail, setCurrentThumbnail] = useState(thumbnail || fallbackUrl || '');
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (hasError) {
      // Already tried all fallbacks, use fallbackUrl or empty
      if (fallbackUrl && currentThumbnail !== fallbackUrl) {
        setCurrentThumbnail(fallbackUrl);
      } else {
        setCurrentThumbnail('');
      }
      return;
    }

    const fallback = getFallback(currentThumbnail);
    if (fallback) {
      setCurrentThumbnail(fallback);
    } else {
      setHasError(true);
      if (fallbackUrl) {
        setCurrentThumbnail(fallbackUrl);
      } else {
        setCurrentThumbnail('');
      }
    }
  };

  if (!currentThumbnail) {
    return null;
  }

  return (
    <img
      src={currentThumbnail}
      alt={alt}
      className={className}
      onError={handleImageError}
    />
  );
};

