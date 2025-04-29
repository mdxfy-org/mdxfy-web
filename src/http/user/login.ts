import api from "@/service/api";
import { Success } from "@/types/api-response";
import { FormValues } from "@/types/form";
import { User } from "@/types/user";

export interface LoginData {
  email: string;
  password: string;
  remember?: boolean;
}

export type LoginResponse = Success<{
  token: string;
  user: User;
  auth?: "authenticate" | "authenticated"
}>;

export const login = async (
  data: LoginData | FormValues
): Promise<LoginResponse> => {
  return await api.post<LoginResponse>("/user/login", data).then(({ data }) => {
    api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${data.token}`;
      return config;
    });
    return data;
  });
};
