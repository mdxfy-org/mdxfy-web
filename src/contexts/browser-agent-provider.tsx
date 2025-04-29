import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useCookies } from "react-cookie";
import { validateBrowserAgent } from "@/lib/validations";
import { setBrowserAgent as setBrowserFingerprint } from "@/service/api";
import { validateFingerprint } from "@/http/validate-fingerprint";
import { AUTH_BROWSER_AGENT_KEY } from "@/middleware";
import { useToast } from "@/service/toast";
import { useTranslations } from "next-intl";
import { cookieOptions } from "@/service/cookie";

interface BrowserAgentContextProps {
  isLoaded: boolean;
  browserAgent: string | undefined;
  refreshBrowserAgent: () => Promise<void>;
}

const BrowserAgentContext = createContext<BrowserAgentContextProps | undefined>(
  undefined
);

export const useBrowserAgent = (): BrowserAgentContextProps => {
  const context = useContext(BrowserAgentContext);
  if (!context) {
    throw new Error(
      "useBrowserAgent must be used within a BrowserAgentProvider"
    );
  }
  return context;
};

export const BrowserAgentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    AUTH_BROWSER_AGENT_KEY,
  ]);
  const [browserAgent, setBrowserAgent] = useState<string | undefined>(
    undefined
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const fetchInProgress = useRef(false);
  const toast = useToast();
  const t = useTranslations();

  const updateBrowserAgent = useCallback(
    (fingerprint: string) => {
      setBrowserAgent(fingerprint);
      setBrowserFingerprint(fingerprint);
      setCookie(AUTH_BROWSER_AGENT_KEY, fingerprint, cookieOptions);
    },
    [setCookie]
  );

  const refreshBrowserAgent = useCallback(async () => {
    if (
      window.location.hostname !==
      new URL(process.env.NEXT_PUBLIC_WEB_BASE_URL || "").hostname
    )
      return;
    if (fetchInProgress.current) return;
    fetchInProgress.current = true;
    const storedFingerprint = cookies[AUTH_BROWSER_AGENT_KEY] || "";
    if (storedFingerprint) {
      updateBrowserAgent(storedFingerprint);
    }
    try {
      const response = await validateFingerprint(storedFingerprint);
      const newFingerprint = response.data?.fingerprint;
      if (newFingerprint) {
        updateBrowserAgent(newFingerprint);
      } else if (storedFingerprint && validateBrowserAgent(storedFingerprint)) {
        updateBrowserAgent(storedFingerprint);
      } else {
        toast.error({
          description: t("Messages.errors.failed_to_get_browser_agent"),
        });
        removeCookie(AUTH_BROWSER_AGENT_KEY, cookieOptions);
      }
    } catch {
      toast.error({
        description: t("Messages.errors.failed_to_get_browser_agent"),
      });
      removeCookie(AUTH_BROWSER_AGENT_KEY, cookieOptions);
    } finally {
      setIsLoaded(true);
    }
  }, [cookies, toast, t, updateBrowserAgent, removeCookie]);

  useEffect(() => {
    refreshBrowserAgent();
  }, [refreshBrowserAgent]);

  return (
    <BrowserAgentContext.Provider
      value={{ browserAgent, isLoaded, refreshBrowserAgent }}
    >
      {children}
    </BrowserAgentContext.Provider>
  );
};

export default BrowserAgentProvider;
