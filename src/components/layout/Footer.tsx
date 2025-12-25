import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Facebook,
  Mail, 
  Phone, 
  MapPin, 
  Youtube, 
  GraduationCap,
  Heart,
  Sparkles
} from 'lucide-react';
import { mockContactInfo } from '@/services/mock/data/Contact';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-300 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-hero-pattern opacity-[0.02]" />
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Section - Left Column */}
          <div className="lg:col-span-4 lg:pr-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-600/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-display font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  SkyAcademy
                </span>
                <span className="block text-xs text-primary-400 font-medium tracking-wider uppercase whitespace-nowrap">
                  A learning sky without limits
                </span>
              </div>
            </div>
            <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
              {t('footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, href: 'https://www.facebook.com/tienganhsky/', hoverBg: 'hover:bg-blue-600', label: 'Facebook' },
                { Icon: Youtube, href: 'https://www.youtube.com/@tienganhsky', hoverBg: 'hover:bg-red-600', label: 'YouTube' },
              ].map(({ Icon, href, hoverBg, label }) => (
                <a 
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`p-3 bg-gray-800/80 backdrop-blur-sm rounded-xl ${hoverBg} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group border border-gray-700/50 hover:border-transparent`}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Quick Links, Support, Contact */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            {/* Quick Links */}
            <div className="md:col-span-4">
              <h3 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></span>
                {t('footer.quickLinks')}
              </h3>
              <ul className="space-y-3">
                {[
                  { to: '/courses', label: t('nav.courses') },
                  { to: '/books', label: t('nav.books') },
                  { to: '/free-videos', label: t('nav.freeVideos') },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link 
                      to={to} 
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 group py-1"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 rounded-full transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="md:col-span-3">
              <h3 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></span>
                {t('footer.support')}
              </h3>
              <ul className="space-y-3">
                {[
                  { to: '/about', label: t('nav.about') },
                  { to: '/contact', label: t('nav.contact') },
                  { to: '/privacy-policy', label: t('footer.privacy') },
                  { to: '/terms-of-service', label: t('footer.terms') },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link 
                      to={to} 
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 group py-1"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 rounded-full transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-5">
              <h3 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></span>
                {t('footer.contactUs')}
              </h3>
              
              {/* Contact Cards */}
              <div className="space-y-3">
                <a 
                  href={`tel:${mockContactInfo.phone}`}
                  className="flex items-center gap-3 p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300 group"
                >
                  <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-lg group-hover:from-green-500/30 group-hover:to-emerald-600/30 transition-all flex-shrink-0">
                    <Phone className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm group-hover:text-primary-400 transition-colors truncate">{mockContactInfo.phoneFormatted}</p>
                    <p className="text-xs text-gray-500">{t('contact.phoneWhatsAppZalo')}</p>
                  </div>
                </a>
                
                <a 
                  href={`mailto:${mockContactInfo.email}`}
                  className="flex items-center gap-3 p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300 group"
                >
                  <div className="p-2 bg-gradient-to-br from-primary-500/20 to-secondary-600/20 rounded-lg group-hover:from-primary-500/30 group-hover:to-secondary-600/30 transition-all flex-shrink-0">
                    <Mail className="w-4 h-4 text-primary-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm group-hover:text-primary-400 transition-colors truncate">{mockContactInfo.email}</p>
                    <p className="text-xs text-gray-500">{t('footer.replyTime')}</p>
                  </div>
                </a>
                
                <div className="flex items-start gap-3 p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
                  <div className="p-2 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-lg flex-shrink-0">
                    <MapPin className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm">{t('footer.daNang')}</p>
                    <p className="text-xs text-gray-500">{t('footer.location')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/50 relative z-10 bg-black/20">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} SkyAcademy. {t('footer.allRights')}
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-white transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-white transition-colors">
                {t('footer.terms')}
              </Link>
              <span className="hidden md:flex items-center gap-1.5 text-gray-500">
                {t('footer.madeWith')} <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> {t('footer.inDaNang')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
