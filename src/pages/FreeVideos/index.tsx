import { Loading } from '@/components/common/Loading';
import { useFreeVideos } from './hooks/useFreeVideos';
import { VideoFilters } from './components/VideoFilters';
import { VideoGrid } from './components/VideoGrid';
import { useTranslation } from 'react-i18next';
import { Youtube, Bell, ExternalLink, Play, Sparkles } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { VideoPlayerPopup } from '@/components/common/VideoPlayerPopup';
import { FreeVideoDto } from '@/types/api';

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

  // Check for video ID in URL and open modal
  useEffect(() => {
    const videoId = searchParams.get('video');
    
    // If no video ID in URL, close modal
    if (!videoId) {
      setSelectedVideo(null);
      return;
    }

    // If videos are still loading, wait
    if (isLoading || videos.length === 0) {
      return;
    }

    // Find video by ID
    const video = videos.find((v) => v.id === videoId);
    
    if (video) {
      setSelectedVideo(video);
    } else {
      // Video not found, remove param from URL
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('video');
      setSearchParams(newSearchParams, { replace: true });
      setSelectedVideo(null);
    }
  }, [searchParams, videos, isLoading, setSearchParams]);

  const handleCloseVideo = useCallback(() => {
    // Remove video param from URL - useEffect will handle closing the modal
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('video');
    setSearchParams(newSearchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 py-12 md:py-16 overflow-hidden">
        {/* Subtle Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-yellow-500/10 rounded-full blur-3xl" />
        </div>
        
        {/* Subtle Play button decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 20}%`,
                top: `${25 + (i % 2) * 30}%`,
              }}
            >
              <Play className="w-8 h-8 text-white" fill="currentColor" />
            </div>
          ))}
        </div>
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center lg:text-left space-y-3">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-medium">
                <Sparkles className="w-4 h-4" />
                <span>{t('freeVideos.badge')}</span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                {t('freeVideos.title')}
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-xl">
                {t('freeVideos.subtitle')}
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
                <div className="text-center px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                  <div className="text-xl font-bold">100+</div>
                  <div className="text-white/70 text-xs">{t('freeVideos.totalVideos')}</div>
                </div>
                <div className="w-px h-8 bg-white/30" />
                <div className="text-center px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                  <div className="text-xl font-bold">50K+</div>
                  <div className="text-white/70 text-xs">{t('freeVideos.totalViews')}</div>
                </div>
                <div className="w-px h-8 bg-white/30" />
                <div className="text-center px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                  <div className="text-xl font-bold">4.9</div>
                  <div className="text-white/70 text-xs">{t('freeVideos.avgRating')}</div>
                </div>
              </div>
            </div>
            
            {/* YouTube Subscribe CTA */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Youtube className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">
                {t('freeVideos.subscribeTitle')}
              </h3>
              <p className="text-white/70 text-sm mb-4">
                {t('freeVideos.subscribeDesc')}
              </p>
              <a
                href="https://youtube.com/@skyacademic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
              >
                <Bell className="w-5 h-5" />
                {t('freeVideos.subscribe')}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-gray-50 dark:fill-gray-900"/>
          </svg>
        </div>
      </div>

      <div className="container-custom py-12">
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
        ) : (
          <>
            {/* Results count */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                {t('common.showing')} <span className="font-semibold text-gray-900 dark:text-white">{filteredVideos.length}</span> {t('freeVideos.videosLabel')}
                {selectedCategory !== 'all' && (
                  <span> {t('common.in')} <span className="font-semibold text-primary-600">{t(`freeVideos.category.${selectedCategory}`)}</span></span>
                )}
              </p>
            </div>
            
            <VideoGrid videos={filteredVideos} />
          </>
        )}
        
        {/* Video Popup */}
        {selectedVideo && (
          <VideoPlayerPopup
            isOpen={!!selectedVideo}
            onClose={handleCloseVideo}
            videoUrl={selectedVideo.youtube_url}
            title={currentLang === 'vi' && selectedVideo.title_vi ? selectedVideo.title_vi : selectedVideo.title}
          />
        )}
        
        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            {t('freeVideos.wantMore')}
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            {t('freeVideos.wantMoreDesc')}
          </p>
          <a
            href="/courses"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
          >
            {t('freeVideos.exploreCourses')}
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};


