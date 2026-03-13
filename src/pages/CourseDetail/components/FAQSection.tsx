import { useTranslation } from 'react-i18next';
import { HelpCircle, Mail, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import { CONTACT_INFO } from '@/config/contact.config';

export const FAQSection = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 p-8 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
          <HelpCircle className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {t('courseDetail.faqTitle')}
        </h2>
      </div>

      <div className="">
        <div className="text-center pb-8">
          <p className="text-gray-600 dark:text-gray-400">
            {t('courseDetail.faqEmpty')}
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6 border border-primary-100 dark:border-primary-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('courseDetail.contactUs')}
          </h3>
          
          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {t('courseDetail.email')}
                </p>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            {/* Phone/WhatsApp/Zalo */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {t('courseDetail.phone')}
                </p>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                >
                  {CONTACT_INFO.phoneFormatted}
                </a>
              </div>
            </div>

            {/* Facebook */}
            {CONTACT_INFO.facebookUrl && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {t('courseDetail.facebook')}
                  </p>
                  <a
                    href={CONTACT_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline font-medium inline-flex items-center gap-1"
                  >
                    {t('courseDetail.visitFacebook')}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            {/* YouTube */}
            {CONTACT_INFO.youtubeUrl && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {t('courseDetail.youtube')}
                  </p>
                  <a
                    href={CONTACT_INFO.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline font-medium inline-flex items-center gap-1"
                  >
                    {t('courseDetail.visitYouTube')}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            {/* Contact Form */}
            {CONTACT_INFO.contactFormUrl && (
              <div className="pt-4 border-t border-primary-200 dark:border-primary-700">
                <a
                  href={CONTACT_INFO.contactFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('courseDetail.contactForm')}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
