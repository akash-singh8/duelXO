/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  env: {
    APP_BASE_URL: "http://localhost:3000",
    WebSocket_BASE_URL: "ws://localhost:3053",
  },
};

module.exports = nextConfig;
