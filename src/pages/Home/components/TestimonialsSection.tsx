import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, Star } from 'lucide-react';
import { mockSiteStats } from '@/services/mock/data/SiteStats';

export const TestimonialsSection = () => {
  const { t } = useTranslation();
  const hasStudents = (mockSiteStats.about.statStudents ?? 0) > 0;
  const subtitleKey = hasStudents ? 'testimonials.subtitle' : 'testimonials.subtitleNoStudents';

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t(subtitleKey)}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-3xl border-2 border-dashed border-primary-200 dark:border-primary-700 bg-gradient-to-br from-primary-50/80 to-secondary-50/80 dark:from-primary-900/20 dark:to-secondary-900/20 p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-lg mb-6">
              <MessageCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {t('testimonials.emptyTitle')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-8">
              {t('testimonials.emptySubtitle')}
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            >
              {t('testimonials.ctaExploreCourses')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              {t('testimonials.emptyHint')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
