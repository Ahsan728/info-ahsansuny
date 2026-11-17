import type { NextConfig } from "next";

// Fully static site: `next build` writes plain HTML to `out/`, which Vercel
// (or any static host) serves directly. All content comes from /content and /data.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
