import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Configure for static content delivery, build goes to "out" folder.
  reactStrictMode: true, // default when using app Router
  images: {
    unoptimized: true, // Static Content conflicts with optimization, so no need to waste resources doing it.
  },
  
};

export default nextConfig;
