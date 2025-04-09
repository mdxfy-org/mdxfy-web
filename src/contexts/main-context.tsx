import DebugOptions from "@/components/debug/debug-options";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { OverlayProvider } from "./overlay-provider";
import { LanguageProvider } from "./language-provider";
import { AuthProvider } from "./auth-provider";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import ToasterProvider from "./toast-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BrowserAgentProvider from "./browser-agent-provider";

interface MainProviderProps {
  children: React.ReactNode;
  pageProps: AppProps["pageProps"];
}

const queryClient = new QueryClient();

const MainProvider: React.FC<MainProviderProps> = ({ children, pageProps }) => {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider
        locale={router.locale ?? "pt-BR"}
        timeZone="America/Sao_Paulo"
        messages={pageProps.messages}
      >
        <HeroUIProvider>
          <ToasterProvider>
            <NextThemesProvider attribute="class" defaultTheme="light">
              <LanguageProvider>
                <OverlayProvider>
                  <BrowserAgentProvider>
                    <AuthProvider>
                      {children}
                      <DebugOptions />
                    </AuthProvider>
                  </BrowserAgentProvider>
                </OverlayProvider>
              </LanguageProvider>
            </NextThemesProvider>
          </ToasterProvider>
        </HeroUIProvider>
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
};

export default MainProvider;
