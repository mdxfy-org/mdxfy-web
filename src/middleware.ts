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
  const { pathname, origin } = request.nextUrl;
  const host = request.headers.get("host") || "";

  if (host !== webHost) {
    return NextResponse.next();
  }

  const hasBrowserAgent = request.cookies.has(AUTH_BROWSER_AGENT_KEY);
  const hasToken = request.cookies.has(AUTH_TOKEN_KEY);
  const isAuthenticated = request.cookies.has(AUTHENTICATED_KEY);

  if (PUBLIC_PATHS.includes(pathname)) {
    if (hasBrowserAgent && hasToken && isAuthenticated) {
      return NextResponse.redirect(new URL("/", origin));
    }
    return NextResponse.next();
  }

  if (PUBLIC_AUTH_PATHS.includes(pathname)) {
    if (!hasBrowserAgent || !hasToken) {
      return NextResponse.redirect(new URL(PUBLIC_PATHS[0], origin));
    }
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", origin));
    }
    return NextResponse.next();
  }

  if (!hasBrowserAgent || !hasToken) {
    return NextResponse.redirect(new URL(PUBLIC_PATHS[0], origin));
  }
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL(PUBLIC_AUTH_PATHS[0], origin));
  }

  return NextResponse.next();
};

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

  return webMiddleware(request);
}

export const config = {
  matcher: "/:path*",
};
