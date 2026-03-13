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
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [hash]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="overflow-hidden">
      <HeroSectionContent featuredVideo={featuredVideo} />
      <FeaturedBlocksSection />
      <FeaturedCoursesSection courses={featuredCourses} />
      <FeaturedBooksSection books={featuredBooks} />
      <TestimonialsSection />
      <FreeVideosSection videos={featuredVideos} />
    </div>
  );
};
