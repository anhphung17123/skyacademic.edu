import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Mail, Phone, MapPin, Youtube, Heart, type LucideIcon } from 'lucide-react';
import { memo, useMemo } from 'react';
import { clsx } from 'clsx';
import { Container } from './Container';
import { mockContactInfo } from '@/services/mock/data/Contact';

interface FooterLink {
  readonly to: string;
  readonly label: string;
}

interface SocialLink {
  readonly Icon: LucideIcon;
  readonly href: string;
  readonly label: string;
  readonly hoverClass: string;
}

/**
 * Footer component with responsive grid layout
 * Optimized for performance with memoization
 */
export const Footer = memo(() => {
  const { t } = useTranslation();

  const quickLinks: readonly FooterLink[] = useMemo(
    () => [
      { to: '/courses', label: t('nav.courses') },
      { to: '/books', label: t('nav.books') },
      { to: '/free-videos', label: t('nav.freeVideos') },
    ],
    [t]
  );

  const supportLinks: readonly FooterLink[] = useMemo(
    () => [
      { to: '/about', label: t('nav.about') },
      { to: '/contact', label: t('nav.contact') },
      { to: '/privacy-policy', label: t('footer.privacy') },
      { to: '/terms-of-service', label: t('footer.terms') },
    ],
    [t]
  );

  const socialLinks: readonly SocialLink[] = useMemo(
    () => [
      { 
        Icon: Facebook, 
        href: 'https://www.facebook.com/tienganhsky/', 
        label: 'Facebook', 
        hoverClass: 'hover:bg-blue-600 dark:hover:bg-blue-500' 
      },
      { 
        Icon: Youtube, 
        href: 'https://www.youtube.com/@tienganhsky', 
        label: 'YouTube', 
        hoverClass: 'hover:bg-red-600 dark:hover:bg-red-500' 
      },
    ],
    []
  );

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 text-gray-700 dark:text-gray-300">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 shadow-lg shadow-primary-600/25">
                  <span className="text-xl font-display font-bold text-white">S</span>
                </div>
                <div>
                  <span className="block text-lg font-display font-bold text-gray-900 dark:text-white">SkyAcademy</span>
                  <span className="block text-xs text-primary-600 dark:text-primary-400 uppercase tracking-wider font-semibold">
                    {t('footer.slogan')}
                  </span>
                </div>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
                {t('footer.description')}
              </p>

              <div className="flex items-center gap-2.5">
                {socialLinks.map(({ Icon, href, label, hoverClass }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={clsx(
                      'rounded-lg border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-2.5 backdrop-blur-sm shadow-sm',
                      'transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg',
                      'text-gray-700 dark:text-gray-300',
                      hoverClass,
                      'focus:outline-none focus:ring-2 focus:ring-primary-500'
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden={true} />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 md:gap-8">
                <div>
                  <h3 className="mb-4 text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    {t('footer.quickLinks')}
                  </h3>
                  <ul className="space-y-2.5">
                    {quickLinks.map(({ to, label }) => (
                      <li key={to}>
                        <Link
                          to={to}
                          className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 transition-colors duration-200 hover:text-primary-600 dark:hover:text-white hover:font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 rounded break-words"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    {t('footer.support')}
                  </h3>
                  <ul className="space-y-2.5">
                    {supportLinks.map(({ to, label }) => (
                      <li key={to}>
                        <Link
                          to={to}
                          className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 transition-colors duration-200 hover:text-primary-600 dark:hover:text-white hover:font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 rounded break-words"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <h3 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
                    {t('footer.contactUs')}
                  </h3>
                  <div className="space-y-2.5">
                    <a
                      href={`tel:${mockContactInfo.phone}`}
                      className="flex items-start gap-3 rounded-lg border border-green-200 dark:border-gray-700/50 bg-green-50/50 dark:bg-gray-800/50 p-2.5 backdrop-blur-sm transition-all duration-200 hover:border-green-400 hover:bg-green-50 dark:hover:border-green-500/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <div className="flex-shrink-0 rounded-lg bg-green-100 dark:bg-green-500/20 p-1.5">
                        <Phone className="h-4 w-4 text-green-600 dark:text-green-400" aria-hidden={true} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-900 dark:text-white break-words">
                          {mockContactInfo.phoneFormatted}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-500 break-words">{t('contact.phoneWhatsAppZalo')}</p>
                      </div>
                    </a>

                    <a
                      href={`mailto:${mockContactInfo.email}`}
                      className="flex items-start gap-3 rounded-lg border border-primary-200 dark:border-gray-700/50 bg-primary-50/50 dark:bg-gray-800/50 p-2.5 backdrop-blur-sm transition-all duration-200 hover:border-primary-400 hover:bg-primary-50 dark:hover:border-primary-500/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <div className="flex-shrink-0 rounded-lg bg-primary-100 dark:bg-primary-500/20 p-1.5">
                        <Mail className="h-4 w-4 text-primary-600 dark:text-primary-400" aria-hidden={true} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-900 dark:text-white break-words break-all">
                          {mockContactInfo.email}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-500 break-words">{t('footer.replyTime')}</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-3 rounded-lg border border-orange-200 dark:border-gray-700/50 bg-orange-50/50 dark:bg-gray-800/50 p-2.5 backdrop-blur-sm break-words">
                      <div className="flex-shrink-0 rounded-lg bg-orange-100 dark:bg-orange-500/20 p-1.5">
                        <MapPin className="h-4 w-4 text-orange-600 dark:text-orange-400" aria-hidden={true} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-900 dark:text-white break-words">{t('footer.daNang')}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-500 break-words">{t('footer.location')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-gray-200 dark:border-gray-800/50 bg-white/60 dark:bg-black/20 backdrop-blur-sm">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <p className="text-xs text-gray-700 dark:text-gray-500">
              © {currentYear} SkyAcademy. {t('footer.allRights')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:gap-6">
              <Link 
                to="/privacy-policy" 
                className="text-gray-700 dark:text-gray-500 transition-colors duration-200 hover:text-primary-600 dark:hover:text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
              >
                {t('footer.privacy')}
              </Link>
              <Link 
                to="/terms-of-service" 
                className="text-gray-700 dark:text-gray-500 transition-colors duration-200 hover:text-primary-600 dark:hover:text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
              >
                {t('footer.terms')}
              </Link>
              <span className="hidden items-center gap-1.5 text-gray-700 dark:text-gray-500 sm:flex">
                {t('footer.madeWith')}{' '}
                <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" aria-hidden={true} />{' '}
                {t('footer.inDaNang')}
              </span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
