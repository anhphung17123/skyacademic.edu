import { useFreeVideos } from './hooks/useFreeVideos';
import { VideoFilters } from './components/VideoFilters';
import { VideoGrid } from './components/VideoGrid';
import { useTranslation } from 'react-i18next';
import { Youtube, Bell, ExternalLink, Sparkles, Video } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { VideoPlayerPopup } from '@/components/common/VideoPlayerPopup';
import { FreeVideoDto } from '@/types/api';
import { PageHero } from '@/components/common/PageHero';
import { Loading } from '@/components/common/Loading';
import { EmptyState } from '@/components/common/EmptyState';
import { ResultsInfo } from '@/components/common/ResultsInfo';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PaymentInfo } from '@/components/payment/PaymentInfo';
import { PaymentFloatButton } from '@/components/payment/PaymentFloatButton';

export const FreeVideos = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedVideo, setSelectedVideo] = useState<FreeVideoDto | null>(null);
  const currentLang = i18n.language;
  const {
    filteredVideos,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    videos,
  } = useFreeVideos();

  const heroStats = useMemo(
    () => [
      { value: "100+", label: t("freeVideos.totalVideos") },
      { value: "50K+", label: t("freeVideos.totalViews") },
      { value: "4.9", label: t("freeVideos.avgRating") },
    ],
    [t]
  );

  const subscribeCTA = useMemo(
    () => (
      <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/30 text-center shadow-xl">
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Youtube className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-white text-xl font-bold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          {t("freeVideos.subscribeTitle")}
        </h3>
        <p className="text-white/95 text-sm mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
          {t("freeVideos.subscribeDesc")}
        </p>
        <a
          href="https://www.youtube.com/@tienganhsky"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 dark:from-red-500 dark:to-red-600 hover:from-red-700 hover:to-red-600 dark:hover:from-red-400 dark:hover:to-red-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg dark:shadow-[0_8px_24px_-4px_rgba(239,68,68,0.4)] shadow-[0_4px_12px_-2px_rgba(220,38,38,0.3)] hover:shadow-xl dark:hover:shadow-[0_12px_32px_-4px_rgba(239,68,68,0.5)] hover:shadow-[0_8px_20px_-4px_rgba(220,38,38,0.4)] hover:scale-105 border border-red-500/30 dark:border-red-400/40 hover:border-red-500/40 dark:hover:border-red-400/50"
        >
          <Bell className="w-5 h-5" />
          {t("freeVideos.subscribe")}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    ),
    [t]
  );

  // Check for video ID in URL and open modal
  useEffect(() => {
    const videoId = searchParams.get("video");
    if (!videoId) {
      setSelectedVideo(null);
      return;
    }
    if (isLoading || !videos || videos.length === 0) {
      return;
    }
    const video = videos.find((v) => v.id === videoId);
    if (video) {
      setSelectedVideo(video);
    } else {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("video");
      setSearchParams(newSearchParams, { replace: true });
      setSelectedVideo(null);
    }
  }, [searchParams, videos, isLoading, setSearchParams]);

  const handleCloseVideo = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("video");
    setSearchParams(newSearchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  return (
    <>
      <PageHero
        title={t("freeVideos.title")}
        badge={t("freeVideos.badge")}
        badgeIcon={Sparkles}
        gradient="red"
        stats={heroStats}
        rightContent={subscribeCTA}
      />

      <Section padding="lg" background="gradient">
        <Container>
          {/* Filters */}
          <VideoFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />

          {/* Content */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loading />
            </div>
          ) : filteredVideos.length === 0 ? (
            <EmptyState
              icon={Video}
              title={t('freeVideos.noVideosTitle')}
              description={t('freeVideos.noVideos')}
            />
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
              {/* Left Column - Videos */}
              <div className="flex-1 w-full min-w-0">
                {/* Results count */}
                <ResultsInfo
                  count={filteredVideos.length}
                  resultsLabel={t('freeVideos.videosLabel')}
                  additionalInfo={
                    selectedCategory !== 'all' ? (
                      <span>
                        {t('common.in')}{' '}
                        <span className="font-semibold text-primary-600 dark:text-primary-400">
                          {t(`freeVideos.category.${selectedCategory}`)}
                        </span>
                      </span>
                    ) : undefined
                  }
                  onClearFilter={
                    selectedCategory !== 'all' ? () => setSelectedCategory('all') : undefined
                  }
                />
                <VideoGrid videos={filteredVideos} />
              </div>

              {/* Right Column - Payment Info - Desktop only */}
              <div className="hidden lg:block w-96 flex-shrink-0">
                <div className="sticky top-24">
                  <PaymentInfo 
                    showQrCode={true} 
                    showContactInfo={true} 
                    isDonation={true}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Video Popup */}
          {selectedVideo && (
            <VideoPlayerPopup
              isOpen={!!selectedVideo}
              onClose={handleCloseVideo}
              videoUrl={selectedVideo.youtube_url}
              title={
                currentLang === 'vi' && selectedVideo.title_vi
                  ? selectedVideo.title_vi
                  : selectedVideo.title
              }
            />
          )}

          {/* Bottom CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 p-8 text-center text-white lg:mt-16 lg:p-12 relative overflow-hidden shadow-xl">
            {/* Enhanced overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="mb-4 text-2xl font-bold lg:text-3xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">{t('freeVideos.wantMore')}</h2>
              <p className="mx-auto mb-6 max-w-2xl text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
                {t('freeVideos.wantMoreDesc')}
              </p>
              <a
                href="/courses"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-primary-700 transition-all duration-200 hover:bg-gray-50 hover:shadow-lg hover:scale-105 active:scale-100"
              >
                {t('freeVideos.exploreCourses')}
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Payment Float Button - Mobile/Tablet only */}
      <PaymentFloatButton isDonation={true} />
    </>
  );
};
