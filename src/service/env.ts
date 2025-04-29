export const isProduction = () => {
  return process.env.NODE_ENV === "production";
};

export const isDevelopment = () => {
  return process.env.NODE_ENV === "development";
};

export const isIpAddress = (hostname: string) => {
  return /^[0-9.]+$/.test(hostname);
};

export const getCurrentOrigin = (): string => {
  if (typeof window !== "undefined") {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? `:${port}` : ""}`;
  }
  return "http://localhost:3000";
};

