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

function webMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasBrowserAgent = request.cookies.has(AUTH_BROWSER_AGENT_KEY);
  const hasToken = request.cookies.has(AUTH_TOKEN_KEY);
  const isAuthenticated = request.cookies.has(AUTHENTICATED_KEY);

  if (PUBLIC_PATHS.includes(pathname)) {
    if (hasBrowserAgent && hasToken && isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (PUBLIC_AUTH_PATHS.includes(pathname)) {
    if (!hasBrowserAgent || !hasToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!hasBrowserAgent || !hasToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/auth-code", request.url));
  }

  return NextResponse.next();
}

export function middleware(request: NextRequest) {
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
