import {
  Shield,
  Lock,
  Eye,
  UserCheck,
  Database,
  Globe,
  Mail,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LegalPage, type LegalSectionConfig } from '@/components/common/LegalPage';
import { getLegalPageI18nItems } from '@/utils/legal-page';

export const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();
  const getItems = (key: string) => getLegalPageI18nItems(i18n, key);

  const sections: LegalSectionConfig[] = [
    {
      icon: Database,
      title: t('privacyPolicy.sections.infoCollect.title'),
      color: 'blue',
      description: t('privacyPolicy.sections.infoCollect.desc'),
      details: getItems('privacyPolicy.sections.infoCollect.items'),
    },
    {
      icon: Eye,
      title: t('privacyPolicy.sections.howUse.title'),
      color: 'purple',
      description: t('privacyPolicy.sections.howUse.desc'),
      details: getItems('privacyPolicy.sections.howUse.items'),
    },
    {
      icon: Lock,
      title: t('privacyPolicy.sections.dataSecurity.title'),
      color: 'green',
      description: t('privacyPolicy.sections.dataSecurity.desc'),
      details: getItems('privacyPolicy.sections.dataSecurity.items'),
    },
    {
      icon: UserCheck,
      title: t('privacyPolicy.sections.yourRights.title'),
      color: 'amber',
      description: t('privacyPolicy.sections.yourRights.desc'),
      details: getItems('privacyPolicy.sections.yourRights.items'),
    },
    {
      icon: Globe,
      title: t('privacyPolicy.sections.cookies.title'),
      color: 'indigo',
      description: t('privacyPolicy.sections.cookies.desc'),
      details: getItems('privacyPolicy.sections.cookies.items'),
    },
    {
      icon: Mail,
      title: t('privacyPolicy.sections.contactUs.title'),
      color: 'rose',
      description: t('privacyPolicy.sections.contactUs.desc'),
      details: getItems('privacyPolicy.sections.contactUs.items'),
    },
  ];

  const footer = (
    <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl border border-primary-100 dark:border-primary-800">
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
  );

  return (
    <LegalPage
      title={t('privacyPolicy.title')}
      subtitle={t('privacyPolicy.lastUpdated')}
      badge={t('privacyPolicy.badge')}
      badgeIcon={Sparkles}
      intro={t('privacyPolicy.intro')}
      sections={sections}
      footer={footer}
      showQuickNav
      quickNavTitle={t('privacyPolicy.quickNav')}
    />
  );
};
