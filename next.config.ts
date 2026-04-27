import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from "next";
                                                                                                                                                                                                               
const withBundleAnalyzer = bundleAnalyzer({                                                                                                                                                                  
  enabled: process.env.ANALYZE === 'true',                                                                                                                                                                   
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**", // Allows all paths from this domain
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
