import { HeroSection } from './components/HeroSection';
import { FeaturedCoursesSection } from './components/FeaturedCoursesSection';
import { FeaturedBooksSection } from './components/FeaturedBooksSection';
import { FreeVideosSection } from './components/FreeVideosSection';
import { FeaturedBlocksSection } from './components/FeaturedBlocksSection';

export const Home = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <FeaturedBlocksSection />
      <FeaturedCoursesSection />
      <FeaturedBooksSection />
      <FreeVideosSection />
    </div>
  );
};
