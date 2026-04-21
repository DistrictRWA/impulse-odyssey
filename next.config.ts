import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.impulseodyssey.com' },
      { protocol: 'http', hostname: 'www.impulseodyssey.com' },
      { protocol: 'https', hostname: 'impulseodyssey.com' },
    ],
  },
};

export default nextConfig;
