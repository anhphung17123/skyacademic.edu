import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  X,
  GraduationCap,
  BookOpen,
  FileText,
  MessageSquareQuote,
} from 'lucide-react';
import { clsx } from 'clsx';
import { SidebarThemeToggle } from './SidebarThemeToggle';
import { SidebarLanguageSwitcher } from './SidebarLanguageSwitcher';
import logoImage from '@/images/logo.png';

interface NavItem {
  readonly label: string;
  readonly href: string;
}

const NAV_ICON_MAP: Record<string, typeof GraduationCap | null> = {
  '/courses': GraduationCap,
  '/products': BookOpen,
  '/about': FileText,
  '/#testimonials': MessageSquareQuote,
};

interface MobileMenuProps {
  readonly isOpen: boolean;
  readonly isLightMode: boolean;
  readonly navItems: readonly NavItem[];
  readonly isActive: (href: string) => boolean;
  readonly onClose: () => void;
  readonly onNavClick: (e: React.MouseEvent, href: string) => void;
  readonly onLogoClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const MobileMenu = ({
  isOpen,
  isLightMode,
  navItems,
  isActive,
  onClose,
  onNavClick,
  onLogoClick,
}: MobileMenuProps) => {
  const { t } = useTranslation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={clsx(
          'fixed top-0 left-0 h-screen z-[70] w-80 max-w-[85vw] lg:hidden',
          'dark:bg-gray-900',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={
          isLightMode
            ? {
                background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                boxShadow:
                  '0 20px 60px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)',
              }
            : undefined
        }
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
            <Link
              to="/"
              onClick={(e) => {
                onLogoClick(e);
                onClose();
              }}
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
              aria-label="SkyAcademy Home"
            >
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg border border-gray-300 dark:border-gray-700 group-hover:shadow-xl transition-shadow">
                <img
                  src={logoImage}
                  alt="SkyAcademy Logo"
                  className="h-full w-full object-contain p-1.5"
                />
              </div>
              <span className="text-lg font-display font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                SkyAcademy
              </span>
            </Link>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav
            className="flex-1 overflow-y-auto py-6 px-4"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = NAV_ICON_MAP[item.href] ?? null;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={(e) => {
                      onNavClick(e, item.href);
                      onClose();
                    }}
                    className={clsx(
                      'flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200',
                      'group relative',
                      isActive(item.href)
                        ? 'bg-primary-600/20 text-primary-700 dark:text-white shadow-lg shadow-primary-600/10'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    )}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {Icon && (
                      <Icon
                        className={clsx(
                          'h-5 w-5 transition-colors flex-shrink-0',
                          isActive(item.href)
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                        )}
                      />
                    )}
                    <span className="flex-1">{item.label}</span>
                    {isActive(item.href) && (
                      <div className="absolute right-3 h-2 w-2 rounded-full bg-primary-400 shadow-lg shadow-primary-400/50" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div
            className="border-t dark:border-gray-800 p-5 space-y-4 dark:bg-gray-900/50"
            style={
              isLightMode
                ? {
                    borderColor: 'rgba(226, 232, 240, 0.8)',
                    background:
                      'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)',
                  }
                : undefined
            }
          >
            <Link
              to="/courses"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-primary-600/30 transition-all hover:opacity-95 hover:shadow-2xl hover:shadow-primary-600/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
            >
              <GraduationCap className="h-5 w-5" aria-hidden={true} />
              {t('nav.startLearning')}
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50 p-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                <SidebarThemeToggle />
              </div>
              <div className="flex-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50 p-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                <SidebarLanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
