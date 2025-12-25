import { Shield, Lock, Eye, UserCheck, Database, Globe, Mail, FileText, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();
  
  const getItems = (key: string): string[] => {
    const items = i18n.getResource(i18n.language, 'translation', key);
    return Array.isArray(items) ? items : [];
  };
  
  const sections = [
    {
      icon: Database,
      title: t('privacyPolicy.sections.infoCollect.title'),
      color: 'blue',
      description: t('privacyPolicy.sections.infoCollect.desc'),
      details: getItems('privacyPolicy.sections.infoCollect.items')
    },
    {
      icon: Eye,
      title: t('privacyPolicy.sections.howUse.title'),
      color: 'purple',
      description: t('privacyPolicy.sections.howUse.desc'),
      details: getItems('privacyPolicy.sections.howUse.items')
    },
    {
      icon: Lock,
      title: t('privacyPolicy.sections.dataSecurity.title'),
      color: 'green',
      description: t('privacyPolicy.sections.dataSecurity.desc'),
      details: getItems('privacyPolicy.sections.dataSecurity.items')
    },
    {
      icon: UserCheck,
      title: t('privacyPolicy.sections.yourRights.title'),
      color: 'amber',
      description: t('privacyPolicy.sections.yourRights.desc'),
      details: getItems('privacyPolicy.sections.yourRights.items')
    },
    {
      icon: Globe,
      title: t('privacyPolicy.sections.cookies.title'),
      color: 'indigo',
      description: t('privacyPolicy.sections.cookies.desc'),
      details: getItems('privacyPolicy.sections.cookies.items')
    },
    {
      icon: Mail,
      title: t('privacyPolicy.sections.contactUs.title'),
      color: 'rose',
      description: t('privacyPolicy.sections.contactUs.desc'),
      details: getItems('privacyPolicy.sections.contactUs.items')
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; iconBg: string }> = {
      blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', iconBg: 'from-blue-500 to-blue-600' },
      purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', iconBg: 'from-purple-500 to-purple-600' },
      green: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', iconBg: 'from-green-500 to-green-600' },
      amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', iconBg: 'from-amber-500 to-amber-600' },
      indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-600 dark:text-indigo-400', iconBg: 'from-indigo-500 to-indigo-600' },
      rose: { bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-600 dark:text-rose-400', iconBg: 'from-rose-500 to-rose-600' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 py-12 md:py-16 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-400/8 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">{t('privacyPolicy.backToHome')}</span>
          </Link>
          
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2">
                {t('privacyPolicy.title')}
              </h1>
              <p className="text-lg text-white/80">
                {t('privacyPolicy.lastUpdated')}
              </p>
            </div>
          </div>
          
          <p className="text-base text-white/85 max-w-2xl">
            {t('privacyPolicy.intro')}
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
          {/* Quick Navigation */}
          <div className="card p-6 mb-12">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-600" />
              {t('privacyPolicy.quickNav')}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sections.map((section, index) => {
                const colors = getColorClasses(section.color);
                return (
                  <a
                    key={index}
                    href={`#section-${index + 1}`}
                    className={`flex items-center gap-3 p-3 rounded-xl ${colors.bg} hover:scale-105 transition-transform group`}
                  >
                    <section.icon className={`w-5 h-5 ${colors.text}`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
                      {section.title.split('. ')[1]}
                    </span>
                    <ChevronRight className={`w-4 h-4 ${colors.text} group-hover:translate-x-1 transition-transform`} />
                  </a>
                );
              })}
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
                  className="card p-8 scroll-mt-24"
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
          <div className="mt-12 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl border border-primary-100 dark:border-primary-800">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-primary-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {t('privacyPolicy.privacyMatters')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('privacyPolicy.privacyMattersDesc')}
                </p>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline"
                >
                  {t('privacyPolicy.contactTeam')}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
