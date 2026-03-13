import { useState, useEffect, useRef, useCallback } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useClickOutside } from '@/hooks/use-click-outside';
import { STORAGE_KEYS } from '@/constants';
import { logger } from '@/lib/logger';
import { clsx } from 'clsx';

/**
 * Language switcher component optimized for dark sidebar
 */
export const SidebarLanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  ];

  const changeLanguage = useCallback(async (langCode: string): Promise<void> => {
    try {
      await i18n.changeLanguage(langCode);
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, langCode);
      setCurrentLang(langCode);
      setIsOpen(false);
    } catch (error) {
      logger.error('Error changing language:', error);
    }
  }, [i18n]);

  useEffect(() => {
    const handleLanguageChange = (lng: string): void => {
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  useClickOutside(dropdownRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0];

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="flex w-full items-center justify-center gap-2 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
        aria-label={`Current language: ${currentLanguage.label}. Click to change language.`}
        title={`${currentLanguage.label} (${currentLanguage.code.toUpperCase()})`}
      >
        <Globe className="w-5 h-5" />
        <span className="text-xs font-semibold">{currentLanguage.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div 
          className="absolute bottom-full left-0 mb-2 z-20 w-44 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl p-1.5 animate-in fade-in slide-in-from-top-2"
          onClick={(e) => e.stopPropagation()}
        >
          {languages.map((lang) => {
            const isActive = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => changeLanguage(lang.code)}
                className={clsx(
                  'flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 font-medium',
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-600/20 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <span className="text-lg leading-none flex-shrink-0">{lang.flag}</span>
                <span className="flex-1 text-left">{lang.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

