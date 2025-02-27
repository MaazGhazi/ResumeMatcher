import { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverActions: {
    bodySizeLimit: "50mb", // Increase limit (default is 1MB)
  },
};

export default nextConfig;
