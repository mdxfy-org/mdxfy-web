import api from "@/service/api";

export const resendCode = () => {
  return api.get("/user/resend-code");
};
