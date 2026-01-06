import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Clock, Eye, Youtube, Video } from 'lucide-react';
import { FreeVideoDto } from '@/types/api';
import { YouTubeThumbnail } from '@/components/common/YouTubeThumbnail';
import { useNavigate } from 'react-router-dom';

interface VideoGridProps {
  videos: FreeVideoDto[];
}

export const VideoGrid = memo(({ videos }: VideoGridProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language;

  const handleVideoClick = useCallback((video: FreeVideoDto) => {
    navigate(`/free-videos?video=${video.id}`);
  }, [navigate]);

  if (videos.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
          <Video className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('freeVideos.noVideosTitle')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {t('freeVideos.noVideos')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      {videos.map((video) => (
          <div 
            key={video.id} 
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:-translate-y-2 flex flex-col h-full"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
              {video.youtube_url ? (
                <YouTubeThumbnail
                  url={video.youtube_url}
                  alt={currentLang === 'vi' && video.title_vi ? video.title_vi : video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  <Play className="w-16 h-16 text-gray-400" />
                </div>
              )}
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
              
              {/* Play button overlay */}
              <button
                onClick={() => handleVideoClick(video)}
                className="absolute inset-0 flex items-center justify-center w-full h-full"
              >
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl transform scale-90 opacity-90 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                  <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                </div>
              </button>
              
              {/* Category badge */}
              {video.category && (
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1.5 bg-primary-600 text-white text-xs font-semibold rounded-full shadow-lg">
                    {currentLang === 'vi' && video.category_vi ? video.category_vi : video.category}
                  </span>
                </div>
              )}
              
              {/* Duration badge - placeholder */}
              <div className="absolute bottom-3 right-3">
                <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </span>
              </div>
              
              {/* YouTube icon */}
              <div className="absolute top-3 right-3">
                <div className="p-1.5 bg-white/90 rounded-lg shadow">
                  <Youtube className="w-4 h-4 text-red-600" />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <div className="min-h-[3.5rem] mb-2">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {currentLang === 'vi' && video.title_vi ? video.title_vi : video.title}
                </h3>
              </div>
              
              <div className="min-h-[2.5rem] mb-4">
                {video.description ? (
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {currentLang === 'vi' && video.description_vi ? video.description_vi : video.description}
                  </p>
                ) : (
                  <div className="text-sm">&nbsp;</div>
                )}
              </div>
              
              {/* Stats row - placeholder */}
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>{Math.floor(Math.random() * 10000)}+ {t('freeVideos.views')}</span>
                </div>
              </div>
              
              {/* Watch button */}
              <button
                onClick={() => handleVideoClick(video)}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg mt-auto"
              >
                <Play className="w-5 h-5" />
                {t('freeVideos.watchVideo')}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
});

VideoGrid.displayName = 'VideoGrid';


