export const cookieOptions = {
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
  httpOnly: false,
  secure: false,// isProduction(),
  sameSite: "lax" as const,
};
