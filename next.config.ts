import type { NextConfig } from "next";

const apiHost = new URL(process.env.NEXT_PUBLIC_API_BASE_URL as string).host;

const nextConfig: NextConfig = {
  transpilePackages: ["@mdxeditor/editor"],
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  i18n: {
    locales: ["pt-BR", "en", "es"],
    defaultLocale: "pt-BR",
  },
  images: {
    domains: [apiHost],
    remotePatterns: [
      {
        protocol: "https",
        hostname: apiHost,
        port: "",
        pathname: "/*/**",
        search: "",
      },
      {
        protocol: "http",
        hostname: apiHost,
        port: "",
        pathname: "/*/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
