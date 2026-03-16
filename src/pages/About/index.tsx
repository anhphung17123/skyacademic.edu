import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Sparkles, Users, Award, BookOpen, Heart } from 'lucide-react';
import { mockSiteStats } from '@/services/mock/data/SiteStats';
import { PageHero } from '@/components/common/PageHero';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PageTransition } from '@/components/common/PageTransition';
import { ValuesGrid } from './components/ValuesGrid';
import { ContactSection } from './components/ContactSection';
import { SkySharesSection } from './components/SkySharesSection';
import { SupportSection } from './components/SupportSection';

export const About = () => {
  const { t } = useTranslation();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash !== '#contact') return;
    const timer = window.setTimeout(() => {
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [hash]);

  const stats = useMemo(() => {
    const a = mockSiteStats.about;
    const items: Array<{ value: string; label: string }> = [];
    if (a.statStudents > 0) items.push({ value: String(a.statStudents), label: t('about.statStudents') });
    if (a.statCourses > 0) items.push({ value: String(a.statCourses), label: t('about.statCourses') });
    if (a.statRating > 0) items.push({ value: String(a.statRating), label: t('about.statRating') });
    if (a.yearsExp > 0) items.push({ value: String(a.yearsExp), label: t('about.yearsExp') });
    return items;
  }, [t]);

  const values = [
    { icon: Heart, title: t('about.valuePassion'), description: t('about.valuePassionDesc') },
    { icon: Award, title: t('about.valueExcellence'), description: t('about.valueExcellenceDesc') },
    { icon: Users, title: t('about.valueCommunity'), description: t('about.valueCommunityDesc') },
    { icon: BookOpen, title: t('about.valueInnovation'), description: t('about.valueInnovationDesc') },
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
              {/* 1. Story – who we are, origin */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 md:p-10 border-2 border-primary-200/80 dark:border-primary-800/80 shadow-lg mb-16">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-5">
                  {t('about.storyTitle')}
                </h2>
                <div className="space-y-3.5">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{t('about.storyP1')}</p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{t('about.storyP2')}</p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{t('about.storyP3')}</p>
                </div>
              </div>

              {/* 2. Mission & Vision */}
              <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                  {t('about.mission')} & {t('about.vision')}
                </h2>
                <div className="space-y-8 max-w-3xl mx-auto text-left">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                      {t('about.missionTitle')}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('about.missionText')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                      {t('about.vision')}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('about.visionText')}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Values */}
              <ValuesGrid values={values} />

              {/* 4. Community – what we do (SKY SHARES) */}
              <SkySharesSection />

              {/* 5. Support us */}
              <SupportSection />

              {/* 6. Contact */}
              <ContactSection />
            </div>
          </Container>
        </Section>
      </>
    </PageTransition>
  );
};
