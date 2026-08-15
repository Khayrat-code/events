/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lnxlzzrcmwfnnbpmepcr.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;