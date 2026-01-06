import {
  Scale,
  FileCheck,
  User,
  CreditCard,
  BookOpen,
  AlertTriangle,
  Ban,
  HelpCircle,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageTransition } from '@/components/common/PageTransition';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/common/PageHero';

export const TermsOfService = () => {
  const { t, i18n } = useTranslation();

  const getItems = (key: string): string[] => {
    const items = i18n.getResource(i18n.language, 'translation', key);
    return Array.isArray(items) ? items : [];
  };

  const sections = [
    {
      icon: FileCheck,
      title: t('termsOfService.sections.acceptance.title'),
      color: 'blue',
      description: t('termsOfService.sections.acceptance.desc'),
      details: getItems('termsOfService.sections.acceptance.items'),
    },
    {
      icon: BookOpen,
      title: t('termsOfService.sections.license.title'),
      color: 'green',
      description: t('termsOfService.sections.license.desc'),
      details: getItems('termsOfService.sections.license.items'),
    },
    {
      icon: User,
      title: t('termsOfService.sections.registration.title'),
      color: 'purple',
      description: t('termsOfService.sections.registration.desc'),
      details: getItems('termsOfService.sections.registration.items'),
    },
    {
      icon: CreditCard,
      title: t('termsOfService.sections.payment.title'),
      color: 'amber',
      description: t('termsOfService.sections.payment.desc'),
      details: getItems('termsOfService.sections.payment.items'),
      highlight: true,
    },
    {
      icon: Ban,
      title: t('termsOfService.sections.prohibited.title'),
      color: 'red',
      description: t('termsOfService.sections.prohibited.desc'),
      details: getItems('termsOfService.sections.prohibited.items'),
    },
    {
      icon: AlertTriangle,
      title: t('termsOfService.sections.disclaimer.title'),
      color: 'orange',
      description: t('termsOfService.sections.disclaimer.desc'),
      details: getItems('termsOfService.sections.disclaimer.items'),
    },
    {
      icon: HelpCircle,
      title: t('termsOfService.sections.support.title'),
      color: 'indigo',
      description: t('termsOfService.sections.support.desc'),
      details: getItems('termsOfService.sections.support.items'),
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<
      string,
      { bg: string; text: string; iconBg: string; border: string }
    > = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-600 dark:text-blue-400',
        iconBg: 'from-blue-500 to-blue-600',
        border: 'border-blue-200 dark:border-blue-800',
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        text: 'text-green-600 dark:text-green-400',
        iconBg: 'from-green-500 to-green-600',
        border: 'border-green-200 dark:border-green-800',
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        text: 'text-purple-600 dark:text-purple-400',
        iconBg: 'from-purple-500 to-purple-600',
        border: 'border-purple-200 dark:border-purple-800',
      },
      amber: {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        text: 'text-amber-600 dark:text-amber-400',
        iconBg: 'from-amber-500 to-amber-600',
        border: 'border-amber-200 dark:border-amber-800',
      },
      red: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        text: 'text-red-600 dark:text-red-400',
        iconBg: 'from-red-500 to-red-600',
        border: 'border-red-200 dark:border-red-800',
      },
      orange: {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        text: 'text-orange-600 dark:text-orange-400',
        iconBg: 'from-orange-500 to-orange-600',
        border: 'border-orange-200 dark:border-orange-800',
      },
      indigo: {
        bg: 'bg-indigo-50 dark:bg-indigo-900/20',
        text: 'text-indigo-600 dark:text-indigo-400',
        iconBg: 'from-indigo-500 to-indigo-600',
        border: 'border-indigo-200 dark:border-indigo-800',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        {/* Hero Section */}
        <PageHero
          title={t('termsOfService.title')}
          subtitle={t('termsOfService.lastUpdated')}
          badge={t('termsOfService.badge')}
          badgeIcon={Sparkles}
          gradient="page"
        />

        {/* Content */}
        <Section padding="xl" background="default">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Intro text */}
              <div className="mb-8 text-center">
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  {t('termsOfService.intro')}
                </p>
              </div>

              {/* Agreement Notice */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-primary-500/30 dark:border-primary-500/50 p-6 md:p-8 mb-12 transition-all hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-8 h-8 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {t('termsOfService.agreementNotice')}
                    </h2>
                    <ul className="space-y-2">
                      {getItems('termsOfService.agreementItems').map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-gray-700 dark:text-gray-200"
                        >
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {sections.map((section, index) => {
                  const colors = getColorClasses(section.color);
                  return (
                    <div
                      key={index}
                      id={`section-${index + 1}`}
                      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 scroll-mt-24 transition-all hover:shadow-xl ${
                        section.highlight ? `border-2 ${colors.border}` : ''
                      }`}
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg`}
                        >
                          <section.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2.5">
                            {section.title}
                          </h2>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                            {section.description}
                          </p>
                        </div>
                      </div>

                      {section.highlight && (
                        <div className="mb-5 p-3.5 bg-amber-100 dark:bg-amber-900/40 rounded-xl flex items-center gap-2.5 border-2 border-amber-300/80 dark:border-amber-700/80 shadow-md">
                          <CheckCircle2 className="w-5 h-5 text-amber-700 dark:text-amber-300 flex-shrink-0" />
                          <span className="text-sm font-bold text-amber-900 dark:text-amber-100">
                            {t('termsOfService.moneyBackGuarantee')}
                          </span>
                        </div>
                      )}

                      <div className={`p-4 rounded-xl ${colors.bg} border border-gray-100 dark:border-gray-700`}>
                        <ul className="space-y-2">
                          {section.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div
                                className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${colors.text.replace(
                                  'text-',
                                  'bg-'
                                )}`}
                              />
                              <span className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                                {detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Note */}
              <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <Scale className="w-8 h-8 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      {t('termsOfService.questionsTitle')}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-4">
                      {t('termsOfService.questionsDesc')}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline"
                      >
                        {t('termsOfService.contactSupport')}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      <Link
                        to="/privacy-policy"
                        className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline"
                      >
                        {t('footer.privacy')}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </PageTransition>
  );
};

