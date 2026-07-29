import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: "/father-guido-ff",
  assetPrefix: "/father-guido-ff/",
};

export default nextConfig;
