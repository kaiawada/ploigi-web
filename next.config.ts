import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  output: "standalone",

  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
      {
        protocol: "https",
        hostname: "assets.st-note.com",
      },
    ],
  },
};

export default nextConfig;
