import { useTranslation } from 'react-i18next';
import { Play, Star, Users, Award } from 'lucide-react';
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

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <a
              className={`text-base font-bold line-clamp-2 ${
                isLightMode ? 'text-gray-800' : 'text-gray-100'
              }`}
              href={video.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {videoTitle}
            </a>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 flex-shrink-0 ml-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span
                className={`text-sm font-bold ${
                  isLightMode ? 'text-gray-900' : 'text-white'
                }`}
              >
                4.9
              </span>
            </div>
          </div>

          <div
            className={`flex items-center gap-6 text-sm ${
              isLightMode ? 'text-gray-600' : 'text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${isLightMode ? 'bg-primary-50' : 'bg-primary-500/10'}`}>
                <Users className={`w-4 h-4 ${isLightMode ? 'text-primary-600' : 'text-primary-400'}`} />
              </div>
              <span className="font-medium">50+ {t('hero.students')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${isLightMode ? 'bg-secondary-50' : 'bg-secondary-500/10'}`}>
                <Award className={`w-4 h-4 ${isLightMode ? 'text-secondary-600' : 'text-secondary-400'}`} />
              </div>
              <span className="font-medium">{t('hero.certificate')}</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between text-sm mb-3">
              <span className={`font-medium ${isLightMode ? 'text-gray-700' : 'text-slate-300'}`}>
                {t('hero.courseProgress')}
              </span>
              <span className={`font-bold text-lg ${isLightMode ? 'text-primary-600' : 'text-primary-400'}`}>
                85%
              </span>
            </div>
            <div className={`h-3 rounded-full overflow-hidden ${isLightMode ? 'bg-gray-200' : 'bg-slate-700'}`}>
              <div className="h-full w-[85%] bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 rounded-full shadow-lg shadow-primary-500/30" />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute -bottom-6 -left-6 rounded-xl p-4 shadow-xl backdrop-blur-sm border-2 ${
          isLightMode
            ? 'bg-white border-gray-200/50 shadow-gray-300/50'
            : 'bg-slate-800/95 border-slate-700/50 shadow-slate-900/50'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isLightMode ? 'bg-primary-100' : 'bg-primary-500/20'}`}>
            <Users className={`w-5 h-5 ${isLightMode ? 'text-primary-600' : 'text-primary-400'}`} />
          </div>
          <div>
            <p className={`text-lg font-bold ${isLightMode ? 'text-gray-800' : 'text-gray-100'}`}>
              {t('hero.highlight1')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
