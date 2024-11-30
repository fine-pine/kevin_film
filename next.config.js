/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "txznlwvsrduiqfajdcbv.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/finepine/kevin_film_images/**",
      },
    ],
  },
};

module.exports = nextConfig;
