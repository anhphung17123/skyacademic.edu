import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHome } from './hooks/useHome';
import { Loading } from '@/components/common/Loading';
import { ErrorState } from '@/components/common/ErrorState';
import { HeroSectionContent } from './components/HeroSection';
import { FeaturedCoursesSection } from './components/FeaturedCoursesSection';
import { FeaturedBooksSection } from './components/FeaturedBooksSection';
import { FreeVideosSection } from './components/FreeVideosSection';
import { FeaturedBlocksSection } from './components/FeaturedBlocksSection';
import { LearningResourcesSection } from './components/LearningResourcesSection';
import { TestimonialsSection } from './components/TestimonialsSection';

export const Home = () => {
  const { hash } = useLocation();
  const {
    featuredCourses,
    featuredBooks,
    featuredVideos,
    featuredVideo,
    isLoading,
    error,
  } = useHome();

  useEffect(() => {
    if (!hash || isLoading || error) return;
    const timer = window.setTimeout(() => {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return () => window.clearTimeout(timer);
  }, [hash, isLoading, error]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="overflow-hidden">
      <HeroSectionContent featuredVideo={featuredVideo} />
      <FeaturedBlocksSection />
      <LearningResourcesSection />
      <FeaturedCoursesSection courses={featuredCourses} />
      <FeaturedBooksSection books={featuredBooks} />
      <TestimonialsSection />
      <FreeVideosSection videos={featuredVideos} />
    </div>
  );
};
