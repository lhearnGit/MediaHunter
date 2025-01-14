/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.igdb.com/**",
      },
    ],
  },
};

export default nextConfig;
