import api from "@/service/api";
import { Success } from "@/types/api-response";
import { User } from "@/types/user";

export type GetMeResponse = Success<{
  user: User;
  first_login: boolean;
  authenticated: boolean;
}>;

export const getMe = () => {
  return api.get<GetMeResponse>("/user/info/me");
};
