import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
  images: {
    domains: ['image.tmdb.org'], // Allow TMDB image hosting
  },
};

export default nextConfig;

