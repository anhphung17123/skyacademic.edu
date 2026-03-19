import { useTranslation } from 'react-i18next';
import { Phone, Mail, Facebook, ExternalLink, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '@/config/contact.config';
import { PageTransition } from '@/components/common/PageTransition';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/common/PageHero';

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <PageHero
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
          badge={t('contact.badge')}
          badgeIcon={Sparkles}
          gradient="page"
        />

        {/* Contact Cards */}
        <Section padding="md" background="default" className="relative -mt-12 z-20">
          <Container>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center transition-transform hover:scale-110">
                  <Phone className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
                  {t('contact.callUs')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {t('contact.callUsDesc')}
                </p>
                <div className="space-y-1">
                  <a href={`tel:${CONTACT_INFO.phone}`} className="block text-primary-600 dark:text-primary-400 font-semibold hover:underline text-lg transition-colors">
                    {CONTACT_INFO.phoneFormatted}
                  </a>
                  {CONTACT_INFO.phone2Formatted && (
                    <a href={`tel:${CONTACT_INFO.phone2}`} className="block text-primary-600 dark:text-primary-400 font-semibold hover:underline text-lg transition-colors">
                      {CONTACT_INFO.phone2Formatted}
                    </a>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{t('contact.phoneWhatsAppZalo')}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center transition-transform hover:scale-110">
                  <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
                  {t('contact.emailUs')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {t('contact.emailUsDesc')}
                </p>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-primary-600 dark:text-primary-400 font-semibold hover:underline transition-colors break-all">
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center transition-transform hover:scale-110">
                  <Facebook className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
                  {t('contact.facebook')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {t('contact.facebookDesc')}
                </p>
                <a
                  href={CONTACT_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 font-semibold hover:underline inline-flex items-center gap-2 transition-colors"
                >
                  {t('contact.visitFacebook')}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Container>
        </Section>

        {/* Main Contact Section */}
        <Section padding="xl" background="muted">
          <Container>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all hover:shadow-2xl">
              <div className="aspect-video bg-gray-200 dark:bg-gray-800 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.167991543!2d108.2208!3d16.0544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252085%3A0x549c3b1775c58fb!2zRGEgTmFuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1702204800000!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t('contact.locationTitle')}
                  className="absolute inset-0"
                />
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </PageTransition>
  );
};
