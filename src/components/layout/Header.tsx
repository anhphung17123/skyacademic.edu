import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { useTheme } from '@/contexts/theme-context';
import { useScroll } from '@/hooks/use-scroll';
import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock';
import { Container } from './Container';
import { MobileMenu } from './MobileMenu';
import logoImage from '@/images/logo.png';

interface NavItem {
  readonly label: string;
  readonly href: string;
}

const HEADER_HEIGHT = {
  mobile: 'h-16',
  desktop: 'md:h-20',
} as const;

export const Header = memo(() => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { isScrolled } = useScroll({ threshold: 20 });
  const { resolvedTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = useMemo(() => location.pathname === '/', [location.pathname]);
  const isLightMode = useMemo(() => resolvedTheme === 'light', [resolvedTheme]);
  const useSolidHeader = useMemo(
    () => isScrolled || !isHomePage || isLightMode,
    [isScrolled, isHomePage, isLightMode]
  );

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useBodyScrollLock(isMobileMenuOpen);

  const navItems: readonly NavItem[] = useMemo(
    () => [
      { label: t('nav.whatStudentsSay'), href: '/#testimonials' },
      { label: t('nav.courses'), href: '/courses' },
      { label: t('nav.products'), href: '/products' },
      { label: t('nav.about'), href: '/about' },
    ],
    [t]
  );

  const isActive = useCallback(
    (href: string): boolean => location.pathname === href,
    [location.pathname]
  );

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      if (href.startsWith('/#')) {
        e.preventDefault();
        const hash = href.substring(1);
        if (location.pathname === '/') {
          const el = document.querySelector(hash);
          el?.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate('/' + hash);
        }
      }
    },
    [location.pathname, navigate]
  );

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [location.pathname]
  );

  const headerStyles = clsx(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out',
    useSolidHeader
      ? 'dark:bg-gray-900/95 backdrop-blur-md border-b dark:border-gray-800/50'
      : 'bg-transparent'
  );

  const headerBackgroundStyle =
    useSolidHeader && isLightMode
      ? {
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
          boxShadow:
            '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 4px 12px -2px rgba(59, 130, 246, 0.08)',
          borderColor: 'rgba(226, 232, 240, 0.8)',
        }
      : {};

  const textStyles = useSolidHeader
    ? 'text-gray-800 dark:text-gray-200'
    : 'text-white';

  const getNavLinkStyles = useCallback(
    (isActiveLink: boolean) =>
      clsx(
        'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
        isActiveLink
          ? useSolidHeader
            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
            : 'bg-white/20 text-white backdrop-blur-sm'
          : useSolidHeader
          ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
          : 'hover:bg-white/10 text-white/90'
      ),
    [useSolidHeader]
  );

  const toggleIconColorStyles = clsx(
    'transition-colors overflow-visible',
    useSolidHeader
      ? '[&_button]:text-gray-800 [&_svg]:text-gray-800 dark:[&_button]:text-gray-200 dark:[&_svg]:text-gray-200'
      : 'text-white [&_svg]:text-white [&_button]:text-white'
  );

  return (
    <header
      className={clsx(headerStyles, 'overflow-visible')}
      style={headerBackgroundStyle}
    >
      <Container className="!overflow-x-visible overflow-y-visible">
        <nav
          className={clsx(
            'flex items-center justify-between overflow-visible',
            HEADER_HEIGHT.mobile,
            HEADER_HEIGHT.desktop
          )}
        >
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
            aria-label="SkyAcademy Home"
          >
            <div
              className={clsx(
                'flex items-center justify-center overflow-hidden rounded-xl shadow-lg shadow-primary-600/25 transition-all duration-200',
                'group-hover:shadow-primary-600/40 group-focus:ring-2 group-focus:ring-primary-500',
                'h-10 w-10 md:h-12 md:w-12'
              )}
            >
              <img
                src={logoImage}
                alt="SkyAcademy Logo"
                className="h-full w-full object-contain"
                loading="eager"
                width={48}
                height={48}
              />
            </div>
            <div className="hidden sm:block">
              <span
                className={clsx(
                  'text-lg md:text-xl font-display font-bold transition-colors',
                  textStyles
                )}
              >
                SkyAcademy
              </span>
              <span
                className={clsx(
                  'block text-xs transition-colors',
                  useSolidHeader
                    ? 'text-gray-600 dark:text-gray-400'
                    : 'text-white/70'
                )}
              >
                {t('footer.slogan')}
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={getNavLinkStyles(isActive(item.href))}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5 overflow-visible">
            <div className={toggleIconColorStyles}>
              <ThemeToggle />
            </div>
            <div className={toggleIconColorStyles}>
              <LanguageSwitcher />
            </div>

            <button
              onClick={toggleMobileMenu}
              className={clsx(
                'rounded-lg p-2 transition-all duration-200 lg:hidden focus:outline-none focus:ring-2 focus:ring-primary-500',
                useSolidHeader
                  ? 'text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                  : 'text-white hover:bg-white/10'
              )}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        isLightMode={isLightMode}
        navItems={navItems}
        isActive={isActive}
        onClose={toggleMobileMenu}
        onNavClick={handleNavClick}
        onLogoClick={handleLogoClick}
      />
    </header>
  );
});

Header.displayName = 'Header';
