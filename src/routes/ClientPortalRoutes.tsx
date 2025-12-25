import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Loading } from '@/components/common/Loading';

// Eager load Home page (most common entry point)
import { Home } from '@/pages/Home';

// Lazy load other pages for code splitting
const Courses = lazy(() => import('@/pages/Courses').then((module) => ({ default: module.Courses })));
const CourseDetail = lazy(() => import('@/pages/CourseDetail').then((module) => ({ default: module.CourseDetail })));
const Books = lazy(() => import('@/pages/Books').then((module) => ({ default: module.Books })));
const BookDetail = lazy(() => import('@/pages/BookDetail').then((module) => ({ default: module.BookDetail })));
const FreeVideos = lazy(() => import('@/pages/FreeVideos').then((module) => ({ default: module.FreeVideos })));
const About = lazy(() => import('@/pages/About').then((module) => ({ default: module.About })));
const Contact = lazy(() => import('@/pages/Contact').then((module) => ({ default: module.Contact })));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy').then((module) => ({ default: module.PrivacyPolicy })));
const TermsOfService = lazy(() => import('@/pages/TermsOfService').then((module) => ({ default: module.TermsOfService })));

export const ClientPortalRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Home */}
          <Route path="/" element={<Home />} />
          
          {/* Courses */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:language/:slug" element={<CourseDetail />} />
          
          {/* Books */}
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
          
          {/* Free Videos */}
          <Route path="/free-videos" element={<FreeVideos />} />
          
          {/* Info Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
