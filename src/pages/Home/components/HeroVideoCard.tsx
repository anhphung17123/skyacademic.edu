import { useTranslation } from 'react-i18next';
import { Play } from 'lucide-react';
import { YouTubeThumbnail } from '@/components/common/YouTubeThumbnail';
import type { FreeVideoDto } from '@/types/api';

interface HeroVideoCardProps {
  readonly video: FreeVideoDto;
  readonly isLightMode: boolean;
  readonly currentLang: string;
}

export const HeroVideoCard = ({ video, isLightMode, currentLang }: HeroVideoCardProps) => {
  const { t } = useTranslation();

  const videoTitle = currentLang === 'vi'
    ? video.title_vi || video.title
    : video.title_en || video.title;

  const handleVideoClick = () => {
    if (!video.youtube_url) return;
    window.open(video.youtube_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative hidden lg:block">
      <div
        className={`relative rounded-2xl p-6 border-2 shadow-xl backdrop-blur-sm ${
          isLightMode
            ? 'bg-white/90 border-gray-200/50 shadow-gray-200/50'
            : 'bg-slate-800/90 border-slate-700/50 shadow-slate-900/50'
        }`}
      >
        {video.youtube_url && (
          <div
            className="relative aspect-video rounded-xl overflow-hidden mb-5 group cursor-pointer"
            onClick={handleVideoClick}
          >
            <YouTubeThumbnail
              url={video.youtube_url}
              alt={videoTitle}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${
                isLightMode
                  ? 'from-gray-900/60 via-gray-900/20 to-transparent'
                  : 'from-slate-900/80 via-slate-900/20 to-transparent'
              }`}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 ${
                  isLightMode ? 'bg-white/95 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'
                }`}
              >
                <Play className="w-6 h-6 text-primary-600 ml-1" />
              </div>
            </div>

            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              {t('hero.liveClass')}
            </div>
          </div>
        )}

        <div className="space-y-2">
          {video.youtube_url ? (
            <a
              className={`text-sm font-bold line-clamp-2 block ${
                isLightMode ? 'text-gray-800' : 'text-gray-100'
              } hover:underline`}
              href={video.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {videoTitle}
            </a>
          ) : (
            <span
              className={`text-sm font-bold line-clamp-2 ${
                isLightMode ? 'text-gray-800' : 'text-gray-100'
              }`}
            >
              {videoTitle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
