import DebugOptions from "@/components/debug/debug-options";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ToasterProvider from "./toast-provider";
import { OverlayProvider } from "./overlay-provider";
import { LanguageProvider } from "./language-provider";
import { AuthProvider } from "./auth-provider";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import { AppProps } from "next/app";

interface MainProviderProps {
  children: React.ReactNode;
  pageProps: AppProps["pageProps"];
}

const MainProvider: React.FC<MainProviderProps> = ({ children, pageProps }) => {
  const router = useRouter();

  return (
    <NextIntlClientProvider
      locale={router.locale ?? "pt-BR"}
      timeZone="America/Sao_Paulo"
      messages={pageProps.messages}
    >
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <LanguageProvider>
            <AuthProvider>
              <OverlayProvider>
                <ToasterProvider>
                  {children}
                  <DebugOptions />
                </ToasterProvider>
              </OverlayProvider>
            </AuthProvider>
          </LanguageProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </NextIntlClientProvider>
  );
};

export default MainProvider;
