import { useState, useEffect, useMemo, memo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Menu,
  X,
  GraduationCap,
  BookOpen,
  Play,
  FileText,
  Mail,
} from "lucide-react";
import { clsx } from "clsx";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { SidebarThemeToggle } from "./SidebarThemeToggle";
import { SidebarLanguageSwitcher } from "./SidebarLanguageSwitcher";
import { useTheme } from "@/contexts/theme-context";
import { useScroll } from "@/hooks/use-scroll";
import { Container } from "./Container";
import logoImage from "@/images/logo.png";

interface NavItem {
  readonly label: string;
  readonly href: string;
}

const HEADER_HEIGHT = {
  mobile: "h-16",
  desktop: "md:h-20",
} as const;

/**
 * Header component with responsive navigation
 * Optimized for performance with memoization and efficient state management
 */
export const Header = memo(() => {
  const { t } = useTranslation();
  const location = useLocation();
  const { isScrolled } = useScroll({ threshold: 20 });
  const { resolvedTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = useMemo(
    () => location.pathname === "/",
    [location.pathname]
  );
  const isLightMode = useMemo(() => resolvedTheme === "light", [resolvedTheme]);
  const useSolidHeader = useMemo(
    () => isScrolled || !isHomePage || isLightMode,
    [isScrolled, isHomePage, isLightMode]
  );

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore scroll position
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMobileMenuOpen]);

  const navItems: readonly NavItem[] = useMemo(
    () => [
      { label: t("nav.courses"), href: "/courses" },
      { label: t("nav.books"), href: "/books" },
      { label: t("nav.freeVideos"), href: "/free-videos" },
      { label: t("nav.about"), href: "/about" },
      { label: t("nav.contact"), href: "/contact" },
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

  const headerStyles = clsx(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out",
    useSolidHeader
      ? "dark:bg-gray-900/95 backdrop-blur-md border-b dark:border-gray-800/50"
      : "bg-transparent"
  );

  const headerBackgroundStyle =
    useSolidHeader && isLightMode
      ? {
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)",
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 4px 12px -2px rgba(59, 130, 246, 0.08)",
          borderColor: "rgba(226, 232, 240, 0.8)",
        }
      : {};

  const textStyles = useSolidHeader
    ? "text-gray-800 dark:text-gray-200"
    : "text-white";

  const getNavLinkStyles = useCallback(
    (isActiveLink: boolean) =>
      clsx(
        "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
        isActiveLink
          ? useSolidHeader
            ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
            : "bg-white/20 text-white backdrop-blur-sm"
          : useSolidHeader
          ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          : "hover:bg-white/10 text-white/90"
      ),
    [useSolidHeader]
  );

  return (
    <header
      className={clsx(headerStyles, "overflow-visible")}
      style={headerBackgroundStyle}
    >
      <Container className="!overflow-x-visible overflow-y-visible">
        <nav
          className={clsx(
            "flex items-center justify-between overflow-visible",
            HEADER_HEIGHT.mobile,
            HEADER_HEIGHT.desktop
          )}
        >
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
            aria-label="SkyAcademy Home"
          >
            <div
              className={clsx(
                "flex items-center justify-center overflow-hidden rounded-xl shadow-lg shadow-primary-600/25 transition-all duration-200",
                "group-hover:shadow-primary-600/40 group-focus:ring-2 group-focus:ring-primary-500",
                "h-10 w-10 md:h-12 md:w-12"
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
                  "text-lg md:text-xl font-display font-bold transition-colors",
                  textStyles
                )}
              >
                SkyAcademy
              </span>
              <span
                className={clsx(
                  "block text-xs transition-colors",
                  useSolidHeader
                    ? "text-gray-600 dark:text-gray-400"
                    : "text-white/70"
                )}
              >
                {t("footer.slogan")}
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={getNavLinkStyles(isActive(item.href))}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5 overflow-visible">
            <div
              className={clsx(
                "transition-colors overflow-visible",
                useSolidHeader
                  ? "[&_button]:text-gray-800 [&_svg]:text-gray-800 dark:[&_button]:text-gray-200 dark:[&_svg]:text-gray-200"
                  : "text-white [&_svg]:text-white [&_button]:text-white"
              )}
            >
              <ThemeToggle />
            </div>
            <div
              className={clsx(
                "transition-colors overflow-visible",
                useSolidHeader
                  ? "[&_button]:text-gray-800 [&_svg]:text-gray-800 dark:[&_button]:text-gray-200 dark:[&_svg]:text-gray-200"
                  : "text-white [&_svg]:text-white [&_button]:text-white"
              )}
            >
              <LanguageSwitcher />
            </div>

            <button
              onClick={toggleMobileMenu}
              className={clsx(
                "rounded-lg p-2 transition-all duration-200 lg:hidden focus:outline-none focus:ring-2 focus:ring-primary-500",
                useSolidHeader
                  ? "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  : "text-white hover:bg-white/10"
              )}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-screen z-[70] w-80 max-w-[85vw] lg:hidden",
          "dark:bg-gray-900",
          "transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={
          isLightMode
            ? {
                background: "linear-gradient(135deg, #ffffff 0%, #fefefe 100%)",
                boxShadow:
                  "0 20px 60px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)",
              }
            : undefined
        }
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
            <Link
              to="/"
              onClick={toggleMobileMenu}
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
              onClick={toggleMobileMenu}
              className="rounded-lg p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav
            className="flex-1 overflow-y-auto py-6 px-4"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon =
                  item.href === "/courses"
                    ? GraduationCap
                    : item.href === "/books"
                    ? BookOpen
                    : item.href === "/free-videos"
                    ? Play
                    : item.href === "/about"
                    ? FileText
                    : item.href === "/contact"
                    ? Mail
                    : null;

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={toggleMobileMenu}
                    className={clsx(
                      "flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200",
                      "group relative",
                      isActive(item.href)
                        ? "bg-primary-600/20 text-primary-700 dark:text-white shadow-lg shadow-primary-600/10"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    )}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {Icon && (
                      <Icon
                        className={clsx(
                          "h-5 w-5 transition-colors flex-shrink-0",
                          isActive(item.href)
                            ? "text-primary-600 dark:text-primary-400"
                            : "text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400"
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

          {/* Footer CTA */}
          <div
            className="border-t dark:border-gray-800 p-5 space-y-4 dark:bg-gray-900/50"
            style={
              isLightMode
                ? {
                    borderColor: "rgba(226, 232, 240, 0.8)",
                    background:
                      "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)",
                  }
                : undefined
            }
          >
            <Link
              to="/courses"
              onClick={toggleMobileMenu}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-primary-600/30 transition-all hover:opacity-95 hover:shadow-2xl hover:shadow-primary-600/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
            >
              <GraduationCap className="h-5 w-5" aria-hidden={true} />
              {t("nav.startLearning")}
            </Link>

            {/* Theme and Language in Mobile Menu */}
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
    </header>
  );
});

Header.displayName = "Header";
