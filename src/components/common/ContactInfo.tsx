import { useTranslation } from 'react-i18next';
import { Mail, Phone, AlertCircle, ExternalLink } from 'lucide-react';
import { mockContactInfo } from '@/services/mock/data/Contact';

interface ContactInfoProps {
  variant?: 'default' | 'compact';
}

export const ContactInfo = ({ variant = 'default' }: ContactInfoProps) => {
  const { t } = useTranslation();
  const contact = mockContactInfo;

  if (variant === 'compact') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-600 text-white">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {t('contact.title')}
          </h3>
        </div>
        <div className="space-y-3">
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <div className="p-2 bg-gradient-to-br from-primary-500/20 to-secondary-600/20 rounded-lg group-hover:from-primary-500/30 group-hover:to-secondary-600/30 transition-all">
              <Mail className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {contact.email}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('contact.email')}</p>
            </div>
          </a>
          <a
            href={`tel:${contact.phone}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-lg group-hover:from-green-500/30 group-hover:to-emerald-600/30 transition-all">
              <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {contact.phoneFormatted}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('contact.phoneWhatsAppZalo')}</p>
            </div>
          </a>
          {contact.contactFormUrl && (
            <a
              href={contact.contactFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group border border-primary-200 dark:border-primary-800"
            >
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-lg group-hover:from-blue-500/30 group-hover:to-cyan-600/30 transition-all">
                <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {t('contact.send')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t('contact.formTitle')}</p>
              </div>
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-600 text-white">
          <AlertCircle className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {t('contact.title')}
        </h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {t('contact.description')}
      </p>
      <div className="space-y-3">
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group border border-gray-200 dark:border-gray-600"
        >
          <div className="p-2.5 bg-gradient-to-br from-primary-500/20 to-secondary-600/20 rounded-lg group-hover:from-primary-500/30 group-hover:to-secondary-600/30 transition-all">
            <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {contact.email}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t('contact.email')}</p>
          </div>
        </a>
        <a
          href={`tel:${contact.phone}`}
          className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group border border-gray-200 dark:border-gray-600"
        >
          <div className="p-2.5 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-lg group-hover:from-green-500/30 group-hover:to-emerald-600/30 transition-all">
            <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              {contact.phoneFormatted}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t('contact.phoneWhatsAppZalo')}</p>
          </div>
        </a>
        {contact.contactFormUrl && (
          <a
            href={contact.contactFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group border border-blue-200 dark:border-blue-800"
          >
            <div className="p-2.5 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-lg group-hover:from-blue-500/30 group-hover:to-cyan-600/30 transition-all">
              <ExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {t('contact.send')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t('contact.formTitle')}</p>
            </div>
          </a>
        )}
      </div>
    </div>
  );
};

