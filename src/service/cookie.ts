import { isProduction } from "./env";

export const cookieOptions = {
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
  httpOnly: false,
  secure: isProduction(),
  sameSite: "lax" as const,
};
