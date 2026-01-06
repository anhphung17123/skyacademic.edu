/**
 * Extract YouTube video ID from a URL
 * Supports various YouTube URL formats:
 * - youtube.com/watch?v=VIDEO_ID
 * - youtube.com/embed/VIDEO_ID
 * - youtube.com/shorts/VIDEO_ID
 * - youtu.be/VIDEO_ID
 * 
 * @param url - YouTube URL string
 * @returns YouTube video ID or null if not found
 */
export const extractYoutubeId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

/**
 * Get YouTube thumbnail URL with fallback support
 * Returns the highest quality thumbnail available (maxresdefault)
 * Use onError handler on img tag to fallback to lower quality
 * @param videoId - YouTube video ID
 * @param quality - Thumbnail quality: 'maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault'
 * @returns YouTube thumbnail URL
 */
const getYoutubeThumbnail = (
  videoId: string | null,
  quality: 'maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault' = 'maxresdefault'
): string => {
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

/**
 * Get YouTube thumbnail with automatic fallback chain
 * Returns maxresdefault URL, but provides fallback chain for onError handler
 * @param videoId - YouTube video ID
 * @returns Object with primary thumbnail URL and fallback function
 */
export const getYoutubeThumbnailWithFallback = (videoId: string | null): {
  thumbnail: string;
  getFallback: (currentQuality: string) => string | null;
} => {
  const qualities: Array<'maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault'> = [
    'maxresdefault',
    'hqdefault',
    'mqdefault',
    'sddefault',
  ];
  
  return {
    thumbnail: getYoutubeThumbnail(videoId, 'maxresdefault'),
    getFallback: (currentQuality: string) => {
      const currentIndex = qualities.findIndex((q) => currentQuality.includes(q));
      if (currentIndex >= 0 && currentIndex < qualities.length - 1) {
        return getYoutubeThumbnail(videoId, qualities[currentIndex + 1]);
      }
      return null;
    },
  };
};

