import { useTranslation } from 'react-i18next';
import { Mail, Phone, Facebook, Youtube, Instagram } from 'lucide-react';
import { CONTACT_INFO } from '@/config/contact.config';

export const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <div id="contact">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
        {t('contact.title')}
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        {t('contact.subtitle')}
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-lg transition-all"
        >
          <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30">
            <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{t('contact.email')}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{CONTACT_INFO.email}</p>
          </div>
        </a>

        <div className="flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 hover:shadow-lg transition-all">
          <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
            <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{t('contact.phoneWhatsAppZalo')}</p>
            <a href={`tel:${CONTACT_INFO.phone}`} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              {CONTACT_INFO.phoneFormatted}
            </a>
            {CONTACT_INFO.phone2Formatted && (
              <a href={`tel:${CONTACT_INFO.phone2}`} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mt-1">
                {CONTACT_INFO.phone2Formatted}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {CONTACT_INFO.facebookUrl && (
          <a href={CONTACT_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors text-sm font-medium">
            <Facebook className="w-4 h-4" />
            Facebook
          </a>
        )}
        {CONTACT_INFO.youtubeUrl && (
          <a href={CONTACT_INFO.youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors text-sm font-medium">
            <Youtube className="w-4 h-4" />
            YouTube
          </a>
        )}
        {CONTACT_INFO.instagramUrl && (
          <a href={CONTACT_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors text-sm font-medium">
            <Instagram className="w-4 h-4" />
            Instagram
          </a>
        )}
        {CONTACT_INFO.tiktokUrl && (
          <a href={CONTACT_INFO.tiktokUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.81a8.23 8.23 0 004.8 1.54V6.88a4.85 4.85 0 01-1.04-.19z" />
            </svg>
            TikTok
          </a>
        )}
      </div>
    </div>
  );
};
