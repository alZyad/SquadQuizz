/** @type {import('next').NextConfig} */
const nextRoutes = require("nextjs-routes/config");
const withRoutes = nextRoutes();
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = withRoutes(nextConfig);
