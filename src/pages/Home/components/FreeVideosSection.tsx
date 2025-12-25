import { useTranslation } from 'react-i18next';
import { Play } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { freeVideoApi } from '@/services/api/free-video-service';
import { FreeVideoDto } from '@/types/api';
import { YouTubeThumbnail } from '@/components/common/YouTubeThumbnail';

export const FreeVideosSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [videos, setVideos] = useState<FreeVideoDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentLang = i18n.language;

  const handleVideoClick = (video: FreeVideoDto) => {
    navigate(`/free-videos?video=${video.id}`);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchVideos = async () => {
      try {
        const data = await freeVideoApi.fetchVideos();
        if (isMounted) {
          // Get first 4 videos for featured section
          setVideos(data.slice(0, 4));
        }
      } catch {
        // Fail silently
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-slate-950">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-danger-100 dark:bg-danger-900/30 text-danger-600 dark:text-danger-400 rounded-full text-sm font-medium mb-4">
              {t('nav.freeVideos')}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
              {t('freeVideos.sectionTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('freeVideos.sectionSubtitle')}
            </p>
          </div>
          <Link
            to="/free-videos"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:underline"
          >
            {t('common.viewAll')}
            <span>→</span>
          </Link>
        </div>

        {/* Video Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => {
              const defaultThumbnail = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400';
              
              return (
                <div
                  key={video.id}
                  className="group cursor-pointer"
                  onClick={() => handleVideoClick(video)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                    {video.youtube_url ? (
                      <YouTubeThumbnail
                        url={video.youtube_url}
                        alt={currentLang === 'vi' ? (video.title_vi || video.title) : (video.title_en || video.title)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        fallbackUrl={defaultThumbnail}
                      />
                    ) : (
                      <img
                        src={defaultThumbnail}
                        alt={currentLang === 'vi' ? (video.title_vi || video.title) : (video.title_en || video.title)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                        <Play className="w-6 h-6 text-primary-600 ml-1" />
                      </div>
                    </div>

                    {/* Category Badge */}
                    {video.category && (
                      <div className="absolute top-2 left-2 px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded">
                        {currentLang === 'vi' && video.category_vi ? video.category_vi : video.category}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">
                    {currentLang === 'vi' ? (video.title_vi || video.title) : (video.title_en || video.title)}
                  </h3>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-danger-500 to-danger-600 rounded-2xl p-8 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Play className="w-8 h-8" />
            <h3 className="text-2xl font-bold">
              {t('freeVideos.ctaTitle')}
            </h3>
          </div>
          <p className="text-danger-100 mb-6">
            {t('freeVideos.ctaSubtitle')}
          </p>
          <a
            href="https://www.youtube.com/@tienganhsky"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-danger-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Play className="w-5 h-5" />
            {t('freeVideos.subscribeButton')}
          </a>
        </div>
      </div>
    </section>
  );
};
