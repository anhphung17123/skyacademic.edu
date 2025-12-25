import { Scale, FileCheck, User, CreditCard, BookOpen, AlertTriangle, Ban, HelpCircle, ChevronRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
      details: getItems('termsOfService.sections.acceptance.items')
    },
    {
      icon: BookOpen,
      title: t('termsOfService.sections.license.title'),
      color: 'green',
      description: t('termsOfService.sections.license.desc'),
      details: getItems('termsOfService.sections.license.items')
    },
    {
      icon: User,
      title: t('termsOfService.sections.registration.title'),
      color: 'purple',
      description: t('termsOfService.sections.registration.desc'),
      details: getItems('termsOfService.sections.registration.items')
    },
    {
      icon: CreditCard,
      title: t('termsOfService.sections.payment.title'),
      color: 'amber',
      description: t('termsOfService.sections.payment.desc'),
      details: getItems('termsOfService.sections.payment.items'),
      highlight: true
    },
    {
      icon: Ban,
      title: t('termsOfService.sections.prohibited.title'),
      color: 'red',
      description: t('termsOfService.sections.prohibited.desc'),
      details: getItems('termsOfService.sections.prohibited.items')
    },
    {
      icon: AlertTriangle,
      title: t('termsOfService.sections.disclaimer.title'),
      color: 'orange',
      description: t('termsOfService.sections.disclaimer.desc'),
      details: getItems('termsOfService.sections.disclaimer.items')
    },
    {
      icon: HelpCircle,
      title: t('termsOfService.sections.support.title'),
      color: 'indigo',
      description: t('termsOfService.sections.support.desc'),
      details: getItems('termsOfService.sections.support.items')
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; iconBg: string; border: string }> = {
      blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', iconBg: 'from-blue-500 to-blue-600', border: 'border-blue-200 dark:border-blue-800' },
      green: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', iconBg: 'from-green-500 to-green-600', border: 'border-green-200 dark:border-green-800' },
      purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', iconBg: 'from-purple-500 to-purple-600', border: 'border-purple-200 dark:border-purple-800' },
      amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', iconBg: 'from-amber-500 to-amber-600', border: 'border-amber-200 dark:border-amber-800' },
      red: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400', iconBg: 'from-red-500 to-red-600', border: 'border-red-200 dark:border-red-800' },
      orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400', iconBg: 'from-orange-500 to-orange-600', border: 'border-orange-200 dark:border-orange-800' },
      indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-600 dark:text-indigo-400', iconBg: 'from-indigo-500 to-indigo-600', border: 'border-indigo-200 dark:border-indigo-800' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-secondary-600 via-secondary-700 to-amber-600 py-12 md:py-16 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-400/8 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">{t('termsOfService.backToHome')}</span>
          </Link>
          
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center">
              <Scale className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2">
                {t('termsOfService.title')}
              </h1>
              <p className="text-lg text-white/80">
                {t('termsOfService.lastUpdated')}
              </p>
            </div>
          </div>
          
          <p className="text-base text-white/85 max-w-2xl">
            {t('termsOfService.intro')}
          </p>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-gray-50 dark:fill-gray-950"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          {/* Agreement Notice */}
          <div className="card p-6 mb-12 border-l-4 border-primary-500">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-primary-600 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {t('termsOfService.agreementNotice')}
                </h2>
                <ul className="space-y-2">
                  {getItems('termsOfService.agreementItems').map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
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
                  className={`card p-8 scroll-mt-24 ${section.highlight ? `border-2 ${colors.border}` : ''}`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {section.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  
                  {section.highlight && (
                    <div className="mb-4 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
                        {t('termsOfService.moneyBackGuarantee')}
                      </span>
                    </div>
                  )}
                  
                  <div className={`p-4 rounded-xl ${colors.bg}`}>
                    <ul className="space-y-2">
                      {section.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 ${colors.text.replace('text-', 'bg-')}`} />
                          <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="mt-12 p-6 bg-gradient-to-r from-secondary-50 to-amber-50 dark:from-secondary-900/20 dark:to-amber-900/20 rounded-2xl border border-secondary-100 dark:border-secondary-800">
            <div className="flex items-start gap-4">
              <Scale className="w-8 h-8 text-secondary-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {t('termsOfService.questionsTitle')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('termsOfService.questionsDesc')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 text-secondary-600 dark:text-secondary-400 font-medium hover:underline"
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
      </div>
    </div>
  );
};
