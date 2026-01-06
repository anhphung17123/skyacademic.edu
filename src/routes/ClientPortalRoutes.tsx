import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Loading } from '@/components/common/Loading';
import {
  Home,
  Courses,
  CourseDetail,
  Books,
  BookDetail,
  FreeVideos,
  About,
  Contact,
  PrivacyPolicy,
  TermsOfService,
  ROUTES,
} from './routes.config';

export const ClientPortalRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Home */}
          <Route path={ROUTES.HOME} element={<Home />} />
          
          {/* Courses */}
          <Route path={ROUTES.COURSES} element={<Courses />} />
          <Route path={ROUTES.COURSE_DETAIL} element={<CourseDetail />} />
          
          {/* Books */}
          <Route path={ROUTES.BOOKS} element={<Books />} />
          <Route path={ROUTES.BOOK_DETAIL} element={<BookDetail />} />
          
          {/* Free Videos */}
          <Route path={ROUTES.FREE_VIDEOS} element={<FreeVideos />} />
          
          {/* Info Pages */}
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
          <Route path={ROUTES.TERMS_OF_SERVICE} element={<TermsOfService />} />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
