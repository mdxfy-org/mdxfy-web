import api from "@/service/api";
import { Success } from "@/types/api-response";
import { User } from "@/types/user";

export type AuthResponse = Success<{
  token: string;
  user: User;
}>;

export type AuthError = {
  data: {
    attempts: number;
    errors: Record<string, string>;
  };
};

export const auth = (code: string) => {
  return api.get<AuthResponse>("/user/auth", { params: { code } });
};
