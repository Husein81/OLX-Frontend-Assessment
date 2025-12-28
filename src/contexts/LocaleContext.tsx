import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { translations, Locale } from "@/i18n/translations";

const LOCALE_STORAGE_KEY = "olx-locale";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations.en;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  // Load saved locale on mount
  useEffect(() => {
    // eslint-disable-next-line 
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
      if (savedLocale && (savedLocale === "en" || savedLocale === "ar")) {
        setLocaleState(savedLocale);
      }
    }
  }, []);

  // Persist locale changes
  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    }
  }, []);

  const value: LocaleContextType = {
    locale,
    setLocale,
    t: translations[locale],
  };

  // Prevent hydration mismatch by not rendering until mounted
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <LocaleContext.Provider value={value}>
      <div
        dir={direction}
        style={{ minHeight: "100vh" }}
        className={mounted ? "" : "loading"}
      >
        {children}
      </div>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
