// providers/AuthProvider.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import api, { setBearerToken } from "@/service/api";
import { getMe } from "@/http/user/get-me";
import { AUTH_TOKEN_KEY, AUTHENTICATED_KEY } from "@/middleware";
import { User } from "@/types/user";
import { useOverlay } from "./overlay-provider";
import { cookieOptions } from "@/service/cookie";

interface AuthContextProps {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { setIsPageLoading } = useOverlay();

  const [cookies, setCookie, removeCookie] = useCookies([
    AUTH_TOKEN_KEY,
    AUTHENTICATED_KEY,
  ]);
  const [token, setAuthTokenState] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);

  const fetchInProgress = useRef(false);

  const setToken = useCallback(
    (tokenValue: string | undefined) => {
      if (tokenValue) {
        setAuthTokenState(tokenValue);
        setBearerToken(tokenValue);
        setCookie(AUTH_TOKEN_KEY, tokenValue, cookieOptions);
      } else {
        setAuthTokenState(undefined);
        removeCookie(AUTHENTICATED_KEY, cookieOptions);
        removeCookie(AUTH_TOKEN_KEY, cookieOptions);
        delete api.defaults.headers["Authorization"];
      }
    },
    [setCookie, removeCookie]
  );

  const logout = useCallback(() => {    
    setUser(undefined);
    setToken(undefined);
    router.push("/web/login", undefined, { locale: router.locale });
  }, [router, setToken]);

  const fetchMe = useCallback(async () => {
    if (fetchInProgress.current || user) return;
    fetchInProgress.current = true;

    const storedToken = cookies[AUTH_TOKEN_KEY];
    if (storedToken) {
      setToken(storedToken);
      setBearerToken(storedToken);
      getMe()
        .then(({ data }) => {          
          setUser(data.user);
          if (data.authenticated) {
            setCookie(AUTHENTICATED_KEY, data.authenticated, cookieOptions);
            return;
          }
          if (
            !cookies[AUTHENTICATED_KEY] ||
            cookies[AUTHENTICATED_KEY] !== true ||
            !data.authenticated
          ) {
            removeCookie(AUTHENTICATED_KEY);
          }
        })
        .catch(({ response }) => {
          if (response?.status === 401) {
            logout();
          }
        })
        .finally(() => {
          setIsPageLoading(false);
          fetchInProgress.current = false;
        });
    } else {
      setIsPageLoading(false);
      fetchInProgress.current = false;
    }
  }, [
    user,
    cookies,
    logout,
    setToken,
    setCookie,
    removeCookie,
    setIsPageLoading,
  ]);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
