import api from "@/service/api";
import { useRouter } from "next/router";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";

interface User {
  id: string;
  name: string;
  surname: string;
  number: string;
  email?: string;
  profile_picture?: string;
}

interface AuthContextProps {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
  tempToken: string | undefined;
  setTempToken: (token: string | undefined) => void;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useUser = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [tempToken, setTempAuthToken] = useState<string | undefined>(undefined);
  const [token, setAuthToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);

  const setTempToken = useCallback((token: string | undefined) => {
    if (token) {
      localStorage.setItem("mdxfy_temp_auth_token", token);
    } else {
      localStorage.removeItem("mdxfy_temp_auth_token");
    }
    setTempAuthToken(token);
  }, []);

  const setToken = useCallback(
    (token: string | undefined) => {
      if (token) {
        localStorage.setItem("mdxfy_auth_token", token);
        setTempToken(undefined);
      } else {
        localStorage.removeItem("mdxfy_auth_token");
      }
      setAuthToken(token);
    },
    [setTempToken]
  );

  const logout = useCallback(() => {
    setUser(undefined);
    setAuthToken(undefined);
    setTempToken(undefined);
    setToken(undefined);
    delete api.defaults.headers["Authorization"];
    router.push("/login", undefined, { locale: router.locale });
  }, [router, setAuthToken, setUser, setToken, setTempToken]);

  const fetchUser = useCallback(async () => {    
    if (token || tempToken) {
      api.defaults.headers["Authorization"] = `Bearer ${token ?? tempToken}`;
      api
      .get("/user/info/me")
      .then(({ data }) => {
          setUser(data?.user);
        })
        .catch(() => {
          logout();
        });
    }
  }, [token, tempToken, setUser, logout]);

  useEffect(() => {
    const storedToken = localStorage.getItem("mdxfy_auth_token");
    const storedTempToken = localStorage.getItem("mdxfy_temp_auth_token");
    if (storedToken) {
      setAuthToken(storedToken);
    }
    if (storedTempToken) {
      setTempAuthToken(storedTempToken);
    }
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        tempToken,
        setTempToken,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
