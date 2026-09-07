import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/latent-atlas",
  trailingSlash: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
