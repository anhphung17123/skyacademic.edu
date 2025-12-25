import { useTranslation } from 'react-i18next';
import { Phone, Mail, Facebook, ExternalLink } from 'lucide-react';
import { mockContactInfo } from '@/services/mock/data/Contact';

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-12 md:py-16 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-400/8 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            {/* Icon Badge */}
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl mb-2">
              <Mail className="w-7 h-7 text-white" />
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              {t('contact.title')}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/85 leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-white dark:fill-slate-900"/>
          </svg>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-8 bg-white dark:bg-slate-900 relative -mt-12 z-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                <Phone className="w-7 h-7 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {t('contact.callUs')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {t('contact.callUsDesc')}
              </p>
              <a href={`tel:${mockContactInfo.phone}`} className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                {mockContactInfo.phoneFormatted}
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('contact.phoneWhatsAppZalo')}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <Mail className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {t('contact.emailUs')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {t('contact.emailUsDesc')}
              </p>
              <a href={`mailto:${mockContactInfo.email}`} className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                {mockContactInfo.email}
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Facebook className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {t('contact.facebook')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {t('contact.facebookDesc')}
              </p>
              <a
                href="https://www.facebook.com/tienganhsky/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 font-medium hover:underline inline-flex items-center gap-1"
              >
                {t('contact.visitFacebook')}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="p-16 bg-gray-50 dark:bg-slate-950">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
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
      </section>
    </div>
  );
};
