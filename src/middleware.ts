import { NextRequest, NextResponse } from "next/server";

export const PUBLIC_PATHS = [
  "/login",
  "/sign-up",
  "/recover-token",
  "/reset-password",
];
export const PUBLIC_AUTH_PATHS = ["/auth-code", "/auth-with"];

export const AUTH_TOKEN_KEY = `${process.env.NEXT_PUBLIC_SERVICE_ID}_auth_token`;
export const AUTHENTICATED_KEY = `${process.env.NEXT_PUBLIC_SERVICE_ID}_authenticated`;
export const AUTH_BROWSER_AGENT_KEY = `${process.env.NEXT_PUBLIC_SERVICE_ID}_auth_browser_agent`;

const webHost = new URL(process.env.NEXT_PUBLIC_WEB_BASE_URL as string).host;

const webMiddleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";

  if (host === webHost) {
    const hasBrowserAgent = request.cookies.has(AUTH_BROWSER_AGENT_KEY);
    const hasToken = request.cookies.has(AUTH_TOKEN_KEY);
    const isAuthenticated = request.cookies.has(AUTHENTICATED_KEY);

    if (PUBLIC_PATHS.includes(pathname)) {
      if (hasBrowserAgent && hasToken && isAuthenticated) {
        const redirectUrl = new URL("/", request.url);
        return NextResponse.redirect(redirectUrl);
      }
      return NextResponse.next();
    }

    if (PUBLIC_AUTH_PATHS.includes(pathname)) {
      if (!hasBrowserAgent || !hasToken) {
        const redirectUrl = new URL(PUBLIC_PATHS[0], request.url);
        return NextResponse.redirect(redirectUrl);
      }
      if (isAuthenticated) {
        const redirectUrl = new URL("/", request.url);
        return NextResponse.redirect(redirectUrl);
      }
      return NextResponse.next();
    }

    if (!hasBrowserAgent || !hasToken) {
      const redirectUrl = new URL(PUBLIC_PATHS[0], request.url);
      return NextResponse.redirect(redirectUrl);
    }
    if (!isAuthenticated) {
      const redirectUrl = new URL(PUBLIC_AUTH_PATHS[0], request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }
};

const publicMatcher = [
  "/_next/static",
  "/_next/image",
  "/img/",
  "/favicon.ico",
  "/api",
  "/_next/data",
  "/_next",
  "/static",
  "/robots.txt",
  "/sitemap.xml",
  "/sitemap-index.xml",
];

export function middleware(request: NextRequest) {
  if (publicMatcher.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const host = request.headers.get("host") || "";

  if (host === webHost) {
    return webMiddleware(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
