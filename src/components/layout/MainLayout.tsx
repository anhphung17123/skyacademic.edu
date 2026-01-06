import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useEffect, useMemo, memo } from 'react';
import { clsx } from 'clsx';
import { PageTransition } from '@/components/common/PageTransition';

/**
 * Main layout component wrapping all pages
 * Handles scroll restoration and provides header/footer structure
 * Optimized for performance with memoization and efficient scroll handling
 */
export const MainLayout = memo(() => {
  const location = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    scrollToTop();
  }, [location.pathname]);

  const isHomePage = useMemo(() => location.pathname === '/', [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-slate-950 overflow-x-hidden w-full max-w-full">
      <Header />
      <main 
        className={clsx(
          'flex-1 w-full max-w-full overflow-x-hidden',
          !isHomePage && 'pt-16 md:pt-20'
        )}
        role="main"
      >
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
});

MainLayout.displayName = 'MainLayout';
