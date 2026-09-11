import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Substack cover images on the subscribe screen. Some posts carry the
    // raw upload, others an address on Substack's image CDN.
    remotePatterns: [
      { protocol: "https", hostname: "substack-post-media.s3.amazonaws.com" },
      { protocol: "https", hostname: "substackcdn.com" },
    ],
  },
};

export default nextConfig;
