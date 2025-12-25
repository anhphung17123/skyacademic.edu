import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Moon, Sun, Monitor } from "lucide-react";
import { ThemePreference, useTheme } from "@/contexts/theme-context";

export const ThemeToggle = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const themeOptions = [
    { value: "light" as ThemePreference, label: t('common.light'), icon: Sun },
    { value: "dark" as ThemePreference, label: t('common.dark'), icon: Moon },
    { value: "system" as ThemePreference, label: t('common.system'), icon: Monitor },
  ];

  const handleSelectTheme = (value: ThemePreference) => {
    setTheme(value);
    setMenuOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200"
        aria-label={t('common.toggleTheme')}
        title={t('common.toggleTheme')}
      >
        <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">{t('common.toggleTheme')}</span>
      </button>
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 z-20 mt-2 w-36 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 p-1 animate-in fade-in slide-in-from-top-2">
            {themeOptions.map((option) => {
              const OptionIcon = option.icon;
              const isActive = option.value === theme;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelectTheme(option.value)}
                  className={`flex w-full items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                      : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <OptionIcon className="w-4 h-4" />
                  <span>{option.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400" />
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
