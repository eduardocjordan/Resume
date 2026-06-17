const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    outputFileTracingIncludes: {
      "/api/chat": ["./data/knowledge/**"],
      "/api/cron/finalize-sessions": ["./data/knowledge/**"],
    },
  },
};

export default nextConfig;
