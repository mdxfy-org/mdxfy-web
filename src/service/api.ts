import {
  AUTH_BROWSER_AGENT_KEY,
  AUTH_TOKEN_KEY,
  AUTHENTICATED_KEY,
} from "@/middleware";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
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
  (response) => response,
  (error) => {
    const { status, data } = error.response;

    switch (status) {
      case 201:
      case 204:
        break;
      case 401:
        if (["browser_agent", "invalid_token"].includes(data?.code)) {
          cookies.remove(AUTH_BROWSER_AGENT_KEY);
          cookies.remove(AUTHENTICATED_KEY);
          cookies.remove(AUTH_TOKEN_KEY);
          window.location.reload();
        }
        return Promise.reject(error);
      default:
        if (data?.error) {
          return Promise.reject(data.error);
        }
        return Promise.reject(error);
    }
  }
);

export default api;
