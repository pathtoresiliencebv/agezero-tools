/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: { unoptimized: true },
  async rewrites() {
    return [
      // Map / and any subpath (except _next, api, files) to /theme/...
      { source: "/", destination: "/theme" },
      { source: "/:path(.*)", destination: "/theme/:path" },
    ];
  },
};
export default nextConfig;
