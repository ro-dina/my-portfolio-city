import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./content/articles/**/*.json"],
  },
  async redirects() {
    return [
      { source: "/coding", destination: "/projects", permanent: true },
      { source: "/coding/:slug", destination: "/projects/:slug", permanent: true },
      { source: "/school", destination: "/notes", permanent: true },
      { source: "/school/:slug", destination: "/notes/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
