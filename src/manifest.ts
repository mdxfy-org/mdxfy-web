import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Agrofast App",
    short_name: "Agrofast",
    description: "Agrofast portable version",
    start_url: "/",
    display: "fullscreen",
    background_color: "#f8fafc",
    theme_color: "#171717",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: '/favicon.ico',
        sizes: '400x400',
        type: 'image/x-icon',
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
