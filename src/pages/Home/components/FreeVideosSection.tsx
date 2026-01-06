import { useTranslation } from "react-i18next";
import { ArrowRight, Play } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { freeVideoApi } from "@/services/api/free-video-service";
import { FreeVideoDto } from "@/types/api";
import { YouTubeThumbnail } from "@/components/common/YouTubeThumbnail";
import { HorizontalScroll } from "@/components/common/HorizontalScroll";

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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 rounded-full text-sm font-medium mb-4 border border-red-200 dark:border-red-800/50">
              {t("nav.freeVideos")}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
              {t("freeVideos.sectionTitle")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 w-full lg:max-w-xl">
              {t("freeVideos.sectionSubtitle")}
            </p>
          </div>
          <Link
            to="/free-videos"
            className="inline-flex items-center gap-2 text-red-600 dark:text-red-300 font-semibold hover:text-red-700 dark:hover:text-red-200 hover:underline self-start lg:self-auto transition-colors"
          >
            {t("freeVideos.viewAll")}
            <span>→</span>
          </Link>
        </div>

        {/* Video Grid - Single Row with Horizontal Scroll on Mobile/iPad */}
        {isLoading ? (
          <>
            <div className="hidden lg:grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
            <HorizontalScroll className="lg:hidden">
              <div className="w-4 md:w-6 flex-shrink-0" />
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-[280px] sm:w-[320px] bg-white dark:bg-gray-800 rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </HorizontalScroll>
          </>
        ) : (
          <>
            <div className="hidden lg:grid grid-cols-4 gap-6">
              {videos.map((video) => {
                const defaultThumbnail =
                  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400";

                return (
                  <div
                    key={video.id}
                    className="group cursor-pointer"
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                      {video.youtube_url ? (
                        <YouTubeThumbnail
                          url={video.youtube_url}
                          alt={
                            currentLang === "vi"
                              ? video.title_vi || video.title
                              : video.title_en || video.title
                          }
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          fallbackUrl={defaultThumbnail}
                        />
                      ) : (
                        <img
                          src={defaultThumbnail}
                          alt={
                            currentLang === "vi"
                              ? video.title_vi || video.title
                              : video.title_en || video.title
                          }
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}

                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                          <Play className="w-6 h-6 text-primary-600 ml-1" />
                        </div>
                      </div>

                      {video.category && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded">
                          {currentLang === "vi" && video.category_vi
                            ? video.category_vi
                            : video.category}
                        </div>
                      )}
                    </div>

                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">
                      {currentLang === "vi"
                        ? video.title_vi || video.title
                        : video.title_en || video.title}
                    </h3>
                  </div>
                );
              })}
            </div>
            <HorizontalScroll className="lg:hidden">
              <div className="w-4 md:w-6 flex-shrink-0" />
              {videos.map((video) => {
                const defaultThumbnail =
                  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400";

                return (
                  <div
                    key={video.id}
                    className="w-[280px] sm:w-[320px] group cursor-pointer"
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                      {video.youtube_url ? (
                        <YouTubeThumbnail
                          url={video.youtube_url}
                          alt={
                            currentLang === "vi"
                              ? video.title_vi || video.title
                              : video.title_en || video.title
                          }
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          fallbackUrl={defaultThumbnail}
                        />
                      ) : (
                        <img
                          src={defaultThumbnail}
                          alt={
                            currentLang === "vi"
                              ? video.title_vi || video.title
                              : video.title_en || video.title
                          }
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}

                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                          <Play className="w-6 h-6 text-primary-600 ml-1" />
                        </div>
                      </div>

                      {video.category && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded">
                          {currentLang === "vi" && video.category_vi
                            ? video.category_vi
                            : video.category}
                        </div>
                      )}
                    </div>

                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">
                      {currentLang === "vi"
                        ? video.title_vi || video.title
                        : video.title_en || video.title}
                    </h3>
                  </div>
                );
              })}
            </HorizontalScroll>
          </>
        )}
        {/* View All Button - Mobile */}
        <div className="mt-10 text-center md:hidden">
          <Link
            to="/free-videos"
            className="inline-flex items-center gap-2 bg-secondary-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-secondary-700 transition-colors"
          >
            {t("freeVideos.viewAll")}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        {/* CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-red-500 via-red-600 to-red-700 dark:from-red-950/90 dark:via-red-900/85 dark:to-red-950/90 rounded-2xl p-8 md:p-10 text-white dark:text-red-50 text-center relative overflow-hidden shadow-2xl dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5)] border dark:border-red-900/50">
          {/* Enhanced overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/15 pointer-events-none"></div>
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-400/20 dark:bg-red-800/15 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-400/20 dark:bg-red-800/15 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-white/25 dark:bg-red-800/40 rounded-full border border-white/30 dark:border-red-700/40 shadow-lg">
                <Play className="w-8 h-8 text-white dark:text-red-50" fill="currentColor" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white dark:text-red-50 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">{t("freeVideos.ctaTitle")}</h3>
            </div>
            <p className="text-white/95 dark:text-red-100 mb-8 text-base md:text-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">{t("freeVideos.ctaSubtitle")}</p>
            <a
              href="https://www.youtube.com/@tienganhsky"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white dark:bg-gradient-to-r dark:from-red-800/90 dark:to-red-900/90 text-red-700 dark:text-red-50 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 dark:hover:from-red-700/90 dark:hover:to-red-800/90 transition-all duration-300 shadow-2xl hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.3)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_6px_20px_-2px_rgba(0,0,0,0.5)] hover:scale-110 active:scale-105 transform border-2 border-white/30 dark:border-red-700/50 hover:border-white/50 dark:hover:border-red-600/60"
            >
              <Play className="w-5 h-5" fill="currentColor" />
              <span className="text-lg">{t("freeVideos.subscribeButton")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
