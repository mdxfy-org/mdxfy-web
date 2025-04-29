import {
  AUTH_BROWSER_AGENT_KEY,
  AUTH_TOKEN_KEY,
  AUTHENTICATED_KEY,
} from "@/middleware";
import axios from "axios";
import { getCurrentOrigin, isIpAddress } from "@/service/env";
import { Cookies } from "react-cookie";
import { cookieOptions } from "./cookie";

const cookies = new Cookies();

const localOrigin = getCurrentOrigin();
const hostname =
  typeof window !== "undefined" ? window.location.hostname : "localhost";

const apiBaseUrl = isIpAddress(hostname)
  ? `${localOrigin.replace(/:3030$/, "")}`
  : process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: `${apiBaseUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setBrowserAgent = (fingerprint: string) => {
  api.interceptors.request.use((config) => {
    config.headers["Browser-Agent"] = fingerprint;
    return config;
  });
};

export const setBearerToken = (token: string) => {
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

api.interceptors.request.use(
  async (config) => {
    const browserAgent = cookies.get(AUTH_BROWSER_AGENT_KEY);
    if (browserAgent) {
      config.headers["Browser-Agent"] = browserAgent;
    }
    const token = cookies.get(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  ({ data, request,...response }) => {
    return {
      ...response,
      request: {
        ...request,
      },
      ...data,
    };
  },
  (error) => {
    const { status, data } = error.response;
    switch (status) {
      case 201:
      case 204:
        break;
      case 401:
        if (["browser_agent", "invalid_token"].includes(data?.data?.code)) {
          cookies.remove(AUTH_BROWSER_AGENT_KEY, cookieOptions);
          cookies.remove(AUTHENTICATED_KEY, cookieOptions);
          cookies.remove(AUTH_TOKEN_KEY, cookieOptions);
          window.location.reload();
        }
        return Promise.reject({
          ...error,
          data: {
            ...data,
            status,
          },
        });
      default:
        return Promise.reject({
          ...error,
          data: {
            ...data,
            status,
          },
        });
    }
  }
);

export default api;
