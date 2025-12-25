import { useTranslation } from 'react-i18next';
import { BookOpen, GraduationCap, Award, CheckCircle } from 'lucide-react';

export const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-400/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-slide-up">
              {t('about.heroTitle')}
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed animate-slide-up">
              {t('about.heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Educator Information */}
      <section className="py-20 bg-gray-50 dark:bg-slate-950">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <BookOpen className="w-4 h-4" />
                  {t('about.educatorLabel')}
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                  {t('about.educatorName')}
                </h2>
                <p className="text-lg text-primary-600 dark:text-primary-400 font-medium">
                  {t('about.educatorRole')}
                </p>
              </div>

              {/* Description */}
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {t('about.educatorDescription')}
                </p>
              </div>

              {/* Education & Certifications */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-primary-600" />
                  {t('about.educationTitle')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{t('about.bedPhysics')}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('about.bedPhysicsGpa')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{t('about.tesolCertified')}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('about.tesolDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{t('about.ieltsScore')}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('about.ieltsDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary-600" />
                  {t('about.experienceTitle')}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <span>{t('about.swinburne')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <span>{t('about.canadianStem')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <span>{t('about.martinAcademy')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
