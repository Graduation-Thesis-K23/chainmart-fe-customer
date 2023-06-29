/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",

  images: {
    domains: [
      "picsum.photos",
      "lh3.googleusercontent.com",
      "api.chainmart.site",
      "localhost",
    ],
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

module.exports = withBundleAnalyzer(nextConfig);
