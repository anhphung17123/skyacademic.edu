import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useEffect } from 'react';

export const MainLayout = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Check if current page is home to apply transparent header
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-1 ${isHomePage ? '' : 'pt-16 md:pt-20'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
