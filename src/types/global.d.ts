import web from "../../messages/pt-BR/web.json";
import portfolio from "../../messages/pt-BR/portfolio.json";
import legal from "../../messages/pt-BR/legal.json";
import base from "../../messages/pt-BR/default.json";
import type { useTranslations } from "next-intl";

type Messages = typeof base & typeof web & typeof portfolio & typeof legal;

declare global {
  export type IntlMessages = Messages;
  interface AppConfig {
    Messages: Messages;
  }
}

export type TranslationKey = Parameters<ReturnType<typeof useTranslations>>[0];
