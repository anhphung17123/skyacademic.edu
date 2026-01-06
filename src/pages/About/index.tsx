import { useTranslation } from 'react-i18next';
import { Sparkles, Users, Award, BookOpen, Heart } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PageTransition } from '@/components/common/PageTransition';

export const About = () => {
  const { t } = useTranslation();

  const stats = [
    { value: '10+', label: t('about.statStudents') },
    { value: '10+', label: t('about.statCourses') },
    { value: '4.9', label: t('about.statRating') },
    { value: '5+', label: t('about.yearsExp') },
  ];

  const values = [
    {
      icon: Heart,
      title: t('about.valuePassion'),
      description: t('about.valuePassionDesc'),
    },
    {
      icon: Award,
      title: t('about.valueExcellence'),
      description: t('about.valueExcellenceDesc'),
    },
    {
      icon: Users,
      title: t('about.valueCommunity'),
      description: t('about.valueCommunityDesc'),
    },
    {
      icon: BookOpen,
      title: t('about.valueInnovation'),
      description: t('about.valueInnovationDesc'),
    },
  ];

  return (
    <PageTransition>
      <>
        <PageHero
          title={t('about.heroTitle')}
          subtitle={t('about.heroSubtitle')}
          badge={t('about.badge')}
          badgeIcon={Sparkles}
          gradient="page"
          stats={stats}
        />

        <Section padding="lg" background="default">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Mission Section */}
              <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-5">
                  {t('about.mission')}
                </h2>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  {t('about.visionText')}
                </p>
              </div>

              {/* Values Section */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="p-8 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all hover:border-primary-300 dark:hover:border-primary-600"
                  >
                    <div className="flex items-start gap-5">
                      <div className="p-3.5 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex-shrink-0 border border-primary-200/60 dark:border-primary-700/40">
                        <value.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2.5">
                          {value.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Story Section */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 md:p-10 border-2 border-primary-200/80 dark:border-primary-800/80 shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-5">
                  {t('about.storyTitle')}
                </h2>
                <div className="space-y-3.5">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                    {t('about.storyP1')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                    {t('about.storyP2')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                    {t('about.storyP3')}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </>
    </PageTransition>
  );
};

