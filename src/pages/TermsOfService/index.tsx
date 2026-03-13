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
import { LegalPage, type LegalSectionConfig } from '@/components/common/LegalPage';
import { getLegalPageI18nItems } from '@/utils/legal-page';

export const TermsOfService = () => {
  const { t, i18n } = useTranslation();
  const getItems = (key: string) => getLegalPageI18nItems(i18n, key);

  const sections: LegalSectionConfig[] = [
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

  const agreementBlock = (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-primary-500/30 dark:border-primary-500/50 p-6 md:p-8 mb-12 transition-all hover:shadow-xl">
      <div className="flex items-start gap-4">
        <CheckCircle2 className="w-8 h-8 text-primary-600 dark:text-primary-400 flex-shrink-0" />
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('termsOfService.agreementNotice')}
          </h2>
          <ul className="space-y-2">
            {getItems('termsOfService.agreementItems').map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const footer = (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
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
  );

  return (
    <LegalPage
      title={t('termsOfService.title')}
      subtitle={t('termsOfService.lastUpdated')}
      badge={t('termsOfService.badge')}
      badgeIcon={Sparkles}
      intro={t('termsOfService.intro')}
      agreementBlock={agreementBlock}
      sections={sections}
      sectionHighlightText={t('termsOfService.moneyBackGuarantee')}
      footer={footer}
    />
  );
};
