import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fxm4y9kjap.ufs.sh',
        port: '',
        pathname: '/**',
      },
    ]
  }
};

export default nextConfig;
