import { useTranslation } from 'react-i18next';
import {
  Play,
  Clock,
  Youtube,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { FreeVideoDto } from '@/types/api';
import { YouTubeThumbnail } from '@/components/common/YouTubeThumbnail';
import { CONTACT_INFO } from '@/config/contact.config';

const YOUTUBE_CHANNEL_URL = CONTACT_INFO.youtubeUrl ?? 'https://www.youtube.com/@skyacademy0';

interface FreeVideosSectionProps {
  courseFreeVideos: FreeVideoDto[];
}

export const FreeVideosSection = ({ courseFreeVideos }: FreeVideosSectionProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleVideoClick = (video: FreeVideoDto) => {
    if (video.youtube_url) {
      window.open(video.youtube_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 text-white">
              <Youtube className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('courseDetail.freeLessonsTitle')}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('courseDetail.freeLessonsSubtitle')}
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            {t('common.free')}
          </span>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="p-6">
        {courseFreeVideos.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {courseFreeVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => handleVideoClick(video)}
                className="group block w-full text-left rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 transition-all hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <YouTubeThumbnail
                    url={video.youtube_url}
                    alt={currentLang === 'vi' && video.title_vi ? video.title_vi : video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    fallbackUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400"
                  />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-600 transition-all">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded bg-black/70 text-white text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}</span>
                      </div>
                    )}

                    {/* Free Badge */}
                    <div className="absolute top-2 left-2 px-2 py-1 rounded bg-red-600 text-white text-xs font-bold">
                      {t('common.free')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {currentLang === 'vi' && video.title_vi ? video.title_vi : video.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                      {currentLang === 'vi' && video.description_vi ? video.description_vi : video.description}
                    </p>

                    {/* Watch CTA */}
                    <div className="flex items-center justify-end text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-medium group-hover:underline">
                        {t('common.watch')}
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <Youtube className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">
              {t('courseDetail.freeLessonsEmpty')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {t('courseDetail.freeLessonsEmptyDesc')}
            </p>
          </div>
        )}

        {/* View All Link */}
        {courseFreeVideos.length > 0 && (
          <div className="mt-6 text-center">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 font-medium hover:underline"
            >
              {t('courseDetail.viewAllFreeVideos')}
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

