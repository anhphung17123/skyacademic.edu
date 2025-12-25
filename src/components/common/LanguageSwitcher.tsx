import { useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  ];

  const changeLanguage = async (langCode: string) => {
    try {
      await i18n.changeLanguage(langCode);
      localStorage.setItem('language', langCode);
      setCurrentLang(langCode);
      setIsOpen(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-current"
        aria-label={`Current language: ${currentLanguage.label}. Click to change language.`}
        title={`${currentLanguage.label} (${currentLanguage.code.toUpperCase()})`}
      >
        <Globe className="w-5 h-5" />
        <span className="ml-1.5 text-xs font-semibold">{currentLanguage.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 z-20 mt-2 w-44 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 p-1.5 animate-in fade-in slide-in-from-top-2"
          onClick={(e) => e.stopPropagation()}
        >
          {languages.map((lang) => {
            const isActive = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => changeLanguage(lang.code)}
                className={`flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 font-medium ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'text-gray-950 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
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

