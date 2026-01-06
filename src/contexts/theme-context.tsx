import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";
import { ThemeMode, ThemePreference } from '@/types/core';
import { STORAGE_KEYS, DEFAULT_VALUES } from '@/constants';

interface ThemeContextValue {
  theme: ThemePreference;
  resolvedTheme: ThemeMode;
  setTheme: (mode: ThemePreference) => void;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = STORAGE_KEYS.THEME;

const getStoredPreference = (): ThemePreference => {
  if (typeof window === "undefined") {
    return DEFAULT_VALUES.THEME as ThemePreference;
  }
  const storedPreference = localStorage.getItem(THEME_STORAGE_KEY);
  if (
    storedPreference === "light" ||
    storedPreference === "dark" ||
    storedPreference === "system"
  ) {
    return storedPreference as ThemePreference;
  }
  return DEFAULT_VALUES.THEME as ThemePreference;
};

const getSystemTheme = (): ThemeMode => {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyThemeToDocument = (mode: ThemeMode): void => {
  if (typeof document === "undefined") {
    return;
  }
  const rootElement = document.documentElement;
  if (mode === "dark") {
    rootElement.classList.add("dark");
  } else {
    rootElement.classList.remove("dark");
  }
  rootElement.setAttribute("data-theme", mode);
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemePreference] = useState<ThemePreference>(() =>
    getStoredPreference()
  );
  const [resolvedTheme, setResolvedTheme] = useState<ThemeMode>(() =>
    theme === "system" ? getSystemTheme() : theme
  );

  useEffect(() => {
    if (theme === "system") {
      setResolvedTheme(getSystemTheme());
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    applyThemeToDocument(resolvedTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [resolvedTheme, theme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        setResolvedTheme(mediaQuery.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const handleSetTheme = useCallback((nextTheme: ThemePreference) => {
    setThemePreference(nextTheme);
    if (nextTheme === "system") {
      setResolvedTheme(getSystemTheme());
      return;
    }
    setResolvedTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextResolvedTheme: ThemeMode =
      resolvedTheme === "dark" ? "light" : "dark";
    handleSetTheme(nextResolvedTheme);
  }, [resolvedTheme, handleSetTheme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: handleSetTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, handleSetTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
