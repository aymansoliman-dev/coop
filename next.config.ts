import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "2gt3gio2sceffbql.public.blob.vercel-storage.com",
      },
    ],
    qualities: [75, 100],
  },
}

export default nextConfig