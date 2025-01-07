import useLocalStorage from "@/lib/useLocalstorage";
import { useTranslations } from "next-intl";
import React, { createContext, useContext, ReactNode, useEffect } from "react";

type Language = "pt-BR" | "en" | "es";

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  translateResponse: (fields: Record<string, string>) => Record<string, string>;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const t = useTranslations();
  const [language, setLanguage] = useLocalStorage<Language>(
    "language",
    "pt-BR"
  );

  const translateResponse = (
    fields: Record<string, string | string[]> | undefined
  ): Record<string, string> => {
    if (!fields) return {};
    return (
      Object.keys(fields).reduce<Record<string, string>>(
        (acc, key) => {
          const value = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          acc[key] = t(`Responses.${value}` as any);
          return acc;
        },
        {}
      ) ?? {}
    );
  };

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  return (
    <>
      <LanguageContext.Provider
        value={{ language, setLanguage, translateResponse }}
      >
        {children}
      </LanguageContext.Provider>
    </>
  );
};
