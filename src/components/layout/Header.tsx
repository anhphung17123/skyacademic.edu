import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
} from 'lucide-react';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { useTheme } from '@/contexts/theme-context';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; icon?: React.ComponentType<{ className?: string }> }[];
}

export const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Only use transparent header with white text on home page in dark mode
  const isHomePage = location.pathname === '/';
  const { resolvedTheme } = useTheme();
  const isLightMode = resolvedTheme === 'light';
  // Use solid header style (dark text) when scrolled OR when not on home page OR in light mode
  const useSolidHeader = isScrolled || !isHomePage || isLightMode;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const navItems: NavItem[] = [
    {
      label: t('nav.courses'),
      href: '/courses',
    },
    {
      label: t('nav.books'),
      href: '/books',
    },
    {
      label: t('nav.freeVideos'),
      href: '/free-videos',
    },
    {
      label: t('nav.about'),
      href: '/about',
    },
    {
      label: t('nav.contact'),
      href: '/contact',
    },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useSolidHeader
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/25 group-hover:shadow-primary-600/40 transition-shadow">
              <span className="text-white font-bold text-lg md:text-xl">SA</span>
            </div>
            <div className="hidden sm:block">
              <span className={`text-xl font-display font-bold transition-colors ${
                useSolidHeader ? 'text-gray-800 dark:text-white' : 'text-white'
              }`}>
                SkyAcademy
              </span>
              <span className={`block text-xs transition-colors ${
                useSolidHeader ? 'text-gray-600 dark:text-gray-400' : 'text-white/70'
              }`}>
                {t('footer.slogan')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium transition-all ${
                        useSolidHeader
                          ? 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown */}
                    <div
                      className={`absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 transition-all duration-200 ${
                        openDropdown === item.label
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                            isActive(child.href)
                              ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {child.icon && <child.icon className="w-4 h-4" />}
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href!}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      isActive(item.href!)
                        ? useSolidHeader
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                          : 'bg-white/20 text-white'
                        : useSolidHeader
                        ? 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <div className={useSolidHeader ? '[&_button]:text-gray-800 [&_svg]:text-gray-800 dark:[&_button]:text-gray-200 dark:[&_svg]:text-gray-200' : 'text-white [&_svg]:text-white [&_button]:text-white'}>
              <ThemeToggle />
            </div>
            <div className={useSolidHeader ? '[&_button]:text-gray-800 [&_svg]:text-gray-800 dark:[&_button]:text-gray-200 dark:[&_svg]:text-gray-200' : 'text-white [&_svg]:text-white [&_button]:text-white'}>
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-lg transition-all ${
                useSolidHeader
                  ? 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 md:top-20 bottom-0 bg-white dark:bg-gray-900 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="container-custom py-6 h-full overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                    >
                      {item.label}
                      <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-200 ${openDropdown === item.label ? 'max-h-96' : 'max-h-0'}`}>
                      <div className="pl-4 py-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                              isActive(child.href)
                                ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                          >
                            {child.icon && <child.icon className="w-4 h-4" />}
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href!}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                      isActive(item.href!)
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/courses"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
            >
              <GraduationCap className="w-5 h-5" />
              {t('nav.startLearning')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
