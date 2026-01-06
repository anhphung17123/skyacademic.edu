import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Monitor } from 'lucide-react';
import { ThemePreference } from '@/types/core';
import { useTheme } from '@/contexts/theme-context';
import { clsx } from 'clsx';

/**
 * Theme toggle component optimized for dark sidebar
 */
export const SidebarThemeToggle = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const themeOptions = [
    { value: 'light' as ThemePreference, label: t('common.light'), icon: Sun },
    { value: 'dark' as ThemePreference, label: t('common.dark'), icon: Moon },
    { value: 'system' as ThemePreference, label: t('common.system'), icon: Monitor },
  ];

  const handleSelectTheme = (value: ThemePreference): void => {
    setTheme(value);
    setMenuOpen(false);
  };

  const currentTheme = themeOptions.find((opt) => opt.value === theme) || themeOptions[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex w-full items-center justify-center gap-2 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
        aria-label={t('common.toggleTheme')}
        title={t('common.toggleTheme')}
      >
        <CurrentIcon className="w-5 h-5" />
        <span className="sr-only">{t('common.toggleTheme')}</span>
      </button>
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute bottom-full left-0 mb-2 z-20 w-40 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl p-1.5 animate-in fade-in slide-in-from-top-2">
            {themeOptions.map((option) => {
              const OptionIcon = option.icon;
              const isActive = option.value === theme;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelectTheme(option.value)}
                  className={clsx(
                    'flex w-full items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-600/20 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  )}
                >
                  <OptionIcon className="w-4 h-4" />
                  <span className="flex-1 text-left">{option.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

