import api from "@/service/api";
import { Error, Success } from "@/types/api-response";
import { User } from "@/types/user";

export type AuthResponse = Success<{
  token: string;
  user: User;
}>;

export type AuthError = Error<{
  attempts: number;
}>;

export const auth = (code: string) => {
  return api
    .get<AuthResponse>("/user/auth", { params: { code } })
    .then((res) => res.data);
};
